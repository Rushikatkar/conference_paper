require('dotenv').config()
const app = require('./app');
const mongoose=require('mongoose');

// const db=`${process.env.MONGODB_URL}`;
const db = `${process.env.MONGODB_URL}`;

    try {
        mongoose.connect(db)
        console.log("connected to mongodb url:"+db);
        app.on("error", (error)=>{
            console.log("ERROR:", error);
            throw error;
        })
       

    } catch (error) {
        console.log("Error", error);
        throw error;
    }



app.listen(process.env.PORT,()=>{
    console.log(`app listening on port ${process.env.PORT}`);
})