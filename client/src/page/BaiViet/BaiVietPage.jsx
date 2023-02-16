import React, { useEffect, useState, Suspense } from "react";
import AddArticle from "../../components/Comments/AddArticle.jsx";
import Articles from "../../components/Comments/Articles.jsx";
import {
  CardAuthor,
  CardBV,
  CardRight,
  Header,
} from "../../components/index.js";

import { AiFillHeart, AiOutlineHeart, AiFillWechat } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io";
import dataCourse from "../../data/course.js";
import { doc_hight } from "../../service/TaiLieu/GetDocHight.js";
import axios from "axios";
import { GET_USER_HIGHT } from "../../service/apiConstant.js";
import CardPost from "../../components/components/CardPost.jsx";

function BaiVietPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      {/* Hiện thị */}

      <div className="w-full flex justify-center items-end my-4 border-none shadow-lg rounded-lg ">
        <div class="w-full">
          <CardPost />
          {/* 
          <div class="md:col-span-2 ">
            <>             
            </>
          </div>
          <div class=" hidden md:block">
            <div>
              <div className="p-2">
                <p className="text-2xl text-blue-400">TÀI LIỆU NỔI BẬT</p>
              </div>
              <CardRight data={data} type="tailieu" />
            </div>
            <div>
              <div className="p-2">
                <p className="text-2xl text-blue-400">CÁC TÁC GIẢ NỔI BẬT</p>
              </div>
              <CardAuthor data={dataUser} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BaiVietPage;
{
  /* <div>
        <h1>Hello page </h1>
        <AddArticle colDB="test" />
        <div className="h-full">
          <Articles colDB="test" />
        </div>
      </div> */
}
