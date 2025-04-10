import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LearnMore({api_url}) {
  const navigate = useNavigate();
  const [selectedPollutant, setSelectedPollutant] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [selectedOption, setSelectedOption] = useState('PM2_5');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const paramInfo = {
    ozone: {
      name: "Ozone",
      symbol: "O₃",
      description: "A gas that forms in the air when sunlight reacts with pollutants, which can be harmful to breathe and damage the environment.",
      limits: {
        good: [0, 64],
        moderate: [65, 84],
        unhealthySensitive: [85, 104],
        unhealthy: [105, 124],
        veryUnhealthy: [125, 374],
        hazardous: [375, 500],
      }
    },
    carbonDioxide: {
      name: "Carbon Dioxide",
      symbol: "CO₂",
      description: "A gas produced when people and animals breathe out, and when fuels like coal and gasoline are burned; too much of it in the air contributes to climate change.",
      limits: {
        good: [0, 500],
        moderate: [501, 1000],
        unhealthySensitive: [1001, 1500],
        unhealthy: [1501, 1800],
      }

    },
    carbonMonoxide: {
      name: "Carbon Monoxide",
      symbol: "CO",
      description: "A dangerous gas that has no color or smell, created when fuels don’t burn completely, which can be harmful when breathed in.",
      limits: {
        good: [0, 50],
        moderate: [51, 100],
        unhealthySensitive: [101, 199],
        unhealthy: [200, 299],
        veryUnhealthy: [300, 400],
      }
    },
    volatileOrganicCompounds: {
      name: "Volatile Organic Compounds",
      symbol: "VOCs",
      description: "Chemicals that turn into gas easily and come from things like paint, cleaning products, and car fumes, which can affect air quality.",
      limits: {
        good: [0, 65],
        moderate: [66, 220],
        unhealthySensitive: [221, 660],
        unhealthy: [661, 2200],
        veryUnhealthy: [2201, 5500],
      }
    },
    particulateMatter: {
      name: "Particulate Matter",
      symbol: "PM",
      description: "Tiny bits of dust, smoke, and dirt in the air that can be breathed in, with PM2.5 being smaller and more harmful to health.",
      choices: {
        PM2_5: {
          limits: {
            good: [0, 10],
            moderate: [11, 20],
            unhealthySensitive: [21, 25],
            unhealthy: [26, 50],
            veryUnhealthy: [51, 75],
            hazardous: [76, 200],
          }
        },
        PM10: {
          limits: {
            good: [0, 20],
            moderate: [21, 40],
            unhealthySensitive: [41, 50],
            unhealthy: [51, 100],
            veryUnhealthy: [101, 150],
            hazardous: [151, 250],
          }
        }
      },
      limits: {
        good: [0, 10],
        moderate: [11, 20],
        unhealthySensitive: [21, 25],
        unhealthy: [26, 50],
        veryUnhealthy: [51, 75],
        hazardous: [76, 200],
      }
    },
    nitrogenDioxide: {
      name: "Nitrogen Dioxide",
      symbol: "NO₂",
      description: "A reddish-brown gas mainly from cars and factories that can make it harder to breathe and contribute to air pollution.",
      limits: {
        good: [0, 40],
        moderate: [41, 90],
        unhealthySensitive: [91, 120],
        unhealthy: [121, 230],
        veryUnhealthy: [231, 340],
        hazardous: [341, 500],
      }
    },
    sulfurDioxide: {
      name: "Sulfur Dioxide",
      symbol: "SO₂",
      description: "A strong-smelling gas from burning coal and oil that can cause breathing problems and lead to acid rain.",
      limits: {
        good: [0, 100],
        moderate: [101, 200],
        unhealthySensitive: [201, 350],
        unhealthy: [351, 500],
        veryUnhealthy: [501, 750],
        hazardous: [751, 1250],
      }

    },
    hydrogenSulfide: {
      name: "Hydrogen Sulfide",
      symbol: "H₂S",
      description: "A gas that smells like rotten eggs, often released from decaying plants and factories, which can be toxic in large amounts.",
      limits: {
        good: [0, 10],
        moderate: [11, 50],
        unhealthySensitive: [51, 300],
        unhealthy: [301, 700],
        veryUnhealthy: [701, 1000],
      }
    },
  };

  const handleClick = (param) => {
    setSelectedPollutant(param);
    setShowInfo(true);
  }

  const handleClose = () => {
    setShowInfo(false);
  }

  return (
    <div className="bg-[url('/bg.png')] w-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold p-4">Learn More About Air Quality</h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {Object.entries(paramInfo).map(([key, value]) => (
          <div className="flex justify-center items-center" key={key}>
            <div className={`flex items-center justify-center bg-white rounded-lg w-full aspect-square md:max-h-[30vh] p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300`} onClick={() => handleClick(value)}>
              <h1 className="text-4xl text-center font-bold">{value.symbol}</h1>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="cursor-pointer mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
      >
        Sign Up
      </button>
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white m-4 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold">{selectedPollutant.name} ({selectedPollutant.symbol})</h2>
            <p className="mt-2">{selectedPollutant.description}</p>
            {'choices' in selectedPollutant ? (
              <>
              <div className="mt-2 flex gap-4 rounded-4xl">
                {Object.keys(selectedPollutant.choices).map((choice, index) => (
                  <div key={index} className="flex items-center">
                    <label className={`cursor-pointer px-2 py-1 rounded-2xl ${selectedOption===choice? 'bg-blue-500': 'bg-blue-300'}`} name="pm" htmlFor={choice} >{choice}</label>
                    <input type='radio' name="pm" id={choice} value={choice} onChange={handleChange} className="hidden"/>
                  </div>
                ))}
              </div>
              <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Limits</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedPollutant.choices[selectedOption].limits).map(([category, limits]) => (
                  <tr key={category} className="border-b">
                    <td className="px-4 py-2">{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                    <td className="px-4 py-2">{limits.join(' - ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              </>
              
            ): 
            <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Limits</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedPollutant.limits).map(([category, limits]) => (
                  <tr key={category} className="border-b">
                    <td className="px-4 py-2">{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                    <td className="px-4 py-2">{limits.join(' - ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            }
            <button onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}