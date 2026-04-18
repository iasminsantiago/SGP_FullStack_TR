package br.com.treinarecife.sgp.dto;

import br.com.treinarecife.sgp.types.enums.StatusProjeto;
import java.time.LocalDate;
import lombok.Data;

@Data
public class ProjetoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private LocalDate dataInicio;
    private LocalDate dataConclusao;
    private StatusProjeto status;
    private Long usuarioId;

}
