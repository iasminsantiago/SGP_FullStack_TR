package br.com.treinarecife.sgp.dto;

import br.com.treinarecife.sgp.types.enums.StatusUsuario;
import java.time.LocalDate;
import lombok.Data;

@Data
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private LocalDate dataNascimento;
    private StatusUsuario status;

}
