const ls = window.localStorage;
const ss = window.sessionStorage;
import Config from './config'
//给存储的key统一加上一个前缀 ，避免重名
let pre =  'zd_'; 

let domain = '';
if (window.location.hostname == 'localhost') {
    domain = window.location.hostname
} else {
    domain = 'zhidianlife.com';
}  



export const Local = {
  get(key) {
    if (pre + key) {
      try {
        return JSON.parse(ls.getItem(pre + key))
      } catch (e) {
        console.error(e);
        return null;
      }

    }

    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ls.setItem(pre + i, JSON.stringify(setting[i]))
      }
    } else {
      ls.setItem(pre + key, JSON.stringify(val))
    }
  },
  remove(key) {
    ls.removeItem(pre + key)
  },
  clear() {
    ls.clear()
  }
};


export const Session = {
  get(key) {
    if (pre + key) return JSON.parse(ss.getItem(pre + key))
    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ss.setItem(pre + i, JSON.stringify(setting[i]))
      }
    } else {
      ss.setItem(pre + key, JSON.stringify(val))
    }
  },
  remove(key) {
    ss.removeItem(pre + key)
  },
  clear() {
    ss.clear()
  }
}

export const Cookie = {
  get(key) {
    let arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].trim().split('=');
        if (arr2[0] == key) {
            return arr2[1];
        }
    }
    return ''
  },
  set(key, value, day=7) {
      let setting = arguments[0]
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
          for (let i in setting) {
              let oDate = new Date()
              oDate.setDate(oDate.getDate() + day)
              document.cookie = i + '=' + setting[i] + ';expires=' + oDate
          }
      } else {
          let oDate = new Date();
          oDate.setDate(oDate.getDate() + day)
          document.cookie = key + '=' + value + ';expires=' + oDate
      }
  },
  remove(key) {
      let setting = arguments[0]
      if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
          setting.forEach(key => {
              this.set(key, 1, -1)
          })
      } else {
          this.set(key, 1, -1)
      }

  }
}