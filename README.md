# API da Loja Virtual

Projeto desenvolvido durante o curso de Desenvolvedor Full Stack da Geração Tech.

## Sobre o projeto

API REST para gerenciamento de uma loja virtual, permitindo administrar usuários, categorias, produtos, imagens e opções de produtos.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- TiDB Cloud
- Sequelize
- JWT
- Bcrypt
- Swagger

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de usuários.
- Cadastro e autenticação de usuários.
- Login com geração de token JWT.
- Proteção de rotas por autenticação.
- Gerenciamento de categorias.
- Gerenciamento de produtos.
- Gerenciamento de imagens dos produtos.
- Gerenciamento de opções dos produtos.
- Integração com banco de dados.
- Documentação interativa com Swagger.

## Documentação da API

A documentação interativa pode ser acessada pelo endpoint:

`/api-docs`

## Como executar o projeto

1. Clone o repositório.
2. Instale as dependências:

   `npm install`

3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute as migrations:

   `npx sequelize-cli db:migrate`

5. Inicie o servidor:

   `npm run dev`

## Desenvolvido por

**Hillary Alcântara**

Curso: Desenvolvedor Full Stack – Geração Tech