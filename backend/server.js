const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5173',credentials: true}))
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app is running on port "+process.env.PORT);
})