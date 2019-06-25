近几年，容器越来越火，也越来越好用，我也开始尝试使用容器来运行我的应用。本篇主要讲述如何将一个Flask应用正确地运行在Docker容器中。

## 创建应用
创建一个文件夹`testflask`。
写一个Flask应用如下：
`testflask/app.py`
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'hello docker&flask'

if __name__ == '__main__':
    app.run(debug=True)

```
一旦使用命令`python app.py`运行这个应用，打开浏览器，输入网址`127.0.0.1:5000`并回车，将会返回`hello docker&flask`这串字符。

## 使用Gunicorn+Gevent运行Flask应用
我们知道，Flask应用是一个符合WSGI规范的Python应用，不能独立运行（类似app.run的方式仅适合开发模式），需要依赖其他的组件提供服务器功能。在这里，我们选择Gunicorn+Gevent的组合。
安装命令如下：
```bash
pip install gunicorn gevent
```
书写Gunicorn的配置文件如下：
`testflask/gunicorn.conf.py`
```python
workers = 5    # 定义同时开启的处理请求的进程数量，根据网站流量适当调整
worker_class = "gevent"   # 采用gevent库，支持异步处理请求，提高吞吐量
bind = "0.0.0.0:8888"    # 监听IP放宽，以便于Docker之间、Docker和宿主机之间的通信
```
可以使用gunicorn命令来测试是否可以正确运行，命令如下：
```bash
gunicorn app:app -c gunicorn.conf.py
```
*一旦报错，则根据错误提示修复。*
以前，接下来是配合supervisor将应用部署到主机上，supervisor的主要作用是监控和修复应用的运行状态。现在，将应用部署到Docker中，这个任务就交给Docker来实现(使用容器云平台例如kubernetes可以更好地实现这个功能)。

##使用Docker运行Flask应用
*本步骤依赖于安装完好的docker运行环境*
完成两步之后，我们得到一个可以直接运行的Flask应用，现在，我们要将它的运行封装到Docker之中。
我们需要为该应用创建一个requirements.txt文件，以便Docker环境的安装。
`testflask/requirements.txt`
```
flask
gunicorn
gevent
```
有了这个文件，在安装Flask应用依赖的三方包时，可以直接用如下命令执行：
```bash
pip install -r requirements.txt
```
然后我们还要创建一个Dockerfile文件，以便Docker镜像的构建：
`testflask/Dockerfile`
```Dockerfile
FROM python:2

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "app:app", "-c", "./gunicorn.conf.py"]
```
完成这两个文件的创建之后，执行如下命令，就可以开始构建Docker镜像：
```bash
sudo docker build -t 'testflask' .
```
*需要注意的是，下载python:2这个基础镜像可能需要花点时间，因为它有几百兆。*
构建完成之后，通过如下命令查看镜像列表，可以发现testflask显示在其中：
```bash
sudo docker images
```
接下来，我们可以push镜像到镜像仓库进行分发，这里我们就在本机运行进行演示。
*需要注意，公司的私有代码，不要push到公网的镜像仓库上*
运行如下命令，临时运行docker镜像：
```bash
sudo docker run -it --rm -p 8888:8888 testflask
```
可以看到Docker镜像成功地运行起来了，并处于阻塞状态。这时，我们打开浏览器，输入`127.0.0.1:8888`，可以看到返回的网页中展示内容`hello docker&flask`。

使用Docker运行到生产环境中(以daemon方式运行)，可以使用如下的类似命令：
```bash
sudo docker run -d -p 8888:8888 --name test-flask-1 testflask
```
规模化管理大量Docker容器时，推荐使用容器云来管理。
## 总结
使用Docker部署Flask应用，不仅需要理解Flask应用的常规部署方法，还要掌握Docker部署应用的技巧，才能成功地将两者结合起来使用。如果大规模迁移应用到Docker容器上，需要使用容器云来简化工作。
