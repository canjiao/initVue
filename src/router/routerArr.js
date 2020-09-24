console.log(process.env.NODE_ENV)

import common from './modules/common'
import user from './modules/user'


export const routerArr = [
    ...common,
    ...user
]
