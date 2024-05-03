const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Art = require("../models/arts.models.js");
const Doc = require("../models/docs.models.js");

const { StatusCode } = require("../utils/constants.js");
const { jsonGenerate } = require("../utils/helpers.js");
const Docs = require("../models/docs.models.js");

exports.Login = async (req, res) => {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password, email } = req.body;
    const user = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }
    const verified = bcrypt.compareSync(password, user.password);
    const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);

    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }

    if (user.access == "admin") {
      return res.json(
        jsonGenerate(100, "ADMIN => Login Successful", {
          userId: user._id,
          uid: user.uid,
          username: username,
          email: user.email,
          avatar: user.avatar,
          access: user.access,
          token: token,
          first_name: user.first_name,
          last_name: user.last_name,
          form: user.form,
        })
      );
    }

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        uid: user.uid,
        username: username,
        email: user.email,
        avatar: user.avatar,
        access: user.access,
        token: token,
        first_name: user.first_name,
        last_name: user.last_name,
        form: user.form,
      })
    );
  }
  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validatiion error",
      errors.mapped()
    )
  );
};

exports.Register = async (req, res) => {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {
      form,
      first_name,
      last_name,
      username,
      email,
      password,
      avatar,
      isSex,
      phone,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    //!User or Email already exists
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already exists"
        )
      );
    }
    //! save to db
    try {
      const result = await User.create({
        form: form,
        username: username,
        email: email,
        password: hashPassword,
        avatar: avatar,
        first_name: first_name,
        last_name: last_name,
        isSex: isSex,
        phone: phone,
      });

      const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);
      //! Registration successful
      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registration successful", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped()
      )
    );
  }
};

exports.FindOneUser = async (req, res) => {
  try {
    // var uid = req.query.uid;
    const infoCreators = await User.findById({ _id: req.body._id })
      .select("-password")
      .populate("docs")
      .populate("articles")
      .exec();

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, `User => ${req.body._id}`, infoCreators)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

exports.UpdatePersonalInformation = async (req, res) => {
  try {
    const _id = req.userId;
    const { first_name, last_name, email, phone, avatar, isSex } = req.body;
    const data = { first_name, last_name, email, phone, avatar, isSex };
    const UserInfo = await User.findById(_id);
    let userExist = false;
    if (UserInfo.email != email) {
      userExist = await User.findOne({
        $or: [
          {
            email: email,
          },
        ],
      });
    }

    //!User or Email already exists
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          " Email  already exists",
          UserInfo.email
        )
      );
    }
    try {
      const result = await User.findByIdAndUpdate(_id, data);
      return res.json(
        jsonGenerate(
          StatusCode.SUCCESS,
          "Update Personal Information Successfully",
          result
        )
      );
    } catch (error) {
      return res.status(500).json("Internal server error ");
    }
  } catch (error) {}
};

// exports.ChangeThePassword = async (req, res) => {
//   // const newpass = ({ password } = req.body);
//   try {
//     const _id = req.userId;
//     const user = await User.findOne(_id);
//     const verified = bcrypt.compareSync(req.body.oldpassword, user.password);
//     if (!verified) {
//       return res.json(
//         jsonGenerate(
//           StatusCode.UNPROCESSABLE_ENTITY,
//           "Username or password is incorrect"
//         )
//       );
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       const password = await bcrypt.hash(req.body.password, salt);
//       const NewPass = { password };
//       const result = await User.findByIdAndUpdate(_id, NewPass);
//       return res.json(
//         jsonGenerate(StatusCode.SUCCESS, "Update Succssfully", result)
//       );
//     }
//   } catch (error) {
//     return res.status(500).json("Internal server error ");
//   }
// };

exports.ChangeThePassword = async (req, res) => {
  const { oldPassword, password } = req.body;

  try {
    const user = await User.findById(req.userId);
    const salt = await bcrypt.genSalt(10);
    const verified = bcrypt.compareSync(oldPassword, user.password);
    if (!verified)
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Mật Khẩu Hiện Tại Không Chính Xác"
        )
      );
    const hashedPassword = await bcrypt.hash(password, salt);
    const verifiedNew = bcrypt.compareSync(password, user.password);
    if (verifiedNew) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Mật Khẩu Mới Trùng Mật Khẩu Cũ"
        )
      );
    }
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });
    return res.json(
      jsonGenerate(
        StatusCode.SUCCESS,
        "Thay Đổi Mật Khẩu Thành Công",
        hashedPassword
      )
    );
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
};

// exports.SearchData = async (req, res) => {
//     const PAGE_SIZE = 10;
//     const skip = 1;
//     var needle = req.params.q;
//     try {
//       const reDoc = await Doc.find({
//         sku: { $regex: new RegExp(`${needle}$`) },
//       });
//       const reArt = await Art.find({
//         sku: { $regex: new RegExp(`${needle}$`) },
//       });
//       // var result = { ...reDoc, ...reArt };
//       const result = reDoc.concat(reArt);

//       return res.json(
//         jsonGenerate(StatusCode.SUCCESS, "Data Succssfully", result)
//       );
//     } catch (error) {
//       return res.json(
//         jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
//       );
//     }
// };
function removeAccents(str) {
  const accents = {
    à: "a",
    ả: "a",
    ã: "a",
    á: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ắ: "a",
    ặ: "a",
    â: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ấ: "a",
    ậ: "a",
    đ: "d",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    é: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ế: "e",
    ệ: "e",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    í: "i",
    ị: "i",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ó: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ố: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ớ: "o",
    ợ: "o",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ú: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ứ: "u",
    ự: "u",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ý: "y",
    ỵ: "y",
  };
  return str
    .split("")
    .map((c) => accents[c] || c)
    .join("");
}

exports.SearchData = async (req, res) => {
  const PAGE_SIZE = 12;
  const skip = 1;
  var needle = req.query.q;
  const searchStr = removeAccents(needle)
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toLowerCase();
  try {
    const title = new RegExp(needle, "i");

    const reDoc = await Docs.find({
      $or: [{ title }, { tag: { $in: title } }],
      $and: [
        {
          isPrivate: false,
        },
      ],
    })
      .sort({ view: -1 })
      .limit(PAGE_SIZE);
    //?

    // const reDoc = await Docs.find({
    //   $or: [{ title: { $regex: searchStr } }, { tag: { $regex: searchStr } }],
    // });
    const reArt = await Art.find({
      $or: [{ title }, { tag: { $in: title } }],
      $and: [
        {
          isPrivate: false,
        },
      ],
    })
      .sort({ view: -1 })
      .limit(PAGE_SIZE);

    const result = reDoc.concat(reArt);

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Data Succssfully", result)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};