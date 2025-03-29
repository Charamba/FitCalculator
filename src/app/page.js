"use client";

import { useState } from "react";

export default function FitCalculator() {
  const [activeTab, setActiveTab] = useState("IMC");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">💪 Fit Calculator</h1>
      <div className="flex space-x-4 mb-6">
        {["IMC", "Gasto Energético", "Gordura Corporal", "Peso Ideal", "Macronutrientes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "IMC" && <IMCCalculator />}
      {activeTab === "Gasto Energético" && <GastoEnergeticoCalculator />}
      {activeTab === "Gordura Corporal" && <GorduraCorporalCalculator />}
      {activeTab === "Peso Ideal" && <PesoIdealCalculator />}
      {activeTab === "Macronutrientes" && <MacronutrientesCalculator />}
    </div>
  );
}

function IMCCalculator() {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.75);
  const [imc, setImc] = useState(null);
  const [status, setStatus] = useState("");

  const calcularIMC = () => {
    const valorIMC = peso / (altura * altura);
    setImc(valorIMC.toFixed(2));
    if (valorIMC >= 40.0) setStatus("Obesidade grau 3 🚨");
    else if (valorIMC >= 35.0) setStatus("Obesidade grau 2 🚨");
    else if (valorIMC >= 30.0) setStatus("Obesidade grau 1 🚨");
    else if (valorIMC >= 25.0) setStatus("Sobrepeso ⚠️");
    else if (valorIMC >= 18.5) setStatus("Normal ✅");
    else setStatus("Abaixo do normal ⚠️");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold">📏 Calculadora de IMC</h2>
      <div className="mt-4">
        <label>Peso (kg):</label>
        <input type="number" value={peso} onChange={(e) => setPeso(parseFloat(e.target.value))} className="border p-2 w-full" />
      </div>
      <div className="mt-4">
        <label>Altura (m):</label>
        <input type="number" value={altura} onChange={(e) => setAltura(parseFloat(e.target.value))} className="border p-2 w-full" />
      </div>
      <button onClick={calcularIMC} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Calcular IMC</button>
      {imc && (
        <div className="mt-4">
          <h3 className="text-lg">Seu IMC é: {imc} kg/m²</h3>
          <p className="font-bold">{status}</p>
        </div>
      )}
    </div>
  );
}

// Outras funções similares para as demais calculadoras
function GastoEnergeticoCalculator() {
  return <div className="bg-white p-6 rounded-lg shadow-lg w-96">🔋 Calculadora de Gasto Energético (Em Desenvolvimento)</div>;
}
function GorduraCorporalCalculator() {
  return <div className="bg-white p-6 rounded-lg shadow-lg w-96">⚖️ Calculadora de Gordura Corporal (Em Desenvolvimento)</div>;
}
function PesoIdealCalculator() {
  return <div className="bg-white p-6 rounded-lg shadow-lg w-96">🏋️ Calculadora de Peso Ideal (Em Desenvolvimento)</div>;
}
function MacronutrientesCalculator() {
  return <div className="bg-white p-6 rounded-lg shadow-lg w-96">🍎 Calculadora de Macronutrientes (Em Desenvolvimento)</div>;
}
