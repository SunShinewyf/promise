//异步串行有关联并且已知长度的promise例子
let rp = require('request-promise');

let taskA = new Promise((resolve, reject) => {
    rp(urlA).then((res) => {
        resolve(res)
    })
})

taskA().then((res1) => {
    return taskB(res1)
}).then((res2) => {
    return taskC(res2)
}).then((res3) => {
    console.log(res3);
}).catch((err) => {
    console.log('err', err)
})

//相同场景
let promise = new Promise((resolve,reject)=>{
    resolve();
})

promise().then(()=>{
    $.ajax({
        url: 'aUrl',
        type: 'get',
        success:function(res){
            return(res);
        }
    })
}).then((res)=>{
    $.ajax({
        url: 'bUrl',
        type: 'get',
        data: res,
        success: function(res){
            return(res)
        }
    })
}).then((res)=>{
    //do something
})
//异步串行有关联并且未知长度的promise例子


function eachTask(offset) {
    let option = {
        url: 'yourUrl',
        offset: offset,
        count: 30
    }

    return new Promise((resolve, reject) => {
        rp(option).then(function (res) {
            resolve(res);
        })
    })
}

let list = [];
const allTask = (offset = 0) => eachTask(offset).then(res => {
    res && (list = list.concat(res.data));
    if (res.nextOffset && res.nextOffset != -1) {
        return eachTask(res.nextOffset);
    } else {
        return Promise.resolve(list);
    }
})


allTask(0).then(res => {
    console.log(res)
}).catch((err) => {
    console.log('err', err);
})