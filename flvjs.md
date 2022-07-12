## [flv.js](http://bilibili.github.io/flv.js)

[中文文档](https://www.jianshu.com/p/b58356b465c4)

> 一个可以在HTML5视频中播放.flv视频格式的JavaScript库

### [API](http://bilibili.github.io/flv.js/docs/api.html)

### 使用

1. 安装依赖

> npm i --save flv.js

2. 在文件中引入依赖

> import flvjs from 'flv.js'

3. 初始化播放器实例，并播放

```html
<video id='video' controls></video>
```

```javascript

  const videoDom = document.getElementById('video')

  if (flvjs.isSupported()) { // 判断浏览器是否支持flvjs
    const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: '',
        isLive: true,
        hasAudio: false,
        hasVideo: true,
        })
        flvPlayer.attachMediaElement(videoDom)
        flvPlayer.load()
        flvPlayer.play()
    }
        
```

4. 卸载播放器

```javascript
    flvPlayer.pause()
    flvPlayer.unload();
    flvPlayer.detachMediaElement();
    flvPlayer.destroy();

```
