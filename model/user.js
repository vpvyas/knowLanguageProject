const mongoose = require("mongoose");
main().then(()=>{
    console.log("connected successfully");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/knowlanguage");
}
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:[{
        type:String
    }]
})

module.exports=mongoose.model("User",userSchema);