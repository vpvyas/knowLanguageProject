const express = require("express");
const app = express();
const path = require("path");
const user=require("./model/user.js")
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));//for implementing post request 

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/user",wrapAsync(async(req,res,next)=>{
    let result=await user.find({});
    if(result){ 
        console.log(result);
        res.render("seedetails.ejs",{result});
    }
    else{
        next(new ExpressError(404, "User could not be found"));
    }
}))
app.post("/user",wrapAsync(async(req,res)=>{
    let {name,subject}=req.body;
     let user1=new user({
        name,
        subject
     })
     await user1.save();
     console.log("created suceessfully")
     res.redirect("/user")
}))
app.use((err,req,res,next)=>{
    let {message="something went wrong",status=404}=err;
    res.status(status).send(`${message}`)
})
app.listen(8080, () => {
    console.log("server started ..");
});
