自Python3.0起，Python中的`print`关键字被移除，想要便捷地打印字符串，可以使用`print()`函数。

>虽然Python2.7支持了`print()`函数，但是却没有移除`print`关键字，因此直接`type(print)`是会报错的。
>```
>In [1]: type(print)
>  File "<ipython-input-1-961b0c77d407>", line 1
>    type(print)
>             ^
>SyntaxError: invalid syntax
>```
## print关键字和函数的使用对比
##### 打印一个对象
关键字版本：
```
print x
```
函数版本：
```
print(x)
```
##### 打印多个对象
关键字版本：
```
print x, y, z
```
函数版本：
```
print(x, y, z)
```
##### 设置重定向
关键字版本：
```
print >> sys.stderr, "xxx"
with open("test.log", "w") as f:
    print >> f, "test line"
```
函数版本：
```
print(x, file=sys.stderr)
with open("test.log", "w") as f:
    print("test line", file=f)
```
##### 设置分隔符
关键字版本：
```
print x, y  # 分隔符只能是单个空格
```
函数版本：
```
print(x, y, step=",")  # 通过step设置想要的分隔符，默认仍然是单个空格
```
##### 设置结束符
关键字版本：
```
print x
print x,    # 结束符只能是单个空格或者换行符
```
函数版本：
```
print(x, end="\n")  #通过end设置想要的结束符 
```
##### 设置刷新输出流
关键字版本：
```
print x    # 因为只能以换行符结束，所以默认每次执行print语句都刷新输出流
```
函数版本：
```
print(x, flush=False)  #通过flush设置是否刷新输出流，一旦输出流中包含换行符就马上刷新输出流。需要注意默认的结束符是换行符，所以实际上默认也是直接刷新输出流
```

## 利用print函数实现一个命令行动画
print_load.py
```
import time

def load():
    for i in range(1, 101):
        print('{0:>3d}%  '.format(i)+'#'*i+'-'*(100-i), end='', flush=True)
        print('\x08'*106, end='')  # 这是显示文本式动画的诀窍所在:使用退格符(或者\r)把光标移回来
        time.sleep(0.1)
    print(' ' * 106 + '\x08' * 106, end='')  # 使用空格清除状态消息,把光标移回开头 

if __name__ == '__main__':
    load()

```
运行命令`python3 print_load.py`将会看到不断加载进度的命令行动画
## print函数替换关键字的原因
这一切可以在2006年被提出的[PEP3105](https://www.python.org/dev/peps/pep-3105/)中找到。
* 打印功能是唯一一个使用关键字实现的应用程序级别的功能。在Python的世界里，关键字通常是功能实现的最后的手段。
* 使用`print()`可以实现更复杂的打印输出格式（虽然`format`函数也提供格式化功能）。并且重定向文件时表示得更清晰易懂。
* 相比关键字，函数的迭代更加方便，兼容性更佳。
* `print`关键字的分隔符不能变换，这点极其不便。
* `print()`以函数的形式呈现，是一个概念上的巨大飞跃。这意味着我们可以轻易联想到，将字符串输出到`sys.stdout`或其他文件来理解它，工作流程类似于文件读写。
