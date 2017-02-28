/**
 * desc:自己实现一个Promise(遵从Promise/A+规范)
 * author:SunShinewyf
 * date:2017-02-28
 */
//promise 构造函数接收一个函数为参数，该函数有resolve，reject两个参数
//promise的使用
var promise = new Promise(function (resolve, reject) {

})

/**
 *promise构造函数的实现,成员属性如下：
 * state：标识promise的状态，有如下三种：pending,fulfilled,rejected
 * _resolveCallback = [] promise对象的fulfilled的执行回调队列
 * _rejectCallback = [] promise对象的reject的执行回调队列
 * value: 当前promise对象的值
 * 
*/
function Promise(execute, value, state) {
    this.state = state || 'pending';
    this._resolveCallback = [];
    this._rejectCallback = [];
    this.value = value || null;



    try {
        execute && execute(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
        that.reject(e)
    }
}

Promise.prototype = {
    resolve: function (value) {

    }
}

function resolvePromise(promise, value, resolve, reject) {
    var then
    var isThenCalledOrThrow = false //标识then方法是否被调用过

    if (promise === value) {  //判断传进来的promise是否是当前的promise
        return reject(new TypeError('the promise arg is same with current promise'))
    } else if (value instanceof Promise) {
        if (value && value.state === 'pending') {  //如果传进来的是promise对象并且状态为pending，则调用该promise对象的then方法
            value.then(function (v) {
                resolvePromise(promise, v, resolve, reject)
            }, reject)
        } else {
            value.then(resolve, reject)
        }
        return
    }

    if (!value && (typeof value === 'object') || (typeof value === 'function')) {
        try {
            then = value.then
            if (typeof then === 'function') {   //判断是否是一个promise对象：含有then函数作为成员函数的对象
                then.call(value, function rs(y) {  //调用then函数，并把resolve和reject作为参数传入
                    if (isThenCalledOrThrow) return
                    isThenCalledOrThrow = true
                    return resolvePromise(promise, value, resolve, reject)
                }, function rj(r) {
                    if (isThenCalledOrThrow) return
                    isThenCalledOrThrow = true;
                    return reject(r)
                })
            }
        } catch (e) {
            if (isThenCalledOrThrow) return
            isThenCalledOrThrow = true
            return reject(e)
        }
    } else {
        resolve(value)
    }
}