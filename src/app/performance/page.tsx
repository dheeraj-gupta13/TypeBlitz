'use client'

import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Plot from 'react-plotly.js';

function ResultPage() {

  const searchParams = useSearchParams();
  const [wpm, setWpm] = useState("0");
  const [accuracy, setAccuracy] = useState("0");
  const [wpmArr] = useState<number[]>([]);
  const [accuracyArr ] = useState<string[]>([]);
  const [idxArr ] = useState<number[]>([]);
  const [maxWpm, setMaxWpm] = useState(0);

 
  useEffect(() => {
    
    const WPM = searchParams.get('WPM') || "0";
    const ACCURACY = searchParams.get('ACCURACY') || "0";
    setWpm(WPM);
    setAccuracy(ACCURACY);

    // Perform localStorage action
    let oldData = JSON.parse(localStorage.getItem('wpm') || "[]");

    if(ACCURACY !== "NaN" && ACCURACY !== "-Infinity"){
      oldData.push({wpm: WPM, accuracy: ACCURACY});
    }

    let i = 1;
    oldData.map((data: { wpm: number; accuracy: number }) => {
      wpmArr.push(data.wpm);
      accuracyArr.push(data.accuracy.toString() + "%");
      idxArr.push(i);
      i++;
      return data;
    })

    let max_of_wpm = Math.max.apply(Math, wpmArr);
    setMaxWpm(max_of_wpm);
    localStorage.setItem('wpm', JSON.stringify(oldData));
  
  }, [])
  

  return (
    <div className='text-white'>

      <div>
        <div className={`${"fontFamily"} flex justify-center text-white text-5xl tracking-wider mt-8`}>TypeBlitz</div>
      </div>

      <div className=' ml-20 flex items-center'>
        <div>
          <div>
            <div className='text-4xl text-gray-500'>wpm</div>
            <div className='text-7xl'>{wpm}</div>
          </div>
          <div>
            <div className='text-4xl  text-gray-500'>accuracy</div>
            <div className='text-7xl'>{accuracy}%</div>
          </div>
        </div>

        <div className='ml-10'>
          <Plot
            data={[
              {
                x: idxArr,
                y: wpmArr,
                type: 'scatter',
                mode: 'lines+markers',
                text: accuracyArr,
                marker: {color: 'blue'},
              },
            ]}

            layout={{ 
              xaxis: {
                // showgrid: false,
                "tickcolor": "gray",
                "tickwidth": 1,
                
                "gridcolor": "gray",
                "gridwidth": 1,  
              },
              yaxis: {
                  // showgrid: false,
                  // showline: false,
                  "tickcolor": "gray",
                  "tickwidth": 1,
                  
                  "gridcolor": "gray",
                  "gridwidth": 1,
                  
                  "zerolinecolor": "green",
                  "zerolinewidth": 1,
              },  
              width: 800, height: 400, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)'} }
          />
        </div>
      </div>

      <div className='mr-28 flex justify-end'>
        <div className='text-white text-3xl'>Highest : <span className='text-5xl'>{maxWpm}</span> wpm</div>
      </div>
    </div>
  )
}

export default ResultPage