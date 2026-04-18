package br.com.treinarecife.sgp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.treinarecife.sgp.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

}
