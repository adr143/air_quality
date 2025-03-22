import { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ api_url }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    "Ozone": 0,
    "Carbon Monoxide": 0,
    "Carbon Dioxide": 0,
    "VOC": 0,
    "PM2.5": 0,
    "PM10": 0,
    "Nitrogen Dioxide": 0,
    "Sulfur Dioxide": 0,
    "Hydrogen Sulfide": 0
  });

  useEffect(() => {
    const fetchParams = () => {
      fetch(`${api_url}/api/sensor-data`)
      .then((response) => response.json())
      .then((data) => {
        const mappedData = {
          "Ozone": parseFloat(data.find(item => item.id === "O3PPM_container")?.value) || 0,
          "Carbon Monoxide": parseFloat(data.find(item => item.id === "CO_container")?.value) || 0,
          "Carbon Dioxide": parseFloat(data.find(item => item.id === "CO2_container")?.value) || 0,
          "VOC": parseFloat(data.find(item => item.id === "TVOC_container")?.value) || 0,
          "PM2.5": parseFloat(data.find(item => item.id === "PM2_container")?.value) || 0,
          "PM10": parseFloat(data.find(item => item.id === "PM10_container")?.value) || 0,
          "Nitrogen Dioxide": parseFloat(data.find(item => item.id === "NO2PPM_container")?.value) || 0,
          "Sulfur Dioxide": parseFloat(data.find(item => item.id === "SO2PPM_container")?.value) || 0,
          "Hydrogen Sulfide": parseFloat(data.find(item => item.id === "H2SPPM_container")?.value) || 0
        };
        setValues(mappedData);
      });
    }

    fetchParams();
    const interval = setInterval(fetchParams, 5000);
    return () => clearInterval(interval);

  }, []);

  return (
    <div className="relative w-screen">
      <div>
        <h1 className="text-3xl text-center mt-4 cursor-pointer" onClick={() => navigate("/")} >Air Quality Index</h1>
      </div>
      <div className="w-screen flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 p-4">
          {/* Left side (2/3 width) */}
          <div className="flex justify-center items-start">
            <div className="grid grid-cols-3 grid-rows-3 p-4">
              {Object.entries(values).map(([key, val], index) => (
                <div className="flex flex-col items-center justify-center " key={index}>
                  <GaugeComponent
                    value={val}
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
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "120px", height: "120px" }} 
                    />
                    <h2 className="text-sm md:text-md text-center">{key}</h2>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side (1/3 width) with bigger gauge */}
          <div className="flex items-start justify-center p-4">
            <div className="relative flex flex-col justify-center items-center w-full aspect-square">
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
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-screen p-8 md:p-16 flex justify-start md:justify-center">
        <div className="">
          <button onClick={() => navigate("/info")} className="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10rem] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Learn More</button>
        </div>
      </div>
    </div>
  );
}