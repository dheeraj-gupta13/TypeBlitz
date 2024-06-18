import React from "react";
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

export default function Conclusion({ wpm, secArr, wpmArr }: any) {
  console.log("wpmArr", wpmArr);
  console.log("secArr", secArr);

  return (
    <div className="text-gray-500 p-20 flex gap-20 items-center">
      <div>
        <div>
          <p className="text-2xl">wpm</p>
          <p className="text-6xl font-semibold">{wpm}</p>
        </div>
        <div>
          <p className="text-2xl">acc</p>
          <p className="text-6xl font-semibold">{90}%</p>
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
  );
}
