## video标签相关

> 大部分控件都能隐藏 但是`更多控件`那个控件隐藏不了 采取了自欺欺人的方法... 设置高度父元素溢出隐藏挡住

+ [video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
+ [controlsList](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/controlsList)

```html
<!--controlsList  -->
 <video
    controlsList='nofullscreen nodownload noremoteplayback'
    disablePictureInPicture
    className="videoItems"
    muted
    controls
    width="100%"
    height="100%"
    />
```

```css
&::-webkit-media-controls-time-remaining-display,
&::-webkit-media-controls-current-time-display,
&::-webkit-media-controls-play-button,
&::-webkit-media-controls-fullscreen-button,
&::-webkit-media-controls-timeline,
&::-webkit-media-controls-volume-slider,
&::-webkit-media-controls-mute-button,
&::-webkit-media-controls-overflow-menu-list {
  display: none;
}

&::-webkit-media-controls-enclosure {
  overflow: hidden;
}

&::-webkit-media-controls-panel {
  height: calc(100% + 50px);
}
```

## 阻止默认事件

> `video`默认事件 单击播放/暂停 双击全屏

> 现需求是不能通过单击操作视频的播放/暂停 但是又不想去掉controls因为去掉了没有loading样式

> 单击默认事件阻止之后 双击的全屏事件也不能实现了QAQ , 所以双击也得自己实现

```javascript
  const videoExitFullScreen = () => {
    const dom = document

    // 浏览器兼容性处理
    if (dom.exitFullscreen) {
      dom.exitFullscreen()
    } else if (dom.mozCancelFullScreen) {
      dom.mozCancelFullScreen()
    } else if (dom.webkitCancelFullScreen) {
      dom.webkitCancelFullScreen()
    }
  }
  
  // 阻止video单击播放停止的默认事件
  const onceClick = (event) => {
    event.preventDefault();
  }

  // 还原video双击全屏事件
  const singleFullScreen = (index: number) => {
    const isFull = document.fullscreenElement
    if (isFull) {
      videoExitFullScreen()
    } else {
      videoFullScreen(index)
    }
  }

```

## video播放按钮

> 因为没有加载数据源的时候`video`的播放按钮是禁用状态，而且监听不到他的点击事件

### 解决思路

+ 通过css样式写死透明度为 1 （假装成能点的样子）
+ 将一个透明的div覆盖在播放按钮的位置上
+ 给div加点击事件、加载数据源，video有数据源之后就直接销毁div，原生的播放暂停按钮可以点击啦

```css
 &::-webkit-media-controls-play-button {
        // TODO 视频播放按钮
        opacity: 1;
    }
```

```javascript
      <div className={styles["video-container"]}>
        <video id='video'
          controlsList='nodownload noremoteplayback'
          disablePictureInPicture
          className={styles['hide-video-control']}
          onClick={handleClick}
          controls />
      </div>

      {!flv && <div className={styles["play-cover"]} onClick={handleCoverClick}></div>}

```

## video画中画

> 正常切换标签页画中画状态是可以切换回去的
> 但是路由切换的话，组件被卸载了，就回不去了
> 就需要对画中画进行禁用 给`video`加上`disablePictureInPicture`属性
