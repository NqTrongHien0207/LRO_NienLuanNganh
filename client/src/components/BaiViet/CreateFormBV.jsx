import React, { useState, useEffect } from "react";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import { ToastContainer, toast } from "react-toastify";
import data from "../../data/course.js";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContextProvider";
import { FUNC_CREATE_ART } from "../../service/FuncArt/index.js";
import { useNavigate } from "react-router-dom";
function FormBV() {
  const navigation = useNavigate();

  const { user } = useContext(ProductContext);
  const auth = user?.token;
  const [value, setValue] = React.useState("");
  const [otitle, setoTitle] = React.useState("");
  const [selected, setSelected] = useState([]);
  const [isP, setisP] = useState(false);
  const [form, setForm] = useState({
    title: otitle,
    content: value,
    tag: selected,
    isPrivate: Boolean(isP),
    creatorsName: user.first_name + " " + user.last_name,
    creatorsId: user.userId,
    creatorsPhoto: user.avatar,
  });

  useEffect(() => {
    setForm({
      title: otitle,
      content: value,
      tag: selected,
      isPrivate: Boolean(isP),
      creatorsName: user.first_name + " " + user.last_name,
      creatorsId: user.userId,
      creatorsPhoto: user.avatar,
    });
  }, [otitle, value, isP, selected]);

  // console.table(form);
  const handleSubmit = async () => {
    if (form.title != "" && form.content != "" && checkForm()) {
      const result = await FUNC_CREATE_ART(auth, form);
      // console.log(result);
      if (result.status == 200) {
        if (result.data.status === 200) {
          toast.success("Đăng tải bài viết thành công");
          setTimeout(() => {
            setSelected([]);
            setValue("");
            setoTitle("");

            navigation("/baiviet");
          }, 2000);
          return;
        }
        if (result.data.status === 201) {
          toast.error(result.data.data);
          return;
        }
        if (result.data.status === 202) {
          toast.error(result.data.message);
          return;
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui Lòng Điền Đủ Thông Tin",
        text: ``,
      });
    }
  };

  function handleClear() {
    try {
      setoTitle("");
      setValue("");
      setSelected([]);
    } catch (error) {}
  }

  function checkForm() {
    if (selected.length > 0 && selected.length < 6) {
      if (selected.length > 2) {
        return true;
      }
      return false;
    } else return false;
  }
  return (
    <>
      <div className="bg-white w-full flex justify-center items-center">
        <ToastContainer />

        <div className="h-full w-[95%]  p-5 flex justify-center items-center">
          <div className="w-full justify-center items-center">
            <div className="w-full h-full">
              <div class="grid grid-cols-3 gap-4 my-2">
                <div class="col-span-2 w-full h-10  ">
                  <input
                    type="text"
                    className="h-10 w-full bg-white border-2 border-blue-700 rounded-md shadow-lg shadow-bg-yarn-300  text-lg text-blue-400"
                    placeholder="Tiêu Đề Bài Viết"
                    value={otitle}
                    onChange={(e) => setoTitle(e.target.value)}
                  />
                </div>
                <div class="w-full  ">
                  <div className=" h-full  w-full">
                    <div className="flex gap-1 h-full    rounded-md justify-center items-center">
                      <button
                        onClick={handleClear}
                        class=" w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                      >
                        Xoá
                      </button>
                      <button
                        onClick={handleSubmit}
                        class=" w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Đăng Tải Bài Viết
                      </button>
                      {/* <div
                        onClick={handleClear}
                        className={`${
                          isP ? "bg-gray-300" : "bg-green-400"
                        } cursor-pointer w-full h-full flex justify-center border-md  border-blue-400  items-center px-4 py-2  text-blue-700  border-none rounded-md duration-100 ease-in-out focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      >
                        <span>Xoá</span>
                      </div>
                      <button
                        // onClick={handlePublish}
                        onClick={handleSubmit}
                        className="md:w-full h-10 rounded-lg justify-center items-center 
                                    flex ml-2 py-2.5 px-3  text-sm font-medium text-white
                                 bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 
                                 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                                  dark:focus:ring-blue-800"
                      >
                        Đăng Tải Bài Viết
                      </button> */}
                    </div>
                  </div>
                </div>
                <div class="w-full h-full  ">
                  <div className=" h-full  w-full">
                    <div className="flex gap-1 h-full border-2 border-blue-800  bg-white  rounded-md justify-center items-center">
                      <label class="themeSwitcherThree relative inline-flex cursor-pointer select-none items-center">
                        <span class="mr-[18px] text-md font-medium text-black">
                          {!isP ? "Đăng công khai" : "Đăng riêng tư"}
                        </span>
                        <div class="shadow-card flex text-lg items-center justify-center rounded-md bg-white">
                          <span
                            onClick={(e) => setisP(!isP)}
                            class={`${
                              !isP
                                ? " bg-blue-800 text-white "
                                : "border-2 border-blue-900 duration-100"
                            }   ease-in-out translate-x-0 flex h-full w-full p-3 mx-2 items-center justify-center rounded `}
                          >
                            <FaUnlockAlt />
                          </span>
                          <span
                            onClick={(e) => setisP(!isP)}
                            class={`${
                              isP
                                ? " bg-blue-800 text-white "
                                : "border-2 border-blue-900 duration-100"
                            }   ease-in-out translate-x-0 flex h-full w-full p-3 mx-2 items-center justify-center rounded `}
                          >
                            <FaLock />
                          </span>
                        </div>
                      </label>
                      {/* <div
                        onClick={(e) => setisP(!isP)}
                        className={`${
                          isP ? "bg-gray-300" : "bg-green-400"
                        } cursor-pointer w-full h-full flex justify-center border-md  border-blue-400  items-center px-4 py-2  text-blue-700  border-none rounded-md duration-100 ease-in-out focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      >
                        <span>Công khai</span>
                      </div>
                      <div
                        onClick={(e) => setisP(!isP)}
                        className={`${
                          !isP ? "bg-gray-300" : "bg-green-400"
                        } cursor-pointer flex justify-center  border-md border-blue-400  items-center w-full h-full  px-4 py-2  text-blue-700  border-none rounded-md duration-100 ease-in-out focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      >
                        <span>Riêng tư</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div class="col-span-2 w-full h-full bg-green-400">
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="tag"
                    id="tag"
                    placeHolder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ. Ít nhất 3 thẻ!"
                    classNames={` w-full rounded-md  border-0 h-auto`}
                  />
                </div>
              </div>
            </div>

            <div>
              {" "}
              <div data-color-mode="light">
                <MDEditor
                  className="h-full bg-white"
                  height={800}
                  value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  onChange={setValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBV;
