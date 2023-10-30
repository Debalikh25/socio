const mongoose = require('mongoose')

const dbConnect  = async ()=> {
    try{
         const db  = await mongoose.connect('mongodb://0.0.0.0:27017/codeialDB')
         console.log('Database Connection Established !!')
         return db
    }
    catch(err){
        console.log(`Error Occured: ${err}`)
    }
}

module.exports = dbConnect