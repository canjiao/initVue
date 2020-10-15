### 组件参数说明
* id:  需要转换成图片部分的html，默认是 'domtoimage'；

### 使用示例
1. html
```html
    <DomToImage ref="domtoimage">
        <div id="domtoimage">
            我是转成图片并下载的内容
        </div>
    </DomToImage>
    <Button type="primary" @click="$refs['domtoimage'].toImage()">点击下载</Button>
```

2. js
```javascript
import DomToImage from '@/components/DomToImage/DomToImage';
export default {     
    components: {
        DomToImage
    },
}
```