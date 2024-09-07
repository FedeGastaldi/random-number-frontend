import React, { useEffect, useState } from 'react';
import '../styles/NumberViewer.css'; // Asegúrate de tener el archivo CSS correcto

const NumberViewer = ({ currentNumber }) => {
  const [numbers, setNumbers] = useState([0, 0, 0]);

  useEffect(() => {
    if (currentNumber !== undefined) {
      setNumbers(prevNumbers => [prevNumbers[1], prevNumbers[2], currentNumber]);
    }
  }, [currentNumber]);

  return (
    <div className='number-viewer'>
      <div className='row'>
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`card ${index === 1 ? 'highlight' : ''}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberViewer;
