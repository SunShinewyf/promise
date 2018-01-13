// let promise1 = new Promise((resolve, reject) => {
//     resolve('promise1');
// })

// let promise2 = new Promise((resolve, reject) => {
//     resolve('promise2');
// })

// Promise.all([promise1, promise2]).then((res) => {
//     console.log('promise-all', res)
// }).catch((err) => {
//     console.log('err', err);
// })

//打印出

// ------------------
// ------------------
//如果数组中的promise对象有自身的catch方法，则不会再调用promise.all的catch来捕获错误
let promise1 = new Promise((resolve, reject) => {
    resolve('promise1');
})


let promise2 = new Promise((resolve, reject) => {
    reject(1);
}).catch((err) => {
    console.log('promise2-err', err);
})

Promise.all([promise1, promise2]).then((res) => {
    console.log('promise-all', res)
}, (err) => {
    console.log(err, 'promise-all');
})