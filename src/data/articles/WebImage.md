## 使用场景
几乎所有Web网站都会使用图片。社交网站的用户使用头像标识个性身份，晒图分享个人动态；网购网站展示不同商品的图片，以供消费者挑选；新闻网站发布图片到文章中，增强渲染力；就连简书这样的文学性网站，也推荐在文章中插图，以舒缓阅读疲劳；多数网站提供favicon.ico图片用以在浏览器标签栏上做标识；多数网站都用创意性的Logo图片展示在网站以提高辨识度和品牌形象。

## 图片的展示
我们知道，图片在Web页面中的显示，使用<img>元素，并在该元素的src属性中，设置图片的url以获取图片的资源来展示。如下：
```
<img src="http://www.example.com/pictures/1.png">
```
这种形式的图片显示，将会在html上的该位置，以图片的原尺寸直接显示图片。假如图片像素是300x200，那么就会以300x200的像素显示出来。

有时，我们会将图片放到另一个html元素内部来显示。假如这个元素是一个height x width = 200 x 100 的<div>，那么图片就会只能展示左上角的200 x 100像素的部分了。为了解决这种尴尬情况，可以手动指定图片的高度和宽度，以缩略图的方式全部展示。如下:
```
<img height="200px" width="100px" src="http://www.example.com/pictures/1.png">
```

这样做索然可以让图片全部显示，但是新的问题产生了，图片发生了扭曲。事实上，原尺寸的高度和宽度的比例是300/200 = 3/2，手动设定为200/100之后，就变成了2/1，就会让图片发生上下拉伸的现象。如果比例比3/2小，又会出现左右拉伸的现象。为了解决这个问题，我们的图片的缩放，就只能按照原来尺寸的比例来进行。可以对height或width设置百分比属性，来继承底层html元素的尺寸。如下：
```
<img width="100%" src="http://www.example.com/pictures/1.png">
```
这样一来，图片的宽度就变成了100px，其高度会按照原比例进行缩放，变成150px。

另外，我们还可以将图片设置成元素的背景图像，并调整图片的透明度。

## 图片的加载
老版本的浏览器，图片只能通过其src属性从服务器上加载。基于html5规范的新版浏览器，新增支持从浏览器本地客户端上加载图片(和文件)。利用这个新特性，我们上传和显示图片，再也不需要先上传到服务器了，直接在本地加载到浏览器上显示和处理，然后再上传到服务器，这样可以更加节约带宽，提升用户体验。

这是一个本地加载图片的demo：
```
<!DOCTYPE html>
<html>
  <body>
    <img id="image" src="">
    <input type="file" id="picture">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
    <script type="text/javascript">
      $('#picture').change(function () {
          var pictureFile = this.files[0];
          var url = window.URL.createObjectURL(pictureFile);
          $('#image').attr('src', url);
      });
    </script>
  </body>
</html>
```

## 图片的处理
直接从图片文件中获取的图片，不一定在尺寸和显示内容上让我们满意，有时候，我们需要先处理这些图片，再上传到服务器上。

当然，我们可以在本地打开类似Photoshop这样的图片处理软件来处理好图片之后，再执行上传操作，但是这样就费时费力，用户体验不佳了。在只需要简单裁剪、旋转和缩放处理的情况下，我们可以直接在浏览器上完成。这时候，可以依赖一些js插件来辅助处理图片。比如我们要介绍的[cropper](https://github.com/fengyuanchen/cropper)。

使用cropper插件，我们可以轻松完成图片的裁剪、旋转和缩放处理。如果需要更多的处理，则建议用专业图像工具来处理了。

使用cropper处理完的图片，我们可以通过其`getCroppedCanvas`方法来获取裁剪后的canvas对象。

![裁剪图片](/WebImageExample.png)


## 处理后图片的展示
我们获得裁剪图片的canvas对象后，利用canvas对象的toBlob方法来获取裁剪图片的blob对象以及进行相应处理的回调函数。blob对象是File对象的基础对象，所以，我们使用这个对象，也可以显示成图片。代码片段如下：
```
$('#cropper-img').cropper('getCroppedCanvas', {
            width: 400,
            height: 400,
            minWidth: 256,
            minHeight: 256,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
}).toBlob(function(blob) {
            var croppedUrl = window.URL.createObjectURL(blob);
            $('#image').attr('src', croppedUrl);
});
```

## 处理后图片的上传
我们处理图片的最终目的还是为了上传到服务器。所以当我们看了裁剪图片令人满意之后，就可以着手上传图片了。
首先，我们可以将blob对象创建为File对象，然后用ajax方法上传这个File对象到服务器上。修改后代码片段如下：
```
toBlob(function(blob) {
  var croppedUrl = window.URL.createObjectURL(blob);
  $('#image').attr('src', croppedUrl);
  var formData = new FormData();
  var pictureFile = new File([blob], $('#picture').val());
  formData.append('picture', pictureFile);
  $.ajax("path/to/upload-picture", {
     method: "POST",
     data: formData,
     processData: false,
     contentType: false,
     success: function () {
        console.log('Upload success');
     },
     error: function () {
        alert("Upload error");
     }
  });
});
```

## Demo
可以参照[cropper的demo](https://fengyuanchen.github.io/cropper/)体验截图操作，以及其案例的[源码](https://github.com/fengyuanchen/cropper/tree/master/examples)。
本文示例[源码地址](https://github.com/luhuisicnu/island/blob/master/customize_auth/templates/customize_auth/user_edit.html)

## 参考文章
[利用html5 file api读取本地文件（如图片、PDF等）](https://segmentfault.com/a/1190000004084956)
[cropper README](https://github.com/fengyuanchen/cropper/blob/master/README.md)
