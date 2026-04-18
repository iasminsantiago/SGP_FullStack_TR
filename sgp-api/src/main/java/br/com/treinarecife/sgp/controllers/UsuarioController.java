package br.com.treinarecife.sgp.controllers;

import br.com.treinarecife.sgp.models.Usuario;
import br.com.treinarecife.sgp.services.UsuarioService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return service.salvar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.atualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

}
