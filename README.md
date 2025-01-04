# API Node Store

Este projeto consiste em uma API para gerenciamento de produtos, clientes e pedidos, construída com **Node.js**, **Express**, e **MongoDB**. A API foi desenvolvida durante um curso de criação de APIs oferecido pela **Balta.io**.

![image](https://github.com/user-attachments/assets/c5ec0635-a4b5-4710-bce5-6e216e0d0ba2)

## Tecnologias Utilizadas

- **Node.js**: Plataforma JavaScript para o backend.
- **Express**: Framework minimalista para construção de APIs em Node.js.
- **MongoDB**: Banco de dados NoSQL para armazenar informações de produtos, clientes e pedidos.
- **JWT (JSON Web Token)**: Utilizado para autenticação e controle de acesso de administradores.
- **Nodemon**: Ferramenta para reiniciar o servidor durante o desenvolvimento.
- **Body-Parser**: Middleware para processar requisições com corpo JSON.
- **CORS**: Habilitado para permitir que a API seja acessada por diferentes origens.

## Funcionalidades

### **Produtos**
- **GET /products**: Retorna uma lista de todos os produtos.
- **GET /products/:slug**: Retorna um produto específico baseado no slug.
- **GET /products/admin/:id**: Retorna um produto específico baseado no ID para administradores.
- **GET /products/tags/:tag**: Filtra os produtos por tag.
- **POST /products**: Cria um novo produto (requer autenticação de administrador).
- **PUT /products/:id**: Atualiza um produto existente (requer autenticação de administrador).
- **DELETE /products/:id**: Deleta um produto (requer autenticação de administrador).

### **Clientes**
- **POST /customers**: Cria um novo cliente.
- **POST /customers/authenticate**: Realiza a autenticação do cliente (login).
- **POST /customers/refresh-token**: Realiza o refresh do token JWT para autenticação (requer autenticação).

### **Pedidos**
- **GET /orders**: Retorna todos os pedidos.
- **POST /orders**: Cria um novo pedido.

## Estrutura do Projeto

O projeto segue a estrutura abaixo:

- **/src**: Contém o código principal da aplicação, incluindo controladores, modelos, serviços e rotas.
- **/controllers**: Lógica de controle para gerenciar a criação, leitura, atualização e exclusão dos dados.
- **/models**: Modelos de dados que interagem com o banco MongoDB.
- **/routes**: Define as rotas da API.
- **/services**: Contém serviços auxiliares, como o serviço de autenticação.
- **/config**: Configurações, incluindo a string de conexão com o banco de dados.
- **/bin/server.js**: Arquivo de inicialização do servidor.

## Como Usar

Para testar a API, você pode usar ferramentas como **Postman** para realizar requisições HTTP.
