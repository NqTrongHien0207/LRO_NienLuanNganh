import React, { useEffect, useState } from "react";
import AddArticle from "../../components/Comments/AddArticle.jsx";
import Articles from "../../components/Comments/Articles.jsx";
import { CardBV, Header } from "../../components/index.js";

import { AiFillHeart, AiOutlineHeart, AiFillWechat } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io";
import axios from "axios";
import { GET_ALL_DOC, GET_ALL_POST } from "../../service/apiConstant.js";
function BaiVietPage() {
  const [dataPost, setDataPost] = useState([]);

  const getAllPost = async () => {
    try {
      const { data } = await axios.get(GET_ALL_POST);

      setDataPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  console.log(dataPost);
  return (
    <div>
      <div>
        <Header />
      </div>
      {/* Hiện thị */}
      <div className="w-full flex justify-center items-end my-4 border-none shadow-lg rounded-lg ">
        <div class="md:grid md:grid-cols-3 md:gap-4 w-[95%]">
          <div class="md:col-span-2 bg-blue-900">
            <>
              <CardBV data={dataPost} />
            </>
          </div>
          <div class="bg-blue-900 hidden md:block">05</div>
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
