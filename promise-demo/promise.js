//同步resolve 
// var promise1 = new Promise((resolve, reject) => {
//     resolve('this is the resolve of promise1');
// }).then((msg) => {
//     console.log(msg)
// }, (err) => {
//     console.log(err)
// })


//同步reject
// var promise2 = new Promise((resolve, reject) => {
//     reject('this is the reject of promise2')
// }).then((msg) => {
//     console.log(msg)
// }, (err) => {
//     console.log(err)
// })

//同步catch
// var promise3 = new Promise((resolve, reject) => {
//     reject('this is the reject of promise3');
// }).then((msg) => {
//     console.log(msg);
// }).catch((err) => {
//     console.log(err)
// })

// //异步resolve
// var promise4 = new Promise((resolve, reject) => {
//     var promise4_1 = new Promise((resolve, reject) => {
//         console.log('the beginning of promise4_1');
//         setTimeout(() => {
//             resolve('this is the resolve of promise4_1')
//         }, 2000)
//     })
//     resolve(promise4_1)
// }).then((msg) => {
//     console.log(msg);
// }, (err) => {
//     console.log(err)
// })

//链式resolve
// var promise5 = new Promise((resolve, reject) => {
//     var promise5_1 = new Promise((resolve, reject) => {
//         console.log('the beginning of promise5_1');
//         setTimeout(() => {
//             resolve('this is the resolve of promise5_1')
//         }, 2000)
//     });
//     resolve(promise5_1)
// }).then((msg) => {
//     console.log(msg);
//     var promise5_2 = new Promise((resolve, reject) => {
//         console.log('the beginning of promise5_2')
//         setTimeout(() => {
//             resolve('this is the resolve of promise5_2')
//         }, 2000)
//     });
//     resolve(promise5_2)
// }).then((msg) => {
//     console.log(msg);
//     throw new Error();
// }).catch(() => {
//     console.log('oop')
// })

//并行+链式promise
var promise6 = new Promise((resolve, reject) => {
    var promiseArr = [];
    for (var i = 0; i < 5; ++i) {
        promiseArr.push(new Promise((resolve, reject) => {
            console.log(`promise_${i} starts`);
            ((index) => {
                setTimeout(() => {
                    console.log(`before promise6_${index} resolved`);
                    resolve(`this is promise6_${index} resolve`);
                }, index * 1000);
            })(i);
        }))
    }
    resolve(Promise.all(promiseArr));
}).then((msgArr) => {
    console.log(`resolve ${msgArr}`)
})