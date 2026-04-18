package br.com.treinarecife.sgp.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.treinarecife.sgp.dto.LoginRequestDTO;
import br.com.treinarecife.sgp.models.Usuario;
import br.com.treinarecife.sgp.repository.UsuarioRepository;
import br.com.treinarecife.sgp.security.JwtService;

import java.util.Map;

@RestController
@RequestMapping("/login")
public class AuthController {

    private final UsuarioRepository repository;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository repository, JwtService jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }

    @PostMapping
    public Map<String, String> login(@RequestBody LoginRequestDTO login) {

        Usuario usuario = repository.findByEmail(login.getEmail()).orElseThrow();

        if (!usuario.getSenha().equals(login.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtService.gerarToken(usuario.getEmail());


        //
        return Map.of(
            "token", token,
            "id", usuario.getId().toString(),
            "nome", usuario.getNome(),
            "email", usuario.getEmail()
        );
    }
}
