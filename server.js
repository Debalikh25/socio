const express = require("express");
const dbConnect = require("./config/db");
const expressEjsLayout = require("express-ejs-layouts");
const rootRouter = require("./routes/root-routes");
const passport = require("passport");
const middleware = require("./middlewares/middleware");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");


const port = process.env.port || 7000;

const app = express();

app.use(expressEjsLayout);
app.set(express.static("assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

dbConnect();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "Codeial",
    secret: "zyxabcDC12",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },

    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/codeialDB",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(middleware.setLoggedInUser);

app.use(flash());

app.use(middleware.setFlash);



app.use("/", rootRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error is : ${err.message}`);
    return;
  }

  console.log(`Server is running on port : ${port}`);
});
