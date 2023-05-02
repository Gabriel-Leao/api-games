# API de games

Uma api rest feita em node, com typescript e sequelize.

## Endpoints

### GET /

Esse endpoint redireciona para o endpoint "/games".

#### Parâmetros

Nenhum

### GET /games

Esse endpoint retorna todos os jogos cadastrados no banco de dados.

#### Parâmetros

Nenhum

##### OK! 200

Caso essa resposta aconteça, você ira receber a listagem de todos os jogos. Exemplo:

```
{
  {
    "id": 1,
    "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1680295115",
    "title": "Counter-Strike: Global Offensive",
    "developer": "Valve",
    "year": 2012,
    "price": 0
  },
  {
      "id": 2,
      "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg?t=1678835815",
      "title": "Hades",
      "developer": "Supergiant Games",
      "year": 2020,
      "price": 24.99
  },
  {
      "id": 3,
      "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg?t=1679238494",
      "title": "Hollow Knight",
      "developer": "Team Cherry",
      "year": 2017,
      "price": 14.99
  },
}
```

### GET /game/id

Esse endpoint retorna todos os jogos cadastrados no banco de dados.

#### Parâmetros

id: Número de identificação de um jogo específico

##### OK! 200

Caso essa resposta aconteça, você ira receber a listagem de todos os jogos.
Exemplo:

```
{
  {
    "id": 1,
    "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1680295115",
    "title": "Counter-Strike: Global Offensive",
    "developer": "Valve",
    "year": 2012,
    "price": 0
  },
  {
      "id": 2,
      "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg?t=1678835815",
      "title": "Hades",
      "developer": "Supergiant Games",
      "year": 2020,
      "price": 24.99
  },
  {
      "id": 3,
      "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg?t=1679238494",
      "title": "Hollow Knight",
      "developer": "Team Cherry",
      "year": 2017,
      "price": 14.99
  },
}
```

##### Not Found! 404

Caso essa resposta aconteça, que o id que você enviou não corresponde a nenhum jogo.
Exemplo:

```
{
  Error: 'Game not found'
}
```

### POST /game

Esse endpoint retorna todos os jogos cadastrados no banco de dados.

#### Parâmetros

id: Número de identificação de um jogo específico

##### OK! 201

Caso essa resposta aconteça, você ira receber uma mensagem dizendo que o jogo foi criado com sucesso.
Exemplo:

```
{
  Success: 'Game has been added successfully'
}
```

##### Bad request! 400

Caso essa resposta aconteça, significa que você não enviou um dos parâmetros, ou que um deles não está correto .
Exemplo:

```
{
  Error: 'Bad request'
}
```
