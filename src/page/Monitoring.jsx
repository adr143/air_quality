import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";
import { useNavigate } from "react-router-dom";

export default function Monitoring({ api_url }) {
  const navigate = useNavigate();
  const [aqiClass, setAqiClass] = useState("")
  const [aqi, setAqi] = useState(0)
  const [tomAqiClass, setTomAqiClass] = useState("")
  const [tomAqi, setTomAqi] = useState(0)
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
  const [tomValues, setTomValues] = useState({
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
    "Carbon Dioxide (ppm)": [500, 1000, 1500, 2000], 
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
            "TVOC (ppb)": parseFloat(data.find(item => item.id === "TVOC_container")?.value) || 0, // Already in ppb
            "PM2.5 (µg/m³)": parseFloat(data.find(item => item.id === "PM2_container")?.value) || 0,
            "PM10 (µg/m³)": parseFloat(data.find(item => item.id === "PM10_container")?.value) || 0,
            "Nitrogen Dioxide (ppm)": parseFloat(data.find(item => item.id === "NO2PPM_container")?.value) || 0,
            "Sulfur Dioxide (ppm)": parseFloat(data.find(item => item.id === "SO2PPM_container")?.value) || 0,
            "Hydrogen Sulfide (ppm)": parseFloat(data.find(item => item.id === "H2SPPM_container")?.value) || 0,
          };

          setAqiClass(data.find(item => item.id === "aqi_container")?.evaluation)
          // setAqi(data.find(item => item.id === "aqi_container")?.aqi)
          setValues(mappedData);
        });
    };

    const fetchTomParams = () => {
      fetch(`${api_url}/api/sensor-data/true`)
        .then((response) => response.json())
        .then((data) => {
          const mappedData = {
            "Ozone (ppm)": parseFloat(data.find(item => item.id === "O3PPM_container")?.value) || 0,
            "Carbon Monoxide (ppm)": parseFloat(data.find(item => item.id === "CO_container")?.value) || 0,
            "Carbon Dioxide (ppm)": parseFloat(data.find(item => item.id === "CO2_container")?.value) || 0,
            "TVOC (ppb)": parseFloat(data.find(item => item.id === "TVOC_container")?.value) || 0, // Already in ppb
            "PM2.5 (µg/m³)": parseFloat(data.find(item => item.id === "PM2_container")?.value) || 0,
            "PM10 (µg/m³)": parseFloat(data.find(item => item.id === "PM10_container")?.value) || 0,
            "Nitrogen Dioxide (ppm)": parseFloat(data.find(item => item.id === "NO2PPM_container")?.value) || 0,
            "Sulfur Dioxide (ppm)": parseFloat(data.find(item => item.id === "SO2PPM_container")?.value) || 0,
            "Hydrogen Sulfide (ppm)": parseFloat(data.find(item => item.id === "H2SPPM_container")?.value) || 0,
          };

          setTomAqiClass(data.find(item => item.id === "aqi_container")?.evaluation)
          // setTomAqi(data.find(item => item.id === "aqi_container")?.aqi)
          setTomValues(mappedData);
        });
    };

    fetchParams();
    fetchTomParams();
    const interval = setInterval(fetchParams, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen mb-16 md:mb-0">
      <div>
        <h1 className="text-3xl text-center cursor-pointer p-4" onClick={() => navigate("/")}>Air Quality Index</h1>
      </div>
      <div className="w-screen flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] p-4">
          <div className="flex justify-center">
            <div className="">
              <div className="flex justify-center items-start">
                <div className="grid grid-cols-3 grid-rows-3 md:grid-cols-5 md:grid-rows-2 text-center">
                  {Object.entries(values).map(([key, val], index) => {
                    const maxLimit = limits[key]?.[limits[key].length - 1] || 100; 

                    // Generate subArcs dynamically based on limits
                    const colorScale = ["#5BE12C", "#F5DD42", "#FFA500", "#FF4500", "#D32F2F", "#800000", "#400000"]; 

                    const subArcs = (limits[key] || []).map((limit, i, arr) => ({
                      limit,
                      color: colorScale[i % colorScale.length], // Cycle through colors
                    }));

                    return (
                      <div className="flex flex-col items-center justify-center mx-4" key={index}>
                        <GaugeComponent
                          value={val}
                          minValue={0}
                          maxValue={maxLimit} 
                          type="radial"
                          textColor="transparent"
                          labels={{ display: false }}
                          arc={{
                            colorArray: subArcs.map(sa => sa.color),
                            subArcs: subArcs,
                            padding: 0.0,
                            width: 0.5,
                            cornerRadius: 1,
                          }}
                          pointer={{ elastic: true, animationDelay: 0 }}
                          style={{ maxWidth: "100%", maxHeight: "100%", width: "120px", height: "120px" }}
                        />
                        <h2 className="text-[.5rem] md:text-[.75rem] text-center">{key}</h2>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Overall Air Quality Gauge */}
              <div className="flex items-start justify-center">
                <div className="relative grid grid-cols-2 place-center" >
                <div className="relative flex flex-col justify-center items-center">
                  <GaugeComponent
                    value={aqi}
                    minValue={0}
                    maxValue={500}
                    type="radial"
                    textColor="transparent"
                    labels={{ display: false }}
                    arc={{
                      colorArray: ["#5BE12C", "#EA4228"],
                      subArcs: [{ limit: 100 }, { limit: 150 }, { limit: 250 }, { limit: 350 }],
                      padding: 0.0,
                      width: 0.5,
                      cornerRadius: 1,
                    }}
                    pointer={{ elastic: true, animationDelay: 0 }}
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "240px" }}
                  />
                  <h2 className="text-[.5rem] md:text-[.75rem]">Overall Air Quality Index</h2>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-center text-xl">Air Quality:</h1>
                  <h1 className="text-center text-xl">{aqiClass}</h1>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Section */}
          <div className="grid grid-rows-2">
            <div className="text-center my-6 mx-4">
              {/* <h2>Info</h2> */}
              <p>
                Welcome to the Air Quality Monitoring System! Our platform provides real-time air quality data, AI-powered predictions, and instant alerts to help you stay informed and protected.
              </p>
              <button onClick={() => navigate('/signup')} className="underline text-blue-500 cursor-pointer">
                Sign Up Now
              </button>
            </div>

            <div className="flex items-start justify-center md:items-center">
              <div className="relative grid grid-cols-2 place-center" >
                  <div className="relative flex flex-col justify-center items-center">
                    <GaugeComponent
                      value={tomAqi}
                      minValue={0}
                      maxValue={500}
                      type="radial"
                      textColor="transparent"
                      labels={{ display: false }}
                      arc={{
                        colorArray: ["#5BE12C", "#EA4228"],
                        subArcs: [{ limit: 100 }, { limit: 150 }, { limit: 250 }, { limit: 350 }],
                        padding: 0.0,
                        width: 0.5,
                        cornerRadius: 1,
                      }}
                      pointer={{ elastic: true, animationDelay: 0 }}
                      style={{ maxWidth: "100%", maxHeight: "100%", width: "240px" }}
                    />
                    <h2 className="text-[.5rem] md:text-[.75rem]">Tommorow Air Quality Index</h2>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-center text-xl">Tommorow Air Quality:</h1>
                    <h1 className="text-center text-xl">{tomAqiClass}</h1>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-screen p-8 md:p-16 flex justify-start md:justify-center">
        <div className="">
          <button onClick={() => navigate("/learnmore")} className="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10rem] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Learn More</button>
        </div>
      </div>
    </div>
  );
}
