"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_PARAGRAPHS } from "../../app/para/data";
import { FiRefreshCcw } from "react-icons/fi";
import { CiDesktopMouse1, CiCircleRemove } from "react-icons/ci";
import { BiSolidKeyboard } from "react-icons/bi";
import TypingArea from "../components/typingArea";
import Conclusion from "../components/conclusion";
import Header from "../components/header";

const TotalTime = 5;

export default function Editor() {
  const router = useRouter();

  //   const [userInput, setUserInput] = useState("");
  //   const [text, setText] = useState("Loading...");
  const [timeRemaining, setTimeRemaining] = useState(TotalTime);
  const [timerStarted, setTimerStarted] = useState(false);
  //   const [index, setIndex] = useState(0);
  //   const [wpm, setWpm] = useState(0);
  //   const [words, setWords] = useState(0);
  const [fontFamily, setFontFamily] = useState("font-mono");
  //   const [fontFamilyOpen, setFontFamilyOpen] = useState(false);
  //   const [wrongTyped, setWrongTyped] = useState(0);

  //   const fetchNewPara = () => {
  //     let idx = Math.floor(Math.random() * 10);
  //     setText(SAMPLE_PARAGRAPHS[idx]);
  //   };

  //   useEffect(() => {
  //     const fontFamily = localStorage.getItem("font-family") || "font-mono";
  //     setFontFamily(fontFamily);
  //     fetchNewPara();
  //   }, []);

  //   const handleClick = (e: any) => {
  //     if (!timerStarted) {
  //       setTimerStarted(true);
  //     }

  //     if (e.key === text[index]) {
  //       setUserInput(userInput + e.key);
  //       setIndex(index + 1);
  //       setWords(words + 1);
  //     } else {
  //       if (e.key !== "CapsLock" && e.key !== "Shift") {
  //         setWrongTyped(wrongTyped + 1);
  //       }
  //     }
  //   };

  // renders -> either change in timeRemaining, or timeStarted
  //   useEffect(() => {
  //     if (!timerStarted) return;

  //     let IntervalId: any = null;

  //     if (timeRemaining > 0) {
  //       IntervalId = setInterval(() => {
  //         const timeSpend = TotalTime - timeRemaining;
  //         const wpm = timeSpend > 0 ? (words / 5 / timeSpend) * 60.0 : 0;
  //         setTimeRemaining((timeRemaining) => timeRemaining - 1);
  //         setWpm(Math.round(wpm));
  //       }, 1000);
  //     } else {
  //       clearInterval(IntervalId);
  //       let accuracy = ((words - wrongTyped) / words) * 100;
  //       let new_accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;
  //       console.log(new_accuracy);
  //       // router.push(`/performance?WPM=${wpm}&ACCURACY=${new_accuracy}`);
  //     }

  //     return () => clearInterval(IntervalId);
  //   }, [timeRemaining, timerStarted, router]);

  //   const setFont = (currFont: string) => {
  //     setFontFamily(currFont);
  //     localStorage.setItem("font-family", currFont);
  //   };

  return (
    <div>
      {/* Header */}

      <Header fontFamily={fontFamily} />

      <TypingArea
        timerStarted={timerStarted}
        setTimerStarted={setTimerStarted}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        TotalTime={TotalTime}
      />
    </div>
  );
}
