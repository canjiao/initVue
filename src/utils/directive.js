/**
 * 全局指令
 * 
 * 
 *  // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
        //指令第一次绑定到元素时调用
        bind: function (el,binding,vnode) {},
        // 当被绑定的元素插入到 DOM 中时执行
        inserted: function (el) {},

    })
 */

//只能输入正整数指令   v-number 
export const number= {
    inserted: function (el) {
        el.addEventListener("keypress",function(e){
            e = e || window.event;
            let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
            let re = /\d/;
            if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    e.returnValue = false;
                }                            
            }
        });
    }
}


//只能输入正整数或小数点后几位指令  v-dotNumber="2"（如小数点后两位）
export const dotNumber = {
    inserted: function (el,bidding) {
        el.addEventListener("keypress",function(e){
            e = e || window.event;
            let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
            let re = /\d/;
            if(charcode == 46){
                //按小数点.键触发
                if(e.target.value.includes('.')){
                    e.preventDefault();
                }
                return;
            }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
                //除了0到9以外的其他键按下触发
                if(e.preventDefault){
                    e.preventDefault(); //阻止事件默认行为
                }else{
                    e.returnValue = false; //不返回事件的值
                }
            }else{
                //按数字键触发
                //如果传入的数字则限制只能输入到小数点后几位
                let index = e.target.value.indexOf('.');
                let num = bidding.value || 0;
                if(index>=0&num>0){
                    if(e.target.value.length>index+num){
                        e.preventDefault();
                    }else{
                        e.returnValue = true;  //返回事件的值；如按 1 则返回值 1  
                    }
                }
            }
            
        });
    }
}



//浏览器滚动到某个位置指令  v-scrollTo  ||  v-scrollTo="500"  ||  v-scrollTo=".class"
export const scrollTo = {
    bind: function (el,binding) {
        let value = binding.value;
        let scrollTop = 0;
        if (typeof value == "string") {
            scrollTop = document.querySelector(value).getBoundingClientRect().top;
        }else if(typeof value == "number"){
            scrollTop = value;
        }
        $(el).click(function() {
            $('html,body').animate({
                scrollTop,
            }, 500);
        });
    },
}


//元素悬浮在某个位置指令  v-fixed="{left:100,top:500}"   
export const fixed = {
    bind: function (el,bidding) {
        let options = {position:'fixed',...bidding.value};
        $(el).css(options)
    }
}

