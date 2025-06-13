"use client";

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
      <div className="w-full max-w-lg">{tab === "Gasto Energético" && <CalculadoraGET />}</div>
    </div>
  );
}

function IMCCalculator() {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.75);
  const [imc, setIMC] = useState(null);
  const [status, setStatus] = useState(null);

  function calcularIMC() {
    const valorIMC = peso / (altura * altura);
    setIMC(valorIMC.toFixed(2));
    getIMCStatus(valorIMC.toFixed(2));
  }

  function getIMCStatus(valorIMC) {
    if (valorIMC >= 40.0) setStatus("Obesidade grau 3 🚨");
    else if (valorIMC >= 35.0) setStatus("Obesidade grau 2 🚨");
    else if (valorIMC >= 30.0) setStatus("Obesidade grau 1 🚨");
    else if (valorIMC >= 25.0) setStatus("Sobrepeso ⚠️");
    else if (valorIMC >= 18.5) setStatus("Normal ✅");
    else setStatus("Abaixo do normal ⚠️");
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold">📏 Calculadora de IMC</h2>
      <p className="text-xl">
        O <strong>Índice de Massa Corporal (IMC) </strong>, é um parâmetro utilizado para avaliar se seu peso está dentro do valor ideal para a sua altura. O IMC é calculado dividindo seu peso pelo o quadrado da sua altura.
      </p>
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
          //<p className="text-2xl font-medium">Status: {status}</p>
        </div>
      )}
    </div>
  );
}

function CalculadoraGET() {
  const [sexo, setSexo] = useState('Homem');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [atividade, setAtividade] = useState('Sedentário');
  const [resultado, setResultado] = useState(null);

  const calcularTMB = (sexo, peso, altura, idade) => {
    if (sexo === 'Homem') {
      return 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * idade;
    } else {
      return 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * idade;
    }
  };

  const calcularGET = (tmb, atividade) => {
    const fatores = {
      'Sedentário': 1.2,
      'Levemente ativo': 1.375,
      'Moderadamente ativo': 1.55,
      'Muito ativo': 1.725,
      'Extremamente ativo': 1.9,
    };
    return tmb * fatores[atividade];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pesoNum = parseFloat(peso);
    const alturaCm = parseFloat(altura) * 100;
    const idadeNum = parseInt(idade);

    if (isNaN(pesoNum) || isNaN(alturaCm) || isNaN(idadeNum)) {
      setResultado({ erro: 'Preencha todos os campos corretamente.' });
      return;
    }

    const tmb = calcularTMB(sexo, pesoNum, alturaCm, idadeNum);
    const get = calcularGET(tmb, atividade);

    setResultado({ tmb: tmb.toFixed(2), get: get.toFixed(2) });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-lg w-full">
      <h1 className="text-2xl font-bold mb-4">🔋 Calculadora de Gasto Energético</h1>

      <h2 className="text-xl font-semibold">🔥 Taxa Metabólica Basal (TMB)</h2>
      <p className="text-xl">
        A <strong>Taxa Metabólica Basal (TMB)</strong> é a quantidade mínima de energia que o corpo precisa para manter as funções vitais em repouso, como respiração, circulação e temperatura corporal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold">
          Sexo:
          </label>
          <select className="border p-2 rounded-md" value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option>Homem</option>
            <option>Mulher</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold">
          Peso (kg):
          </label>                                        
          <input type="number" min="10" max="300" step="0.1" className="border p-2 rounded-md" value={peso} onChange={(e) => setPeso(e.target.value)} />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold">
          Altura (m):
          </label>
          <input type="number" min="0.5" max="2.5" step="0.01" className="border p-2 rounded-md" value={altura} onChange={(e) => setAltura(e.target.value)} />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold">
          Idade:
          </label>
          <input type="number" min="10" max="120" step="1" className="border p-2 rounded-md" value={idade} onChange={(e) => setIdade(e.target.value)} />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold">
          <p className="mb-4">
          Nível de Atividade Física:
          </p>
          </label>

          <p className="mb-4">
          🛋️ <strong>Sedentário</strong> (pouco ou nenhum exercício): TMB × 1.2 </p>
          <p className="mb-4">
          🚶 <strong>Levemente ativo</strong> (exercício leve 1-3 dias/semana): TMB × 1.375 </p>
          <p className="mb-4">
          🏃 <strong>Moderadamente ativo</strong> (exercício moderado 3-5 dias/semana): TMB × 1.55 </p>
          <p className="mb-4">
          🏋️ <strong>Muito ativo</strong> (exercício intenso 6-7 dias/semana): TMB × 1.725 </p>
          <p className="mb-4">
          🏆 <strong>Extremamente ativo</strong> (atletas ou trabalho físico intenso): TMB × 1.9 </p>
          
          <select className="border p-2 rounded-md" value={atividade} onChange={(e) => setAtividade(e.target.value)}>
            <option>Sedentário</option>
            <option>Levemente ativo</option>
            <option>Moderadamente ativo</option>
            <option>Muito ativo</option>
            <option>Extremamente ativo</option>
          </select>
        
        </div>
                     
        <button type="submit" className="text-center">Calcular Gasto Energético</button>
      </form>

      {resultado && (
        <div className="mt-6 p-4 border rounded">
          {resultado.erro ? (
            <p className="text-red-600">{resultado.erro}</p>
          ) : (
            <>
              <p><strong>🔥 TMB:</strong> {resultado.tmb} kcal/dia</p>
              <p><strong>⚡ GET:</strong> {resultado.get} kcal/dia</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
