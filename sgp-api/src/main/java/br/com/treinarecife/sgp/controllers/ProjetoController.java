package br.com.treinarecife.sgp.controllers;

import br.com.treinarecife.sgp.models.Projeto;
import br.com.treinarecife.sgp.services.ProjetoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projetos")
@RequiredArgsConstructor
public class ProjetoController {

    private final ProjetoService service;

    @GetMapping
    public List<Projeto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Projeto buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Projeto salvar(@RequestBody Projeto projeto) {
        return service.salvar(projeto);
    }

    @PutMapping("/{id}")
    public Projeto atualizar(@PathVariable Long id, @RequestBody Projeto projeto) {
        return service.atualizar(id, projeto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

}
