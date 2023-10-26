# React Router

Este trabalho tem como objetivo aprimorar meus conhecimentos em React com TypeScript. A aplicação desenvolvida consiste em simples CRUD (Create, Read, Update, Delete) de endereços, integrando com api do ViaCep para completar automaticamente os dados de endereço após inserir o CEP. Foram introduzidos o roteamento do react (react-router-dom), consumo de api utilizando o fetch e componentes e estilos do bootstrap, entre outros pacotes como o de máscaras para input (react-input-mask).

### Estrutura da aplicação
A estrutura do projeto foi voltada para reutilização de código e separação de responsabilidades.
- `src/components` encontramos todos os componentes compartilhados em outros componentes da aplicação. 
- `src/fake-api/db.json` temos o mock que simulará uma API falsa, onde podemos realizar requisições GET, POST, PUT e DELETE simulando o back-end do CRUD da aplicação. 
- `src/models` contém os modelos que os objetos de domínio da aplicação devem seguir. 
- `src/pages` contém todos os componentes referentes as páginas da aplicação que estão diretamentes vinculadas a uma rota.
- `src/services` contém serviços reutilizáveis para serem usados nos componentes da aplicação.

### Ambiente de desenvolvimento
Aplicação foi desenvolvida sob o Node.js **18.18.2** e npm **9.8.1**

### Executando a aplicação

`npm install`
`npm start`
`npm run fake-api`

O app estará disponivel em [http://localhost:3000](http://localhost:3000).
