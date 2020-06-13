import React, { useState, useEffect } from 'react';
import './style.css';
import Header from '../../components/Header';

const CreateHouse = () => {

    const [iptName, setIptName] = useState('');

    const handleIptName = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setIptName(event.target.value);
    }

    return (
        <div className="create-house">
            <Header />

            <div className="container-form">

                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <h5 className="card-title">Preencha os dados</h5>
                        <hr />
                        <form>
                            <div className="form-row">
                                <div className="form-group col-sm-12">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" placeholder="Nome da casa" name="iptName"
                                        required value={iptName}
                                        onChange={(value) => { handleIptName(value) }} />
                                </div>
                                <div className=" form-group col-sm-6">
                                    <label>UF</label>
                                    <input type="text" className="form-control" placeholder="UF" />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Cidade</label>
                                    <input type="text" className="form-control" placeholder="Cidade" name="iptName"
                                        required value={iptName}
                                        onChange={(value) => { handleIptName(value) }} />
                                </div>

                                <div className=" form-group col-sm-5">
                                    <label>Bairro</label>
                                    <input type="text" className="form-control" placeholder="Bairro" />
                                </div>
                                <div className=" form-group col-sm-5">
                                    <label>Rua</label>
                                    <input type="text" className="form-control" placeholder="Rua" />
                                </div>
                                <div className=" form-group col-sm-2">
                                    <label>Número</label>
                                    <input type="text" className="form-control" placeholder="Número" />
                                </div>

                                <div className=" form-group col-sm-8">
                                    <label>E-mail</label>
                                    <input type="text" className="form-control" placeholder="E-mail" />
                                </div>
                                <div className=" form-group col-sm-4">
                                    <label>Telefone</label>
                                    <input type="text" className="form-control" placeholder="Telefone" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHouse;