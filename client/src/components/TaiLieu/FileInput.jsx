import { useRef, useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import check from "../../images/check.png";

import { ProductContext } from "../../contexts/ProductContextProvider.jsx";
import removeVietnameseAndWhitespace from "../../func/remove.class.js";
import { randomString } from "../../func/RamdomString.js";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
  const { user } = useContext(ProductContext);
  const uid = `[${user?.userId}]_${removeVietnameseAndWhitespace(
    user?.username
  )}`;
  // console.log(uid);
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(Boolean(true));
  const [valueInput, setValueInput] = useState("");

  const handleUpload = () => {
    console.log(value);
    setProgressShow(false);
    // const fileName =
    //   new Date().getTime() + removeVietnameseAndWhitespace(value?.name);
    const fileName = randomString(20);
    const storageRef = ref(
      storage,
      type === "docs" ? `/docs/${uid}/${fileName}` : `/images/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, value);
    if (value?.type == "application/pdf") {
      // setProgressShow(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploaded);
          // console.log(uploaded);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            handleInputState(name, url);
            handleInputState("id_URL", fileName);
          });
        }
      );
      setProgressShow(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui Lòng Chọn File PDF",
        text: "Hãy Chọn Tài Liệu Định Dạng PDF",
      });
      setProgressShow(true);
      value = "";
    }
  };
  function validatePDF(file) {
    const fileExtension = file.name.toLowerCase().split(".").pop();
    if (fileExtension == "pdf") {
      // console.log("true");
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui Lòng Chọn File PDF",
        text: "Something went wrong!",
      });
      return false;
    }
  }

  const handleChangeInput = (e) => {
    try {
      // handleInputState(name, e.currentTarget.files[0]);
      setValueInput(e.currentTarget.files[0]);
      handleInputState(name, valueInput);
    } catch (error) {}
  };

  return (
    <>
      <div
        className={`inline-grid w-full h-full justify-center items-center -mt-4 `}
      >
        <div className="flex gap-4 w-full h-full justify-center items-center">
          {progress == 0 && (
            <button
              type="button"
              onClick={() => inputRef.current.click()}
              class="flex rounded bg-primary px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              // className={`block text-white bg-gradient-to-br from-green-400 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2`}
            >
              <span>{label}</span>
            </button>
          )}

          {value != "" && progressShow && progress < 1 ? (
            <button
              onClick={handleUpload}
              class="flex rounded bg-primary px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase
               leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
               transition duration-150 ease-in-out text-black 
               bg-gradient-to-br from-green-200 to-blue-300 hover:bg-gradient-to-bl
                focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium"

              // className={`block w-auto text-black bg-gradient-to-br from-blue-100 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
            >
              Đăng tài liệu
            </button>
          ) : (
            <></>
          )}

          {progress === 100 && (
            <div
              className={`flex absolute z-30 w-[10em] h-[10em] justify-center items-center`}
            >
              <img src={check} alt="check circle" />
            </div>
          )}
        </div>
        <span
          className={`${
            !value?.name ? "hidden" : ""
          } text-sm text-clip font-mono`}
        >
          {value?.name?.substring(0, 55) + "..."}
        </span>
        <div
          className={`hidden text-gray-700 border-sky-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
        >
          <input
            type="file"
            name="upload"
            // accept="application/pdf,application/vnd.ms-excel"
            accept="application/pdf"
            ref={inputRef}
            onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
            // className={`bg-red-400`}
            className={`text-black hidden border-sky-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
            {...rest}
          />
        </div>

        {/* {type === "docs" && value && (
  // <audio
  //   src={typeof value === "string" ? value : URL.createObjectURL(value)}
  //   controls
  // />
)} */}

        {progressShow && progress > 1 && (
          <div
            className={`container h-5 flex items-center justify-center border-none bg-blue-300 rounded-full text-red-500`}
          >
            <p>{progress}%</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
