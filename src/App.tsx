import React, { useState, useEffect } from 'react';
import ImgPray from '../src/assets/pray.png';
import './App.css';

function App() {
  const [loadding, setLoadding] = useState(false);

  const handleClick = () => {
    setLoadding(!loadding);
  }

  useEffect(() => {
    console.log(loadding);
  }, []);

  return (
    <div className="App">

      <header className="bg-info py-5 mb-5">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-12">
              <h1 className="display-4 text-white mt-5 mb-2"> 
              <img src={ImgPray} width={70} alt="" />Lar Espiríta</h1>
              <p className="lead mb-5 text-white-50">Ajudando pessoas a escontrarem lugares onde poderão praticar o auto-conhecimento e a caridade para como o próximo.</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5">
            <h2>Casa Espírita</h2>
            <p>Uma casa espírita é uma entidade filantrópica que desenvolve suas atividades com base na Doutrina Espírita,codificada nas obras básicas de Allan Kardec.</p>
            <a className="btn btn-info btn-lg" href="#">Encontrar &raquo;</a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
