const express= require('express');
const cors= require('cors');
const cookieParser= require("cookie-parser");
const userroute= require('./routes/userRoutes');
const app= express();

//middlewares for handeling the urls
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use('/api',userroute);

const userRouter =require('./routes/user.Route');

app.use("/api/v1/users", userRouter)



module.exports = app;







