// //then的用法
// let promise = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let num = Math.ceil(Math.random() * 10);
//             if (num <= 3) {
//                 resolve(num);
//             } else {
//                 reject('数字大于3了');
//             }

//         }, 1000)
//     })
// }

// promise().then((res) => {
//     console.log('resolve', res);
// }, (err) => {
//     console.log('reject', err);
// })

// //demo2 pending状态没有任何改变，就不会进入到then的任何一个回调中

// let promise = function () {
//     return new Promise((resolve, reject) => {
//         console.log('I am pending');
//     })
// }

// promise().then((res) => {
//     console.log('resolve', res);
// }, (err) => {
//     console.log('reject', err);
// })


//demo3 then中的回调中不返回数据时会获取不到值
// let promise = new Promise((resolve, reject) => {
//     resolve('promise')
// })


// promise.then(function () {
//     //dosomething
// }).then((res) => {
//     console.log(res)
// })

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)