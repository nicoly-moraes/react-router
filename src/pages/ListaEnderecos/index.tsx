import { useEffect, useState } from "react";
import { deleteLocalizacao, getLocalizacoes } from "../../services/localizacoes.service";
import { Localizacao } from "../../models/Localizacao.model";
import { useNavigate } from "react-router-dom";
import { confirm, toast } from "../../services/alert.service";

export default function ListaEnderecos() {
    const navigate = useNavigate();

    const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);

    useEffect(() => {
        getLocalizacoes()
            .then((data) => {
                setLocalizacoes(data);
            });
    }, []);

    const editarEndereco = (id?: number) => {
        navigate(`/endereco/cadastro/${id}`);
    }

    const excluirEndereco = (id?: number) => {
        if (id != undefined) {
          confirm('warning', `Confirmar exclusão do ID: ${id}?`)
            .then((result) => {
                if (result.isConfirmed) {
                    deleteLocalizacao(id)
                        .then(() => {
                            const filtro = localizacoes.filter(item => item.id != id);
                            setLocalizacoes(filtro);
                            toast('success', 'Endereço excluído com sucesso');
                        });
                }
            })
        }
    }

    return (
        <>
            <div className="card mt-5">
                <div className="card-header bg-white border-0">
                    <h4 className="card-title mt-3">Lista de Endereços</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">CEP</th>
                                    <th scope="col">Endereço</th>
                                    <th scope="col">Número</th>
                                    <th scope="col">Complemento</th>
                                    <th scope="col">Bairro</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {localizacoes.map((item) => {
                                    if (item.cep.length == 8) {
                                        item.cep = item.cep.slice(0, 5) + "-" + item.cep.slice(5);
                                    }
                                    return (
                                        <tr key={item.id}>
                                            <td className="align-middle">{item.id}</td>
                                            <td className="align-middle">{item.cep}</td>
                                            <td className="align-middle">{item.endereco}</td>
                                            <td className="align-middle">{item.numero}</td>
                                            <td className="align-middle">{item.complemento}</td>
                                            <td className="align-middle">{item.bairro}</td>
                                            <td className="align-middle">{item.cidade}</td>
                                            <td className="align-middle">{item.estado}</td>
                                            <td className="align-middle">
                                                <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => editarEndereco(item.id)}>
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger btn-sm m-1" onClick={() => excluirEndereco(item.id)} >
                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}