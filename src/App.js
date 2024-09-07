import React, { useState } from 'react';
import Wheel from './components/Wheel';  // Verifica la ruta
import RandomNumber from './components/RandomNumber';  // Verifica la ruta

const App = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  const handleFetchNumber = (number) => {
    setRandomNumber(number);
  };

  return (
    <div className="App">
      <Wheel onFetchNumber={handleFetchNumber} />
      <RandomNumber onFetchNumber={handleFetchNumber} />
    </div>
  );
};

export default App;
