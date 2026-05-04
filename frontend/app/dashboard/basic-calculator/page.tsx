"use client";

import { useState } from "react";
import { Calculator, Delete, Divide, Minus, Plus, X } from "lucide-react";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const parts = equation.split(" ");
      const num1 = parseFloat(parts[0]);
      const op = parts[1];
      const num2 = parseFloat(display);
      let res = 0;
      if (op === "+") res = num1 + num2;
      if (op === "-") res = num1 - num2;
      if (op === "*") res = num1 * num2;
      if (op === "/") res = num1 / num2;
      
      setDisplay(res.toString());
      setEquation("");
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="p-8 bg-gray-900 text-right">
          <p className="text-gray-500 text-sm h-6 mb-1">{equation}</p>
          <p className="text-white text-5xl font-light tracking-tight truncate">{display}</p>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3 bg-white">
          <button onClick={clear} className="col-span-2 p-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors">AC</button>
          <button onClick={() => setDisplay(display.slice(0, -1) || "0")} className="p-4 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Delete className="w-5 h-5" />
          </button>
          <button onClick={() => handleOperator("/")} className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Divide className="w-5 h-5" />
          </button>

          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => handleNumber(n.toString())} className="p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator("*")} className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-colors">
            <X className="w-5 h-5" />
          </button>

          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => handleNumber(n.toString())} className="p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator("-")} className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Minus className="w-5 h-5" />
          </button>

          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => handleNumber(n.toString())} className="p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors">{n}</button>
          ))}
          <button onClick={() => handleOperator("+")} className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Plus className="w-5 h-5" />
          </button>

          <button onClick={() => handleNumber("0")} className="col-span-2 p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors">0</button>
          <button onClick={() => handleNumber(".")} className="p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors">.</button>
          <button onClick={calculate} className="p-4 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">=</button>
        </div>
      </div>
      <p className="text-center mt-8 text-gray-400 text-sm flex items-center justify-center gap-2">
        <Calculator className="w-4 h-4" /> Standard Mathematical Operations
      </p>
    </div>
  );
}
