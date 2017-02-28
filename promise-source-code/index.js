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

    function resolve(value) {
        if (value instanceof Promie) {
            return value.then(resolve, reject);
        }

        setTimeout(function () {
            if (this.state === 'pending') {
                this.state = 'resolved';
                this.value = value;
                for (var i = 0; i < this._resolveCallback.length; i++) {
                    this._resolveCallback[i](value)
                }
            }
        })
    }

    function reject(reason) {
        setTimeout(function () {
            if (this.state === 'pending') {
                this.state = 'reject';
                this.data = reason;
                for (var i = 0; i < this._rejectCallback.length; i++) {
                    this._rejectCallback[i](reason)
                }
            }
        })
    }

    try {
        execute && execute(resolve, reject)
    } catch (e) {
        that.reject(e)
    }
}

Promise.prototype.then = function (resolve, reject) {
    var self = this;
    var promise2;
    resolve = typeof resolve === 'function' ? resolve : function (v) {
        return v;
    }
    reject = typeof reject === 'function' ? reject : function (j) {
        throw j
    }

    if (self.state === 'resolved') {
        return promise2 = new Promise(function (onResolve, onReject) {
            setTimeout(function () {
                try {
                    var x = resolve(self.value)
                    resolvePromise(promise2, value, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (self.state === 'rejected') {
        return promise2 = new Promise(function (onResolve, onReject) {
            setTimeout(function () {
                try {
                    var x = reject(self.value)
                    resolvePromise(promise2, value, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (self.state === 'pending') {
        return promise2 = new Promise(function (onResolve, onReject) {
            self._resolveCallback.push(function (value) {
                try {
                    var x = resolve(value);
                    resolvePromise(promise2, value, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
            self._rejectCallback.push(function (reason) {
                try {
                    var x = reject(value);
                    resolvePromise(promise2, value, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
        })
    }
}


Promise.prototype.catch = function (onReject) {
    return this.then(null, onReject)
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