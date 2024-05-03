const routes = {

  home: "/*",
  login: "/login",
  register: "/register",
  search: "/search/:q",
  baiviet: "/baiviet",
  tailieu: "/tailieu",
  //?
  ContentManagement: "/me/drafts",
  ProFile: "/u/:id",
  EditProfile: "/u/edit/:id",
  ChangePass: "/u/edit/pass/:id",
  //? ART
  CreateART: "/baiviet/create",
  UpdateART: "/baiviet/update/:id",
  ViewART: "/baiviet/view/:id",
  //? DOC
  CreateDOC: "/tailieu/create",
  ViewDOC: "/tailieu/view/:id",
  //   :'',
  //   :'',
  //   :'',
  //   :'',
  //   :'',
};

export default routes;
