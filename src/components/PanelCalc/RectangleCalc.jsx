import React, { useState } from 'react';

const RectangleCalc = () => {
  const [roofWidth, setRoofWidth] = useState('');
  const [roofHeight, setRoofHeight] = useState('');
  const [panelWidth, setPanelWidth] = useState('');
  const [panelHeight, setPanelHeight] = useState('');
  const [maxPanels, setMaxPanels] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = async () => {
    if (!roofWidth || !roofHeight || !panelWidth || !panelHeight) {
      setErrorMessage('Debes ingresar todos los datos');
      return;
    }

    if (parseInt(roofWidth) < 0 || parseInt(roofHeight) < 0 || parseInt(panelWidth) < 0 || parseInt(panelHeight) < 0) {
      setErrorMessage('No puedes utilizar valores negativos');
      return;
    }

    setErrorMessage('');

    const response = await fetch('https://powerful-island-43873-03173b4154c4.herokuapp.com/api/panels/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roofWidth: parseInt(roofWidth),
        roofHeight: parseInt(roofHeight),
        panelWidth: parseInt(panelWidth),
        panelHeight: parseInt(panelHeight),
      }),
    });

    const data = await response.json();
    setMaxPanels(data.maxPanels);
  };

  const handleClear = () => {
    setRoofWidth('');
    setRoofHeight('');
    setPanelWidth('');
    setPanelHeight('');
    setMaxPanels(null);
    setErrorMessage('');
  };

  const renderPanels = () => {
    if (maxPanels === null) return null;

    const width = parseInt(roofWidth);
    const height = parseInt(roofHeight);
    const pWidth = parseInt(panelWidth);
    const pHeight = parseInt(panelHeight);

    let panelsArray = [];

    // Try to place horizontal panels first
    let horizontalPanels = 0;
    for (let y = 0; y <= height - pHeight; y += pHeight) {
      for (let x = 0; x <= width - pWidth; x += pWidth) {
        if (horizontalPanels < maxPanels) {
          panelsArray.push({
            x: x * 10,
            y: y * 10,
            width: pWidth * 10,
            height: pHeight * 10,
          });
          horizontalPanels++;
        }
      }
    }

    // Try to place remaining panels as vertical panels
    let remainingPanels = maxPanels - horizontalPanels;
    let verticalPanels = 0;
    for (let y = 0; y <= height - pWidth; y += pWidth) {
      for (let x = 0; x <= width - pHeight; x += pHeight) {
        if (verticalPanels < remainingPanels) {
          panelsArray.push({
            x: x * 10,
            y: y * 10,
            width: pHeight * 10,
            height: pWidth * 10,
          });
          verticalPanels++;
        }
      }
    }

    return panelsArray.map((panel, index) => (
      <rect
        key={index}
        x={panel.x}
        y={panel.y}
        width={panel.width}
        height={panel.height}
        fill="blue"
        stroke="white"
      />
    ));
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 min-h-screen text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Calcular Paneles Solares</h2>
        <form>
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-600 text-white text-center rounded">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="roofWidth">Ancho del Techo</label>
            <input
              type="number"
              required
              id="roofWidth"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              value={roofWidth}
              onChange={(e) => setRoofWidth(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="roofHeight">Altura del Techo</label>
            <input
              type="number"
              id="roofHeight"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              value={roofHeight}
              onChange={(e) => setRoofHeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="panelWidth">Ancho del Panel</label>
            <input
              type="number"
              id="panelWidth"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              value={panelWidth}
              onChange={(e) => setPanelWidth(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="panelHeight">Altura del Panel</label>
            <input
              type="number"
              id="panelHeight"
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
              value={panelHeight}
              onChange={(e) => setPanelHeight(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCalculate}
            >
              Calcular
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClear}
            >
              Limpiar
            </button>
          </div>
        </form>
        {maxPanels !== null && (
          <div className="mt-8 text-center">
            <h3>En el techo indicado entran {maxPanels} paneles</h3>
            <svg
              width="400"
              height="400"
              viewBox={`0 0 ${roofWidth * 10} ${roofHeight * 10}`}
              className="bg-gray-700 mt-4 mx-auto"
            >
              <rect width={roofWidth * 10} height={roofHeight * 10} fill="none" stroke="white" />
              {renderPanels()}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default RectangleCalc;
