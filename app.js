const express = require('express');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dbConnect = require('./config/dbConnect');
const { notFound, handleError } = require('./middlewares/errorHandler');
const googleRouter = require('./router/googleRouter');
const userRouter = require('./router/userRouter');
const adminRouter = require("./router/adminRouter");
const courseLessonRouter = require('./router/courseLessonRouter');
const courseRouter = require('./router/courseRouter');
const rateLimiter = require("./middlewares/rateLimit")
const passportSetup = require('./config/passportConfig')

const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(rateLimiter)

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 12 * 60 * 60,
    })
}))

app.use(passport.initialize());
app.use(passport.session());
// passportSetup(passport);

app.get("/", (req, res)=>{
    res.send(`<a href="http://localhost:4000/auth/google">Login with google</a>`);
});

app.use('/', googleRouter);
app.use("/api/auth", userRouter);
app.use("/api/user", adminRouter);
app.use("/api/my-course/", courseLessonRouter)
app.use("/api/course", courseRouter);


// // Error Middleware
app.use(notFound);
app.use(handleError);

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});