import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Imagens
import ImgFriend from '../../assets/friends.svg';

// Compoentes
import Header from '../../components/Header';

// Estilos
import './style.css';


const Home = () => {


    return (
        <div className="home">

            <Header/>

            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-5 detail">
                        <h2>Centro Espírita</h2>
                        <p>Um centro espírita é uma entidade filantrópica que desenvolve suas atividades com base na Doutrina Espírita,codificada nas obras básicas de Allan Kardec.</p>
                        <Link className="btn btn-info btn-lg" to="/create-house">CADASTRAR &raquo;</Link>
                    </div>

                    <div className="col-md-8 mb-5">
                        <img src={ImgFriend} width="100%" alt="" />
                    </div>
                </div>
            </div> 

        </div>
    );
}

export default Home;