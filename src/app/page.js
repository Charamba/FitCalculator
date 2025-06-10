import { useState } from "react";

export default function Home() {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.75);
  const [imc, setImc] = useState(null);
  const [status, setStatus] = useState("");

  const calcularIMC = () => {
    const imcValue = peso / (altura * altura);
    setImc(imcValue.toFixed(2));
    if (imcValue >= 40) setStatus("Obesidade grau 3 🚨");
    else if (imcValue >= 35) setStatus("Obesidade grau 2 🚨");
    else if (imcValue >= 30) setStatus("Obesidade grau 1 🚨");
    else if (imcValue >= 25) setStatus("Sobrepeso ⚠️");
    else if (imcValue >= 18.5) setStatus("Normal ✅");
    else setStatus("Abaixo do normal ⚠️");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">💪 Fit Calculator</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold">📏 Calculadora de IMC</h2>
        <p className="text-sm text-gray-600">Informe seu peso e altura</p>
        <div className="mt-4">
          <label className="block text-sm">Peso (kg)</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={peso}
            onChange={(e) => setPeso(parseFloat(e.target.value))}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Altura (m)</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={altura}
            onChange={(e) => setAltura(parseFloat(e.target.value))}
          />
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={calcularIMC}
        >
          Calcular IMC
        </button>
        {imc && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <p className="text-lg font-semibold">Seu IMC: {imc} kg/m²</p>
            <p className="text-md font-medium">Status: {status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
