import { Localizacao } from "../models/Localizacao.model";

const url = "http://localhost:8080/localizacoes";

export function getLocalizacoes(): Promise<Localizacao[]> {
    return fetch(url, { method: 'GET' })
        .then((res) => res.json());
}

export function getLocalizacao(id: number): Promise<Localizacao> {
    return fetch(`${url}/${id}`, { method: 'GET' })
        .then((res) => res.json());
}

export function postLocalizacao(localizacao: Localizacao) {
    const requestOptions = {
        method: "POST", // Especifica o método da solicitação
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo do corpo da solicitação como JSON
        },
        body: JSON.stringify(localizacao), // Converte o objeto de dados em uma string JSON
    };
    return fetch(url, requestOptions)
        .then((res) => res.json());
}

export function putLocalizacao(id: number, localizacao: Localizacao) {
    const requestOptions = {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localizacao),
    };
    return fetch(`${url}/${id}`, requestOptions)
        .then((res) => res.json());
}

export function deleteLocalizacao(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" })
        .then((res) => res.json());
}