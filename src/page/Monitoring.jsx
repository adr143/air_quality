import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";
import { useNavigate } from "react-router-dom";

export default function Monitoring({api_url}) {

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
    "Hydrogen Sulfide": 0,
  });

  const [limits, setLimits] = useState({
    "Ozone": [64, 84, 85, 104, 124, 374, 500],
    "Carbon Monoxide": [50, 100, 199, 299, 400],
    "Carbon Dioxide": [],
    "VOC": [.065, .22, .66, 2.2, 5.5],
    "PM2.5": [10, 20, 25, 50, 75, 200],
    "PM10": [20, 40, 50, 100, 150, 250],
    "Nitrogen Dioxide": [40, 90, 120, 230, 340, 500],
    "Sulfur Dioxide": [100, 200, 350, 500, 750, 1250],
    "Hydrogen Sulfide": [10, 50, 300, 700, 1000],
  });

  const [overall, setOverall] = useState()

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

        const aqi_percentage = parseFloat(data.find(item => item.id === "overall_container")?.percentage) || 0;
        setValues(mappedData);
        setOverall(aqi_percentage);
      });
    }

    fetchParams();
    const interval = setInterval(fetchParams, 5000);
    return () => clearInterval(interval);

  }, []);

  return (
    <div className="relative w-screen my-12">
      <div>
        <h1 className="text-3xl text-center mt-4 cursor-pointer" onClick={() => navigate("/")} >Air Quality Index</h1>
      </div>
      <div className="w-screen flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] p-4">
          <div className="flex justify-center">
            <div className="grid grid-rows-1">
              <div className="flex justify-center items-start">
                <div className="grid grid-cols-3 grid-rows-3 md:grid-cols-5 md:grid-rows-2 p-4 text-center">
                  {Object.entries(values).map(([key, val], index) => (
                    <div
                      className="flex flex-col items-center justify-center mx-4"
                      key={index}
                    >
                      <GaugeComponent
                        value={val} // Adjust according to your actual value range
                        minValue={0} // Set minimum value
                        maxValue={200} // Set maximum value (adjust as needed)
                        type="radial"
                        textColor="transparent"
                        labels={{
                          display: false,
                        }}
                        arc={{
                          colorArray: ["#5BE12C", "#EA4228"],
                          subArcs: [{ limit: 50 }, { limit: 100 }, { limit: 150 }, { limit: 200 }],
                          padding: 0.0,
                          width: 0.5,
                          cornerRadius: 1,
                        }}
                        pointer={{
                          elastic: true,
                          animationDelay: 0,
                        }}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                      <h2 className="text-[.5rem] md:text-[.75rem] text-center">{key}</h2>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side (1/3 width) with bigger gauge */}
              <div className="flex items-start justify-center">
                <div className="relative flex flex-col justify-center items-center">
                  <GaugeComponent
                    value={overall} // Adjust according to your actual value range
                    type="radial"
                    textColor="transparent"
                    labels={{
                      display: false,
                    }}
                    arc={{
                      colorArray: ["#5BE12C", "#EA4228"],
                      subArcs: [{ limit: 50 }, { limit: 70 }, { limit: 80 }],
                      padding: 0.0,
                      width: 0.5,
                      cornerRadius: 1,
                    }}
                    pointer={{
                      elastic: true,
                      animationDelay: 0,
                    }}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "240px",
                    }}
                  />
                  <h2 className="text-[.5rem] md:text-[.75rem]">Overall Air Quality</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2">
            <div className="text-center my-6 mx-4">
              <h2>Info</h2>
              <p>Placeholder text for ir quality monitoring</p>
              <button onClick={() => {navigate('/signup')}} className="underline text-blue-500 cursor-pointer">Sign Up Now</button>
            </div>
            <div className="flex items-start justify-center md:items-center">
              <div className="relative flex flex-col justify-center items-center">
                <GaugeComponent
                  value={50} // Adjust according to your actual value range
                  minValue={0} // Set minimum value
                  maxValue={200} // Set maximum value (adjust as needed)
                  type="radial"
                  textColor="transparent"
                  labels={{
                    display: false,
                  }}
                  arc={{
                    colorArray: ["#5BE12C", "#EA4228"],
                    subArcs: [{ limit: 50 }, { limit: 100 }, { limit: 150 }, { limit: 200 }],
                    padding: 0.0,
                    width: 0.5,
                    cornerRadius: 1,
                  }}
                  pointer={{
                    elastic: true,
                    animationDelay: 0,
                  }}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "270px",
                  }}
                />  
                <h2 className="text-[1rem]">Tommorow Air Quality</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-screen p-8 md:p-16 flex justify-start md:justify-center">
        <div className="">
          <button onClick={() => navigate("/")} className="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10rem] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Learn More</button>
        </div>
      </div>
    </div>
  );
}
