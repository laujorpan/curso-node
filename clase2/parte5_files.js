const fs = require('fs')

//Async reading and writing file
console.log('--------------------------')
fs.readFile('clase4.js','utf-8',(error, content) => {
    if(error){
        console.error('Error '+ error )
    }else{
        console.log('OK Content: '+ content)

        fs.writeFile('copy-clase4.js',content, (error) => {
            if(error){
                console.error('Error '+ error )
            }else{
                console.log('OK Content: '+ content)
            }
        })
    }
})


//Same synchronous example
/*
console.log('--------------------------')
let content2= fs.readFileSync('clase4.js','utf-8');
console.log('OK Content2: '+content2)
*/
