//点击复制
import Clipboard from 'vue-clipboard2'
export default Clipboard

/**
* @module clipboard
* @author: lc
* @description: 描述
* @since: 2020-10-15 14:28:43

官网链接：
    https://www.npmjs.com/package/vue-clipboard2

使用示例：
    <Input v-model="message"></Input>

    <button type="button"
        v-clipboard:copy="val"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">
        点击复制
    </button>

    methods: {
        onCopy(e){
            alert('You just copied: ' + e.text)
        },
        onError(e){
            alert('Failed to copy texts')
        }
    },


*/