package br.com.treinarecife.sgp.services;

import br.com.treinarecife.sgp.models.Usuario;
import br.com.treinarecife.sgp.repository.UsuarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuario) {
        usuario.setId(id);
        return repository.save(usuario);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
