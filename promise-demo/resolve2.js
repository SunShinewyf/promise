//同步catch
var promise3 = new Promise((resolve, reject) => {
    reject('this is the reject of promise3');
}).then((msg) => {
    console.log(msg);
}).catch((err) => {
    console.log(err)
})
