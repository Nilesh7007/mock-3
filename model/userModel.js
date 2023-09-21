const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
  
},{
    versionKey:false
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


// {
//     "name" : "nilesh",
//     "email" : "n@gmail.com",
//     "password": "1234n", 
//     "isAdmin" : false
// }