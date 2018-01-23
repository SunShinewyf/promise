//promise 并行的场景

getPromiseArr()
    .then((arr) => {
        return Promise.all(arr);
    })
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log('err', err);
    })