import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; //Criação do Mapa
import { LeafletMouseEvent } from 'leaflet';
import './style.css';
import Header from '../../components/Header';


const CreateHouse = () => {

    interface UfAPI {
        id: number;
        sigla: string;
        nome: string;
    }

    interface CityAPI{
        nome: string;
    }

    const [iptName, setIptName] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [iptEmail, setIptEmail] = useState('');
    const [iptTelephone, setIptTelephone] = useState('');
    const [iptNeighborhood, setIptNeighborhood] = useState('');
    const [iptStreet, setIptStreet] = useState('');
    const [iptNumber, setIptNumber] = useState('');
    const [ufs, setUfs] = useState<UfAPI[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>('');
    const [cities, setCities] = useState<CityAPI[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;

            setLatitude(latitude);
            setLongitude(longitude);
        });
    }, []);

    // Pegar UF's
    useEffect(() => {
        async function getUf() {
            const getUfs = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            setUfs(getUfs.data);
        }
        getUf();
    }, []);

    // Pegar cidade com base na UF
    useEffect(() => {
        async function getCity() {
            const city = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios
            `);
            setCities(city.data);
        }

        getCity();
    }, [selectedUf]);

    const handleIptName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptName(event.target.value);
    }

    const handleIptEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIptEmail(event.target.value);
    }

    const handleIptTelephone = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIptTelephone(event.target.value);
    }

    const handleIptNeighborhood = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIptNeighborhood(event.target.value);
    }

    const handleIptStreet = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIptStreet(event.target.value);
    }

    const handleIptNumber = (event : React.ChangeEvent<HTMLInputElement>) => {
        setIptNumber(event.target.value);
    }

    const handleSelectedUf = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUf(event.target.value);
    }

    const handleSelectedCity = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    }

    const validateForm = () => {
        if(!iptName) return false;
        if(!selectedUf) return false;
        if(!selectedCity) return false;
        if(!iptNeighborhood) return false;
        if(!iptStreet) return false;
        if(!iptNumber) return false;
        return true;

    }

    const handleSubmit = () => {
        if(!validateForm()) return;
        alert('foi');
    }

    return (
        <div className="create-house">
            <Header />
            <div className="container-form">

                <div className="card shadow p-3 mt-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <h5 className="card-title">Preencha os dados</h5>
                        <hr />
                        <form>
                            <div className="form-row">
                                <div className="form-group col-sm-12">
                                    <label>Nome</label>
                                    <input type="text" className="form-control" placeholder="Nome da centro" name="iptName"
                                    required value={iptName}
                                    onChange={(value) => { handleIptName(value) }} />
                                </div>

                                <div className=" form-group col-sm-8">
                                    <label>E-mail</label>
                                    <input type="email" className="form-control" placeholder="E-mail (Opcional)" 
                                    name="iptEmail" value={iptEmail}
                                    onChange={(value) => { handleIptEmail(value)}}/>
                                </div>
                                <div className=" form-group col-sm-4">
                                    <label>Telefone</label>
                                    <input type="number" className="form-control" placeholder="Telefone (Opcional)"
                                    name="iptTelephone" value={iptTelephone}
                                    onChange={(value) => { handleIptTelephone(value)}}/>
                                </div>

                                <div className=" form-group col-sm-6">
                                    <label>Estado (UF)</label>
                                    <select name="uf" className="form-control "
                                        required value={selectedUf}
                                        onChange={handleSelectedUf}>
                                        <option value="">Selecione UF</option>
                                        {
                                            ufs.map((item) => {
                                                return (
                                                    <option value={item.sigla} key={item.sigla} >{item.sigla}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label>Cidade</label>
                                    <select name="city" className="form-control"
                                        required value={selectedCity}
                                        onChange={handleSelectedCity}
                                    >
                                        <option value="">Selecione sua cidade</option>
                                        {cities.map((item) => {
                                            return (
                                                <option value={item.nome} key={item.nome}>{item.nome}</option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className=" form-group col-sm-4">
                                    <label>Bairro</label>
                                    <input type="text" className="form-control" placeholder="Bairro" 
                                    name="iptNeighborhood" required value={iptNeighborhood}
                                    onChange={(value) => { handleIptNeighborhood(value)}}/>
                                </div>
                                <div className=" form-group col-sm-5">
                                    <label>Rua</label>
                                    <input type="text" className="form-control" placeholder="Rua" 
                                    name="iptStreet" required value={iptStreet}
                                    onChange={(value) => { handleIptStreet(value)}}/>
                                </div>
                                <div className=" form-group col-sm-3">
                                    <label>Número</label>
                                    <input type="number" className="form-control" placeholder="Número" 
                                    name="iptNumber" required value={iptNumber}
                                    onChange={(value) => { handleIptNumber(value)}}/>
                                </div>

                                {/* <div className="form-group col-sm-12">
                                    <label>Selecione o endereço no mapa</label>
                                    <Map center={[-19.8273332, -43.9341399]} zoom={13}>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                        />
                                        <Marker position={[-19.8273332, -43.9341399]}>
                                            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                                        </Marker>
                                    </Map>
                                </div> */}

                            </div>

                            <button type="submit" className="btn btn-block btn-info"
                                onClick={handleSubmit}>
                                CADASTRAR CENTRO
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHouse;