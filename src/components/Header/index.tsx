import React from 'react';
import ImgPray from '../../assets/pray.png';
import './style.css';

const Header = () => {
    return(
        <header className="bg-info  mb-5">
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
    );
}

export default Header;