const mongoose  =   require("mongoose");
const connectDB =  async ()=>{
    try{
           await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
            console.log('Connection success')
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB;
