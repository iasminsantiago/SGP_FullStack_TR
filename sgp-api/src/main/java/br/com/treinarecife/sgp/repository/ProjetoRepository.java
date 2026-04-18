package br.com.treinarecife.sgp.repository;

import br.com.treinarecife.sgp.models.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}
