import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; //Criação do Mapa
import { LeafletMouseEvent } from 'leaflet';
import './style.css';
import Header from '../../components/Header';

interface UfAPI {
    id: number;
    sigla: string;
    nome: string;
}

interface CityAPI {
    nome: string;
}

interface ActivitiesAPI {
    id: number;
    name: string;
}

const CreateHouse = () => {

    const history = useHistory();
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
    const [activities, setActivities] = useState<ActivitiesAPI[]>([]);

    const [chkActivity, setChkActivity] = useState(false);
    const [selectedActivy, setSelectedActivy] = useState<number[]>([]);

    const [selectedWeek, setSelectedWeek] = useState<string[]>([]);

    const [selectedHours, setSelectedHours] = useState<string[]>([]);

    // Pegar geolocalização
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

    // Pegar atividades
    useEffect(() => {
        async function getActivity() {
            const res = await api.get('/activity');
            setActivities(res.data);
        }
        getActivity();
    }, []);

    const handleIptName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptName(event.target.value);
    }

    const handleIptEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptEmail(event.target.value);
    }

    const handleIptTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptTelephone(event.target.value);
    }

    const handleIptNeighborhood = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptNeighborhood(event.target.value);
    }

    const handleIptStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptStreet(event.target.value);
    }

    const handleIptNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIptNumber(event.target.value);
    }

    const handleSelectedUf = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUf(event.target.value);
    }

    const handleSelectedCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    }

    function handleSelectChk(id: number) {
        const ids = [...selectedActivy];
        const index = ids.indexOf(id);
        if (ids.includes(id)) {
            ids.splice(index, 1);
        } else {
            ids.push(id);
        }
        setSelectedActivy(ids);
    }

    function handleSelectWeek(event: React.ChangeEvent<HTMLSelectElement>, indice: number) {
        const hr = event.target.value;
        const hrs = [...selectedWeek];
        if (hrs[indice] !== hr) {
            hrs[indice] = hr;
        }
        setSelectedWeek(hrs);
    }

    function handleSelectHours(event: React.ChangeEvent<HTMLSelectElement>, indice: number) {
        const wk = event.target.value;
        const weeks = [...selectedWeek];
        if (weeks[indice] !== wk) {
            weeks[indice] = wk;
        }
        setSelectedHours(weeks);
    }

    const validateForm = () => {
        if (!iptName) return false;
        if (!selectedUf) return false;
        if (!selectedCity) return false;
        if (!iptNeighborhood) return false;
        if (!iptStreet) return false;
        if (!iptNumber) return false;
        return true;

    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            api.post('/')
        } catch (error) {
            alert('Erro ao cadastrar ' + error);
        } finally {
            history.push('/');
        }
    }

    return (
        <div className="create-house">
            <Header />
            <div className="container-form">

                <div className="card shadow p-3 mt-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <h4 className="card-title">Preencha os dados</h4>
                        <hr />
                        <form>
                            <h5>Dados Principais</h5>
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
                                        onChange={(value) => { handleIptEmail(value) }} />
                                </div>
                                <div className=" form-group col-sm-4">
                                    <label>Telefone</label>
                                    <input type="number" className="form-control" placeholder="Telefone (Opcional)"
                                        name="iptTelephone" value={iptTelephone}
                                        onChange={(value) => { handleIptTelephone(value) }} />
                                </div>

                                <h5 className="col-12 mt-3">Endereço</h5>
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
                                        onChange={(value) => { handleIptNeighborhood(value) }} />
                                </div>
                                <div className=" form-group col-sm-5">
                                    <label>Rua</label>
                                    <input type="text" className="form-control" placeholder="Rua"
                                        name="iptStreet" required value={iptStreet}
                                        onChange={(value) => { handleIptStreet(value) }} />
                                </div>
                                <div className=" form-group col-sm-3">
                                    <label>Número</label>
                                    <input type="number" className="form-control" placeholder="Número"
                                        name="iptNumber" required value={iptNumber}
                                        onChange={(value) => { handleIptNumber(value) }} />
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

                                <h5 className="col-12 mt-3">Atividades Realizadas</h5>
                            </div>


                            <div id="accordion">
                                {
                                    activities.map((item, index) => {
                                        return (
                                            <div className="card mb-2" key={item.id}>
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        {item.name}
                                                        <input type="checkbox" name="chkActivity"
                                                            aria-label="Checkbox for following text input"
                                                            defaultChecked={chkActivity} onChange={() => { handleSelectChk(item.id) }} />
                                                    </h5>
                                                </div>

                                                <div id={"collapse-" + item.id} className={selectedActivy.includes(item.id) ? 'collapse-show' : 'collapse'} aria-labelledby="headingOne" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <div className="form-row">
                                                        <div className="form-group col-sm-6 col-12">
                                                            <select name="week" className="form-control" onChange={(value) => { handleSelectWeek(value, index) }}>
                                                                <option value="0">Selecione o dia da semana</option>
                                                                <option value="Segunda-feira">Segunda-feira</option>
                                                                <option value="Terça-feira">Terça-feira</option>
                                                                <option value="Quarta-feira">Quarta-feira</option>
                                                                <option value="Quinta-feira">Quinta-feira</option>
                                                                <option value="Sexta-feira">Sexta-feira</option>
                                                                <option value="Sábado">Sábado</option>
                                                                <option value="Sábado">Domingo</option>
                                                            </select>
                                                            </div>

                                                            <div className="form-group col-sm-6 col-12">
                                                                <select name="hours" className="form-control" onChange={(value) => { handleSelectHours(value, index) }}>
                                                                    <option value="0">Selecione o horário</option>
                                                                    <option value="07:00">07:00</option>
                                                                    <option value="07:30">07:30</option>
                                                                    <option value="08:00">08:00</option>
                                                                    <option value="08:30">08:30</option>
                                                                    <option value="09:00">09:00</option>
                                                                    <option value="09:30">09:30</option>
                                                                    <option value="10:00">10:00</option>
                                                                    <option value="10:30">10:30</option>
                                                                    <option value="11:00">11:00</option>
                                                                    <option value="11:30">11:30</option>
                                                                    <option value="12:00">12:00</option>
                                                                    <option value="12:30">12:30</option>
                                                                    <option value="13:00">13:00</option>
                                                                    <option value="13:30">13:30</option>
                                                                    <option value="14:00">14:00</option>
                                                                    <option value="14:30">14:30</option>
                                                                    <option value="15:00">15:00</option>
                                                                    <option value="15:30">15:30</option>
                                                                    <option value="16:00">16:00</option>
                                                                    <option value="16:30">16:30</option>
                                                                    <option value="17:00">17:00</option>
                                                                    <option value="17:30">17:30</option>
                                                                    <option value="18:00">18:00</option>
                                                                    <option value="18:30">18:30</option>
                                                                    <option value="19:00">19:00</option>
                                                                    <option value="19:30">19:30</option>
                                                                    <option value="20:00">20:00</option>
                                                                    <option value="20:30">20:30</option>
                                                                    <option value="21:00">21:00</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <button type="submit" className="btn btn-block btn-info mt-3"
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