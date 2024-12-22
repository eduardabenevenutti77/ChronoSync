import './style-cards.css'; 
import React, { useState } from 'react';

export default function CardRetratil({ titulo, conteudo, detalhes }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className={`card ${expandido ? 'expandido' : ''}`}>
      <div className="card-header" onClick={() => setExpandido(!expandido)}>
        <h4>{titulo}</h4>
        <button className="toggle-button">
          {expandido ? '−' : '+'}
        </button>
      </div>
      <div className="card-conteudo">
        <p>{conteudo}</p>
        {expandido && <div className="detalhes">{detalhes}</div>}
      </div>
    </div>
  );
}
