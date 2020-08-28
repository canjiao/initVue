import { routerArr } from '@/router/routerArr';
let Utils = {
    getUrlParams(name, url) {

        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : decodeURIComponent(results[1]);

    },
    getRouterObjByName: (function () {
        const data = {};
        function delayer(routerArr) {
            if (!routerArr || !routerArr.length) {
                return;
            }
            for (let item of routerArr) {
                data[item.name] = item;
                delayer(item.children);
            }
        }
        delayer(routerArr);
        return function (name) {
            return data[name];
        };
    })(),
    getRouterObjByPath: (function () {
        const data = {};
        function delayer(routerArr) {
            if (!routerArr || !routerArr.length) {
                return;
            }
            for (let item of routerArr) {
                data[item.path] = item;
                delayer(item.children);
            }
        }
        delayer(routerArr);
        return function (path) {
            return data[path];
        };
    })(),
    toDefaultPage: function (route, next) {
        const item = Utils.getRouterObjByName(route.name);
        if (item.children && item.children.length) {
            next({
                replace: true,
                name: item.children[0].name
            });
        } else {
            next();
        }
    },
    /**
     * 获取Vue链接的query参数。
     * @param {链接} url 
     */
    getUrlVueQuery(url) {
        url = url || window.location.hash;
        url = url.replace(/.*(?=\?)/, '');
        let queryArray = url.split(/[?&]/).slice(1);
        let args = {};
        for (let i = 0; i < queryArray.length; i++) {
            let match = queryArray[i].match(/([^=]+)=([^=]+)/);
            if (match !== null) {
                args[match[1]] = decodeURIComponent(match[2]);
            }
        }
        return args;
    }
    ,
    /**
     * 判断是否为数组
     * @param {值} value 
     */
    isArray(value) {
        return Object.prototype.toString.call(value) == '[object Array]';
    }
    ,
    /**
     * 查找数组中的对象
     * @param {键} key
     * @param {值} value
     * @param {数组} arr 
     */
    findObjInArr(key, value, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) {
                return { item: arr[i], index: i };
            }
        }
        return {};

    },
    /**
     * 数组根据field成组
     * @param {数组} arr 
     * @param {字段} field 
     */
    groupBy(arr, field) {
        let grouped = {};
        arr.forEach((obj) => {
            let groupname = obj[field];
            if (groupname in grouped) {
                grouped[groupname].push(obj);
            } else {
                grouped[groupname] = [obj];
            }
        });
        return grouped;

    },
    /**
     * 添加数组
     * @param {源数组} arr1
     * @param {数组} arr2
     */
    addRange(arr1, arr2) {
        for (var i = 0, j = arr2.length; i < j; i++) {
            arr1[arr1.length] = arr2[i];
        }
    }
    ,
    /**
     * 根据keys,取数据中的对象,并转化为数组
     * @param {数组} data 
     * @param {键值数组}} keys 
     */
    setObjToArr(data, keys) {
        let arr = [];
        data.forEach(item => {
            let itemArr = [];
            keys.forEach(key => {
                itemArr.push(item[key]);
            });
            arr.push(itemArr);
        });
        return arr;

    },
    /**
     * 数组中是否有相同的值
     * @param {数组} data 
     * @param {如果数组元素是对象，则判断key} key
     */
    hasRepeatInArr(data, key) {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            let j = i + 1;
            if (j >= len) {
                return false;
            }
            for (; j < len; j++) {
                if (key) {
                    if (data[i][key] == data[j][key]) {
                        return true;
                    }
                } else if (data[i] == data[j]) {
                    return true;
                }
            }
        }
        return false;

    },
    /**
     * 两个对象是否相等
     */
    equalObject(obj1, obj2) {
        let keys = Object.keys(obj1),
            key,
            length = keys.length;

        if (Object.keys(obj2).length !== length) return false;
        while (length--) {

            key = keys[length];
            if (!(obj2.hasOwnProperty(key) && obj1[key] == obj2[key])) return false;
        }
        return true;

    },
    /**
     * 验证数组中的值
     * @param {数组} data 
     */
    validArr(data, reg) {
        for (let i = 0; i < data.length; i++) {
            if (reg.test(data[i])) {
                return false;
            }
        }
        return true;


    },
    /**
     * 获取随机数
     * @param {*} x 
     * @param {*} stellen 
     */
    rounder(x, stellen) {
        return (Math.round(x * Math.pow(10, stellen))) / Math.pow(10, stellen)
    },
    /**
     * 格式化日期
     * @param {日期} value 
     */
    formatDate(value, isHours = true, isMonth = false) {
        if (value) {
            let date = new Date(value);
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            if (isHours) {
                return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
            }
            else if (isMonth) {
                return date.getFullYear() + '-' + month;
            }
            else {
                return date.getFullYear() + '-' + month + '-' + day;
            }

        } else {
            return '';
        }

    },

    /**
     * 产生一组日期数组
     * @param {最小日期} min 
     * @param {最大日期} max 
     */
    rangeDate(min, max) {
        var min = min,
            max = max,
            days = (new Date(max) - new Date(min)) / 1000 / 60 / 60 / 24,
            i = 0,
            len = Math.floor(days),
            dates = [];

        for (; i < len; i++) {
            dates.push(formatDate(new Date(min).getTime() + 1000 * 60 * 60 * 24 * i, false));
        }
        return dates;

    },
    formatAmount(amount) {
        return typeof amount == 'number' ? amount.toFixed(2) : Number(amount).toFixed(2);
    },

    /**
     * 格式化金額，返回两位小数，大金额返回 12,000,000.00
     * @param {金额} val 
     */
    formatMaxAmount: function (val) {
        let v = Number(val).toFixed(2)
        let vsplit = v.split('.')
        let join = ''

        if (vsplit[0].length > 3) {
            let temp = vsplit[0].split('').reverse()
            let len = temp.length
            let wrap = ''
            for (let i = 0; i < len; i++) {
                if (i < 1) {
                    join += temp[i]
                } else {
                    join += ((i + 1) % 3 === 0 ? (temp[i] + ',') : temp[i])
                }
            }
            wrap = join.split('').reverse().join('')
            if (wrap.charAt(0) == ',') {
                wrap = wrap.substr(1, wrap.length - 1)
            }
            return wrap + '.' + vsplit[1]
        }
        return v
    },

    /**
     * 隐藏手机号码的中间四位数 186****6257
     * @param {手机号码} phone 
     */
    formatPhone: function (phone){
        let reg = /^(\d{3})\d*(\d{4})$/;
        return phone.replace(reg,'$1****$2');
    },

    /**
     * 取小数位
     * @param {*} value 值
     * @param {*} radix 位数
     */
    toFixed(value, radix = 2) {
        let num = Number(value);
        if (Number.isNaN(num)) {
            return false;
        }
        return num.toFixed(radix);
    },

    /**
     * 输入框只能输入数字，且最多输入小数点后两位
     * @param {*} value 
     */
    formatNumberDigit(value){
        value = String(value);
        return ((value.match(/^\d+(\.?\d{0,2})/g)||[])[0]) || null
    },


    /**
     * 滚动到指定位置 没有动画
     * @param {*} element 元素ID或者元素
     */
    scrollToElement(element) {
        if (typeof element == "string") {
            element = document.querySelector(element);
        }
        let rect = element.getBoundingClientRect();
        //获取元素相对窗口的top值，此处应加上窗口本身的偏移
        let top = window.pageYOffset + rect.top - 100;
        let page = document.body || document.documentElement;
        if (page) {
            page.scrollTop = top;
        }

    },


    /**
     * 如果是涉及到鼠标点击确定位置相对比较简单，获取到鼠标点击事件后，事件screenX，screenY获取的是点击位置相对于屏幕的左边距与上边距，不考虑iframe因素，不同游览器下表现的还算一致。
     * @param {事件} event 
     */
    getMousePositionByScreen(event) {
        var e = event || window.event;
        return {'x': e.screenX, 'y': e.screenY}
    },

    /**
     * 相对于浏览器窗口
     * 简单代码即可实现，然而这时还不够，因为绝大多数情况下我们希望获取鼠标点击位置相对于游览器窗口的坐标，event的clientX，clientY属性分别表示鼠标点击位置相对于文档的左边距，上边距。
     * @param {*} event 
     */
    getMousePointByBrowser(event) {
        var e = event || window.event;
        return {'x': e.clientX, 'y': e.clientY}
    },

    /**
     * 相对于文档
     * clientX与clientY是获取相对于当前屏幕的坐标，忽略了页面滚动因素，这在很多环境下很有用，但当我们需要考虑页面滚动，也就是相对于文档（body元素）的坐标时怎么办呢？只要加上滚动的位移就可以了。
     * @param {*} event 
     */
    getMousePointByDocument(event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        return {'x': x, 'y': y};
    },

    /**
     * 取窗口可视范围的高度
     */
    getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    },

    /**
     * 取窗口滚动条高度
     */
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    /**
     * 取文档内容实际高度
     */
    getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },

    /**
     * 小球抛物线运动
     * @param {开始位置元素的class或者id} startEle 
     * @param {运动图片元素的class或者id} imgEle 
     * @param {运动图片元素的地址} imgUrl 
     * @param {结束位置元素的class或者id} endEle 
     */
    flyBallEffect(startEle, endEle, imgEle, imgUrl) {
        var _intervalId = null;
        clearInterval(_intervalId);

        var flyBall = document.querySelector(startEle);

        var flyImg = document.querySelector(imgEle);
        if (imgUrl && imgUrl.length > 0) {
            flyImg.setAttribute('src', imgUrl);
        }

        var screenPoint = this.getMousePositionByScreen(event);

        let yReduceNum = 100; // 开始位置要往上挪90像素，这样看起来就像从加入购物车按钮中飞出一样

        // 设置球的开始飞的坐标，直接读取的是鼠标坐标，因为球用的是fixed定位
        flyBall.style.display = 'block';
        flyBall.style.left = screenPoint.x + 'px';
        flyBall.style.top = screenPoint.y - yReduceNum + 'px';

        // 获取到最终飞向元素的坐标
        var endCartElem = document.querySelector(endEle);
        var endPosition = this.getPosition(endCartElem);

        var x1 = screenPoint.x;
        var y1 = screenPoint.y - yReduceNum;

        var x2 = endPosition.left;
        var y2 = endPosition.top;

        var count = 0;

        var a = 0.0011;
        var b = (y2 - y1 - a * (x2 - x1) * (x2 - x1)) / (x2 - x1);

        _intervalId = setInterval(() => {
            count += 12;
            var x = count * 2 + 5;
            var y = a * x * x + b * x;

            flyBall.style.display = 'block';
            flyBall.style.left = x1 + x + "px";
            flyBall.style.top = y1 + y + "px";

            var flyBallPosition = this.getPosition(flyBall);

            if (flyBallPosition.left >= x2) {
                flyBall.style.display = 'none';
                clearInterval(_intervalId);
            }
        }, 30)
    },


    /** 
       * 参数说明：
       * number：要格式化的数字
       * decimals：保留几位小数
       * dec_point：小数点符号
       * thousands_sep：千分位符号
    * */
    numberFormat(number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },
}
export default Utils;