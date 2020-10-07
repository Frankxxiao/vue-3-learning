
/**
 * 简单写一个简化版本的 reactive / computed
 */

 
let targetMap = new WeakMap() // 存储所有reactive, 所有 key 对应的依赖
// {
//   target1: {
//     key: [effect1, effect2]
//   },
//   target2: {
//     key: [effect3, effect4]
//   }
// }

// 实际情况下可能存在多个副作用,因此通过一个数组来存放
const effectStack = []
//设置当前处于激活状态的 effect
let activeEffect
function track (target, key) {
  // 收集依赖
  // reactive 可能会有多个，一个又有 N 个属性key
  if(activeEffect){
    let depMap = targetMap.get(target)
    if(!depMap){
      // 创建新存储空间
      depMap = new Map()
      targetMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if(!dep){
      dep = new Set()
      depMap.set(key, dep)
    }
    // 添加依赖
    dep.add(activeEffect)
  }
}

function trigger (target, key, info) {
  // 触发更新
  let depMap = targetMap.get(target)
  if(!depMap) return
  const effects = new Set()
  const computedRunners = new Set()

  if(key){
    let deps = depMap.get(key)
    deps.forEach(effect => {
      if(effect.computed){
        computedRunners.add(effect)
      }else{
        effects.add(effect)
      }
    });
  }

  computedRunners.forEach(computed=>computed());
  effects.forEach(effect => effect())
}

const baseHandler = {
  get(target, key){
    // 这里使用 Reflect
    const res = target[key]
    track(target, key)
    return res
  },
  set(target, key, val){
    target[key] = val // 使用 Reflect.set 
    trigger(target, key)
  }
}

function reactive (target) {
  // 将数据变成响应式
  const observerd = new Proxy(target, baseHandler)
  return observerd
}

// computed 是一个特殊的 effectWatch
function computed (fn) {
  const runner = effectWatch(fn, {computed:true, lazy: true});
  return {
    effect: runner,
    get value(){
      return runner()
    }
  }
}

function effectWatch (fn, options={}) {
  
  let e = createReactiveEffect(fn, options)
  if(!options.lazy){
    e();
  }
  return e;
}
function createReactiveEffect(fn, options) {
  // 将副作用函数包一层，并且与 effectStack 关联起来
  const effect = function reactiveEffect(...args){
    if(effectStack.indexOf(effect) === -1){
      try{
        effectStack.push(effect)
        activeEffect = effect
        return fn(...args)
      }finally{
        // 维护栈信息
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  // 这些属性可以看做是更近一步的优化过程，为了应用更广泛
  effect.computed = options.computed
  effect.lazy = options.lazy
  return effect
}

