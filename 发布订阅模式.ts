

//发布订阅模式
//把需要做的事放到一个数组中，等会儿事情发生了让订阅的事依次执行

declare function require(string):any;
const fs = require('fs'); // 可以读取文件

interface events{
    arr:Array<Function>,
    on(fn:Function):void,
    emit():void
}
let events:events = {
    arr:[],//[fn,fn]
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach(fn => fn());
    }
}
interface IPerson {
    age:number,
    name:string
}
let person = {} as IPerson;
events.on(()=>{
    if(Object.keys(person).length==2){
        console.log(person)
    }
})
events.on(()=>{
    console.log('触发一次')
})

fs.readFile('./name.txt','utf8',(err,data)=>{
    // console.log(data)
    person.name = data;
    events.emit()
})
fs.readFile('./age.txt','utf8',(err,data)=>{
    // console.log(data)
    person.age = data;
    events.emit()
})

export {}



