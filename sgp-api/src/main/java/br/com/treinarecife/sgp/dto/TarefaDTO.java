package br.com.treinarecife.sgp.dto;

import br.com.treinarecife.sgp.types.enums.Prioridade;
import br.com.treinarecife.sgp.types.enums.StatusTarefa;
import java.time.LocalDate;
import lombok.Data;

@Data
public class TarefaDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataCriacao;
    private LocalDate dataConclusao;
    private Prioridade prioridade;
    private StatusTarefa status;
    private Long projetoId;
    private Long usuarioId;

}
