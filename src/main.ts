import Store,{getSessionSize, getLocalSize} from './local_store'
const bsStore: Store = new Store()
console.log(bsStore.version)
export default bsStore
export {
  getSessionSize,
  getLocalSize
}

