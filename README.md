
# bs-store

## install

``` bash
npm i bs-store -S
```

## use example

``` js
import bsStore, {getSessionSize, getLocalSize} from 'bs-store'

// 设置 sessionStorage
bsStore.setSession(key: string, val: number | boolean | string | object | bigint)

// 获取 sessionStorage
bsStore.getSession(key: string)

// 设置 localStorage
bsStore.setLocal(key: stirng, val: number | boolean | string | object |bigint)

// 获取 localStorage
bsStore.getLocal(key: string)

// 删除某个sessionStorage
bsStore.removeSession(key: string)
// 删除某个localStorage
bsStore.removeLocal(key: string)

// 删除所有 sessionStorage
bsStore.removeAllSession()
// 删除所有 localStorage
bsStore.removeAllLocal()

// 删除所有的 sessionStorage 和 localSorage
bsStore.removeAllStorage()

// 获取sessionStorage 已存数据大小
getSessionSize()

// 获取localStorage 已存数据大小
getLocalSize()
```
