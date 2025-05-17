import React, { useEffect, useRef, useState } from 'react';
import RFB from '@novnc/novnc/core/rfb';
import axios from 'axios';
import './App.css';

function App() {
  const vncRef = useRef(null);
  const rfbRef = useRef(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectVNC = async () => {
      try {
        // Подключение к VNC серверу
        rfbRef.current = new RFB(vncRef.current, 'ws://localhost:6080/websockify');
        
        rfbRef.current.addEventListener('connect', () => {
          console.log('VNC подключен');
          setIsConnected(true);
          setError(null);
        });

        rfbRef.current.addEventListener('disconnect', () => {
          console.log('VNC отключен');
          setIsConnected(false);
        });

        rfbRef.current.addEventListener('error', (error) => {
          console.error('Ошибка VNC:', error);
          setError('Ошибка подключения к VNC серверу');
          setIsConnected(false);
        });
      } catch (error) {
        console.error('Ошибка подключения к VNC:', error);
        setError('Не удалось подключиться к VNC серверу');
      }
    };

    connectVNC();

    return () => {
      if (rfbRef.current) {
        rfbRef.current.disconnect();
      }
    };
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:8000/download', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'result.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
      setError('Ошибка при скачивании файла');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Конвертер чисел</h1>
      </header>
      <main>
        {error && <div className="error-message">{error}</div>}
        <div className="vnc-container">
          <div ref={vncRef} className="vnc-screen" />
          {!isConnected && !error && (
            <div className="connecting-message">Подключение к VNC серверу...</div>
          )}
        </div>
        <button 
          onClick={handleDownload} 
          className="download-button"
          disabled={!isConnected}
        >
          Скачать результат
        </button>
      </main>
    </div>
  );
}

export default App; 