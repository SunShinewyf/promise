// let promise1 = new Promise((resolve, reject) => {
//     resolve('promise1');
// })

// let promise2 = new Promise((resolve, reject) => {
//     resolve('promise2');
// })

// Promise.race([promise1, promise2]).then((res) => {
//     console.log('promise-race', res);
// }).catch((err) => {
//     console.log('err', err);
// })


let promise = new Promise((resolve, reject) => {
    resolve('haha');
})

let a = promise.then();
console.log(a);
a.then((res) => {
    console.log(res);
})