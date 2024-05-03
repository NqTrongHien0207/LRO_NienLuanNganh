import React from "react";
import { Header } from "../components/index.js";
import ChangePass from "../components/ViewProFile/ChangePass.jsx";

function ChangePassPage() {
  return (
    <div className="">
      <Header />
      <div className="z-0 h-full bg-white">
        <ChangePass />
      </div>
    </div>
  );
}

export default ChangePassPage;
