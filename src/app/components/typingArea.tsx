"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_PARAGRAPHS } from "../../app/para/data";
import { FiRefreshCcw } from "react-icons/fi";
import { CiDesktopMouse1, CiCircleRemove } from "react-icons/ci";
import { BiSolidKeyboard } from "react-icons/bi";
import Conclusion from "./conclusion";

// const TotalTime = 30;

let wpmArr: any = [];
let secArr: any = [];

export default function TypingArea({
  timerStarted,
  setTimerStarted,
  timeRemaining,
  setTimeRemaining,
  TotalTime,
}: any) {
  const router = useRouter();

  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState("Loading...");
  //   const [timeRemaining, setTimeRemaining] = useState(TotalTime);
  //   const [timerStarted, setTimerStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [words, setWords] = useState(0);
  const [fontFamily, setFontFamily] = useState("font-mono");
  const [fontFamilyOpen, setFontFamilyOpen] = useState(false);
  const [wrongTyped, setWrongTyped] = useState(0);

  const fetchNewPara = () => {
    let idx = Math.floor(Math.random() * 10);
    setText(SAMPLE_PARAGRAPHS[idx]);
  };

  useEffect(() => {
    const fontFamily = localStorage.getItem("font-family") || "font-mono";
    setFontFamily(fontFamily);
    fetchNewPara();
  }, []);

  const handleClick = (e: any) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }

    if (e.key === text[index]) {
      setUserInput(userInput + e.key);
      setIndex(index + 1);
      setWords(words + 1);
    } else {
      if (e.key !== "CapsLock" && e.key !== "Shift") {
        setWrongTyped(wrongTyped + 1);
      }
    }
  };

  // renders -> either change in timeRemaining, or timeStarted
  useEffect(() => {
    if (!timerStarted) return;

    let IntervalId: any = null;

    if (timeRemaining > 0) {
      IntervalId = setInterval(() => {
        const timeSpend = TotalTime - timeRemaining;
        const wpm = timeSpend > 0 ? (words / 5 / timeSpend) * 60.0 : 0;
        setTimeRemaining((timeRemaining: any) => timeRemaining - 1);
        setWpm(Math.round(wpm));

        wpmArr.push(wpm);
        secArr.push(timeSpend);
      }, 1000);
    } else {
      clearInterval(IntervalId);
      let accuracy = ((words - wrongTyped) / words) * 100;
      let new_accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;
      console.log(new_accuracy);
      // router.push(`/performance?WPM=${wpm}&ACCURACY=${new_accuracy}`);
    }

    return () => clearInterval(IntervalId);
  }, [timeRemaining, timerStarted, router]);

  const setFont = (currFont: string) => {
    setFontFamily(currFont);
    localStorage.setItem("font-family", currFont);
  };

  return (
    <div>
      {timeRemaining == 0 ? (
        <Conclusion wpm={wpm} wpmArr={wpmArr} secArr={secArr} />
      ) : (
        <div>
          <div className="flex justify-between text-2xl mr-20 ml-10 mt-10 ">
            <div className=" text-white">{timerStarted && timeRemaining} </div>
            <div className="text-white">wpm : {wpm}</div>
          </div>

          {/* Typing Area */}
          <div className="tracking-wide text-2xl leading-normal ">
            <div
              className={`${fontFamily} text-gray-500 bg-gray-950 m-2 w-11/12 ml-10`}
            >
              {text}
            </div>

            <textarea
              value={userInput}
              onKeyDown={(e) => handleClick(e)}
              className={`${fontFamily} non-blinking-cursor tracking-wide bg-gray-900 absolute top-40 bg-sky-500/[0.01] border-none text-white  w-11/12 h-80 ml-10 resize-none`}
              name=""
              id="my_textarea"
            />
            <div
              onClick={fetchNewPara}
              className="text-white flex justify-center absolute bottom-10 left-1/2 cursor-pointer"
            >
              <div>
                <FiRefreshCcw />{" "}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ml-20 absolute bottom-2 text-white">
            {fontFamilyOpen && (
              <div className=" border-2 p-2 rounded-md cursor-pointer">
                <div onClick={() => setFont("font-mono")} className="font-mono">
                  font-mono
                </div>
                <div
                  onClick={() => setFont("font-serif")}
                  className="font-serif"
                >
                  font-serif
                </div>
                <div onClick={() => setFont("font-sans")} className="font-sans">
                  font-sans
                </div>
                <div onClick={() => setFont("inherit")} className="inherit">
                  inherit
                </div>
              </div>
            )}

            <div className="flex items-center">
              <div className={`${fontFamily} text-white mr-1`}>
                {fontFamily}
              </div>
              <div
                className="text-white"
                onClick={() => setFontFamilyOpen(!fontFamilyOpen)}
              >
                {!fontFamilyOpen ? (
                  <CiDesktopMouse1 className="text-white" />
                ) : (
                  <CiCircleRemove className="text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
