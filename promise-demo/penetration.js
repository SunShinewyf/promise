//值穿透，当then中传传入了非Function类型时
// const func1 = function () {
//     return new Promise((resolve, reject) => {
//         resolve('promise1');
//     })
// }

// const func2 = function () {
//     return new Promise((resolve, reject) => {
//         resolve('promise2');
//     })
// }

// func1().then(func2()).then((res) => {
//     console.log(res)
// })

//不会发生值穿透，在then中传入Function类型
// const func1 = function () {
//     return new Promise((resolve, reject) => {
//         resolve('promise1');
//     })
// }

// const func2 = function () {
//     return new Promise((resolve, reject) => {
//         resolve('promise2');
//     })
// }

// func1().then(func2()).then((res) => {
//     console.log(res)
// })


//值穿透，父Promise的状态会改变子Promise的状态
let promise1 = new Promise((resolve, reject) => {
    resolve('promise1');
})

let promise2 = promise1.then();

promise2.then((res) => {
    console.log(res)
})

