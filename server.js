const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    } catch (error) {
        console.log(err);
    }
}

dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cookieParser())
app.use(cors({origin: 'https://blog-website-frontend-sid.vercel.app',credentials: true}))
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);


const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{

    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app is running on port "+process.env.PORT);
})