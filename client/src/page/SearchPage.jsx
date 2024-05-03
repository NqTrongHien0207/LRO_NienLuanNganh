import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer, Header } from "../components/index.js";
import CardSearch from "../components/Search/CardSearch.jsx";
import { FUNC_SEARCH_DATA } from "../service/index.js";

function SearchPage() {
  let { q } = useParams();
  const [value, setValue] = useState();

  const Call_Data_Search = async () => {
    const result = await FUNC_SEARCH_DATA(q);
    console.log(q);
    console.log(result);
    setValue(result.data.data);
  };
  useEffect(() => {
    Call_Data_Search();
  }, [q]);
  console.log(q);

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div className="w-full h-auto bg-white flex justify-center items-center">
          <div className="w-[90%]  bg-white rounded-md">
            <div className="my-4 mx-2 w-full items-center justify-center flex">
              <span className="lg:text-3xl md:text-2xl items-center text-blue-800 font-serif ">
                Kết Quả Tìm Kiếm Dành Cho Bạn
              </span>
            </div>
            <CardSearch data={value} />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default SearchPage;
