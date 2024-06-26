import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { FiEye } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { FaDownload, FaRegCommentDots } from "react-icons/fa";
import {
  FUNC_HIGHT_LIGHT_DOC,
  FUNC_INTERACT_DOC,
  FUNC_PAGE_DOCS,
} from "../../service/FuncDoc/index.js";
import Skenleton from "./Skenleton.jsx";
import { Link } from "react-router-dom";
import { CategoryArr } from "../../data/CategoryDoc.js";
import { NotLogin } from "../../func/NotiteNotLogin.js";
import moment from "moment";
function HighLightDoc() {
  const { user } = useContext(ProductContext);
  const [page, setPage] = useState(Number(1));
  const [DocsData, setDocsData] = useState([]);
  const [like, setLike] = useState({
    _id: "",
    photoURL: "",
    userId: "",
  });
  const auth = user?.token;
  const photoURL = user?.avatar;
  const handlerLike = async (id) => {
    like._id = id;
    like.photoURL = photoURL;
    like.userId = user?.userId;
    // console.log(id);
    // console.log(like);
    try {
      const result = await FUNC_INTERACT_DOC(auth, like);
      // console.log(result);
      if (result.data.status === 200) {
        getPagination();
        return;
      }

      if (result.data.status === 202) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPagination = async () => {
    try {
      const data = await FUNC_HIGHT_LIGHT_DOC(page);
      setDocsData(data.data);
      // console.log(data.data.data);
    } catch (error) {}
  };

  const nextPage = () => {
    const maxPage = Math.ceil(DocsData.length / 12);
    setPage(page > maxPage ? 1 : page + 1);
    getPagination();
  };
  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1);
    getPagination();
  };

  useEffect(() => {
    getPagination();
  }, []);

  const handlerView = async (id) => {};

  function renderCategory(value) {
    const category = CategoryArr.find((item) => item.value === value);
    const categoryName = category ? category.name : "Không tìm thấy danh mục";
    return categoryName;
  }
  // console.log(DocsData);
  return (
    <>
      <div className="w-full  justify-center items-center ">
        <div class=" my-1 p-4">
          {DocsData && DocsData != "" ? (
            <>
              <>
                <>
                  <div className="">
                    <div className=" w-full  flex justify-center items-center">
                      <div className="w-full py-5 px-4  flex justify-center items-center ">
                        <div class="grid  gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
                          {DocsData &&
                            DocsData.map((item, index) => {
                              return (
                                <div class="flex flex-col justify-center ">
                                  <div class="w-[360px] md:w-full min-h-[280px] relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-3  md:max-w-3xl mx-auto border border-white bg-white">
                                    <p className="bg-blue-100 w-auto h-8 flex text-md absolute -z-1    rounded-tl-xl rounded-br-full top-0 left-0">
                                      <span className="p-1 pr-4 text-blue-400 font-mono">
                                        {renderCategory(item?.category)}
                                      </span>
                                    </p>

                                    <div class="w-full md:w-1/3 bg-white grid place-items-center top-4 ">
                                      <iframe
                                        class="w-full h-[70%] rounded cursor-grabbing overflow-hidden  shadow-lg box-decoration-clone"
                                        src={item?.docs_URL}
                                        title="W3Schools Free Online Web Tutorials"
                                        frameborder="0"
                                        scrolling="0"
                                      />
                                    </div>
                                    <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                      <div class="flex justify-between item-center">
                                        <p class="text-gray-500 font-medium hidden md:block">
                                          {item?.view} Lượt xem
                                        </p>

                                        <div class="bg-gray-200 px-3 py-1 rounded-full font-medium text-gray-800 hidden md:block">
                                          <div
                                            onClick={(e) => {
                                              user
                                                ? handlerLike(item?._id)
                                                : NotLogin();
                                            }}
                                            class="flex  text-gray-700 font-medium z-50  cursor-pointer"
                                          >
                                            <span>{item?.like.length}</span>
                                            <span className="mx-1">
                                              {!item.like.some((obj) =>
                                                Object.values(obj).includes(
                                                  user?.userId
                                                )
                                              ) ? (
                                                <>
                                                  <svg
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    class="w-6 h-6 mr-1"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      stroke-width="2"
                                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                  </svg>
                                                </>
                                              ) : (
                                                <>
                                                  <svg
                                                    width="18px"
                                                    height="18px"
                                                    viewBox="0 0 24 24"
                                                    class="w-6 h-6 mr-1"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z"
                                                      fill="url(#paint0_radial)"
                                                    />
                                                    <path
                                                      opacity="0.5"
                                                      d="M18.2056 4.16016C20.9485 8.53158 18.4228 14.2687 15.3885 15.8973C12.0399 17.6973 9.74847 16.8516 5.00562 14.1602C7.70847 17.743 11.9999 20.3202 11.9999 20.3202C11.9999 20.3202 21.1428 14.8287 21.1428 8.72016C21.1428 6.6973 19.937 4.94873 18.2056 4.16016Z"
                                                      fill="url(#paint1_radial)"
                                                    />
                                                    <path
                                                      opacity="0.5"
                                                      d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z"
                                                      fill="url(#paint2_radial)"
                                                    />
                                                    <path
                                                      opacity="0.5"
                                                      d="M16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12 5.8915C11.0972 4.57721 9.58289 3.71436 7.86861 3.71436C5.10289 3.71436 2.85718 5.96007 2.85718 8.72578C2.85718 14.8344 12 20.3258 12 20.3258C12 20.3258 21.1429 14.8344 21.1429 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436Z"
                                                      fill="url(#paint3_radial)"
                                                    />
                                                    <path
                                                      opacity="0.24"
                                                      d="M10.7486 5.74883C11.2514 6.93169 10.1371 8.5374 8.25714 9.33169C6.37714 10.126 4.45143 9.8174 3.94857 8.64026C3.44571 7.46312 4.56 5.85169 6.44 5.0574C8.32 4.26312 10.2457 4.56597 10.7486 5.74883Z"
                                                      fill="url(#paint4_radial)"
                                                    />
                                                    <path
                                                      opacity="0.24"
                                                      d="M16.8742 4.78885C17.5885 5.57742 17.1485 7.13742 15.8971 8.26885C14.6456 9.40028 13.0513 9.68028 12.3371 8.8917C11.6228 8.10313 12.0628 6.54313 13.3142 5.41171C14.5656 4.28028 16.1599 4.00028 16.8742 4.78885Z"
                                                      fill="url(#paint5_radial)"
                                                    />
                                                    <path
                                                      opacity="0.32"
                                                      d="M16.2229 5.04578C18.7372 5.90293 21.1372 9.61721 17.0801 14.2458C14.6515 17.0172 12.0001 18.4172 8.62866 17.8686C10.4515 19.3886 12.0058 20.3258 12.0058 20.3258C12.0058 20.3258 21.1487 14.8344 21.1487 8.72578C21.1429 5.96007 18.8972 3.71436 16.1315 3.71436C14.4172 3.71436 12.9029 4.57721 12.0001 5.8915C12.0001 5.8915 14.3829 4.41721 16.2229 5.04578Z"
                                                      fill="url(#paint6_linear)"
                                                    />
                                                    <defs>
                                                      <radialGradient
                                                        id="paint0_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(9.38479 8.34769) rotate(-29.408) scale(14.3064 11.3486)"
                                                      >
                                                        <stop
                                                          offset="0.2479"
                                                          stop-color="#FF0000"
                                                        />
                                                        <stop
                                                          offset="0.8639"
                                                          stop-color="#C20000"
                                                        />
                                                      </radialGradient>
                                                      <radialGradient
                                                        id="paint1_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(9.7385 7.47018) rotate(-29.408) scale(12.3173 9.77078)"
                                                      >
                                                        <stop
                                                          offset="0.2479"
                                                          stop-color="#FF0000"
                                                        />
                                                        <stop
                                                          offset="1"
                                                          stop-color="#C20000"
                                                        />
                                                      </radialGradient>
                                                      <radialGradient
                                                        id="paint2_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(9.38479 8.34769) rotate(-29.408) scale(14.3064 11.3486)"
                                                      >
                                                        <stop
                                                          stop-color="white"
                                                          stop-opacity="0.25"
                                                        />
                                                        <stop
                                                          offset="1"
                                                          stop-color="white"
                                                          stop-opacity="0"
                                                        />
                                                      </radialGradient>
                                                      <radialGradient
                                                        id="paint3_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(14.5277 13.2044) rotate(-26.296) scale(10.4431 5.16038)"
                                                      >
                                                        <stop
                                                          stop-color="#BD2719"
                                                          stop-opacity="0.25"
                                                        />
                                                        <stop
                                                          offset="1"
                                                          stop-color="#BD2719"
                                                          stop-opacity="0"
                                                        />
                                                      </radialGradient>
                                                      <radialGradient
                                                        id="paint4_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(7.34746 7.19453) rotate(-21.6908) scale(3.71252 2.30616)"
                                                      >
                                                        <stop stop-color="white" />
                                                        <stop
                                                          offset="1"
                                                          stop-color="white"
                                                          stop-opacity="0"
                                                        />
                                                      </radialGradient>
                                                      <radialGradient
                                                        id="paint5_radial"
                                                        cx="0"
                                                        cy="0"
                                                        r="1"
                                                        gradientUnits="userSpaceOnUse"
                                                        gradientTransform="translate(14.6004 6.84619) rotate(-40.7634) scale(3.07376 1.9095)"
                                                      >
                                                        <stop stop-color="white" />
                                                        <stop
                                                          offset="1"
                                                          stop-color="white"
                                                          stop-opacity="0"
                                                        />
                                                      </radialGradient>
                                                      <linearGradient
                                                        id="paint6_linear"
                                                        x1="13.8868"
                                                        y1="26.8498"
                                                        x2="15.6583"
                                                        y2="2.96408"
                                                        gradientUnits="userSpaceOnUse"
                                                      >
                                                        <stop stop-color="#860805" />
                                                        <stop
                                                          offset="1"
                                                          stop-color="#BD2719"
                                                          stop-opacity="0"
                                                        />
                                                      </linearGradient>
                                                    </defs>
                                                  </svg>
                                                </>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <h3 class=" text-gray-800 md:text-lg text-[16px] font-light">
                                        {user ? (
                                          <Link
                                            to={`/tailieu/view/${item?._id}`}
                                          >
                                            <h3 class="text-gray-900 hover:text-blue-500 cursor-pointer font-extrabold m-1 py-1 ">
                                              {item?.title.substring(0, 27) +
                                                "..."}
                                            </h3>
                                          </Link>
                                        ) : (
                                          <>
                                            <h3
                                              onClick={(e) => NotLogin()}
                                              class="text-gray-900 hover:text-blue-500 cursor-pointer font-extrabold m-1 py-1 "
                                            >
                                              {item?.title.substring(0, 27) +
                                                "..."}
                                            </h3>
                                          </>
                                        )}
                                      </h3>
                                      <p class="md:text-xs font-thin text-gray-500 text-base">
                                        {item?.content.substring(0, 90) +
                                          " ..."}
                                      </p>

                                      <p className="text-xs break-words text-blue-800 w-auto h-auto overflow-clip whitespace-nowrap flex">
                                        {item?.tag.slice(0, 3).map((i) => {
                                          return (
                                            <>
                                              <div>
                                                <p class="inline-block relative py-1 text-xs mx-1">
                                                  <span class="absolute inset-0 text-blue-200 flex">
                                                    <svg
                                                      height="100%"
                                                      viewBox="0 0 50 100"
                                                    >
                                                      <path
                                                        d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                                                        fill="currentColor"
                                                      />
                                                    </svg>
                                                    <p class="flex-grow h-full -ml-px bg-blue-200 rounded-md rounded-l-none"></p>
                                                  </span>
                                                  <span class="relative text-blue-500 uppercase font-semibold pr-px">
                                                    <span>
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                    </span>
                                                    {i}
                                                    <span>&nbsp;</span>
                                                  </span>
                                                </p>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </p>
                                      {/* <div className="flex justify-start items-end my-1 z-20 ">
                                        <img
                                          src={item?.creatorsPhoto}
                                          alt="avatar"
                                          className="w-8 h-8 rounded-full mr-2 "
                                        />
                                        <Link to={`/u/${item?.userId}`}>
                                          <h1 className="text-md text-blue-900  hover:text-blue-400  cursor-pointer">
                                            {item?.creatorsName}
                                          </h1>
                                        </Link>
                                      </div> */}
                                      <span className="md:text-xs font-thin text-gray-800 text-base">
                                        Đăng tải:{" "}
                                        {moment(item?.createdAt).fromNow()}
                                      </span>
                                      <p className="bg-blue-100 flex text-md absolute -z-1 px-2 py-2  rounded-tl-3xl rounded-br-lg bottom-0 right-0 items-end">
                                        <img
                                          src={item?.creatorsPhoto}
                                          alt="avatar"
                                          className="w-8 h-8 rounded-full mr-2 "
                                        />
                                        {user ? (
                                          <Link to={`/u/${item?.userId}`}>
                                            <h1 className="text-md text-blue-900  hover:text-green-400  hover:font-semibold  cursor-pointer">
                                              {item?.creatorsName}
                                            </h1>
                                          </Link>
                                        ) : (
                                          <>
                                            <h1
                                              onClick={(e) => NotLogin()}
                                              className="text-md text-blue-900  hover:text-green-400  hover:font-semibold  cursor-pointer"
                                            >
                                              {item?.creatorsName}
                                            </h1>
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                <div className="my-3 w-full   flex justify-center items-center ">
                  {/* <!-- Previous Button --> */}
                  <div className="w-[95%] flex justify-between items-center">
                    <button
                      onClick={(e) => prevPage()}
                      class="cursor-pointer inline-flex justify-start items-center 
              px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Sau
                    </button>
                    <button
                      onClick={(e) => {
                        nextPage();
                      }}
                      class="cursor-pointer inline-flex justify-end items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
               hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Tiếp
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            </>
          ) : (
            <>
              <Skenleton num={8} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HighLightDoc;
