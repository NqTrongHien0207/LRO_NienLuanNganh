import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { ProductContext } from "../../contexts/ProductContextProvider";
import { BoxViewBV, BoxViewTL, Skenleton } from "../index.js";
import Swal from "sweetalert2";
import { FUNC_CHANGE_PASS_USER } from "../../service/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function ChangePass() {
  const navigation = useNavigate();
  const { user } = useContext(ProductContext);
  let auth = user?.token;
  const [isMenu, setIsMenu] = useState(1);
  const [eye, setEye] = useState(false);
  const [isOldPass, setOldIsPass] = useState();
  const [isPass, setIsPass] = useState();
  const [isConfirmPass, setIsConfirmPass] = useState();
  const [Form, setForm] = useState({
    oldPassword: "",
    password: "",
  });
  const handleChange = async (e) => {
    // console.log("change");

    if (isConfirmPass == isPass) {
      const result = await FUNC_CHANGE_PASS_USER(auth, Form);
      // console.log(result);
      if (result.data.status == 200) {
        let timerInterval;
        Swal.fire({
          title: "Thay đổi mật khẩu thành công",
          html: "I will close in <b></b> milliseconds.",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
            //
          },

          willClose: () => {
            clearInterval(timerInterval);
            // window.location.href = ;
            navigation(`/u/${user?.userId}`);
            setIsPass("");
            setIsConfirmPass("");
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } else if (result.data.status == 201) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${result.data.message}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mật Khẩu Không Khớp",
      });
    }
  };

  useEffect(() => {
    setForm({
      oldPassword: isOldPass,
      password: isConfirmPass,
    });
    // console.log(Form);
  }, [isPass, isConfirmPass, isOldPass]);
  return (
    <>
      <ToastContainer />

      <div className="z-1">
        <div
          className={`w-full lg:h-[90vh] bg-white/10   relative  flex justify-center items-center `}
        >
          <div className="w-[90%] h-full] ">
            <section class=" dark:bg-gray-900">
              <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                <div class="w-full p-6 bg-blue-600/10 shadow-lg shadow-indigo-500/40 rounded-lg  dark:border  sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                  <h2 class="mb-1 w-full text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    THAY ĐỔI MẬT KHẨU
                    {/* <span onClick={() => setEye(!eye)}>
                      <FaRegEye />
                    </span> */}
                  </h2>
                  <div class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                      <label
                        for="password"
                        class="flex mb-2 justify-between text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mật Khẩu Hiện Tại{" "}
                        <span
                          className="ml-2 text-lg justify-end"
                          onClick={() => setEye(!eye)}
                        >
                          {eye ? (
                            <>
                              <FaRegEye />
                            </>
                          ) : (
                            <>
                              <FaEyeSlash />
                            </>
                          )}
                        </span>
                      </label>
                      <input
                        type={eye ? "text" : "password"}
                        name="oldpassword"
                        id="oldpassword"
                        placeholder="Nhập mật khẩu hiện tại của bạn"
                        value={isOldPass}
                        onChange={(e) => setOldIsPass(e.target.value)}
                        class=" placeholder:font-thin placeholder:italic placeholder:text-sm bg-gray-50 border border-gray-300 shadow-lg shadow-indigo-500/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mật Khẩu Mới
                        <span
                          className="ml-2 text-lg justify-end"
                          onClick={() => setEye(!eye)}
                        >
                          {eye ? (
                            <>
                              <FaRegEye />
                            </>
                          ) : (
                            <>
                              <FaEyeSlash />
                            </>
                          )}
                        </span>
                      </label>
                      <input
                        type={eye ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Mật khẩu ít nhất 6 ký tự"
                        value={isPass}
                        onChange={(e) => setIsPass(e.target.value)}
                        class="placeholder:font-thin placeholder:italic placeholder:text-sm bg-gray-50 border  border-gray-300 shadow-lg shadow-indigo-500/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="confirm-password"
                        class="flex mb-2 justify-between text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nhập Lại Mật Khẩu
                        <span
                          className="ml-2 text-lg justify-end"
                          onClick={() => setEye(!eye)}
                        >
                          {eye ? (
                            <>
                              <FaRegEye />
                            </>
                          ) : (
                            <>
                              <FaEyeSlash />
                            </>
                          )}
                        </span>
                      </label>
                      <input
                        type={eye ? "text" : "password"}
                        name="confirm-password"
                        placeholder="Nhập lại mật khẩu"
                        value={isConfirmPass}
                        onChange={(e) => setIsConfirmPass(e.target.value)}
                        id="confirm-password"
                        class="placeholder:font-thin placeholder:italic placeholder:text-sm bg-gray-50 border border-gray-300 shadow-lg shadow-indigo-500/40 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>

                    <button
                      // type="submit"
                      onClick={(e) => handleChange(e)}
                      class="w-full bg-green-400 text-white bg-primary-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Xác Nhận Thay Đổi
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePass;
