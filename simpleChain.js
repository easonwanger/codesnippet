//chain method with customized delay


function myChain(name){
    return new CM(name)
}

function CM(name){

    this.name = name
    this.handlers = []
        
    Promise.resolve().then(()=>this.buildUp())

    this.projectFunc(function(){
        console.log(`I am ${name}`)
    })



}

CM.prototype.sleep = function(t){

    return this.projectFunc(function(){
        return new Promise(function(rs,rj){
            setTimeout(function(){
                console.log(`sleep ${t}s`)
                rs();
    
            },t)
        })
    }) 

}


CM.prototype.eat = function(sth){

    return this.projectFunc(function(){
        console.log(`eat ${sth}`)
    }) 

}

CM.prototype.sleepFirst = function(t){

    return this.projectFunc(function(){
        return new Promise(function(rs,rj){
            console.log('begin sleep first')
            setTimeout(function(){                
                rs();
    
            },t)
        }).then(function(){
            console.log(`wake up after sleep first ${t}s`)
        })
    },true) 

}

CM.prototype.projectFunc = function(fn,elevate){
    let that  = this
    that.order  = that.order || 1
    let wrapper = function(){
        let r = fn()
        if(r instanceof Promise){
            return r
        }
    }
    this.handlers.push({wrapper:wrapper,elevate:elevate,order:that.order})
    that.order++

    return that


}

CM.prototype.buildUp = function(){
    
    let promise = Promise.resolve()
    this.handlers.filter(p=>p.elevate).forEach(p=>{
        promise  = promise.then(p.wrapper)
    })
    this.handlers.filter(p=>!p.elevate).forEach(p=>{
        promise  = promise.then(p.wrapper)
    })
   


}

//myChain('Tom').sleepFirst(5000).eat('supper')
myChain('Tom').sleep(5000).eat('breakfasgt')