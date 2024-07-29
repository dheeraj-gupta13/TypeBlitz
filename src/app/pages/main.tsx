"use client";

import { useState } from "react";
import TypingArea from "../components/typingArea";
import Header from "../components/header";

const TotalTime = 5;

export default function Editor() {
  const [timeRemaining, setTimeRemaining] = useState(TotalTime);
  const [timerStarted, setTimerStarted] = useState(false);
  const [fontFamily, setFontFamily] = useState("font-mono");

  return (
    <div>
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
