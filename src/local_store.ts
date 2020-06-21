
import LZString from 'lz-string'

type myType = string | number | boolean | object | bigint | Array<any> | null;

interface strObject{
  isString2Object: boolean,
  str: string
}
interface nanObject{
  isNaN2Object: boolean,
  num: null
}

interface bigintObject{
  isBigInt2Object: boolean,
  num: string | number
}
export default class BsStore {
  private compress: boolean = false
  
  get pressState(): boolean{
    return this.compress
  }
  set pressState(state: boolean){
     if(this.compress) {
       console.warn('pressState on set once')
       return
     }
     this.compress = state
  }
 
  getSession (key:string): myType|never {
    if (typeof key !== 'string') {
      throw new Error('params must be string')
    }
    let val:any = this.getItem(key)
    if (val === null) {
      console.log(`no exist such ${key} sessionStorage`)
      return null
    }
    let parseVal: myType = null
    try {
      parseVal = JSON.parse(val)
      parseVal = this.checkStr(parseVal)
      parseVal = this.checkNaN(parseVal)
      parseVal = this.checkBigInt(parseVal)
    } catch (err) {
      if (err.message.includes('JSON')) {
        return val
      }
    }
    return parseVal
  }

  getLocal (key: string): myType|never {
    if (typeof key !== 'string') {
      throw new Error('params must be string')
    }
    let val: any = this.getItem(key, 2)
    if (val === null) {
      console.log(`no exist such ${key} 的localStorage`)
      return null
    }
    let parseVal: myType = null
    try {
      parseVal = JSON.parse(val)
      parseVal = this.checkStr(parseVal)
      parseVal = this.checkNaN(parseVal)
      parseVal = this.checkBigInt(parseVal)
    } catch (err) {
      if (err.message.includes('JSON')) {
        return val
      }
    }
    return parseVal
  }

  setSession (key: string, val: myType):void{
    this.setItem(key, val)
  }

  setLocal (key:string, val: myType):void {
    this.setItem(key, val, 2)
  }

  removeSession (key:string):void {
    this.removeItem(key)
  }

  removeLocal (key:string):void {
    this.removeItem(key, 2)
  }

  removeAllSession (): void {
    this.removeAll()
  }

  removeAllLocal ():void {
    this.removeAll(2)
  }

  removeAllStorage ():void {
    this.removeAll(3)
  }

  getItem (key:string, lx:number = 1): myType {
    let val: myType = null
    if (lx === 1) {
      val = sessionStorage.getItem(key)
    } else if (lx === 2) {
      val = localStorage.getItem(key)
    }
    if(val === null) return val
    if(this.compress){
      val = LZString.decompress(val)
    }
    return val
  }

  setItem (key:string, val: myType, lx:number = 1):void {
    if (typeof key !== 'string') {
      throw new Error('Items key params must be string')
    }
    if (typeof val === 'undefined') {
      throw new Error('set value is not defind')
    }
    if (typeof val === 'symbol') {
      throw new Error('value is not support symbol')
    }
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'string') {
      val = JSON.stringify({ str: val, isString2Object: true })
    } else if (Number.isNaN(val)) {
      val = JSON.stringify({ num: null, isNaN2Object: true })
    } else if (typeof val === 'bigint') {
      val = JSON.stringify({ num: String(val), isBigInt2Object: true })
    }
    if(this.compress){
      val = LZString.compress(String(val))
    }
    if (lx === 1) {
      sessionStorage.setItem(key, val as string)
    } else {
      localStorage.setItem(key, val as string)
    }
  }

  removeItem (key: string, lx:number = 1):void {
    if (typeof key !== 'string') {
      throw new Error('Items key params must be string')
    }
    if (lx === 1 && sessionStorage.getItem(key) != null) {
      sessionStorage.removeItem(key)
    } else if (lx === 2 && localStorage.getItem(key) != null) {
      localStorage.removeItem(key)
    }
  }

  removeAll (lx:number = 1) {
    if (lx === 1) {
      sessionStorage.clear()
    } else if (lx === 2) {
      localStorage.clear()
    } else if (lx === 3) {
      sessionStorage.clear()
      localStorage.clear()
    } else {
      throw new Error('param error, param must be one of 1,2,3')
    }
  }
  checkStr (obj: myType): myType {
    let target:myType = obj
    if (this.checkedType(target) === 'Object') {
      if (Reflect.has(target as strObject, 'isString2Object') && (target as strObject).isString2Object) {
        target = (target as strObject).str
      }
    }
    return target
  }
  checkNaN (obj:myType): myType {
    let target: myType = obj
    if (this.checkedType(target) === 'Object') {
      if (Reflect.has(target as nanObject, 'isNaN2Object')) {
        target = NaN
      }
    }
    return target
  }
  checkBigInt (obj: myType): myType {
    let target: myType = obj
    if (this.checkedType(target) === 'Object') {
      if (Reflect.has(target as bigintObject, 'isBigInt2Object')) {
        // eslint-disable-next-line
        target = BigInt((target as bigintObject).num)
      }
    }
    return target
  }
  checkedType (target: myType): string {
    return Object.prototype.toString.call(target).slice(8, -1)
  }
}

export function getSessionSize (): number{
  const arr: Array<string|number|symbol> = Reflect.ownKeys(sessionStorage)
  let num = 0
  for(let item of arr){
      num += sessionStorage.getItem(item as string)!.length
  }
  console.log(`sessionStorage used ${(num / 1024).toFixed(2)}kb`)
  return num
}

export function getLocalSize (): number {
  const arr: Array<string|number|symbol> = Reflect.ownKeys(localStorage)
  let num = 0
  for (let item of arr) {
    num += localStorage.getItem(item as string)!.length
  }
  console.log(`localStorage used ${(num / 1024).toFixed(2)}kb`)
  return num
}
