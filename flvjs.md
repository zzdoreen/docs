已更新
## [flv.js](http://bilibili.github.io/flv.js)

[中文文档](https://www.jianshu.com/p/b58356b465c4)

[实用的文档](https://blog.csdn.net/TurtleOrange/article/details/119147481)

[解决跳帧、断流问题文档](http://events.jianshu.io/p/681239401c7e)

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


```javascript
try {
  flvPlayerList[index].on(flvjs.Events.STATISTICS_INFO, (res) => {
    if (res.decodedFrames === 0) {
      // TODO 画面卡顿重连
      stuckCount.value[index] = stuckCount.value[index] ? stuckCount.value[index] + 1 : 1
      if (stuckCount.value[index] >= 30) {
        setAllPlayFlag(false)
        // TODO 是否需要重连
        setTimeout(() => {
          stuckCount.value[index] = 0
          handleVideoStatusChange(index, true)
          playerList[index].addEventListener('loadedmetadata', () => {
            setAllPlayFlag(isAllPlayStatus(currentPage, defaultSize))
            })
            console.log('---画面卡顿重连')
            }, 1000);
          }
          console.log(`%c STATISTICS_INFO loading  ${index} , count:${stuckCount.value[index]} ${playerList[index]?.paused}`, 'color:red')
          } else {
            stuckCount.value[index] = 0
        }
      })
    } catch (err) {
      console.log('拉流异常捕获', err)
  }

```


```javascript
  const handleProgress = (index: number) => {
    // 数据在请求但是画面不动
    if (playSt.value[index]) {
      if (currentTimeCount.value[index] && currentTimeCount.value[index].key == playerList[index].currentTime) {
        currentTimeCount.value[index].count++
        if (currentTimeCount.value[index].count >= 10) {

          currentTimeCount.value[index] = null
          handleVideoStatusChange(index, true)

          playerList[index].addEventListener('loadedmetadata', () => {
            setAllPlayFlag(isAllPlayStatus(currentPage, defaultSize))
          })

          console.log('%c 画面卡顿重连', 'color:red')
        }
      } else {
        currentTimeCount.value[index] = { key: playerList[index].currentTime ? playerList[index].currentTime : 0 + '', count: 1 }
      }
    }
  }
```

## 内存泄漏

> `reload()` 可以清除缓存、但是切换标签的时候会清空所有状态，只有在路由跳转的时候用一下