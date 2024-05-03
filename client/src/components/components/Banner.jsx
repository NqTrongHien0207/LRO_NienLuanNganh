import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContextProvider";
import {
  CNTT,
  GDDT,
  KNM,
  KNTN,
  KTCN,
  NLN,
  NN,
  YTSK,
} from "../../images/index.js";
function Banner() {
  const [list, setList] = useState([
    {
      url: CNTT,
      caption: "Slide 1",
      category: "CNTT",
    },
    {
      url: GDDT,
      caption: "Slide 2",
      category: "CNTT",
    },
    {
      url: KNTN,
      caption: "Slide 3",
      category: "CNTT",
    },
    {
      url: KNM,
      caption: "Slide 4",
      category: "CNTT",
    },
    {
      url: KTCN,
      caption: "Slide 5",
      category: "CNTT",
    },
    {
      url: NLN,
      caption: "Slide 6",
      category: "CNTT",
    },
    {
      url: NN,
      caption: "Slide 7",
      category: "CNTT",
    },
    {
      url: YTSK,
      caption: "Slide 8",
      category: "CNTT",
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setList((list) => {
        const shuffledList = [...list];
        for (let i = shuffledList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = shuffledList[i];
          shuffledList[i] = shuffledList[j];
          shuffledList[j] = temp;
        }
        return shuffledList;
      });
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function renderImg() {
    return (
      <>
        {list.map((i, index) => {
          return <div className="w-full h-full " data-src={i.url} />;
        })}

        {/* <div className="w-full h-full" data-src={randomizedArray[1].url} />
          <div className="w-full h-full" data-src={randomizedArray[2].url} />
          <div className="w-full h-full" data-src={randomizedArray[3].url} />
          <div className="w-full h-full" data-src={randomizedArray[4].url} />
          <div className="w-full h-full" data-src={randomizedArray[5].url} />
          <div className="w-full h-full" data-src={randomizedArray[6].url} />
          <div className="w-full h-full" data-src={randomizedArray[7].url} /> */}
      </>
    );
  }
  return (
    <>
      <div className="w-full h-full">
        <AwesomeSlider className="h-full">
          <div className="w-full h-full" data-src={list[1].url} />
          <div className="w-full h-full" data-src={list[2].url} />
          <div className="w-full h-full" data-src={list[3].url} />
          <div className="w-full h-full" data-src={list[4].url} />
          <div className="w-full h-full" data-src={list[5].url} />
          <div className="w-full h-full" data-src={list[6].url} />
          <div className="w-full h-full" data-src={list[7].url} />
        </AwesomeSlider>
      </div>
    </>
  );
}

export default Banner;
