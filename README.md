###
this repository is about a test of promise and the source code about promise which is built by myself

在研究过程中，总结promise中的几个易错点:
(1)在```then```中如果不返回```promise```对象或者不```throw```出一个错误对象，也就是如果没有任何返回，则默认返回```undefined```,则后面的```then```中的回调函数接收到的将是```undefined```.
后面的都将是```undefined```，例如下面的例子:
```javascript
    asyncFun1().then(function(data1){
        asyncFunc2(data1)
    }).then(function(data2){
        asyncFunc3(data2)
    }).then(res=>console.log(res))
```
上面的例子中由于```then```里面的回调函数没有返回任何信息，那么传给后面的```then```就是```undefined```,上面的例子最好改为如下：
```javascript
   asyncFun1().then(function(data1){
        return asyncFunc2(data1)
    }).then(function(data2){
        return asyncFunc3(data2)
    }).then(res=>console.log(res))
```
(2)缺少```catch```
如果在```promise```的链式调用里面缺少```catch```,那么如果在中间某个环节发生错误，将不会被捕获，也就是控制台将看不到任何错误，不利于调试错误，定位问题，上面的例子就是典型的这样，可以改成下面这样:
```javascript
    asyncFun1().then(function(data1){
        return asyncFunc2(data1)
    }).then(function(data2){
        return asyncFunc3(data2)
    }).then(res=>console.log(res))
    .catch(err=>console.log(err))
```
(3)```catch```与```then(null,fn)```之间的差异
catch其实是```then(null,fn)```的一种语法糖实现，但是两者并不等价，例如：
```javascript
   asyncFun1().then(function(data){
       throw new Error('hava an error')
   }).catch(function(err){
       //捕获到错误 Error('hava an error')
   })
  
  asyncFun1().then(function(data){
      throw new Error('hava an Error');
  },function(res){
      //此时捕获不到错误 Error('have an Error')
  })
```
也就是```then```里面的```reject```回调函数不会处理```resolve```回调函数里面抛出的错误