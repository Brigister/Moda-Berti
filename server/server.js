const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
/* const MySQLStore = require('express-mysql-session')(session); */

const connectDB = require('./config/mongo');

/* const sessionStore = new MySQLStore({}), pool); */

dotenv.config({ path: "./config/.env" });

connectDB();

const app = express();

app.use(session({
    name: "pippo",
    /* key: process.env.KEY */
    secret: process.env.SECRET,
    /* store: sessionStore, */ //da fare con redis in prod ?
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 31 * 2,  //2mesi
        sameSite: "lax",
        secure: false //true per https
    }
}))

const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: true,
    maxAge: 600,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//require routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const descriptionRouter = require('./routes/descriptions');
const cartRoute = require('./routes/cart');
const stripeRoute = require('./routes/stripe');
const orderRoute = require('./routes/orders');


app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to Moda Berti API</h1>")
});

app.use('/images/products', express.static('images/products'));

//use routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/descriptions', descriptionRouter);
app.use('/api/cart', cartRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/orders', orderRoute);

const PORT = process.env.PORT || 4000
app.listen(4000, console.log(`Server running on port ${PORT}`));