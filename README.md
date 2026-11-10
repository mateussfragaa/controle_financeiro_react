# Controle Financeiro

Aplicação web desenvolvida em React para auxiliar no controle financeiro pessoal, permitindo cadastrar, visualizar, editar e excluir receitas e despesas.

## Funcionalidades

- Página inicial
- Página de transações
- Página sobre
- Navegação entre páginas
- Cadastro de receitas e despesas
- Listagem de transações cadastradas
- Edição de transações
- Exclusão de transações
- Armazenamento dos dados em banco de dados SQLite
- Comunicação entre frontend e backend por meio de uma API REST
- Tratamento de erros nas requisições à API

## Tecnologias

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS
- Axios

### Backend
- Node.js
- Express
- SQLite
- Better-SQLite3
- CORS
- Dotenv

## Estrutura do projeto

```text
controle_financeiro_react/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── src/
│   └── services/
│       ├── api.js
│       └── transacoesService.js
├── .env.example
├── package.json
└── README.md
```

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/mateussfragaa/controle_financeiro_react.git
```

### 2. Entre na pasta do projeto

```bash
cd controle_financeiro_react
```

### 3. Instale as dependências do frontend

```bash
npm install
```

### 4. Configure a variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
VITE_API_URL=http://localhost:3000
```

### 5. Instale as dependências do backend

Abra outro terminal, entre na pasta `backend`:

```bash
cd backend
npm install
```

### 6. Inicie o backend

Ainda dentro da pasta `backend`, execute:

```bash
npm run dev
```

O servidor será iniciado na porta 3000. O banco de dados SQLite será criado automaticamente na primeira execução.

### 7. Inicie o frontend

No primeiro terminal, na raiz do projeto, execute:

```bash
npm run dev
```

O Vite disponibilizará o endereço local para acessar a aplicação.

**Importante:** Para utilizar o sistema corretamente, mantenha o backend e o frontend executando simultaneamente, cada um em seu terminal.

## API REST

A aplicação utiliza uma API REST própria para gerenciar as transações financeiras.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/transacoes` | Lista as transações |
| POST | `/transacoes` | Cadastra uma transação |
| PUT | `/transacoes/:id` | Atualiza uma transação |
| DELETE | `/transacoes/:id` | Exclui uma transação |

## Banco de dados

Os dados são armazenados localmente utilizando SQLite. O banco é criado automaticamente pelo backend e mantém as transações mesmo após o encerramento do servidor.