package br.com.treinarecife.sgp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.treinarecife.sgp.models.Usuario;
import br.com.treinarecife.sgp.repository.UsuarioRepository;
import br.com.treinarecife.sgp.types.enums.StatusUsuario;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdminUser(UsuarioRepository repository) {

        return args -> {

            String emailAdmin = "admin@sgp.com";

            if (repository.findByEmail(emailAdmin).isEmpty()) {

                Usuario admin = new Usuario();

                admin.setNome("Administrador");
                admin.setEmail(emailAdmin);
                admin.setCpf("00000000000");
                admin.setSenha("123456");
                admin.setStatus(StatusUsuario.ATIVO);

                repository.save(admin);

                System.out.println("Usuário administrador criado.");
            }

        };
    }
}
