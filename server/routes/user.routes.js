const express = require("express");

const Auth = require("../controllers/auth.controller.js");
const Art = require("../controllers/art.controller.js");
//! router
const apiUser = express.Router();

apiUser.post("/updateinfo", Auth.UpdatePersonalInformation);
apiUser.post("/changepass", Auth.ChangeThePassword);
module.exports = apiUser;
