# SGP_FullStack_TR
Projeto full stack de gerenciador de projetos por usuário, usando Java + React e JS + React.





### Conceitos
*JWT* - JSON Web Token é um formato de token gerado pelo servidor no momento do login. Ele carrega as informações do usuário e tem prazo de validade. Quando o usuário faz novas requisições, o front já guardou o token e o envia pro back, pra provar que o usuário já está autenticado, sem precisar informar a senha novamente a cada requisição.


Na pasta Controllers, ProjetoController, UsuarioController, TarefaController Cuidam do CRUD — criar, listar, editar, deletar dados.

*AuthController*
Cuida só do login — recebe email e senha, valida no banco, e gera o token JWT.

A diferença principal é que o AuthController é a porta de entrada do sistema — é a única rota que não precisa de token pra ser acessada. Todas as outras rotas exigem autenticação.
<br />

*DTO*
Data Transfer Object, tem uma classeq ue define quais dados são transferidos numa operação: 
LoginRequestDTO - do front para o back. Quando realizamos login no site, front só envia e-mail e senha pro back.
UsuarioResponseDTO - do back para o front. Se peço para listar dados do usuário ao back - que tem isso e nome, cpf, senha  e data de criação no banco - o back enviará somente nome e e-mail para o front, não revelará a senha e outros dados sensíveis. 


↓

AuthController recebe usando @RequestBody LoginRequestDTO

↓

LoginRequestDTO carrega só esses dois campos

↓

Service valida no banco e gera o token JWT



## Annotations
@PathVariable pega um valor que está dentro da URL e passa pra dentro do método.
```java
@GetMapping("/usuarios/{id}")
public Usuario buscar(@PathVariable Long id) {
    return repository.findById(id);
}
```
Se você acessar /usuarios/5, o {id} da URL vai ser capturado pelo @PathVariable e o método vai buscar o usuário de id 5.


</br>
@RequestBody pega os dados que vieram no corpo da requisição - quando o front manda um JSON com os dados do projeto, o Spring pega esse JSON e transforma no objeto Projeto.

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



*Optional* serve pra evitar erro de NullPointerException, que é quando você tenta usar um objeto que não existe.

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









## Melhorias
No projeto atual, o back retorna o objeto Usuario completo. Uma melhoria seria criar um UsuarioResponseDTO pra não expor campos sensíveis como a senha nas respostas

