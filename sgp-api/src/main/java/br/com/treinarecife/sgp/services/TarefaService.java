package br.com.treinarecife.sgp.services;

import br.com.treinarecife.sgp.models.Tarefa;
import br.com.treinarecife.sgp.repository.TarefaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TarefaService {

    private final TarefaRepository repository;

    public List<Tarefa> listar() {
        return repository.findAll();
    }

    public Tarefa buscar(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Tarefa salvar(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    public Tarefa atualizar(Long id, Tarefa tarefa) {
        tarefa.setId(id);
        return repository.save(tarefa);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
