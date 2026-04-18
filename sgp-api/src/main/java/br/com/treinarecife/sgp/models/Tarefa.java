package br.com.treinarecife.sgp.models;

import br.com.treinarecife.sgp.types.enums.Prioridade;
import br.com.treinarecife.sgp.types.enums.StatusTarefa;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private LocalDate dataCriacao;

    private LocalDate dataConclusao;

    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;

    @Enumerated(EnumType.STRING)
    private StatusTarefa status;

    @ManyToOne
    private Projeto projeto;

    @ManyToOne
    private Usuario usuario;

}
