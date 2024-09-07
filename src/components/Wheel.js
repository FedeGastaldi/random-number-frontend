import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Velocity from 'velocity-animate';
import '../styles/Wheel.css';

const generateNumberData = (n) => {
  const colors = ['#1b87e6', '#1b3380'];
  const data = [];
  for (let i = 1; i <= n; i++) {
    data.push({
      id: i.toString(),
      color: colors[i % colors.length],
      text: i.toString(),
    });
  }
  return data;
};

const data = generateNumberData(100);

const Wheel = ({ onFetchNumber }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const spinnerRef = useRef(null);
  const angleOffset = -90;

  useEffect(() => {
    renderWheel();
  }, []);

  const spin = async () => {
    if (spinning) return;

    setSpinning(true);

    // Llamar a la API para obtener el número aleatorio
    try {
      const response = await axios.post('http://localhost:3000/random');
      const number = response.data.value;
      const count = data.length;
      const delta = 360 / count;
      const index = data.findIndex(item => item.text === number.toString());
      const angle = index * delta + 1440;

      // Mueve la ruleta
      Velocity(spinnerRef.current, { rotateZ: `${angle}deg` }, {
        easing: 'easeOutQuint',
        duration: 1500,
        begin: () => setResult(null),
        complete: () => {
          setSpinning(false);
          setResult(number);
          if (onFetchNumber) onFetchNumber(number);
        }
      });
    } catch (error) {
      console.error('Error fetching the random number', error);
      setSpinning(false);
    }
  };

  const renderWheel = () => {
    const spinner = spinnerRef.current;
    const D = 400;
    const R = D * 0.5;
    const count = data.length;
    const delta = 360 / count;

    spinner.innerHTML = '';

    data.forEach((item, i) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.dataset.index = i;

      const borderTopWidth = D + D * 0.0025;
      const deltaInRadians = delta * Math.PI / 180;
      const borderRightWidth = D / (1 / Math.tan(deltaInRadians));

      const r = delta * (count - i) + angleOffset - delta * 0.5;

      itemElement.style.borderTopWidth = `${borderTopWidth}px`;
      itemElement.style.borderRightWidth = `${borderRightWidth}px`;
      itemElement.style.transform = `scale(2) rotate(${r}deg)`;
      itemElement.style.borderTopColor = item.color;

      const textHeight = parseInt((2 * Math.PI * R) / count * 0.5);

      const label = document.createElement('span');
      label.classList.add('label');
      label.style.transform = `translateY(${D * -0.25}px) translateX(${textHeight * 1.03}px) rotateZ(${90 + delta * 0.5}deg)`;
      label.style.height = `${textHeight}px`;
      label.style.lineHeight = `${textHeight}px`;

      const text = document.createElement('span');
      text.classList.add('text');
      text.innerText = item.text;

      label.appendChild(text);
      itemElement.appendChild(label);
      spinner.appendChild(itemElement);
    });
  };

  return (
    <div className="roulette">
      <div className="spinner" ref={spinnerRef}></div>
      <div className="shadow"></div>
      <div className="markers">
        <div className="triangle"></div>
      </div>
      <div className="button" onClick={spin}>
        <span>{result === null ? 'Girar' : result}</span>
      </div>
    </div>
  );
};

export default Wheel;
