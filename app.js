const express = require("express");
const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose")
require("dotenv").config();
const useRouter = require("./routes/user")
var cors = require("cors")

const app = express();
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use("/api",useRouter)

app.get("/", (req,res) => {
    res.send("WELCOME TO MY API");
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("conected to the database"))
    .catch((error) => console.error(error))

app.listen(port,()=>console.log("server connected, listening to",port))