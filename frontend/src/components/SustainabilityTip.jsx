import { Leaf, Lightbulb } from "lucide-react";
import { useState } from "react";

const tips = [
  "Digital documents save ~10 trees per 10,000 pages printed",
  "Using public transport twice a week reduces carbon footprint by 15%",
  "Going paperless for insurance saves 2.5kg CO2 per policy annually",
  "Digital payments reduce paper waste by 95% compared to cash receipts",
  "One digital claim saves equivalent of 50 paper forms",
  "Renewable energy insurance covers reduce carbon footprint by 30%"
];

function SustainabilityTip({ context = "general" }) {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-start gap-3">
      <Leaf className="text-green-600 mt-0.5" size={16} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="text-green-600" size={14} />
          <span className="text-xs font-medium text-green-800">Eco Tip</span>
        </div>
        <p className="text-sm text-green-700">{randomTip}</p>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="text-green-400 hover:text-green-600 text-xs"
      >
        ×
      </button>
    </div>
  );
}

export default SustainabilityTip;