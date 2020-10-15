### 组件参数说明
* content:  文本内容

### 使用示例
1. html
```html 
    <UEditor :content.sync="content"></UEditor>
```

2. js
```javascript
    import UEditor from "@/components/UEditor/UEditor.vue";
    data () {
        return {
            content:'',
        }
    },
    components: {
        UEditor
    },
    created(){
        this.content = '<p>编辑时的富文本html内容</p>'
    },

```