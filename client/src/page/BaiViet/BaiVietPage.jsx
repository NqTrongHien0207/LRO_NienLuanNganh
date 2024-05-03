import React, { useEffect, useState, Suspense } from "react";
import AddArticle from "../../components/Comments/AddArticle.jsx";
import Articles from "../../components/Comments/Articles.jsx";
import {
  CardAuthor,
  CardBV,
  CardRight,
  Footer,
  Header,
} from "../../components/index.js";

import CardPost from "../../components/components/CardPost.jsx";

function BaiVietPage() {
  return (
    <div className="bg-white">
      <div>
        <Header />
      </div>
      {/* Hiện thị */}

      <div className="w-full flex  justify-center items-end my-4 border-none shadow-lg rounded-lg ">
        <div class="w-full">
          <CardPost />
        </div>
      </div>
      <div>
        <Footer />
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
