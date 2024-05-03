import config from "../config";
import ChangePassPage from "../page/ChangePassPage.jsx";
import Home from "../page/Home.jsx";
import {
  BaiVietPage,
  ContentManagement,
  CreateBaiVietPage,
  CreateTaiLieuPage,
  EditProfile,
  ProFile,
  SearchPage,
  TaiLieuPage,
  UpdateBaiVietPage,
  ViewBaiVietPage,
  ViewTaiLieuPage,
} from "../page/index.js";
import LoginPage from "../page/LoginPage.jsx";
import RegisterPage from "../page/RegisterPage.jsx";

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: LoginPage },
  { path: config.routes.register, component: RegisterPage },
  { path: config.routes.tailieu, component: TaiLieuPage },
  { path: config.routes.baiviet, component: BaiVietPage },
  { path: config.routes.search, component: SearchPage },
  //   { path: config.routes.login, component: Home },
];

//Login with Create Acc register
const privateRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.tailieu, component: TaiLieuPage },
  { path: config.routes.baiviet, component: BaiVietPage },
  { path: config.routes.search, component: SearchPage },
  { path: config.routes.ContentManagement, component: ContentManagement },
  { path: config.routes.ProFile, component: ProFile },
  { path: config.routes.EditProfile, component: EditProfile },
  { path: config.routes.ChangePass, component: ChangePassPage },
  { path: config.routes.CreateART, component: CreateBaiVietPage },
  { path: config.routes.UpdateART, component: UpdateBaiVietPage },
  { path: config.routes.ViewART, component: ViewBaiVietPage },
  { path: config.routes.CreateDOC, component: CreateTaiLieuPage },
  { path: config.routes.ViewDOC, component: ViewTaiLieuPage },
];

// Login with gg or fb
const privateRoutes2 = [
  { path: config.routes.home, component: Home },
  { path: config.routes.EditProfile, component: EditProfile },
  { path: config.routes.tailieu, component: TaiLieuPage },
  { path: config.routes.baiviet, component: BaiVietPage },
  { path: config.routes.search, component: SearchPage },
  { path: config.routes.ContentManagement, component: ContentManagement },
  { path: config.routes.ProFile, component: ProFile },
  { path: config.routes.CreateART, component: CreateBaiVietPage },
  { path: config.routes.UpdateART, component: UpdateBaiVietPage },
  { path: config.routes.ViewART, component: ViewBaiVietPage },
  { path: config.routes.CreateDOC, component: CreateTaiLieuPage },
  { path: config.routes.ViewDOC, component: ViewTaiLieuPage },
]

export { publicRoutes, privateRoutes,privateRoutes2  };
