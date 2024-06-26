import React, { useEffect, useState, useContext } from "react";
import Moment from "react-moment";
import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import { FiEye } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { FaDownload, FaRegCommentDots } from "react-icons/fa";
import {
  FUNC_INTERACT_DOC,
  FUNC_PAGE_DOCS,
} from "../../service/FuncDoc/index.js";
import Skenleton from "../components/Skenleton.jsx";
import { Link } from "react-router-dom";
import { CategoryArr } from "../../data/CategoryDoc.js";
import { NotLogin } from "../../func/NotiteNotLogin.js";
import moment from "moment";
function CardDoc({ category, layout }) {
  const { user } = useContext(ProductContext);
  const [page, setPage] = useState(Number(1));
  // const [category, setCategory] = useState("");

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
      const { data } = await FUNC_PAGE_DOCS(page, category);
      // console.log(data);
      setDocsData(data);
    } catch (error) {}
  };

  const nextPage = () => {
    const maxPage = Math.ceil(DocsData.length / 15);
    setPage(page > maxPage ? 1 : page + 1);
    // console.log(page);
    // getPagination();
  };
  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1);
    // getPagination();
  };

  useEffect(() => {
    getPagination();
  }, [page, category]);

  const handlerView = async (id) => {};

  function renderCategory(value) {
    const category = CategoryArr.find((item) => item.value === value);
    const categoryName = category ? category.name : "Tất cả Danh Mục";
    return categoryName;
  }
  // console.log(DocsData);
  return (
    <>
      <div className="w-full  justify-center items-center ">
        <div class={layout ? "hidden" : ""}>
          {DocsData && DocsData != "" ? (
            <>
              <>
                <>
                  <div className="">
                    <div className=" w-full  flex justify-center items-center">
                      <div className=" md:w-full lg:w-[98%] py-5 px-8 bg-blue-200 justify-center items-center ">
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
                                    {/* <p className=" w-auto h flex text-md absolute -z-1   bottom-0 left-0">
                                      <span className=" text-blue-400 font-mono">
                                        {moment(item?.createdAt).fromNow()}
                                      </span>
                                    </p> */}
                                    <div class="w-full h-full md:w-1/3  bg-white md:grid md:place-items-center top-4 ">
                                      <iframe
                                        class="w-full h-[70%] overflow-hidden overflow-y-hidden overflow-x-hidden rounded cursor-grabbing  shadow-lg box-decoration-clone"
                                        src={item?.docs_URL}
                                        title="W3Schools Free Online Web Tutorials"
                                        frameborder="0"
                                        scrolling="0"
                                      />
                                    </div>

                                    <div class="w-full md:w-2/3  bg-white md:flex md:flex-col md:space-y-2 md:p-3">
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

                                      <div className="text-xs text-blue-800 w-auto overflow-clip h-auto whitespace-nowrap flex">
                                        {item?.tag.slice(0, 3).map((i) => {
                                          return (
                                            <>
                                              <div>
                                                <div class="inline-block relative py-1 text-xs mx-1">
                                                  <div class="absolute inset-0 text-blue-200 flex">
                                                    <svg
                                                      height="100%"
                                                      viewBox="0 0 50 100"
                                                    >
                                                      <path
                                                        d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                                                        fill="currentColor"
                                                      />
                                                    </svg>
                                                    <div class="flex-grow h-full -ml-px bg-blue-200 rounded-md rounded-l-none"></div>
                                                  </div>
                                                  <span class="relative text-blue-500 uppercase font-semibold pr-px">
                                                    <span>
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                    </span>
                                                    {i}
                                                    <span>&nbsp;</span>
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                      <span className="md:text-xs font-thin text-gray-800 text-base">
                                        Đăng tải:{" "}
                                        {moment(item?.createdAt).fromNow()}
                                      </span>
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

                {/* <!-- Previous Button --> */}
                <div className="my-3 w-full   flex justify-center items-center ">
                  <div className="w-[95%] flex justify-between items-center">
                    <a
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
                    </a>
                    <a
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
                    </a>
                  </div>
                </div>
              </>
            </>
          ) : (
            <>
              <div className="">
                <div className=" w-full  flex justify-center items-center">
                  <div className=" md:w-full lg:w-[96%] py-5 px-4 bg-blue-100 justify-center items-center ">
                    <div class="grid  gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
                      <Skenleton num={12} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={!layout ? "hidden" : ""}>
          {DocsData && DocsData != "" ? (
            <>
              {
                <div className="">
                  <div className=" w-full  flex justify-center items-center">
                    <div className=" md:w-full lg:w-[96%] py-5 px-8 bg-blue-100 justify-center items-center ">
                      <div class="grid  gap-4 lg:grid lg:grid-cols-4 lg:gap-6">
                        {DocsData?.map((item, index) => {
                          return (
                            <>
                              <div class="!z-5 relative flex flex-col rounded-[20px] max-w-[300px]  bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px] bg-white undefined">
                                <div class="h-full w-full">
                                  <div class="relative w-full">
                                    <iframe
                                      src={item?.docs_URL}
                                      // src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
                                      class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                                      alt=""
                                    />
                                    <button
                                      onClick={(e) => {
                                        user
                                          ? handlerLike(item?._id)
                                          : NotLogin();
                                      }}
                                      class="absolute top-3 right-3 flex items-center justify-center border-2 border-black rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
                                    >
                                      <div class="flex h-full w-full items-center justify-center  rounded-full text-xl hover:bg-gray-50">
                                        {!item.like.some((obj) =>
                                          Object.values(obj).includes(
                                            user?.userId
                                          )
                                        ) ? (
                                          <>
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 512 512"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="text-ređ"
                                            >
                                              <path
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="32"
                                                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                              ></path>
                                            </svg>
                                          </>
                                        ) : (
                                          <>
                                            <AiFillHeart className="text-red-500" />
                                          </>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                  <div class="mb-3 flex items-center justify-between px-1 md:items-start">
                                    <div class="mb-2">
                                      <p class="text-lg font-bold text-navy-700 hover:text-blue-400">
                                        {user ? (
                                          <Link
                                            to={`/tailieu/view/${item?._id}`}
                                          >
                                            {item?.title.substring(0, 35) +
                                              "..."}
                                          </Link>
                                        ) : (
                                          <span onClick={(e) => NotLogin()}>
                                            {item?.title.substring(0, 35) +
                                              "..."}
                                          </span>
                                        )}
                                      </p>
                                      <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2 hover:text-blue-400">
                                        {user ? (
                                          <Link to={`/u/${item?.creatorsId}`}>
                                            Tác giả: {item?.creatorsName}
                                          </Link>
                                        ) : (
                                          <span onClick={(e) => NotLogin()}>
                                            Tác giả: {item?.creatorsName}
                                          </span>
                                        )}
                                      </p>
                                      <span className="md:text-xs font-thin text-gray-800 text-base">
                                        Đăng tải:{" "}
                                        {moment(item?.createdAt).fromNow()}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="flex items-center justify-between md:items-center lg:justify-between ">
                                    <div class="flex">
                                      {/* <p class="!mb-0 text-sm font-bold text-brand-500">
                                        Current Bid: 0.91 <span>ETH</span>
                                      </p> */}
                                      <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
                                        <span
                                          class={`${
                                            item?.like?.length < 5
                                              ? "hidden"
                                              : ""
                                          } z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700`}
                                        >
                                          +{item?.like?.length - 5}
                                        </span>
                                        {item?.like?.slice(0, 5)?.map((i) => {
                                          return (
                                            <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                                              <img
                                                class="h-full w-full rounded-full object-cover"
                                                // src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                                                alt=""
                                                src={i.photoURL}
                                              />
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className="absolute flex justify-center p-2 rounded-md items-center  h-5 bg-green-100 bottom-0 right-0">
                                      <span className="text-sm">
                                        {renderCategory(item?.category)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          ) : (
            <>
              <div className="">
                <div className=" w-full  flex justify-center items-center">
                  <div className=" md:w-full lg:w-[96%] py-5 px-4 bg-blue-100 justify-center items-center ">
                    <div class="grid  gap-4 lg:grid lg:grid-cols-4 lg:gap-6">
                      <Skenleton num={12} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <!-- Previous Button --> */}
          <div className="my-3 w-full   flex justify-center items-center ">
            <div className="w-[95%] flex justify-between items-center">
              <a
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
              </a>
              <a
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDoc;
<>
  {/* <div class=" my-1 p-4">
          {DocsData && DocsData != "" ? (
            <>
              <>
                <>
                  <div className="">
                    <div className=" w-full flex justify-center items-center">
                      <div className="w-[88%] py-5 px-4 bg-gray-100 flex justify-center items-center ">
                        <div class="grid grid-cols-4 gap-6">
                          {DocsData &&
                            DocsData.map((item, index) => {
                              return (
                                <div>
                                  <div
                                    key={item?._id}
                                    class="w-[266px] h-[333px] flex items-center justify-center bg-gray-100 rounded-md  hover:bg-blue-400 ease-in-out duration-100 "
                                  >
                                    <div class="w-[99%] h-[99%]  bg-gray-200  p-4 rounded-lg    shadow-md shadow-blue-300/30">
                                      <div className="flex justify-start items-end my-1 z-20 ">
                                        <img
                                          src={item?.creatorsPhoto}
                                          alt="avatar"
                                          className="w-6 h-6 rounded-full mr-2 "
                                        />
                                        <Link to={`/u/${item?.userId}`}>
                                          <h1 className="text-[15px] text-blue-900  hover:text-blue-400  cursor-pointer">
                                            {item?.creatorsName}
                                          </h1>
                                        </Link>
                                      </div>
                                      <iframe
                                        class="w-full  rounded shadow cursor-grabbing overflow-hidden  "
                                        src={item?.docs_URL}
                                        title="W3Schools Free Online Web Tutorials"
                                        frameborder="0"
                                        scrolling="0"
                                      ></iframe>
                                      <Link to={`/tailieu/view/${item?._id}`}>
                                        <h3 class="text-gray-900 hover:text-blue-500 cursor-pointer font-serif m-1 py-1 ">
                                          {item?.title.substring(0, 27) + "..."}
                                        </h3>
                                      </Link>
                                      <p class="text-gray-800 font-light mt-1 text-xs">
                                      
                                      </p>
                                      <div className="text-xs text-blue-800 w-auto h-auto whitespace-nowrap ">
                                        {item?.tag.slice(0, 3).map((i) => {
                                          return (
                                            <>
                                              <div className="whitespace-nowrap font-thin">
                                                {i}
                                              </div>
                                            </>
                                          );
                                        })}
                                      </div>
                                      <div className="w-full h-[2px] bg-black"></div>
                                      <div>
                                     
                                        <div class="flex justify-between">
                                          <span className="text-md flex justify-center items-center ">
                                            <span>{item?.view}</span>
                                            <FiEye className="text-md mx-1" />
                                          </span>

                                          <span className="text-md flex justify-center items-center ">
                                           
                                            <div
                                              onClick={(e) => {
                                                handlerLike(item?._id);
                                              }}
                                              class="flex  text-gray-700 text-sm  z-50  cursor-pointer"
                                            >
                                              <span>{item?.like.length}</span>
                                              <span className="mx-1">
                                                {!item?.like?.includes(
                                                  photoURL
                                                ) ? (
                                                  <>
                                                    <svg
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      class="w-4 h-4 mr-1"
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
                                            <span>
                                              {" "}
                                              <FaDownload className="text-lg mx-1" />
                                            </span>
                                            <span>
                                              <FaRegCommentDots className="text-lg mx-1" />
                                            </span>
                                          </span>
                                        </div>
                                      </div>
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
               
                  <div className="w-[95%] flex justify-between items-center">
                    <a
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
                      Previous
                    </a>
                    <a
                      onClick={(e) => {
                        nextPage();
                      }}
                      class="cursor-pointer inline-flex justify-end items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
               hover:bg-green-300 hover:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
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
                    </a>
                  </div>
                </div>
              </>
            </>
          ) : (
            <>
              <Skenleton num={8} />
            </>
          )}
        </div> */}
</>;
