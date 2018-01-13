let promise = new Promise((resolve, reject) => {
    resolve('catch demo')
});


// promise.then((res) => {
//     console.log('resolve', res);
// }).catch((err) => {
//     console.log('err', err);
// })

// //上面等同于
// promise.then((res) => {
//     console.log('resolve', res);
// }).then(null, (err) => {
//     console.log('err', err);
// })

//------------------
//------------------
//promise中的错误冒泡机制，可以一直往后传递到最后的那个catch中
// promise.then((res) => {
//     console.log('resolve', res);
// }).then((res2) => {
//     throw Error('err');
// }).catch((err) => {
//     console.log('err', err);
// })


//--------------------
//--------------------
//promise中的catch返回一个promise实例，可以继续调用then或者catch方法
promise.then((res) => {
    console.log('resolve', res);
    return 11;
}).then((res2) => {
    console.log('then2',res2)
    return 22;
}).catch((err) => {
    console.log('err', err);
}).then((res3)=>{
    console.log('then3',res3);
})

//打印出
// resolve catch demo
// then2 11
// then3 22
