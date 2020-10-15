// viewer 图片预览插件
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Viewer.setDefaults({
    backdrop: true,  // 背景
    button: true, //右上角关闭按钮
    navbar: true, // 底部导航栏
    // 标题
    title(image, imageData) {
        return `${image.alt} (${imageData.naturalWidth} × ${imageData.naturalHeight})`;
    },
    toolbar: {
        zoomIn: 'large',  // 放大
        zoomOut: 'large',  // 缩小
        oneToOne: 'large',  // 1:1视图
        reset: 'large',  // 重置
        prev: 'large', // 上一张，图片列表显示
        play: false,  // 全屏播放
        next: 'large', // 下一张，图片列表显示
        rotateLeft: 'large',  // 左转，逆时针
        rotateRight: 'large',  // 右转，顺时针
        flipHorizontal: false,  // 横向翻转
        flipVertical: false,  // 纵向翻转
    },
    className: 'app-viewer-container',  // 组件根元素class名
    zoomRatio: 0.2,  // 滚轮缩放比例
});
export default Viewer


/**
* @module viewer
* @author: lc
* @description: 描述
* @since: 2020-10-15 11:27:17

官网链接：
    https://mirari.cc/v-viewer/

使用示例：
    <img src=""  title="" v-viewer />

    或者
    <div v-viewer >
        <img src=""  title="" />
        <img src=""  title="" />
    </div>

    或者
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src" />
    </viewer>

*/