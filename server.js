const express = require("express");

const app = express();

app.use(express.json());

const {connection} = require("./db");

const auth = require("./middlewear/auth")

const userRouter = require("./route/userRoute");
const bookRouter = require("./route/bookRoute");
const orderRouter = require("./route/orderRoute")


app.use("/api", userRouter)


app.use("/book", bookRouter)

app.use(auth)

app.use("/api", orderRouter)



app.get("/",(req,res) =>{
    res.send("this is home page");
})


app.listen(5050, async()=>{
try {
    await connection
     console.log("connected to the atlas data base!!!!!!")
} catch (error) {
    console.log(error)
}
console.log(`Server runs on port 5050`)
}
)