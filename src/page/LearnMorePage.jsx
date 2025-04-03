import { useNavigate } from "react-router-dom";

export default function LearnMore({api_url}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center bg-fixed min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Learn More About Air Quality</h1>
      <div className="max-w-2xl text-left space-y-4">
        <p><strong>Ozone (O₃):</strong> A gas that forms in the air when sunlight reacts with pollutants, which can be harmful to breathe and damage the environment.</p>
        <p><strong>Carbon Dioxide (CO₂):</strong> A gas produced when people and animals breathe out, and when fuels like coal and gasoline are burned; too much of it in the air contributes to climate change.</p>
        <p><strong>Carbon Monoxide (CO):</strong> A dangerous gas that has no color or smell, created when fuels don’t burn completely, which can be harmful when breathed in.</p>
        <p><strong>Volatile Organic Compounds (VOCs):</strong> Chemicals that turn into gas easily and come from things like paint, cleaning products, and car fumes, which can affect air quality.</p>
        <p><strong>Particulate Matter (PM2.5 and PM10):</strong> Tiny bits of dust, smoke, and dirt in the air that can be breathed in, with PM2.5 being smaller and more harmful to health.</p>
        <p><strong>Nitrogen Dioxide (NO₂):</strong> A reddish-brown gas mainly from cars and factories that can make it harder to breathe and contribute to air pollution.</p>
        <p><strong>Sulfur Dioxide (SO₂):</strong> A strong-smelling gas from burning coal and oil that can cause breathing problems and lead to acid rain.</p>
        <p><strong>Hydrogen Sulfide (H₂S):</strong> A gas that smells like rotten eggs, often released from decaying plants and factories, which can be toxic in large amounts.</p>
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="cursor-pointer mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
      >
        Sign Up
      </button>
    </div>
  );
}