import React, { useEffect, useState } from "react";
import { register } from "../../service/Account/Register.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase.js";
import { authentication } from "../../firebase.js";
import { login } from "../../service/Account/Login.js";
import Swal from "sweetalert2";
import removeVietnameseAndWhitespace from "../../func/remove.class.js";
import { splitName } from "../../func/sliceName.js";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
function Register() {
  const navigation = useNavigate();
  const firebaseAuth = getAuth(app);
  const [errors, setErorrs] = useState(null);
  const [avatar, setAvatar] = useState();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [form2, setForm2] = useState({
    form: "",
    uid: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    avatar: "",
    first_name: "",
    last_name: "",
    isSex: "",
    phone: "",
  });

  const loginWithGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const username = removeVietnameseAndWhitespace(
      user?.displayName.toLocaleLowerCase()
    );
    const { firstName, lastName } = splitName(user?.displayName);

    form2.form = "google";
    form2.uid = user?.uid;
    form2.username = username;
    form2.email = user?.email;
    form2.password = username;
    form2.avatar = user?.photoURL;
    form2.first_name = firstName;
    form2.last_name = lastName;
    form2.isSex = 3;
    form2.phone = user?.uid;

    Func_Register();
  };

  const loginWithFacebook = async (e) => {
    const provider = new FacebookAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const username = removeVietnameseAndWhitespace(
      user?.displayName.toLocaleLowerCase()
    );
    const { firstName, lastName } = splitName(user?.displayName);

    // const { refreshToken, providerData } = user;
    // setForm2
    // console.log(user);
    form2.form = "facebook";
    form2.uid = user?.uid;
    form2.username = username;
    form2.email = user?.email;
    form2.password = username;
    form2.avatar = user?.photoURL;
    form2.first_name = firstName;
    form2.last_name = lastName;
    form2.isSex = 3;
    form2.phone = user?.uid;
    // console.table(form2);
    Func_Register();
  };

  const Func_Login = async () => {
    // console.log("Login run");
    const resultLogin = await login(form2);
    // console.log(resultLogin);
    if (resultLogin.status == 200) {
      if (resultLogin.data.status === 200) {
        toast(resultLogin.data.message);
        // toast("Vui Lòng Chờ");
        // console.log(result);
        localStorage.setItem("user", JSON.stringify(resultLogin.data.data));
        setTimeout(() => {
          // window.location.href = "/";
          window.location = "/";
        }, 2000);
        return;
      }
      if (resultLogin.data.status === 201) {
        // setErorrs(resultLogin.data.data);
        toast(resultLogin.data.data);
        // console.log()
        return;
      }

      if (resultLogin.data.status === 202) {
        toast(resultLogin.data.message);
        return;
      }
    }
    // console.warn(errors);
  };
  const Func_Register = async () => {
    const result = await register(form2);
    // console.log(result);
    if (result.status == 200) {
      if (result.data.status === 200) {
        // console.log(result.data);
        // localStorage.setItem("user", JSON.stringify(result.data.data));
        // toast("Register Successfully");
        let timerInterval;
        Swal.fire({
          title: "Register Successfully",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        setTimeout(() => {
          Func_Login();
        }, 1000);
        return;
      }
      if (result.data.status === 201) {
        // setErorrs(result.data.data);
        // console.log("201", result.data.data);
        toast("Hãy Kiểm Tra lại các thông tin");
        return;
      }
      if (result.data.status === 202) {
        Func_Login();
        return;
      }
    }
  };

  // setForm data
  const handleChange = (e) => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  // submit btn register
  const handleSubmit = async (e) => {
    // const result = await re(form);
    form2.form = "LRO";
    form2.avatar = avatar;
    // form2.uid = user?.uid;
    if (form2.password === form2.passwordConfirmation) {
      const result = await register(form2);
      if (result.status == 200) {
        if (result.data.status === 200) {
          toast("Register Successfully");

          setTimeout(() => {
            navigation("/login");
          }, 2000);
          return;
        }
        if (result.data.status === 201) {
          setErorrs(result.data.data);
          toast(result.data.data);
          return;
        }

        if (result.data.status === 202) {
          toast(result.data.message);
          return;
        }
      }
    } else {
      toast("Mật Khẩu Không Khớp");
    }
  };

  useEffect(() => {
    console.table(form2);
  }, [form2]);

  const uploadImage = (e) => {
    e.preventDefault();
    try {
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      const fileName = new Date().getTime() + imageFile.name;

      const storageRef = ref(
        storage,
        `avt/${fileName.split("").join("").toUpperCase()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAvatar(downloadURL);
            toast("Thêm ảnh đại diện thành công");

            // console.log(downloadURL);
          });
        }
      );
    } catch (error) {}
  };

  return (
    <>
      <>
        <ToastContainer />
        <>
          {/*  
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
              Sign Up
            </h1>
            <div className="mt-6">
              <div className="mb-2">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={handleChange}
                  name="username"
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  for="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  name="password"
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors?.email && (
                  <>
                    <small id="emailHelp" class="form-text text-danger">
                      {errors.email.msg}
                    </small>
                  </>
                )}
              </div>
               <a href="#" className="text-xs text-blue-600 hover:underline">
                Forget Password?
              </a> 
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  id="register_Submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-white">Or</div>
            </div>
            <div className="flex mt-4 gap-x-2">
              <button
                onClick={loginWithGoogle}
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
              <button
                onClick={loginWithFacebook}
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              >
                <svg
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" />
                </svg>
              </button>
            </div>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              You have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>*/}
        </>
        <div className="hidden relative flex bg-gray-200 opacity-100 justify-center min-h-[80vh]  lg:min-h-[90vh] items-center  overflow-hidden">
          <div className="w-full m-auto  rounded-xs  md:max-w-5xl lg:max-w-4xl">
            <div class="grid grid-flow-row-dense grid-cols-3  ">
              <div className=" w-full z-50  ml-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <div className="relative flex flex-col justify-center h-full overflow-hidden">
                  <div className="w-full h-full m-auto flex justify-center items-center  p-2  bg-primary rounded-md shadow-xl lg:max-w-xl">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className=" h-full w-full flex text-center flex-col space-y-5 items-center justify-center ">
                        <div className="text-3xl font-sans font-bold">
                          <p>Hello, Friend!</p>
                        </div>

                        <div className="text-slate-400">
                          <p>
                            Fill up personal information and
                            <br /> start journey with us
                          </p>
                        </div>

                        <div>
                          <Link
                            to={"/login"}
                            className="bg-blue-600 text-white font-bold py-2 px-10 rounded-full"
                          >
                            SIGN IN
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-2  w-full z-10 shadow-[0_35px_60px_-15px_rgba(0,255,255,0.3)]">
                <div className="relative flex flex-col justify-center  overflow-hidden">
                  <div className="w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">
                    <>
                      {/* <div className="relative flex flex-col justify-center min-h-screen overflow-hidden"> */}
                      {/* <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl"> */}
                      <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
                        Sign Up
                      </h1>
                      <div className="mt-6">
                        <div class="grid gap-4 grid-cols-2 mb-2">
                          <div className="w-full">
                            <label
                              for="email"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              Họ
                            </label>
                            <input
                              type="text"
                              id="username"
                              onChange={handleChange}
                              name="first_name"
                              // placeholder="first_name"
                              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"

                              // className="block w-full border-2 border-white border-b-indigo-500 px-4 py-2 mt-2 text-blue-700 bg-white  rounded "
                            />
                          </div>

                          <div className="w-full">
                            <label
                              for="email"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              Tên
                            </label>
                            <input
                              type="text"
                              // id="username"
                              onChange={handleChange}
                              name="last_name"
                              // placeholder="last_name"
                              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"

                              // className="block w-full border-2 border-white border-b-indigo-500 px-4 py-2 mt-2 text-blue-700 bg-white  rounded "
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            id="username"
                            onChange={handleChange}
                            name="username"
                            // placeholder="User Name"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"

                            // className="block w-full border-2 border-white border-b-indigo-500 px-4 py-2 mt-2 text-blue-700 bg-white  rounded "
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>
                        <div className="mb-2">
                          <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                          {errors?.email && (
                            <>
                              <small
                                id="emailHelp"
                                class="form-text text-danger"
                              >
                                {errors.email.msg}
                              </small>
                            </>
                          )}
                        </div>
                        <a
                          href="#"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Forget Password?
                        </a>
                        <div className="mt-6">
                          <button
                            onClick={handleSubmit}
                            id="register_Submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white">Or</div>
                      </div>
                      <div className="flex mt-4 gap-x-2">
                        <button
                          onClick={loginWithGoogle}
                          type="button"
                          className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                          </svg>
                        </button>
                        <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                          >
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={loginWithFacebook}
                          className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        >
                          <svg
                            viewBox="0 0 512 512"
                            className="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" />
                          </svg>
                        </button>
                      </div>

                      <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        You have an account?{" "}
                        <Link
                          to="/login"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Sign in
                        </Link>
                      </p>
                      {/* </div> */}
                      {/* </div> */}
                    </>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <section class="max-w-4xl p-6 mx-auto bg-blue-400 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 class="text-xl font-bold text-white capitalize dark:text-white">
              Đăng Ký Tài Khoản
            </h1>
            <div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label class="text-white dark:text-gray-200" for="username">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    onChange={handleChange}
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="emailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label class="text-white dark:text-gray-200" for="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Password Confirmation
                  </label>
                  <input
                    id="passwordConfirmation"
                    onChange={handleChange}
                    type="password"
                    name="passwordConfirmation"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Họ
                  </label>
                  <input
                    id="color"
                    name="first_name"
                    onChange={handleChange}
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Tên
                  </label>
                  <input
                    id="color"
                    type="text"
                    onChange={handleChange}
                    name="last_name"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Giới Tính
                  </label>
                  <select
                    name="isSex"
                    onChange={handleChange}
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  >
                    <option value={1}>Nam</option>
                    <option value={2}>Nữ</option>
                    <option value={3}>Khác</option>
                  </select>
                </div>

                <div>
                  <label
                    class="text-white dark:text-gray-200"
                    for="passwordConfirmation"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-white">
                    Image
                  </label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-white"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span class="">Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            name="upload-image"
                            accept="image/*"
                            onChange={uploadImage}
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1 text-white">or drag and drop</p>
                      </div>
                      <p class="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </div>
          </section>
        </>
      </>
    </>
  );
}

export default Register;
