import React from 'react';
import ImgPray from '../../assets/pray.png';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
    return (
        <div className="Home">

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
                        <Link className="btn btn-info btn-lg" to="/create-house">Cadastrar &raquo;</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;