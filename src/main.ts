import Store,{getSessionSize, getLocalSize} from './local_store'

const bsStore: Store = new Store()

export default bsStore
export {
  getSessionSize,
  getLocalSize
}

