import Store,{getSessionSize, getLocalSize} from './local_store'
interface bsType extends Store{
  compress?: boolean,
}
const bsStore: bsType = new Store()
bsStore.compress = Store.compress
export default bsStore
export {
  getSessionSize,
  getLocalSize
}

