import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { validateToken } from "../service/util";
import Link from "next/link";
import { getMaxSpeed, postTypingData } from "../service/api";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartComponentProps {
  label: string[];
  cdata: number[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  label,
  cdata,
}: any) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: "Dataset 1",
        data: cdata,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      //   {
      //     label: "Dataset 2",
      //     data: [28, 48, 40, 19, 86, 27, 90],
      //     fill: false,
      //     backgroundColor: "rgba(153,102,255,0.4)",
      //     borderColor: "rgba(153,102,255,1)",
      //   },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart Example",
      },
    },
  };

  return <Line data={data} height={350} width={800} />;
};

export default function Conclusion({
  wpm,
  secArr,
  wpmArr,
  words,
  wrongTyped,
}: any) {
  console.log("wpmArr", wpmArr);
  console.log("secArr", secArr);
  const [maxWpm, setMaxWpm] = useState<null | String>(null);
  const [accuracy, setAccuracy] = useState(0);

  const postData = async (typingData: any) => {
    const res = await postTypingData(typingData);
    return res;
  };

  useEffect(() => {
    const resolveValueAndFetchData = async () => {
      console.log("words", words);
      console.log("wrongTyped", wrongTyped);
      let accuracy = ((words - wrongTyped) / words) * 100;
      let new_accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;
      console.log(new_accuracy);
      setAccuracy(new_accuracy);

      const res = validateToken();
      console.log("validte token", res);
      if (res) {
        // getUserMaxWpm and set it to maxWpm
        setMaxWpm(wpm);

        const typingData = {
          wpm: wpm,
          accuracy: new_accuracy,
        };

        console.log("typingData,,,,,,,", typingData);
        const res = await postTypingData(typingData);
        console.log("====>", res);

        const mx = (await getMaxSpeed()) || { maxWpm: 40 };
        setMaxWpm(mx.maxWpm);
      }
    };

    resolveValueAndFetchData();
  }, []);

  return (
    <>
      <div className="text-gray-500 p-20 flex gap-20 items-center">
        <div>
          <div>
            <p className="text-2xl">wpm</p>
            <p className="text-6xl font-semibold">{wpm}</p>
          </div>
          <div>
            <p className="text-2xl">acc</p>
            <p className="text-6xl font-semibold">{accuracy}%</p>
          </div>
          <div>
            <p className="text-2xl">time</p>
            <p className="text-6xl font-semibold">{15}s</p>
          </div>
        </div>
        <div>
          <LineChartComponent label={secArr} cdata={wpmArr} />
        </div>
      </div>
      <div className="text-white flex justify-center">
        {!maxWpm ? (
          <p>
            <Link className="underline" href="/login">
              Sign in
            </Link>{" "}
            to save your responses
          </p>
        ) : (
          <p>Max Speed : {maxWpm}</p>
        )}
      </div>
    </>
  );
}
