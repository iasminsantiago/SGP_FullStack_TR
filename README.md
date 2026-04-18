# SGP — Sistema de Gestão de Projetos

Sistema full stack para gestão de projetos, tarefas e usuários, desenvolvido com Java + Spring Boot no back-end e React no front-end.

---

## Tecnologias

**Back-end**
- Java 17
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- JPA / Hibernate
- Banco H2 (em memória) — configurável para MySQL

**Front-end**
- React
- Bootstrap 5
- Chart.js

---

## Funcionalidades

- Autenticação via token JWT
- Dashboard com gráficos
- Listagem e cadastro de projetos
- Listagem e cadastro de tarefas
- Listagem e cadastro de usuários
- API REST protegida — todas as rotas exigem autenticação, exceto `/login`

---

## Como rodar

> Rodar o **back-end primeiro** — o front depende da API em `localhost:8080`. Se o back não estiver no ar, o login falha com erro de conexão.

### Back-end

Verifique o ambiente:
```bash
java -version
javac -version
mvn --version
```

Na pasta do back-end, execute:
```bash
./mvnw spring-boot:run
```

Acesse: `http://localhost:8080/swagger-ui/index.html`

### Front-end

Verifique o ambiente:
```bash
node -v
npm -v
```

Na pasta do front-end, execute:
```bash
npm install
npm run start
```

Acesse: `http://localhost:3000`

---

## Credenciais padrão

> ⚠️ Use apenas em ambiente de desenvolvimento. Nunca suba essas credenciais para produção.

| Campo | Valor         |
|-------|---------------|
| Email | admin@sgp.com |
| Senha | 123456        |

---

## Observações

- O banco H2 é reiniciado a cada vez que o back sobe — os dados não persistem entre sessões.
- Para usar MySQL, altere as configurações em `application.properties`.

---

## O que não está no repositório

Alguns arquivos e pastas são ignorados pelo `.gitignore` e **não sobem para o GitHub** — isso é intencional.

| O que | Por quê não sobe |
|-------|-----------------|
| `node_modules/` | Milhares de arquivos pesados gerados pelo `npm install` — qualquer um recria rodando `npm install` |
| `target/` | Pasta de build do Maven, gerada automaticamente pelo `./mvnw spring-boot:run` |
| `*.class` | Arquivos compilados do Java, gerados na build |
| `.env` | Pode conter senhas e segredos — nunca deve ser versionado |

Ao clonar o projeto, basta seguir as instruções da seção [Como rodar](#como-rodar) e essas dependências serão recriadas automaticamente.

---

## Endpoints da API

> ⚠️ Todas as rotas abaixo exigem autenticação via token JWT, exceto `/login`.

### Autenticação

| Método | Endpoint | O que faz |
|--------|----------|-----------|
| POST | `/login` | Realiza login e retorna token JWT |

### Projetos `/projetos`

| Método | Endpoint         | O que faz                    |
|--------|------------------|------------------------------|
| GET    | `/projetos`      | Lista todos os projetos      |
| GET    | `/projetos/{id}` | Busca projeto pelo id        |
| POST   | `/projetos`      | Cria novo projeto            |
| PUT    | `/projetos/{id}` | Atualiza projeto pelo id     |
| DELETE | `/projetos/{id}` | Deleta projeto pelo id       |

### Usuários `/usuarios`

| Método | Endpoint         | O que faz                    |
|--------|------------------|------------------------------|
| GET    | `/usuarios`      | Lista todos os usuários      |
| GET    | `/usuarios/{id}` | Busca usuário pelo id        |
| POST   | `/usuarios`      | Cria novo usuário            |
| PUT    | `/usuarios/{id}` | Atualiza usuário pelo id     |
| DELETE | `/usuarios/{id}` | Deleta usuário pelo id       |

### Tarefas `/tarefas`

| Método | Endpoint        | O que faz                   |
|--------|-----------------|-----------------------------|
| GET    | `/tarefas`      | Lista todas as tarefas      |
| GET    | `/tarefas/{id}` | Busca tarefa pelo id        |
| POST   | `/tarefas`      | Cria nova tarefa            |
| PUT    | `/tarefas/{id}` | Atualiza tarefa pelo id     |
| DELETE | `/tarefas/{id}` | Deleta tarefa pelo id       |

---

## Arquitetura back-end

```
SGP-API/
└── src/main/java/br/com/trein.../
    ├── config/
    │   ├── CorsConfig.java          # Configura origens permitidas (CORS)
    │   ├── DataInitializer.java     # Cria usuário admin automático ao iniciar
    │   ├── OpenApiConfig.java       # Configurações do Swagger
    │   └── SecurityConfig.java      # Protege as rotas, libera login e Swagger
    │
    ├── controllers/
    │   ├── AuthController.java      # Rota de login — gera o token JWT
    │   ├── ProjetoController.java   # CRUD de projetos
    │   ├── TarefaController.java    # CRUD de tarefas
    │   └── UsuarioController.java   # CRUD de usuários
    │
    ├── dto/
    │   ├── LoginRequestDTO.java     # Recebe email e senha no login
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
    └── SgpApplication.java          # Classe principal — inicia a aplicação
```

---

## Mudanças em relação ao projeto original

### Back-end

**`SecurityConfig.java`**

```java
// Antes
http.csrf(csrf -> csrf.disable())

// Depois
http.cors(cors -> cors.configure(http))
    .csrf(csrf -> csrf.disable())
```

**`CorsConfig.java`**

```java
// Antes
.allowedOrigins("http://localhost:5173")

// Depois
.allowedOrigins("http://localhost:5173", "http://localhost:3000")
```

**`Projeto.java`**

```java
// Antes
@OneToMany(mappedBy = "projeto")
private List tarefas;

// Depois
@JsonIgnore
@OneToMany(mappedBy = "projeto")
private List tarefas;
```

### Front-end

**`Atividades.js` — estado inicial**

```javascript
// Antes
this.state = { list: [], carregando: true, erro: null };

// Depois
this.state = { lista: [], carregando: true, erro: null };
```

**`Atividades.js` — fetch com autenticação**

```javascript
// Antes
const resposta = await fetch("http://localhost:8080/api/atividades");

// Depois
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const token = usuario?.token;

const resposta = await fetch("http://localhost:8080/tarefas", {
    headers: { "Authorization": `Bearer ${token}` }
});
```

**Arquivos criados no front-end além do projeto original:**
- `Usuarios.js` — listagem de usuários
- `Projetos.js` — listagem de projetos
- `UsuarioForm.js` — formulário de cadastro de usuário pelo site
- `ProjetoForm.js` — formulário de cadastro de projeto pelo site
- `TarefaForm.js` — formulário de cadastro de tarefa pelo site

Correções realizadas:
- Corrigido bug de estado `list` → `lista` em `Atividades.js`
- Corrigido URL de `/api/atividades` → `/tarefas`
- Adicionado envio de token JWT nas requisições do front
- Adicionado `@JsonIgnore` em `Projeto.java` para evitar loop infinito no JSON
- Configurado CORS para aceitar requisições da porta 3000
---

## Melhorias futuras

- Edição e exclusão de projetos, tarefas e usuários pela interface web (atualmente só via Swagger)
- Persistência com MySQL em produção
- Tela de recuperação de senha

---

## Checklist de validação

### Back-end
- [ ] Sobe sem erros no terminal
- [ ] `localhost:8080` retorna `403 Forbidden` antes do login ✅ (segurança ativa)
- [ ] Swagger abre em `localhost:8080/swagger-ui/index.html`
- [ ] Login funciona com as credenciais do `DataInitializer` e gera token JWT
- [ ] Token autoriza no Swagger corretamente
- [ ] `GET /usuarios` retorna lista
- [ ] `GET /projetos` retorna lista
- [ ] `POST /usuarios` cria novo usuário
- [ ] Console H2 abre em `localhost:8080/h2-console`

### Front-end
- [ ] Sobe sem erros (`npm run start`)
- [ ] Tela de login abre
- [ ] Credenciais erradas bloqueiam acesso
- [ ] Credenciais corretas entram no sistema
- [ ] Logout funciona

---

## Teste de usabilidade

Após autenticar no Swagger (`localhost:8080/swagger-ui/index.html`), crie os seguintes registros:

**POST `/projetos`**
```json
{
  "nome": "Projeto teste",
  "descricao": "Primeiro projeto",
  "dataInicio": "2026-04-18",
  "dataConclusao": "2026-04-18",
  "status": "ATIVO",
  "usuario": { "id": 1 }
}
```

**POST `/tarefas`**
```json
{
  "titulo": "Tarefa teste",
  "descricao": "Primeira tarefa do sistema",
  "dataCriacao": "2026-04-18",
  "dataConclusao": "2026-04-18",
  "prioridade": "BAIXA",
  "status": "PENDENTE",
  "projeto": { "id": 1 },
  "usuario": { "id": 1 }
}
```

---

## Glossário

### Node.js e NVM

**Node.js** é o programa em si — o runtime necessário para rodar o front-end.

**NVM (Node Version Manager)** é um gerenciador que permite ter várias versões do Node instaladas e alternar entre elas conforme o projeto.

---

### API

É o sistema inteiro — o back-end construído em Spring Boot que recebe e responde às requisições.

```
API = localhost:8080  (o restaurante inteiro)
```

---

### Endpoint

End = fim, Point = ponto — é o ponto final do caminho de uma requisição.

É cada "porta de entrada" específica da API: a combinação de **verbo HTTP + rota**. É como cada prato do cardápio do restaurante.

```
GET  /projetos   → um endpoint
POST /projetos   → outro endpoint diferente
GET  /usuarios
POST /login
```

`/projetos` sozinho não é um endpoint completo — é só uma rota. Para ser um endpoint, precisa do verbo:

```
localhost:8080  +  /projetos  +  GET
      │                │            │
  endereço          caminho        ação
  do servidor        (rota)       (verbo)
```

- **API** = a cidade inteira
- **Endpoint** = o endereço específico que você quer chegar
- **Verbo HTTP** = o que você vai fazer lá (buscar, criar, deletar)

---

### JWT (JSON Web Token)

Formato de token gerado pelo servidor no momento do login. Ele carrega as informações do usuário e tem prazo de validade.

Quando o usuário faz novas requisições, o front já guardou o token e o envia para o back, provando que o usuário está autenticado — sem precisar informar a senha novamente a cada requisição.

---

### Fluxo de dados

Front faz requisição

↓

Controller recebe e chama o Service

↓

Service aplica a lógica e acessa o banco via Repository

↓

Repository executa a query no banco

↓

Dados sobem: Repository → Service → Controller

↓

Controller entrega a resposta em JSON pro front


O Controller recebe a requisição do front, chama o Service e retorna a resposta — no caso de uma API REST, essa resposta é entregue em formato JSON automaticamente pelo Spring.


---
### Controllers

Na pasta `controllers`, as classes `ProjetoController`, `UsuarioController` e `TarefaController` cuidam do CRUD — criar, listar, editar e deletar dados.

#### AuthController

Cuida só do login: recebe email e senha, valida no banco e gera o token JWT.

A diferença principal é que o `AuthController` é a **porta de entrada do sistema** — é a única rota que não precisa de token para ser acessada. Todas as outras rotas exigem autenticação.

---

### DTO (Data Transfer Object)

```
dto/
├── LoginRequestDTO.java
└── UsuarioResponseDTO.java
```

Classe que limita quais dados são transferidos numa operação — tanto do front para o back quanto do back para o front.

**LoginRequestDTO** — do front para o back. Quando o usuário faz login, o front envia apenas email e senha. Essa classe é usada nos controllers via `@RequestBody`, que pega o JSON da requisição e transforma no objeto DTO para autenticar o usuário e gerar o token JWT.

**UsuarioResponseDTO** — do back para o front. Se o front pede para listar dados de um usuário — que tem nome, CPF, senha e data de criação no banco — o back retorna apenas nome e email, sem expor a senha e outros dados sensíveis. Mas se o Controller já define o que retorna, um DTO de resposta seria redundante nesse projeto, por isso não criamos tal função. 

**Fluxo front → back:**

```
Front manda JSON com email e senha
           ↓
AuthController recebe com @RequestBody LoginRequestDTO
           ↓
LoginRequestDTO carrega só esses dois campos
           ↓
Service valida no banco e gera o token JWT
```

---

### Service

O Service contém a lógica de negócio e faz a ponte entre o Controller e recursos externos, como o banco de dados, APIs externas, ou outros serviços. Ele processa as regras e busca ou salva os dados necessários.
Exemplo: Se o usuário pede o preço de um sapato, o controller pede ao service para buscar, no banco de dados, o preço deste e retorna um JSON com a informação (API REST).

---

### Config (SecurityConfig)

Pensando em LGPD e segurança, a maioria das rotas é protegida.

Na pasta `config`, o `SecurityConfig` limita as rotas acessíveis. O login e o Swagger são liberados — sem isso, ninguém conseguiria logar nem testar a aplicação. Qualquer outra rota exige token JWT gerado após o login.

```java
.anyRequest().authenticated()
```

Antes de qualquer requisição, o `JwtFilter` intercepta e valida o token. Se for inválido ou inexistente, a requisição é barrada:

```java
.addFilterBefore(jwtFilter, ...)
```

**Fluxo ao acessar sem autenticação:**

```
Você abre localhost:8080 sem estar autenticado
           ↓
SecurityConfig barra a requisição
           ↓
Servidor responde 403 Forbidden
```

---

### Annotations

#### `@PathVariable`

Pega um valor que está dentro da URL e passa para dentro do método.

```java
@GetMapping("/usuarios/{id}")
public Usuario buscar(@PathVariable Long id) {
    return repository.findById(id);
}
```

Se você acessar `/usuarios/5`, o `{id}` da URL é capturado pelo `@PathVariable` e o método busca o usuário de id 5.

---

#### `@RequestBody`

Pega os dados que vieram no corpo da requisição. Quando o front manda um JSON com os dados do projeto, o Spring captura esse JSON e transforma no objeto Java correspondente.

```java
@PostMapping
public Projeto salvar(@RequestBody Projeto projeto) {
    return service.salvar(projeto);
}
```

Quando o front faz um POST para criar um projeto, ele envia um JSON assim:

```json
{
  "nome": "Projeto X",
  "descricao": "..."
}
```

O `@RequestBody` captura esse JSON e transforma no objeto `Projeto`.

---

#### Mapeamentos HTTP

```java
@GetMapping    // GET    — buscar dados
@PostMapping   // POST   — criar dados
@PutMapping    // PUT    — editar dados
@DeleteMapping // DELETE — deletar dados
```

Exemplos:

```java
@GetMapping("/projetos")
public List<Projeto> listar() { ... }
// GET localhost:8080/projetos

@PostMapping("/projetos")
public Projeto salvar(@RequestBody Projeto projeto) { ... }
// POST localhost:8080/projetos
```

- `@GetMapping("/projetos")` → quando alguém fizer um GET nesse endereço, executa o método `listar`
- `@PostMapping("/projetos")` → quando alguém fizer um POST nesse endereço, executa o método `salvar`

---

### Optional

Serve para evitar `NullPointerException` — erro que ocorre quando você tenta usar um objeto que não existe (é `null`).

**Sem Optional:**
```java
Usuario usuario = repository.findByEmail("joao@email.com");
usuario.getNome(); // ERRO se não encontrar — objeto é null
```

**Com Optional:**
```java
Optional<Usuario> usuario = repository.findByEmail("joao@email.com");

if (usuario.isPresent()) {
    usuario.get().getNome(); // seguro — usuário existe
} else {
    throw new Exception("Usuário não encontrado"); // trata o caso de não encontrar
}
```
