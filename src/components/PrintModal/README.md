### 组件参数说明
* id:  需要打印部分的html，默认是:'printMe'； (样式写成行内样式)
* title: 打印的标题

### 使用示例
1. html
```html
    <div id="printMe">我是打印的内容</div>
        <PrintLodop :visible.sync="visible" @print="print" @print-newPage="printNewPage"></PrintLodop>
    <Button type="primary" @click="visible=true">点击打印</Button>
```

2. js
```javascript
import PrintLodop from '@/components/PrintModal/PrintLodop';
export default {    
    data () {
        return {
            visible:false,
        }
    },
    components: {
        PrintLodop
    },
    methods: {
        print(event){
            let div = document.getElementById('printMe');
            event(div);
        },
        //打印下一页 暂未实现
        printNewPage(event){
            event();
        }
    },
}
```