const User = require("../models/User.js");
const Docs = require("../models/docs.models.js");
const Arts = require("../models/arts.models.js");
const { StatusCode } = require("../utils/constants.js");
const { jsonGenerate } = require("../utils/helpers.js");
const { DateNow } = require("../Func/Date.js");

exports.ChangeAccessUser = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findById(_id);
    if (user?.access == "admin") {
      await User.findByIdAndUpdate(_id, { access: "user" });
      return res.json(jsonGenerate(StatusCode.SUCCESS, "user", null));
    } else {
      await User.findByIdAndUpdate(_id, { access: "admin" });
      return res.json(jsonGenerate(StatusCode.SUCCESS, "admin", null));
    }
  } catch (error) {}
};



exports.DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const DocsArr = user?.docs;
    const ArtsArr = user?.articles;
    // result?.docs?.map((i) => {
    //   DocsArr.push(String(i));
    // });

    await Docs.deleteMany({
      _id: { $in: user?.docs },
    });
    await Arts.deleteMany({
      _id: { $in: user?.articles },
    });
    await User?.findByIdAndRemove({ _id: req.body._id });
    // return res.json(result);
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "deleted", { DocsArr, ArtsArr })
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

exports.DeleteDoc = async (req, res) => {
  try {
    const result = await Docs.findOneAndDelete({
      userId: req.body.userId,
      _id: req.body._id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { docs: req.body._id } }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

exports.DeleteArt = async (req, res) => {
  try {
    const result = await Arts.findOneAndDelete({
      userId: req.body.userId,
      _id: req.body._id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { articles: req.body._id } }
      );

      return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", null));
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

// Thống kê user
exports.StatisticsUsers = async (req, res) => {
  try {
    const TUser = await User.find();
    const TotalUser = TUser.length;

    const countsForm = [0, 0, 0]; // Google, Facebook, LRO
    for (let user of TUser) {
      if (user.form === "google") {
        countsForm[0]++;
      } else if (user.form === "facebook") {
        countsForm[1]++;
      } else if (user.form === "LRO") {
        countsForm[2]++;
      }
    }

    const UserHot = TUser.slice(0, 5).sort((a, b) => {
      return b.docs.length - a.docs.length;
    });

    res.json(
      jsonGenerate(StatusCode.SUCCESS, `User Data Succssfully`, {
        TotalUser,
        TUser,
        countsForm,
        UserHot,
      })
    );
  } catch (error) {}
};

exports.StatisticsDocs = async (req, res) => {
  try {
    var today = new Date();
    var day =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var oldday =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const TDocs = await Docs.find();
    const NDocs = await Docs.find({
      $and: [
        {
          date: day,
        },
      ],
    });
    const ODocs = await Docs.find({
      $and: [
        {
          date:
            today.getDate() -
            1 +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getFullYear(),
        },
      ],
    });
    const TotalDoc = TDocs.length;
    const NewDoc = NDocs.length;
    const OldDoc = ODocs.length;
    const TotalViewDoc = TDocs.reduce((total, doc) => total + doc.view, 0);
    const TotalLikeDoc = TDocs.reduce(
      (total, doc) => total + doc.like.length,
      0
    );
    res.json(
      jsonGenerate(StatusCode.SUCCESS, `User Data Succssfully`, {
        TotalDoc,
        NewDoc,
        OldDoc,
        TotalViewDoc,
        TotalLikeDoc,
      })
    );
  } catch (error) {}
};

exports.StatisticsArts = async (req, res) => {
  try {
    var today = new Date();
    var day =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    var oldday =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const TArts = await Arts.find();
    const NArts = await Arts.find({
      $and: [
        {
          date: day,
        },
      ],
    });
    const OArts = await Arts.find({
      $and: [
        {
          date:
            today.getDate() -
            1 +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getFullYear(),
        },
      ],
    });
    const TotalArt = TArts.length;
    const NewArt = NArts.length;
    const OldArt = OArts.length;
    const TotalViewArt = TArts.reduce((total, doc) => total + doc.view, 0);
    const TotalLikeArt = TArts.reduce(
      (total, doc) => total + doc.like.length,
      0
    );
    res.json(
      jsonGenerate(StatusCode.SUCCESS, `User Data Succssfully`, {
        TotalArt,
        NewArt,
        OldArt,
        TotalViewArt,
        TotalLikeArt,
      })
    );
  } catch (error) {}
};

exports.ChartLine = async (req, res) => {
  try {
    const DocArr = [];
    const ArtArr = [];
    const ArrDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const docs = await Docs.find({ date: formattedDate });
      const arts = await Arts.find({ date: formattedDate });
      DocArr.push(docs.length);
      ArtArr.push(arts.length);
      ArrDay.push(formattedDate);
    }

    res.json(
      jsonGenerate(StatusCode.SUCCESS, `Data Successfully`, {
        DocArr,
        ArtArr,
        ArrDay,
      })
    );
  } catch (error) {
    console.error(error); // log or handle the error properly
  }
};

exports.PaginationDoc = async (req, res) => {
  const PAGE_SIZE = 15;
  try {
    var page = req.query.page;
    var cate = req.query.cate || "";

    if (page) {
      page = parseInt(page);
      if (page < 1) page = 1;
      var skip = (page - 1) * PAGE_SIZE;
      if (cate) {
        Docs.find({
          $and: [
            {
              category: cate,
            },
          ],
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .then((data) => {
            res.json(data);
          });
      } else {
        Docs.find({})
          .skip(skip)
          .limit(PAGE_SIZE)
          .then((data) => {
            res.json(data);
          });
      }
    } else {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Lỗi Truy Vấn", error)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

exports.PaginationArt = async (req, res) => {
  const PAGE_SIZE = 15;
  try {
    var page = req.query.page || 1;
    if (page) {
      page = parseInt(page);
      if (page < 1) page = 1;
      var skip = (page - 1) * PAGE_SIZE;
      Arts.find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((data) => {
          res.json(data);
        });
    } else {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Lỗi Truy Vấn", error)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};