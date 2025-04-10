import { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ api_url }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aqiClass, setAqiClass] = useState("")
  const [aqi, setAqi] = useState(0)
  const [advice, setAdvice] = useState("")
  const [values, setValues] = useState({
    "Ozone (ppm)": 0,
    "Carbon Monoxide (ppm)": 0,
    "Carbon Dioxide (ppm)": 0,
    "TVOC (ppb)": 0,
    "PM2.5 (µg/m³)": 0,
    "PM10 (µg/m³)": 0,
    "Nitrogen Dioxide (ppm)": 0,
    "Sulfur Dioxide (ppm)": 0,
    "Hydrogen Sulfide (ppm)": 0,
  });

  const [limits, setLimits] = useState({
    "Ozone (ppm)": [64, 84, 85, 104, 124, 374, 500],
    "Carbon Monoxide (ppm)": [50, 100, 199, 299, 400],
    "Carbon Dioxide (ppm)": [500, 1000, 1500, 1800], 
    "TVOC (ppb)": [65, 220, 660, 2200, 5500], // Converted to ppb
    "PM2.5 (µg/m³)": [10, 20, 25, 50, 75, 200],
    "PM10 (µg/m³)": [20, 40, 50, 100, 150, 250],
    "Nitrogen Dioxide (ppm)": [40, 90, 120, 230, 340, 500],
    "Sulfur Dioxide (ppm)": [100, 200, 350, 500, 750, 1250],
    "Hydrogen Sulfide (ppm)": [10, 50, 300, 700, 1000],
  });

  useEffect(() => {
    const fetchParams = () => {
      fetch(`${api_url}/api/sensor-data`)
        .then((response) => response.json())
        .then((data) => {
          const mappedData = {
            "Ozone (ppm)": parseFloat(data.find(item => item.id === "O3PPM_container")?.value) || 0,
            "Carbon Monoxide (ppm)": parseFloat(data.find(item => item.id === "CO_container")?.value) || 0,
            "Carbon Dioxide (ppm)": parseFloat(data.find(item => item.id === "CO2_container")?.value) || 0,
            "TVOC (ppb)": parseFloat(data.find(item => item.id === "TVOC_container")?.value) || 0,
            "PM2.5 (µg/m³)": parseFloat(data.find(item => item.id === "PM2_container")?.value) || 0,
            "PM10 (µg/m³)": parseFloat(data.find(item => item.id === "PM10_container")?.value) || 0,
            "Nitrogen Dioxide (ppm)": parseFloat(data.find(item => item.id === "NO2PPM_container")?.value) || 0,
            "Sulfur Dioxide (ppm)": parseFloat(data.find(item => item.id === "SO2PPM_container")?.value) || 0,
            "Hydrogen Sulfide (ppm)": parseFloat(data.find(item => item.id === "H2SPPM_container")?.value) || 0,
          };

          setAdvice(data.find(item => item.id === "aqi_container")?.advice)
          setAqiClass(data.find(item => item.id === "aqi_container")?.evaluation)
          // setAqi(data.find(item => item.id === "aqi_container")?.aqi)
          setValues(mappedData);
        });
    };

    fetchParams();
    const interval = setInterval(fetchParams, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => clearInterval(clockInterval);
  }, []);

  const fullDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);
  
  const shortDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(currentTime);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="relative w-screen mt-4">
      <div>
        <h1 className="text-3xl text-center cursor-pointer" onClick={() => navigate("/")} >Air Quality Index</h1>
      </div>
      <div className="w-screen flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 p-4">
          {/* Left side (2/3 width) */}
          <div className="flex justify-center items-start">
            <div className="grid grid-cols-3 grid-rows-3 p-4">
              {Object.entries(values).map(([key, val], index) => {
                 const maxLimit = limits[key]?.[limits[key].length - 1] || 100; 

                 // Generate subArcs dynamically based on limits
                 const colorScale = ["#5BE12C", "#F5DD42", "#FFA500", "#FF4500", "#D32F2F", "#800000", "#400000"]; 

                 const subArcs = (limits[key] || []).map((limit, i, arr) => ({
                   limit,
                   color: colorScale[i % colorScale.length], // Cycle through colors
                 }));
                return (
                  <div className="flex flex-col items-center justify-center " key={index}>
                  <GaugeComponent
                    value={val}
                    minValue={0}
                    maxValue={maxLimit} 
                    type="radial"
                    textColor="transparent"
                    labels={{
                      display: false
                    }}
                    arc={{
                            colorArray: subArcs.map(sa => sa.color),
                            subArcs: subArcs,
                            padding: 0.0,
                            width: 0.5,
                            cornerRadius: 1,
                          }}
                    pointer={{
                      elastic: true,
                      animationDelay: 0
                    }}
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "120px", height: "120px" }} 
                    />
                    <h2 className="text-xs md:text-sm sm:text-md text-center">{key}</h2>
                </div>
                )
              })}
            </div>
          </div>
          
          {/* Right side (1/3 width) with bigger gauge */}
          <div className="flex items-start justify-center p-4">
            <div className="relative flex flex-col justify-center items-center w-full aspect-square">
              {/* Date time here */}
              <div className="text-center mb-2">
                <h3 className="hidden md:block text-sm md:text-md font-semibold">{fullDate}</h3>
                <h3 className="md:hidden text-sm font-semibold">{shortDate}</h3>
                <h3 className="text-sm md:text-md">{formattedTime}</h3>
              </div>
              <GaugeComponent
                value={50}
                type="radial"
                textColor="transparent"
                labels={{
                  display: false
                }}
                arc={{
                  colorArray: ['#5BE12C','#EA4228'],
                  subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
                  padding: 0.00,
                  width: 0.5,
                  cornerRadius: 1
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0
                }}
                style={{ maxWidth: "100%", maxHeight: "100%", width: "360px" }} 
              />
              <h2>Overall Air Quality</h2>
              <h2 className="relative group cursor-help">
                {aqiClass}
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs text-sm text-white bg-gray-800 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  {advice}
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-screen p-8 md:p-16 flex justify-start md:justify-center">
        <div className="">
          <button onClick={() => navigate("/learnmore")} className="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10rem] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Learn More</button>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}