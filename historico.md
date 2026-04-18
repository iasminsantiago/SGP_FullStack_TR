# SGP_FullStack_TR
Projeto full stack de gerenciador de projetos por usuário, usando Java + React e JS + React.

Arquivos env (No .gitignore) geralmente nao sao enviados ao git, potr ter configurações de segurança.


O target nao vai pro git pois tem os arquivos class, que quando eu for rodar, serao gerados de qualqeur firma
apagar target ou biuld (construir) ou dist (distribuir)

apaga pelo windows mesmo ou rm -rf target  (no linux e amc)


joao el paragrafo de 5 a 6 linhas, por pratica, nao é leitura que fixa mas universal. l
a leitura transversal fixa

quem e ro amnce le letra por eltra. livro tecnico e livro de referenica. entendo masi ou emnos a forma em que as cosias estao. vai so onde voce quer. ele pegou livro de 2000 aoginas e leu em 2 dias e so sabe do qeu trta, so sabendo onde ele vai pra aprender algo, ele nao le como romance, palavra por palavra. 

subir degrau funciona pra todo mundo. tem quem comeca programaco e quer criar sistema. se voce vai escalando devargazinho, voce vai dizando. como lerei e execcitarei e transitarei da eoria pra pratica.
subir degrau aos poucos é mehor que tentar voar. 

joao comecou com redes, e depois foi pra front e back. 


O que a pessoa não ver aqui, com,o converter para  https, ele pode fazer pull request.

Caso esteja, então a pessoa sabe que eu ainda farei.

Genio nao resolve problema, tende a dizer que sabe muito. 

A empresa contrata quem resolve rpoblema, pois ele resolve problema em dinheiro.

Quando compartilho como faço, compartilho como resolvo problema.



CONTRIBUTING.md Dá regras para que outras pessoas, que olhem para meu repositorio e quiserem contirbuir com ele, consigam tarbalhar.






## Funcionalidades

- Login com autenticação via token JWT
- Dashboard com gráficos
- Listagem, cadastro de projetos
- Listagem, cadastro de tarefas
- Listagem, cadastro de usuários
- API REST protegida — todas as rotas exigem autenticação exceto login

## Como rodar

### Back-end
```bash
.\mvnw spring-boot:run
```
Acesse: `http://localhost:8080/swagger-ui/index.html`

### Front-end
```bash
npm install
npm run start
```
Acesse: `http://localhost:3000`

## Credenciais padrão
Email: admin@sgp.com
Senha: 123456

## Observações
- O banco H2 é reiniciado a cada vez que o back sobe — os dados não persistem
- Para usar MySQL, alterar as configurações em `application.properties`

## Melhorias futuras
- Edição e exclusão de projetos, tarefas e usuários pelo site
- Persistência com MySQL em produção
- Tela de recuperação de senha



## Arquitetura
```md
SGP-API/
└── src/main/java/br/com/trein.../
    ├── config/
    │   ├── CorsConfig.java          # Configura quem pode acessar a API (CORS)
    │   ├── DataInitializer.java     # Cria usuário admin automático ao iniciar
    │   ├── OpenApiConfig.java       # Configurações do Swagger
    │   └── SecurityConfig.java      # Protege as rotas, libera só login e Swagger
    │
    ├── controllers/
    │   ├── AuthController.java      # Rota de login, gera o token JWT
    │   ├── ProjetoController.java   # CRUD de projetos
    │   ├── TarefaController.java    # CRUD de tarefas
    │   └── UsuarioController.java   # CRUD de usuários
    │
    ├── dto/
    │   ├── LoginRequestDTO.java     # Recebe email e senha do front no login
    │   ├── ProjetoDTO.java          # Dados transferidos de projeto
    │   ├── TarefaDTO.java           # Dados transferidos de tarefa
    │   └── UsuarioDTO.java          # Dados transferidos de usuário
    │
    ├── models/
    │   ├── Projeto.java             # Entidade projeto no banco
    │   ├── Tarefa.java              # Entidade tarefa no banco
    │   └── Usuario.java             # Entidade usuário no banco
    │
    ├── repository/
    │   ├── ProjetoRepository.java   # Queries do banco para projetos
    │   ├── TarefaRepository.java    # Queries do banco para tarefas
    │   └── UsuarioRepository.java   # Queries do banco para usuários
    │
    ├── security/
    │   ├── JwtFilter.java           # Intercepta requisições e valida o token
    │   └── JwtService.java          # Gera e valida tokens JWT
    │
    ├── services/
    │   ├── ProjetoService.java      # Regras de negócio de projetos
    │   ├── TarefaService.java       # Regras de negócio de tarefas
    │   └── UsuarioService.java      # Regras de negócio de usuários
    │
    ├── types/enums/
    │   ├── Prioridade.java          # Enum de prioridades
    │   ├── StatusProjeto.java       # Enum de status do projeto
    │   ├── StatusTarefa.java        # Enum de status da tarefa
    │   └── StatusUsuario.java       # Enum de status do usuário
    │
    └── SgpApplication.java          # Classe principal, inicia a aplicação
```


## Endpoints da API - SGP

### Projetos `/projetos`

| Método | Endpoint | O que faz |
|---|---|---|
| GET | `/projetos` | Lista todos os projetos |
| GET | `/projetos/{id}` | Busca 1 projeto pelo id |
| POST | `/projetos` | Cria novo projeto |
| PUT | `/projetos/{id}` | Atualiza um projeto pelo id |
| DELETE | `/projetos/{id}` | Deleta um projeto pelo id |

### Usuários `/usuarios`

| Método | Endpoint | O que faz |
|---|---|---|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/{id}` | Busca 1 usuário pelo id |
| POST | `/usuarios` | Cria novo usuário |
| PUT | `/usuarios/{id}` | Atualiza um usuário pelo id |
| DELETE | `/usuarios/{id}` | Deleta um usuário pelo id |

### Tarefas `/tarefas`

| Método | Endpoint | O que faz |
|---|---|---|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/{id}` | Busca 1 tarefa pelo id |
| POST | `/tarefas` | Cria nova tarefa |
| PUT | `/tarefas/{id}` | Atualiza uma tarefa pelo id |
| DELETE | `/tarefas/{id}` | Deleta uma tarefa pelo id |



### Autenticação `/login`

| Método | Endpoint | O que faz |
|---|---|---|
| POST | `/login` | Realiza login e retorna token JWT |

> ⚠️ Todas as rotas exceto `/login` exigem autenticação via token JWT.

## Conceitos

Node.js — é o programa em si, o que você precisa pra rodar o front.

NVM — Node Version Manager — é um gerenciador que permite ter várias versões do Node instaladas e trocar entre elas.


### API 
é o sistema inteiro - é o back-end que construimos em Spring Boot. 
```API = localhost:8080```  (o restaurante inteiro)

### Endpoint 
End = fim, Point = ponto — ponto final do caminho.
é cada "porta de entrada" específica da API - é a combinação de verbo + rota. É como cada prato do cardápio do restaurante.
```
Endpoints = cada rota disponível (os pratos)
GET  /projetos
POST /projetos
GET  /usuarios
POST /login
...
```

É literalmente o destino final da requisição:

```
localhost:8080  +  /projetos  +  GET
     │                │             │
  endereço          caminho       ação
  do servidor       (endpoint)
```

API = a cidade inteira
Endpoint = o endereço específico que você quer chegar
Verbo HTTP = o que você vai fazer lá (buscar, entregar, deletar)


Logo, /projetos sozinho não é um endpoint completo, e só uma rota. 
Para ser endpoint, precisa do verbo:

GET /projetos → um endpoint
POST /projetos → outro endpoint diferente


### JWT 
JSON Web Token é um formato de token gerado pelo servidor no momento do login. Ele carrega as informações do usuário e tem prazo de validade. Quando o usuário faz novas requisições, o front já guardou o token e o envia pro back, pra provar que o usuário já está autenticado, sem precisar informar a senha novamente a cada requisição.


Na pasta Controllers, ProjetoController, UsuarioController, TarefaController Cuidam do CRUD — criar, listar, editar, deletar dados.

### AuthController
Cuida só do login — recebe email e senha, valida no banco, e gera o token JWT.

A diferença principal é que o AuthController é a porta de entrada do sistema — é a única rota que não precisa de token pra ser acessada. Todas as outras rotas exigem autenticação.
<br />


### DTO
```md
dto/
├── LoginRequestDTO.java
└── UsuarioResponseDTO.java
```
Data Transfer Object é uma classe que limita quais dados são transferidos numa operação, tanto do front para o back quanto do back para o front. 

Por exemplo, no login, o LoginRequestDTO define que o front manda só email e senha para o back. Essa classe é chamada no controller através da annotation @RequestBody, que pega os dados do JSON da requisição e transforma no objeto DTO — que então é usado para autenticar o usuário e gerar o token JWT.

LoginRequestDTO - do front para o back. Quando realizamos login no site, front só envia e-mail e senha pro back.
Ele é usado nos controllers através do @RequestBody, que pega o JSON da requisição e transforma no objeto DTO.

UsuarioResponseDTO - do back para o front. Se peço para listar dados do usuário ao back - que tem isso e nome, cpf, senha  e data de criação no banco - o back enviará somente nome e e-mail para o front, não revelará a senha e outros dados sensíveis. 

Fluxo front para back: 


Front manda JSON com email e senha


↓

AuthController recebe usando @RequestBody LoginRequestDTO

↓

LoginRequestDTO carrega só esses dois campos

↓

*Service valida no banco e gera o token JWT*



### config 
Pensando em LGPD e segurança, protegemos a maioria das rotas. 
Na pasta config, usamos o SecurityConfig para limitar as rotas acessíveis. 
Liberamos o login e o Swagger — se não, ninguém conseguiria logar nem testar a aplicação. Qualquer outra rota exige um token JWT, que é gerado após o login.

```.anyRequest().authenticated() ```

Antes de qualquer requisição, o JwtFilter intercepta e valida o token. Se for inválido ou não existir, barra a requisição:
```.addFilterBefore(jwtFilter, ...)```


No projeto aparece assim:

Você abre localhost:8080 sem estar autenticado

O SecurityConfig barra a requisição

O servidor responde 403 Forbidden - "você não tem permissão pra acessar isso"




## Annotations

### @PathVariable pega um valor que está dentro da URL e passa pra dentro do método.
```java
@GetMapping("/usuarios/{id}")
public Usuario buscar(@PathVariable Long id) {
    return repository.findById(id);
}
```
Se você acessar /usuarios/5, o {id} da URL vai ser capturado pelo @PathVariable e o método vai buscar o usuário de id 5.


</br>
### @RequestBody pega os dados que vieram no corpo da requisição - quando o front manda um JSON com os dados do projeto, o Spring pega esse JSON e transforma no objeto Projeto.

```java
@PostMapping
public Projeto salvar(@RequestBody Projeto projeto) {
    return service.salvar(projeto);
}
```
no ProjetoController, quando o front manda um POST pra criar um projeto, ele manda um JSON no corpo assim:

```json
json{
    "nome": "Projeto X",
    "descricao": "..."
}
```
E o @RequestBody captura esse JSON e transforma no objeto Projeto.

</br>

@GetMapping GET - Buscar dados

@PostMapping - POST - Criar dados

@PutMapping - PUT - Editar dados

@DeleteMapping - DELETE - Deletar dados

```java
@GetMapping("/projetos")
public List<Projeto> listar() { ... }
// acessa: GET localhost:8080/projetos


@PostMapping("/projetos")
public Projeto salvar(@RequestBody Projeto projeto) { ... }
// acessa: POST localhost:8080/projetos
```
@GetMapping("/projetos") = quando alguém fizer um GET nesse endereço, executa o  método "listar" 
@PostMapping("/projetos") = quando alguém fizer um POST nesse endereço, executa esse método "salvar"



### Optional
serve pra evitar erro de NullPointerException, que é quando você tenta usar um objeto que não existe.

Exemplo sem Optional:
```java
Usuario usuario = repository.findByEmail("joao@email.com");
usuario.getNome(); // ERRO se não encontrar o usuário — ele é null
```

Exemplo com Optional:
```java
Optional<Usuario> usuario = repository.findByEmail("joao@email.com");

if(usuario.isPresent()) {
    // encontrou o usuário, pode usar
    usuario.get().getNome();
} else {
    // não encontrou, trata o erro
    throw new Exception("Usuário não encontrado");
}
```


## Instruções para o usuário:

Assumindo que você tem os seguintes aplicativos instalados: Java, Maven, Gradle, Node.JS, VS Code, VSCode, seguimos para rodagem do programa.

### Rodar o back primeiro:
O front depende do back - quando você loga no front, ele faz uma requisição pra localhost:8080. 
Se o back não estiver rodando, o login falha e dá erro de conexão.

#### Rodando o back-end
teste o ambiente no cmd:
```

    java -version
    javac -version
    mvn --version
    gradle --version
```

abra a pasta do back-end e, num novo terminal, execute
```nvmw spring-boot:run ``` 
ou
```nvm spring-boot:run```

Como nosso programa tem restrições de acesso, acesse http://localhost:8080/swagger-ui/index.html e informe login e senha  válidos em auto-controller -> /POST Login. 
Copie o token e cole em Authorize, para começar a testar os endpoints.


#### Rodando o front-end
teste o ambiente np cmd:
nvm -version
npm -v
node -v

Abra a pasta do front-end na IDE e rode
```npm install```
e depois
```npm run start```para rodar nosso site.

Acesse localhost:3000  para realizar login e usar o programa.



## Demonstração ao vivo 

### Back-end
- Roda sem erro no terminal
-  localhost:8080 retorna 403 ✅ (segurança funcionando) -> antes de logar, tenta acessar uma rota protegida e mostra o 403. Isso prova que a segurança tá funcionando. 
- API funcionando:  Swagger abre em localhost:8080/swagger-ui/index.html
—  Swagger abre em localhost:8080/swagger-ui/index.html
- Login funciona com o usuário do DataInitializer - Token é gerado após o login
- Autoriza no Swagger com o token
- GET /usuarios retorna a lista
- GET /projetos retorna a lista
- POST /usuarios cria um novo usuário
- H2 console abre em localhost:8080/h2-console

### Front-end
Front-end

- Roda sem erro (npm run start)
- Tela de login abre
- Login com credenciais erradas não deixa entrar
- Login com credenciais certas entra no sistema
- Logout funciona


 ### Teste de usabilidade
- Acessar o swagger http://localhost:8080/swagger-ui/index.html
- Realizar autenticação
- Criar o seguinte projeto e tarefa:
#### POST /projetos
```json
{
  "nome": "Projeto teste",
  "descricao": "Primeiro projeto",
  "dataInicio": "2026-04-18",
  "dataConclusao": "2026-04-18",
  "status": "ATIVO",
  "usuario": {
    "id": 1
  }
}
```


#### POST /tarefas
```json
{
  "titulo": "Tarefa teste",
  "descricao": "Primeira tarefa do sistema",
  "dataCriacao": "2026-04-18",
  "dataConclusao": "2026-04-18",
  "prioridade": "BAIXA",
  "status": "PENDENTE",
  "projeto": {
    "id": 1
  },
  "usuario": {
    "id": 1
  }
}
```



## Mudanças no projeto original
 - antes e depois

## Back-end

### `SecurityConfig.java`

**Antes:**
```java
http.csrf(csrf -> csrf.disable())
```

**Depois:**
```java
http.cors(cors -> cors.configure(http))
    .csrf(csrf -> csrf.disable())
```

---

### `CorsConfig.java`

**Antes:**
```java
.allowedOrigins("http://localhost:5173")
```

**Depois:**
```java
.allowedOrigins("http://localhost:5173", "http://localhost:3000")
```

---

### `Projeto.java`

**Antes:**
```java
@OneToMany(mappedBy = "projeto")
private List tarefas;
```

**Depois:**
```java
@JsonIgnore
@OneToMany(mappedBy = "projeto")
private List tarefas;
```

---

## Front-end

### `Atividades.js` — estado inicial

**Antes:**
```javascript
this.state = {
    list: [],
    carregando: true,
    erro: null,
};
```

**Depois:**
```javascript
this.state = {
    lista: [],
    carregando: true,
    erro: null,
};
```

---

### `Atividades.js` — fetch

**Antes:**
```javascript
const resposta = await fetch(
    "http://localhost:8080/api/atividades"
);
```

**Depois:**
```javascript
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const token = usuario?.token;

const resposta = await fetch(
    "http://localhost:8080/tarefas",
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);
```

 Criamos código em Usuarios.js


 
## Melhorias

- Edição e exclusão pelo site (atualmente só pelo Swagger)
- Persistência com MySQL em produção
- Tela de recuperação de senha
- Criamos os arquivos
Usuarios.js
Projetos.js
UsuarioForm.js
ProjetoForm.js
TarefaForm.js


No projeto atual, o back retorna o objeto Usuario completo. Uma melhoria seria criar um UsuarioResponseDTO pra não expor campos sensíveis como a senha nas respostas
