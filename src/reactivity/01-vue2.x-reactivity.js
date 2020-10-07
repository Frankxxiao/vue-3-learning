
/**
 * 用 vue2 的方式来复现 vue3 的 ref 过程
 * 可以作为一种对比学习
 */
let activeWatcher;

// 依赖中心
class Dep {
  constructor(){
    this.subs = new Set();
  }
  
  // 收集依赖
  depend(){
    if(!activeWatcher) return;
    this.subs.add(activeWatcher);
  }

  // 数据变化，触发更新操作
  notify(){
    this.subs.forEach(effect => effect());
  }
}
let dep = new Dep();

let ref = function(value){
  let _value = value;
  let state = {
    get value(){
      dep.depend();
      return _value;
    },
    set value(val){
      _value = val;
      dep.notify();
    }
  }
  return state;
}

let effectWatch = function(fn){
  activeWatcher = fn;
}

let count = ref(0);

effectWatch(()=>{
  console.log("the value is : ", count.value)
})

setInterval(()=>count.value++, 1000)



