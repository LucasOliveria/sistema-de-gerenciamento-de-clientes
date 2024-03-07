# Como utilizar os códigos desse repositório:

Antes de começar a usar os códigos desse repositório será necessário instale o Node.js e o postgreSQL na sua máquina caso ainda não possua.

Node.js: <a href="https://nodejs.org/en" target="_blank">"https://nodejs.org/en</a> 

postgreSQL: <a href="https://www.postgresql.org/download/" target="_blank">https://www.postgresql.org/download/</a> 

Também será necessário o uso de um editor de código e um editor SQL. Caso não possua recomendo que baixe e utilize o VS Code e o Beekeeper Studio ou outros editores de sua preferencia.

Após instalação das ferramentas necessárias, siga os passos abaixo:

1. Faça um fork desse repositório para a sua coleção de repositórios no GitHub
2. Clone o repositório para sua máquina
3. Abra o projeto no VS Code ou outro editor de códigos (IDE) que esteja usando.
4. O projeto possui duas pastas no seu diretório raiz, as pastas **backend** e **frontend**. Abaixo estão as instruções de como configurar cada uma delas.

## Configurações do Backend
1. Com o projeto aberto no editor de códigos, abra um terminal no editor e navegue até a pasta **backend**.
2. Com o caminho do terminal apontado para a pasta backend, digite o comando "**npm install**" para instalar as dependências.
3. Agora vamos precisar das querys para criar o banco de dados e suas tabelas. Tais comando estão no arquivo ```dump.sql```, para encontrá-lo basta clicar nas pastas ```backend > src > database > dump.sql```.
4. Com o auxilio da ferramenta que você utiliza para criar e manipular banco de dados (editor SQL), crie um banco de dados utilizando a primeira linha de comando do ```dump.sql```:

```sql
CREATE DATABASE sgc_database;
```
5. Ainda no editor SQL, entre no banco de dados que você acabou de criar e utilize os outros comando presentes no ```dump.sql``` para criar as tabelas.

```sql
CREATE TABLE clients (
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(255) NOT NULL,
  EMAIL TEXT UNIQUE NOT NULL,
  PHONE VARCHAR(11) NOT NULL
);

CREATE TABLE coordinates (
  ID SERIAL PRIMARY KEY,
  USER_ID INTEGER REFERENCES clients(id),
  COORD_X DOUBLE PRECISION NOT NULL,
  COORD_Y DOUBLE PRECISION NOT NULL
);
```
OBS.: Caso não possua nenhuma ferramenta para criação e manipulação de banco de dados pode fazer o download de alguma dessas listadas abaixo:

* Beekeeper Studio
* DBeaver
* DataGrip
* SQL Workbench/J

6. Existem variáveis de ambiente inseridas nos códigos e essas devem ser configuradas antes de inicializar a aplicação. Para isso duplique o arquivo ```.env.example``` que está na raiz da pasta backend, e renomeie para ```.env```. 
7. Dentro do arquivo ```.env``` preencha as variáveis com as configurações de conexão que costuma utilizar, lembrando que o nome do banco de dados criado anteriormente é **sgc_database**. O nome e senha de usuario postgreSQL que serão utilizados aqui são os mesmos que foram configurados ao instalar o postgreSQL em sua máquina. Abaixo esta um exemplo de como configurar as variáveis de ambiante com base nas configurações mais usuais.

#### .env (exemplos)
```javascript
DATABASE_HOST="localhost"
DATABASE_PORT=5432
DATABASE_USER="SeuNomeDeUsuarioPostgres"
DATABASE_PASS="SuaSenhaDeUsuarioPostgres"
DATABASE_NAME="sgc_database"
```
8. Agora abra novamente o terminal do editor de código (IDE), navegue até a pasta **backend** e rode o comando **npm run dev**.  

## Configurações do Frontend

1. Com o projeto aberto no editor de códigos, abra um terminal no editor e navegue até a pasta **frontend**.
2. Com o caminho do terminal apontado para a pasta frontend, digite o comando "**npm install**" para instalar as dependências.
3. Após isso, utilizando o mesmo terminal e digite o comando **npm run dev**.
4. Abra o navegador que costuma utilizar (chrome, firefox, edge...) e digite a URL: http://localhost:5173/
---
## Endpoints Backend

* O projeto backend possui 3 rotas que estão sendo utilizadas para conectar-se ao banco de dados e fornecer os dados necessário ao frontend.
* Abaixo explicarei como cada endpoint de rota funciona

### 1. POST /client

#### Finalidade
* Essa rota é utilizada para cadastro de novos clientes

#### Exemplo de requisição

```json 
{
    "name": "Lucas Oliveira",
    "email":"lucas@email.com",
    "phone":"81995079258",
    "coord_x": 0,
    "coord_y": -1.1
}
```
#### Exemplos de resposta
status 201
```json    
{
    "id": 1,
    "name": "Lucas Oliveira",
    "email": "lucas@email.com",
    "phone": "81995079258",
    "coordinates": {
        "coord_x": 0,
        "coord_y": -1.1
    }
}
```
status 400
```json    
{ "message": "O e-mail informado já possui cadastro." }
```
status 500
```json    
{ "message": "Erro interno do servidor!" }
```

### 2. GET /client

#### Finalidade
* Essa rota é utilizada para obter o registro de todos os clientes cadastrados no sistema

#### Exemplo de requisição

Sem corpo da requisição.

#### Exemplos de resposta
status 200
```json    
[
    {
        "id": 1,
        "name": "Luiz",
        "email": "luiz@gmail.com",
        "phone": "98987553214",
        "coordinates": {
            "coord_x": 5,
            "coord_y": 1
        }
    },
    {
        "id": 2,
        "name": "Ana",
        "email": "ana@gmail.com",
        "phone": "21987553214",
        "coordinates": {
            "coord_x": 3,
            "coord_y": 4
        }
    },
    {
        "id": 3,
        "name": "Carlos",
        "email": "carlos@gmail.com",
        "phone": "11987557714",
        "coordinates": {
            "coord_x": 1,
            "coord_y": -1
        }
    },
    {
        "id": 4,
        "name": "Maria",
        "email": "maria@gmail.com",
        "phone": "21987557714",
        "coordinates": {
            "coord_x": 6,
            "coord_y": 2
        }
    }
]
```
status 500
```json    
{ "message": "Erro interno do servidor!" }
```
### 3. GET /visitation-order

#### Finalidade
* Essa rota é utilizada para obter o registro de todos os clientes na ordem que devem ser visitados do primeiro ao último cliente da rota de modo que o visitante possa fazer sempre o menor caminho
#### Exemplo de requisição

Sem corpo da requisição.

#### Exemplos de resposta
status 200
```json    
[
    {
        "id": 3,
        "name": "Carlos",
        "email": "carlos@gmail.com",
        "phone": "11987557714",
        "coordinates": {
            "coord_x": 1,
            "coord_y": -1
        }
    },
    {
        "id": 1,
        "name": "Luiz",
        "email": "luiz@gmail.com",
        "phone": "98987553214",
        "coordinates": {
            "coord_x": 5,
            "coord_y": 1
        }
    },
    {
        "id": 4,
        "name": "Maria",
        "email": "maria@gmail.com",
        "phone": "21987557714",
        "coordinates": {
            "coord_x": 6,
            "coord_y": 2
        }
    },
    {
        "id": 2,
        "name": "Ana",
        "email": "ana@gmail.com",
        "phone": "21987553214",
        "coordinates": {
            "coord_x": 3,
            "coord_y": 4
        }
    }
]
```
status 500
```json    
{ "message": "Erro interno do servidor!" }
```

