# Backend API
Este projeto é uma aplicação **backend** containerizada utilizando **Docker** e **Docker Compose**.  
A aplicação constrói sua própria imagem Docker e utiliza o **Redis 7** como serviço auxiliar (cache, fila ou armazenamento temporário).

# Como criar e usar a imagem do backend no Docker

---

## 🛠️ Tecnologias Utilizadas

- Docker
- Docker Compose
- Redis 7
- Backend Node.js

---

## 📦 Estrutura do Projeto

```text
.
├── Dockerfile
├── docker-compose.yml
├── src/
│   └── ...
├── .env
└── README.md
```

## Certifique-se de ter instalado na sua máquina:
- Docker
- Docker Compose

### Verifique a instalação com:
```
docker --version
docker compose version
```

## Clone o repositório:
```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

## ⚠️ Crie um arquivo .env na raiz do projeto e adicione as seguintes váriaveis com os devidos valores ⚠️
```
PORT=3000
WEATHER_API_KEY=sua_chave
REDIS_URL=redis://localhost:6379
```

## Suba o container com:
``` docker compose up --build ```
