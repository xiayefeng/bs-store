
# bs-store

## install

``` bash
npm i bs-store -S
```

## use example

``` js
import bsStore, {getSessionSize, getLocalSize} from 'bs-store'
import lzString from 'bs-store/lz-string'

bsStore.use(lzString) // 开启压缩模式，后同一应用不可再次设定

// 设置 sessionStorage
bsStore.setSession(key: string, val: number|boolean|string|object|[]<any>|bigint)

// 获取 sessionStorage
bsStore.getSession(key: string)

// 设置 localStorage
bsStore.setLocal(key: stirng, val: number|boolean|string|object|[]<any>|bigint)

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

## browser

``` html
<!-- 引入主包 -->
 <script src="https://cdn.jsdelivr.net/npm/bs-store/dist/bs-store.min.js"></script>

 <!-- 按需引入压缩插件 -->
<script src="https://cdn.jsdelivr.net/npm/bs-store/dist/bs-store-lz-string.min.js"></script>

<script>
    var myStore = bsStore.default
    myStore.setSession('key', 'abc')
    myStore.getSession('key')  // 'abc'

    myStore.setLocal('key', 123)
    myStore.getLocal('key') // 123

    // 使用压缩插件
    myStore.use(lzString.default)
</script>

```
