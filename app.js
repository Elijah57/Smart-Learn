const express = require('express');
const dotenv = require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./configs/swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const dbConnect = require('./configs/dbConnect');
const { notFound, handleError } = require('./middlewares/error/errorHandler');
const googleRouter = require('./routers/googleRouter');
const userRouter = require('./routers/userRouter');
const adminRouter = require("./routers/adminRouter");
const courseLessonRouter = require('./routers/courseLessonRouter');
const courseRouter = require('./routers/courseRouter');
const rateLimiter = require("./middlewares/rateLimit")
const passportSetup = require('./utils/passport/passportConfig');
const studentRouter = require('./routers/studentRouter');

const app = express();
app.set('trust proxy', false);
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

dbConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(mongoSanitize());
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customSiteTitle: "SmartLearn API Docs"}));
app.get("/", (req, res)=>{
    res.send(`<a href="${HOST}/api-docs">Click Here to view API DOcumentation</a>`);
});

app.use('/', googleRouter);
app.use("/api/auth", userRouter);
app.use("/api/users", studentRouter);
app.use("/api/admin", adminRouter);


app.use("/api/courses", courseRouter);


// // Error Middleware
app.use(notFound);
app.use(handleError);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
});
