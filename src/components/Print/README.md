### 组件参数说明
* id:  需要打印部分的html，默认是:'printMe'； (样式写成行内样式)
* title: 打印的标题
* show: 是否展示打印的内容 默认 true

### 使用示例
1. html
```html
    <Print id="printMe" ref="print" title="测试打印" show>
        <div id="printMe">我是打印的内容</div>
    </Print>
    <Button type="primary" @click="$refs['print'].toPrint()">点击打印</Button>
```

2. js
```javascript
import Print from '@/components/Print/Print';
export default {     
    components: {
        Print
    },
}
```