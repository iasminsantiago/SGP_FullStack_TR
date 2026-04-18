package br.com.treinarecife.sgp.services;

import br.com.treinarecife.sgp.models.Projeto;
import br.com.treinarecife.sgp.repository.ProjetoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository repository;

    public List<Projeto> listar() {
        return repository.findAll();
    }

    public Projeto buscar(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Projeto salvar(Projeto projeto) {
        return repository.save(projeto);
    }

    public Projeto atualizar(Long id, Projeto projeto) {
        projeto.setId(id);
        return repository.save(projeto);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
