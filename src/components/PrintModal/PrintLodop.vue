<template>
    <Modal title="打印" v-model="myVisible">
        <Form>
            <FormItem label="打印机：">
                <Select clearable filterable v-model="printIndex">
                    <Option v-for="item in printList" :key="item.value" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="纸张规格：">
                <Select clearable filterable v-model="specIndex">
                    <Option v-for="item in specList" :key="item.value" :value="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer" style="text-align:center">
            <Button type="primary" size="large" style="width:400px;" @click="printStart">开始打印</Button>
        </div>
    </Modal>
</template>
<script>
/**
* @module PrintLodop
* @author: lc
* @description: 用lodop.js的打印控件
* @since: 2020-09-27 16:34:38
*/
import { getLodop } from './lodop';
export default {
    name:'PrintLodop',
    props:{
        visible: {
            type: Boolean,
            default: false
        },
        model: {            //test：预览    normal：打印
            type: String,
            default: 'test'
        },
        contentType: {      //打印的内容类型
            type: String,
            default: 'html'
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            lodop:null,       //实例对象
            printList: [],  //打印机列表
            printIndex: 0,  //打印机序号
            specIndex: '0', //纸张规格序号
            specList: [
                {
                    label: 'A4',
                    value: '0'
                },
                {
                    label: '241-1 [21.59 x 13.97 cm]',
                    value: '1'
                },
                {
                    label: '241-1 [23 x 12.7 cm]',
                    value: '2'
                }
            ]
        }
    },
    watch:{
        visible(newVal){
            if(newVal&&!this.lodop){
                this.initLodop();
            }
        }
    },
    computed: {
        myVisible: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit("update:visible", value);
            }
        },
    },
    methods:{
        //获取打印机列表
        getPrintList () {
            this.printList = [];
            let len = this.lodop.GET_PRINTER_COUNT();
            for (var i = 0; i < len; i++) {
                this.printList.push({
                    label: this.lodop.GET_PRINTER_NAME(i),
                    value: i
                });
            };
        },
        //实例化插件
        initLodop () {
            this.lodop = getLodop();
            this.getPrintList();
        },
        //打印设置初始化
        initPrint () {
            this.lodop.PRINT_INIT(this.title);
            // this.lodop.SET_PRINT_MODE("POS_BASEON_PAPER",true);
            this.lodop.SET_PRINT_STYLE('FontName', 'tahoma');
        },
        //添加打印内容
        addPrintContent (str) {
            // 纸张大小
            if (this.width !== '' && this.height !== '') {
                this.lodop.SET_PRINT_PAGESIZE(1, this.width, this.height, '');
            } else {
                switch (this.specIndex) {
                    case '0':
                        this.lodop.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
                        break;
                    case '1':
                        this.lodop.SET_PRINT_PAGESIZE(1, '21.59cm', '13.97cm', '');
                    case '2':
                        this.lodop.SET_PRINT_PAGESIZE(1, '23cm', '12.7cm', '');
                        break;
                }
            }

            if (this.contentType === 'html') {
                this.lodop.ADD_PRINT_HTM('0', '0', '100%', '100%', str);
            } else if (this.contentType === 'image') {
                this.lodop.ADD_PRINT_IMAGE('0', '0', '100%', '100%', '<img src="' + str + '" />');
            }
        },
        //打印下一页
        printNewPage (str) {
            this.lodop.NewPage();
            this.addPrintContent(str);
        },
        //打印
        print (str) {
            str && this.addPrintContent(str);
            try {
                if (this.lodop.SET_PRINTER_INDEX(this.printIndex))   //设置选择的打印机去打印
                {
                    if (this.model === 'normal') {
                        this.lodop.PRINT();   //直接打印   
                    } else if (this.model === 'test') {
                        this.lodop.PREVIEW(); // 打印预览，可用于调试
                    }
                }
                this.myVisible = false;
            } catch (e) {
                console.error('打印服务出错！');
            }
        },
        //点击打印按钮开始执行打印操作
        printStart(){
            this.$emit('print',(...args)=>{
                this.print(...args);
            });
            // this.$emit('print-newPage',(...args)=>{
            //     this.printNewPage(...args);
            // });
        }
    }
}
</script>  