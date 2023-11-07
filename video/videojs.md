
# videojs 基础组件封装

```tsx
import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import "video.js/dist/video-js.css";
import 'videojs-flvjs-es6'

const hls = { url: "http://192.168.1.118:7086/live/cameraid/1000581%240/substream/1.m3u8", img: '/files/screenShoot/1659102220/109d89be-f11c-11ec-aac2-083a8891a376/20220729/1/dsf_786c2ba3-0f43-11ed-b20e-083a8891a376_27030498_27586850.jpg' }
const flv = { url: 'ws://test191.chinaeew.cn:5021/live/xd-001.live.flv', img: '/files/screenShoot/1659102220/109d89be-f11c-11ec-aac2-083a8891a376/20220729/1/dsf_786c2ba3-0f43-11ed-b20e-083a8891a376_27030498_27586850.jpg' }

export default function Test() {
    const videoPlayer = useRef(null)
    useEffect(() => {
        if (!videoPlayer.current) return
        const a = videojs(videoPlayer.current!, {
            controls: true,
            muted: true,
            techOrder: ["html5", "flvjs"],
            // sources: [{ src: hls.url, type: "application/x-mpegURL" }]
            sources: [{ src: flv.url, type: "video/x-flv" }]
        })
    }, [])
    return <video ref={videoPlayer} style={{ width: '500px', height: '500px' }} className="video-js vjs-default-skin vjs-big-play-centered"></video>
}


// 安装 video.js videojs-flvjs-es6 flv.js  支持播放flv协议的实时流   type: "video/x-flv" 

// 安装 video.js 支持播放hls协议的实时流 type: "application/x-mpegURL"
```
