//已经变为onfulfilled的状态之后不会再变为reject了。
let promise = function () {
    return new Promise((resolve, reject) => {
        resolve(1);
        throw new Error('err');
    })
}

promise().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

