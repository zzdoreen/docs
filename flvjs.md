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
        duration: 0,
        },
        {
        enableWorker: false,
        autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
        autoCleanupMaxBackwardDuration: 12, // 当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
        autoCleanupMinBackwardDuration: 8, // 指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
        enableStashBuffer: false, // 关闭IO隐藏缓冲区
        isLive: true,
        lazyLoad: false,
        reuseRedirectedURL: true     
        })
        flvPlayer.attachMediaElement(videoDom)
        flvPlayer.load()
        flvPlayer.play()

        // 监听数据源是否加载完成
        flvPlayer.on(flvjs.Events.LOADING_COMPLETE, (res) => {
            if (!flvPlayer._receivedCanPlay) {
              // 不能播放 销毁
              flvPlayer.pause()
              flvPlayer.unload()
              flvPlayer.detachMediaElement();
              flvPlayer.destroy();
              // message.error('视频资源获取失败')
            }
          })

        // 异常捕获（播放途中断流、网络错误等）
        flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
            flvPlayer.pause()
            flvPlayer.unload()
            flvPlayer.detachMediaElement();
            flvPlayer.destroy();
          })
    }
        
```