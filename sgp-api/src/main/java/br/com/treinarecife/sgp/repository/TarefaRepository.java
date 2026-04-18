package br.com.treinarecife.sgp.repository;

import br.com.treinarecife.sgp.models.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
