require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const AuthMiddleware = require("./middlewares/AuthMidleware.js");
const apiRoute = require("./routes/api.js");

const docsRoutes = require("./routes/apidocs.routes.js");
const artRoutes = require("./routes/apiArt.routes.js");
const authRoutes = require("./routes/apiAuth.routes.js");

const admin = require("./routes/admin.routes.js");
const user = require("./routes/user.routes.js");

// Database Connection
connection();
// dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes for admin
app.use("/admin/", admin);
//Router login and register
app.use("/api/", apiRoute);
//Router handler for user model
app.use("/user/", AuthMiddleware, user);
//Router handler for articles model
app.use("/apiart/", AuthMiddleware, artRoutes);
//Router handler for docs model
app.use("/apidocs/", AuthMiddleware, docsRoutes);

//Server runing
//router 
app.use("/apiauth/", AuthMiddleware, authRoutes);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`
  \x1b[46m******************************************************* \x1b[0;30m
  \x1b[46m******************** SERVER RUNING ******************** \x1b[0;30m
  \x1b[46m**********************\x1b[0;32m PORT ${PORT} \x1b[46m********************** \x1b[0;30m
  \x1b[46m******************************************************* \x1b[0;30m
  \x1b[0;30m
  `)
  // console.log(``)
);

app.get("/", (req, res) => {
  res.send(`
 <iframe height="100%" width="100%" frameborder="0" src="https://www.tronghiencp.tk/" />  `);
});
