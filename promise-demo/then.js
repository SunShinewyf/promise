//then的用法
let promise = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.ceil(Math.random() * 10);
            if (num <= 3) {
                resolve(num);
            } else {
                reject('数字大于3了');
            }

        }, 1000)
    })
}

promise().then((res) => {
    console.log('resolve', res);
}, (err) => {
    console.log('reject', err);
})

//demo2 pending状态没有任何改变，就不会进入到then的任何一个回调中

let promise = function () {
    return new Promise((resolve, reject) => {
        console.log('I am pending');
    })
}

promise().then((res) => {
    console.log('resolve', res);
}, (err) => {
    console.log('reject', err);
})