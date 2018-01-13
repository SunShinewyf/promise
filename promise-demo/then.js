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