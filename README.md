## Sistema de Gerenciamento de Usuários

O sistema mostra um CRUD com upload de fotos feito usando Angular v12, Node v12.21.0 e MySql v8.0.20 da Amazon RDS T2 Micro.
A parte do backend(feito em Nodejs) está rodando em uma instância do Amazon EC2 T2 Micro, e o frontend(Angular) está no Amazon S3 static bucket.

### Demo
<a href="http://dev-crud-des.s3-website-us-east-1.amazonaws.com" target="_blank">Acessar</a>
## Passos para a instalação do sistema em dev local

- Após realiazar o clone do projeto execute o comando cd crudNodeAngular
- cd src
- yarn install
- Configura o arquivo .env com o comando no terminal cp .env.example .env. Definir a porta do serviço e as configurações do banco de dados
- Executar o comando yarn start index.js
- cd .. && cd frontend
- yarn install
- ng serve --open (caso tenha o Angula CLI toll instalado), caso não tenha execute o comando yarn install -g @angular/cli 

## Até a próxima
