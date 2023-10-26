import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./CadastroEndereco.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalizacao, postLocalizacao, putLocalizacao } from "../../services/localizacoes.service";
import { Localizacao } from "../../models/Localizacao.model";
import { toast } from "../../services/alert.service";
import { estados } from "./estados.data";
import InputMask from 'react-input-mask';

export default function CadastroEndereco() {
    const navigate = useNavigate();
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');

    const { id } = useParams();
    
    useEffect(() => {
        if (id) {
            getLocalizacao(Number(id))
            .then((data) => {
                setCep(data.cep);
                setEndereco(data.endereco);
                setBairro(data.bairro);
                setCidade(data.cidade);
                setEstado(data.estado);
                setNumero(data.numero);
                setComplemento(data?.complemento ?? '');
            });
        }
    }, []);

    const obterEnderecoDoCEP = (cep: string) => {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        return fetch(url, { method: 'GET' });
    }

    const cepAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace('-', '');
        setCep(value);
        if (value.length == 8) {
            obterEnderecoDoCEP(value)
                .then((res) => {
                    return res.json();
                })
                .then((endereco) => {
                    setEndereco(endereco.logradouro);
                    setBairro(endereco.bairro);
                    setCidade(endereco.localidade);
                    setEstado(endereco.uf);
                })
                .catch((erro) => {

                });
        }
    }

    const enderecoAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        setEndereco(event.target.value);
    }

    const numeroAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        setNumero(event.target.value);
    };

    const complementoAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        setComplemento(event.target.value);
    };

    const bairroAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        setBairro(event.target.value);
    };

    const estadoAlterado = (event: ChangeEvent<HTMLSelectElement>) => {
        setEstado(event.target.value);
    };

    const cidadeAlterado = (event: ChangeEvent<HTMLInputElement>) => {
        setCidade(event.target.value);
    };
    

    const enviarFormulario = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (cep.length == 0 || endereco.length == 0 || numero.length == 0 || bairro.length == 0 || cidade.length == 0 || estado.length == 0) {
            toast('error', 'Preencha todos os campos');
            return;
        }

        const localizacao: Localizacao = {
            cep: cep,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            complemento: complemento,
            cidade: cidade,
            estado: estado
        }

        if (id) {
            putLocalizacao(Number(id), localizacao)
                .then(() => {
                    toast('success', 'Atualizado com sucesso!');
                });
        } else {
            postLocalizacao(localizacao)
                .then(() => {
                    toast('success', 'Cadastrado com sucesso!');
                });
        }

        navigate("/enderecos/lista");
    }

    return (
        <>
            <div className={style.cadastro}>
                <div className={`card ${style.card}`}>
                    <div className="card-header bg-white border-0">
                        <h4 className="card-title text-center mt-3">Cadastro de Endereço</h4>
                    </div>
                    <div className={`card-body ${style.cardBody}`}>
                        <form className={`row g-3  ${style.form}`} onSubmit={enviarFormulario}>
                            <div className="col-md-4">
                                <label htmlFor="inputCep" className="form-label" >
                                    Cep
                                </label>
                                <InputMask 
                                    mask="99999-999" 
                                    maskChar="" 
                                    type="text" 
                                    className="form-control" 
                                    id="inputCep" 
                                    onChange={cepAlterado} 
                                    value={cep}
                                />
                            </div>
                            <div className="col-md-9">
                                <label htmlFor="inputEndereco" className="form-label">
                                    Endereço
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputEndereco" 
                                    value={endereco} 
                                    onChange={enderecoAlterado} 
                                    
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="inputNumero" className="form-label">
                                    Número
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputNumero" 
                                    onChange={numeroAlterado} 
                                    value={numero} 
                                    
                                />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="inputComplement" className="form-label">
                                    Complemento
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputComplement"
                                    onChange={complementoAlterado}
                                    value={complemento}
                                />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="inputBairro" className="form-label" >
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputBairro"
                                    value={bairro}
                                    onChange={bairroAlterado}
                                  
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEstado" className="form-label">
                                    Estado
                                </label>
                                <select
                                    id="inputEstado"
                                    className="form-select" 
                                    value={estado} 
                                    onChange={estadoAlterado}
                                >
                                    <option hidden>Selecione</option>
                                    {estados.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.text}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCidade" className="form-label">
                                    Cidade
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputCidade" 
                                    value={cidade} 
                                    onChange={cidadeAlterado} 
                                />
                            </div>
                            <div className="col-12 text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary">
                                        Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}