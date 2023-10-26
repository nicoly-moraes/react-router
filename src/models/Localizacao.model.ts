export interface Localizacao {
    id?: number;
    cep: string;
    endereco: string;
    numero: string;
    complemento?: string;
    bairro: string;
    estado: string;
    cidade: string;
}