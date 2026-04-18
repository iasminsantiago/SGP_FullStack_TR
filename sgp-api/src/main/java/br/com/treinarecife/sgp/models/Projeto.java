package br.com.treinarecife.sgp.models;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.treinarecife.sgp.types.enums.StatusProjeto;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    private LocalDate dataInicio;

    private LocalDate dataConclusao;

    @Enumerated(EnumType.STRING)
    private StatusProjeto status;

    @ManyToOne
    private Usuario usuario;

    @JsonIgnore
    @OneToMany(mappedBy = "projeto")
    private List<Tarefa> tarefas;

}
