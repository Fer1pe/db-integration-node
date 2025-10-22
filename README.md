# 🛠️ Controle de Ferramentas

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge" />
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge" />
  <img alt="Sequelize" src="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge" />
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge" />
</p>

API REST simples para gerenciar Usuários, Categorias e Ferramentas. Cada Categoria e Ferramenta pertence a um Usuário (campo `usuarioId`) e operações CRUD são restritas ao dono via JWT.

## Rápido (run)
1. Instalar:
```bash
npm install
```
2. Configurar MySQL em `database/database.js` e iniciar o servidor MySQL.
3. Rodar:
```bash
npm start
```
Servidor padrão: http://localhost:3000

## Autenticação
- Login retorna JWT (payload: { email, id }, expira em 1h).
- Middleware `checkAuth` lê `Authorization: Bearer <token>` ou `Authorization: <token>` e define `req.userData`.

## Endpoints principais
- Usuários: POST /usuarios (criar), POST /usuarios/login (login), GET/PUT/DELETE protegidos.
- Categorias (protegidas): POST/PUT/DELETE/GET — operam apenas sobre `usuarioId` do token.
- Ferramentas (protegidas): POST/PUT/DELETE/GET — valida `categoriaId` pertence ao usuário; inclui dados da categoria.

