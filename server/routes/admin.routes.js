const express = require("express");

const A = require("../controllers/admin.controller.js");
const Auth = require("../controllers/auth.controller.js");
const Docs = require("../controllers/docs.controller.js");

const admin = express.Router();
// apiDocs.post("/createdoc", Doc.CreateDoc);

//Create Blogs
admin.post("/changeaccess", A.ChangeAccessUser);
admin.get("/chart", A.ChartLine);
admin.get("/statisticsusers", A.StatisticsUsers);
admin.get("/statisticsdocs", A.StatisticsDocs);
admin.get("/statisticsarts", A.StatisticsArts);
admin.get("/pagedocs", A.PaginationDoc);
admin.get("/pagearts", A.PaginationArt);


admin.post("/deletedoc", A.DeleteDoc);
admin.post("/deleteart", A.DeleteArt);
admin.post("/deleteuser", A.DeleteUser);

module.exports = admin;
