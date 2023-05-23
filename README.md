# API de games

Uma api rest feita em node, com typescript e sequelize.

## Endpoints

### GET /

Esse endpoint redireciona para o endpoint "/games".

### Parâmetros

Nenhum

### GET /games

Esse endpoint retorna todos os jogos cadastrados no banco de dados.

### Parâmetros

Nenhum

#### OK 200

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

### GET /game/:id

Esse endpoint retorna todos os jogos cadastrados no banco de dados.

### Parâmetros

id: Número de identificação de um jogo específico. Esse Parâmetro é do tipo number.

#### OK 200

Caso essa resposta aconteça, você ira receber as informações do jogo em específico.

Exemplo:

```
{
  "id": 1,
  "cover": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1680295115",
  "title": "Counter-Strike: Global Offensive",
  "developer": "Valve",
  "year": 2012,
  "price": 0
},
```

#### Not Found 404

Caso essa resposta aconteça, significa que o id que você enviou não corresponde a nenhum jogo ou é do tipo incorreto.

Exemplo:

```
{
  Error: 'Game not found'
}
```

### POST /game

Esse endpoint adiciona um jogo ao banco de dados. Para acessa-lo é necessário estar logado.

### Parâmetros

cover: link url da capa do jogo, para os jogos utilizei o link do steamdb. Esse parâmetro é do tipo string;

title: Título do jogo. Esse parâmetro é do tipo string;

developer: Empresa por trás do desenvolvimento do game, não de sua publicação. Esse parâmetro é do tipo string;

year: Ano de lançamento do jogo. Esse parâmetro é do tipo number;

price: Preço do jogo em dólares, sem considerar promoção. Esse parâmetro é do tipo number.

#### Created 201

Caso essa resposta aconteça, você ira receber uma mensagem dizendo que o jogo foi criado com sucesso.

Exemplo:

```
{
  Success: 'Game has been added successfully'
}
```

#### Bad request 400

Caso essa resposta aconteça, significa que você não enviou um dos parâmetros, ou que um deles não está correto.

Exemplo:

```
{
  Error: 'Bad request'
}
```

### POST /user/auth

Esse endpoint é utilizado para fazer login na api, caso os dados sejam passados corretamente, o retorno é um token jwt.

Exemplo:

```
{
  email: 'teste@email.com',
  password: '12345678'
}
```

### Parâmetros

email: Precisa ser um e-mail válido que esteja cadastrado no banco de dados. Esse campo é do tipo string.

password: Uma senha com no mínimo 8 caracteres, esse senha é criptografada e salva no banco de dados. Esse parâmetro é do tipo string.

#### Bad Request 400

Caso essa resposta aconteça, significa que os dados enviados são do tipo errado ou não foram enviados todos os parâmetros.

Exemplo:

```
{
  Error: 'Bad Request'
}
```

#### Not found 404

Caso essa resposta aconteça, significa que o e-mail enviado não está cadastrado no banco de dados.

Exemplo:

```
{
  Error: 'Email Not Found'
}
```

#### Incorrect credentials 401

Caso essa resposta aconteça, significa que o e-mail foi encontrado, mas a senha está incorreta.

Exemplo:

```
{
  Error: 'Incorrect credentials'
}
```

#### Internal server error 500

Caso essa resposta aconteça, significa que houve um erro no servidor durante a geração do token

Exemplo:

```
{
  Error: 'Internal server error'
}
```

#### OK 200

Caso essa resposta aconteça, significa que o token foi gerado com sucesso.

Exemplo:

```
{
  Token: 'token'
}
```

### PUT /game/:id

Esse endpoint serve para editar um jogo em específico. Neste endpoint, todos os parâmetros exceto pelo id, são opcionais. Para acessa-lo é necessário estar logado.

### Parâmetros

id: Número de identificação de um jogo específico. Esse Parâmetro é do tipo number.

cover: link url da capa do jogo, para os jogos utilizei o link do steamdb. Esse parâmetro é do tipo string;

title: Título do jogo. Esse parâmetro é do tipo string;

developer: Empresa por trás do desenvolvimento do game, não de sua publicação. Esse parâmetro é do tipo string;

year: Ano de lançamento do jogo. Esse parâmetro é do tipo number;

price: Preço do jogo em dólares, sem considerar promoção. Esse parâmetro é do tipo number.

#### Bad Request 400

Caso essa resposta aconteça, significa que os dados enviados são do tipo errado ou não foram enviados todos os parâmetros obrigatórios.

Exemplo:

```
{
  Error: 'Bad Request'
}
```

#### Not Found 404

Caso essa resposta aconteça, significa que o id que você enviou não corresponde a nenhum jogo ou é do tipo incorreto.

Exemplo:

```
{
  Error: 'Game not found'
}
```

#### OK 200

Caso essa resposta aconteça, significa que o jogo foi atualizado com sucesso.

Exemplo:

```
{
  Success: 'Game has been edited successfully'
}
```

### DELETE /game/:id

Esse remove o jogo que corresponde ao id passado. Para acessa-lo é necessário estar logado.

### Parâmetros

id: Número de identificação de um jogo específico. Esse Parâmetro é do tipo number.

#### OK 200

Caso essa resposta aconteça, você irá receber uma mensagem dizendo que o jogo foi removido.

Exemplo:

```
{
  Success: 'Game has been removed successfully'
}
```

#### Not Found 404

Caso essa resposta aconteça, significa que o id que você enviou não corresponde a nenhum jogo ou é do tipo incorreto.

Exemplo:

```
{
  Error: 'Game not found'
}
```

### POST /user/create

Esse endpoint adiciona um usuário ao banco de dados. Para acessa-lo é necessário estar logado.

### Parâmetros

name: Nome de usuário. Esse parâmetro é do tipo string
email: E-mail válido. Esse parâmetro é do tipo string
password: Senha com no mínimo 8 caracteres. Esse parâmetro é do tipo string

Exemplo:

```
{
  name: 'userName'
  email: 'teste@email.com',
  password: '12345678'
}
```

#### Created 201

Caso essa resposta aconteça, você ira receber uma mensagem dizendo que o usuário foi criado com sucesso.

Exemplo:

```
{
  Success: 'User has been added successfully'
}
```

#### Bad request 400

Caso essa resposta aconteça, significa que você não enviou um dos parâmetros, ou que um deles não está correto.

Exemplo:

```
{
  Error: 'Bad request'
}
```
