m"use client";

import { useState } from "react";

export default function FitCalculator() {
  const [tab, setTab] = useState("IMC");

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">💪 Fit Calculator</h1>
      <p className="text-2xl font-medium"> Última atualização: 14-04-2025 </p>
      <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
        {[
          "IMC",
          "Gasto Energético",
          "Gordura Corporal",
          "Peso Ideal",
          "Macronutrientes",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2 rounded-lg border ${
              tab === item ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="w-full max-w-lg">{tab === "IMC" && <IMCCalculator />}</div>
    </div>
  );
}

function IMCCalculator() {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.75);
  const [imc, setIMC] = useState(null);
  const [status, setStatus] = useState("");

  function calcularIMC() {
    const valorIMC = peso / (altura * altura);
    setIMC(valorIMC.toFixed(2));
    setStatus(getIMCStatus(valorIMC));
  }

  function getIMCStatus(imc) {
    if (valorIMC >= 40.0) setStatus("Obesidade grau 3 🚨");
    else if (valorIMC >= 35.0) setStatus("Obesidade grau 2 🚨");
    else if (valorIMC >= 30.0) setStatus("Obesidade grau 1 🚨");
    else if (valorIMC >= 25.0) setStatus("Sobrepeso ⚠️");
    else if (valorIMC >= 18.5) setStatus("Normal ✅");
    else return setStatus("Abaixo do normal ⚠️");
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold">📏 Calculadora de IMC</h2>
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold">Peso (kg)</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(parseFloat(e.target.value))}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold">Altura (m)</label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(parseFloat(e.target.value))}
          className="border p-2 rounded-md"
        />
      </div>
      <button
        onClick={calcularIMC}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Calcular IMC
      </button>
      {imc && (
        <div className="text-center">
          <h3 className="text-lg font-semibold">Seu IMC é:</h3>
          <p className="text-2xl font-bold">{imc} kg/m²</p>
          <p className="text-md mt-2 font-medium">Status: {status}</p>
        </div>
      )}
    </div>
  );
}
