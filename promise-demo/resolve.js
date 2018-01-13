//demo1.js  Promise状态从pending状态变为fullfilled状态

function createRequest(url) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = handler;
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });

    return promise;
};

createRequest('youUrl').then((data) => {
    //do something;
}, (err) => {
    //err handler
})



//demo2.js
//同步resolve 
var promise1 = new Promise((resolve, reject) => {
    resolve('this is the resolve of promise1');
}).then((msg) => {
    console.log(msg)
}, (err) => {
    console.log(err)
})


//异步resolve
var promise4 = new Promise((resolve, reject) => {
    var promise4_1 = new Promise((resolve, reject) => {
        console.log('the beginning of promise4_1');
        setTimeout(() => {
            resolve('this is the resolve of promise4_1')
        }, 2000)
    })
    resolve(promise4_1)
}).then((msg) => {
    console.log(msg);
}, (err) => {
    console.log(err)
})

// 链式resolve
var promise5 = new Promise((resolve, reject) => {
    var promise5_1 = new Promise((resolve, reject) => {
        console.log('the beginning of promise5_1');
        setTimeout(() => {
            resolve('this is the resolve of promise5_1')
        }, 2000)
    });
    resolve(promise5_1)
}).then((msg) => {
    console.log(msg);
    var promise5_2 = new Promise((resolve, reject) => {
        console.log('the beginning of promise5_2')
        setTimeout(() => {
            resolve('this is the resolve of promise5_2')
        }, 2000)
    });
    resolve(promise5_2)
}).then((msg) => {
    console.log(msg);
    throw new Error();
}).catch(() => {
    console.log('oop')
})
