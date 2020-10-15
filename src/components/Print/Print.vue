<template>
    <div :style="{ height: show ? 'auto' : 0 }" style="overflow: hidden">
        <slot></slot>
    </div>
</template>

<script>
import printJS from "print-js";
import domtoimage from "dom-to-image";
export default {
    name: "Print",
    props: {
        id: {
            type: String,
            default: "printMe",
        },
        title: {
            type: String,
            default: "",
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    methods: {
        // 是否显示或者隐藏掉相应的dom
        showNoPrintDom(bool) {
            var aLists = Array.from(document.querySelectorAll(".no-print"));
            if (aLists && aLists.length > 0) {
                aLists.forEach(function (item, index) {
                    if (bool == true) {
                        item.style.opacity = 1;
                    } else {
                        item.style.opacity = 0;
                    }
                });
            }
        },
        // 打印
        toPrint() {
			this.showNoPrintDom(false);

			printJS({
				printable: this.id,
				type: "html",
				maxWidth: 1200, // 最大宽度，必须大于表格的宽度，否则会出现表格显示不全,插件默认宽度是800
				documentTitle: this.title,
				targetStyles: ["*"],
				showModal: true,
			});

			this.showNoPrintDom(true);
        },
    },
};
</script>

<style lang="less" scoped>
</style>