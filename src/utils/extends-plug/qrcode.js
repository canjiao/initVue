//生成二维码

/**
* @module qrcode
* @author: lc
* @description: 描述
* @since: 2020-10-15 15:02:14

"qrcode": "^1.4.4",
官网链接：
    https://github.com/soldair/node-qrcode
使用示例：
    <img id="qrcode" src=""></img>

    import QRCode from "qrcode";
    methods: {
        getQRCode(){
            QRCode.toDataURL('http://www.runoob.com"').then(url => {
                console.log(url)
                document.getElementById("qrcode").src = url;
            })
            .catch(err => {
                console.error(err)
            })
        }
    }   


"qrcodejs2": "^0.0.2",
官网链接：
    https://github.com/davidshimjs/qrcodejs#readme
使用示例：
    <div id="qrcode"></div>

    import QRCode from "qrcodejs2";
    methods: {
        getQRCode(){
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: "http://jindo.dev.naver.com/collie",
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }
    }
*/