package br.com.treinarecife.sgp.controllers;

import br.com.treinarecife.sgp.models.Tarefa;
import br.com.treinarecife.sgp.services.TarefaService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tarefas")
@RequiredArgsConstructor
public class TarefaController {

    private final TarefaService service;

    @GetMapping
    public List<Tarefa> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Tarefa buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping
    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return service.salvar(tarefa);
    }

    @PutMapping("/{id}")
    public Tarefa atualizar(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        return service.atualizar(id, tarefa);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

}
