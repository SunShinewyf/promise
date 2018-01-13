
//同步reject
var promise2 = new Promise((resolve, reject) => {
    reject('this is the reject of promise2')
}).then((msg) => {
    console.log(msg)
}, (err) => {
    console.log(err)
})