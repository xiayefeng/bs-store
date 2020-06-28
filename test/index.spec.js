import bsStore from '../src/main'

describe('test sessionStorage', () => {
  it('set sessionStorage object', () => {
    bsStore.setSession('myKey', {a: 1, b: '2'})
    expect(sessionStorage.getItem('myKey')).toBe('{"a":1,"b":"2"}')
    expect(bsStore.getSession('myKey')).toEqual({a: 1, b: '2'})
  })
  it('set sessionStorage number', () => {
    bsStore.setSession('myNumber', 256333)
    expect(sessionStorage.getItem('myNumber')).toBe('256333')
    expect(bsStore.getSession('myNumber')).toBe(256333)
  })
  it('set sessionStorage string', () => {
    bsStore.setSession('myStr', 'dadfasf')
    expect(sessionStorage.getItem('myStr').includes('dadfasf')).toBeTruthy()
    expect(bsStore.getSession('myStr')).toBe('dadfasf')
    // expect(bsStore.getSession('myStr2')).toBeNull()
  })
  it('set sessionStorage boolean', () => {
    bsStore.setSession('myBoolean', true)
    expect(sessionStorage.getItem('myBoolean')).toBe('true')
    expect(bsStore.getSession('myBoolean')).toBeTruthy()
    bsStore.setSession('boolean2', false)
    expect(bsStore.getSession('boolean2')).toBe(false)
  })
  it('set sessionStorage array', () => {
    let arr = [1, 2, 3]
    bsStore.setSession('testArr', arr)
    expect(bsStore.getSession('testArr')).toEqual(arr)
    expect(sessionStorage.getItem('testArr')).toBe(JSON.stringify(arr))
  })
})

describe('test localStorage', () => {
  it('set localStorage object', () => {
    let obj = {a: 'asdfasdf', b: false, c: 636966333}
    bsStore.setLocal('testObj', obj)
    expect(bsStore.getLocal('testObj')).toEqual(obj)
    expect(localStorage.getItem('testObj')).toBe(JSON.stringify(obj))
  })
  it('set localStorage number', () => {
    let num = 9893333
    bsStore.setLocal('testNum', num)
    expect(bsStore.getLocal('testNum')).toBe(num)
    expect(localStorage.getItem('testNum')).toBe(String(num))
  })
  it('set localStorage string', () => {
    let str = 'asfdasfasfd'
    bsStore.setLocal('testStr', str)
    expect(bsStore.getLocal('testStr')).toBe(str)
    // expect(bsStore.getLocal('testStr2')).toBeNull()
  })
  it('set localStorage boolean', () => {
    let isEnd = false
    bsStore.setLocal('testBool', isEnd)
    expect(bsStore.getLocal('testBool')).toBe(false)
  })
  it('set localStorage array', () => {
    let arr = [1, 2, 3]
    bsStore.setLocal('testArr', arr)
    expect(bsStore.getLocal('testArr')).toEqual(arr)
    expect(localStorage.getItem('testArr')).toBe(JSON.stringify(arr))
  })
})