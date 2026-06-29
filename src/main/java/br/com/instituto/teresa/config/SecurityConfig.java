package br.com.instituto.teresa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SecurityFilter securityFilter;

    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new CorsConfiguration();
                    // Altere o "*" para a origem exata do seu front-end
                    corsConfig.setAllowedOrigins(List.of("https://gustavovieira0k.github.io"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true); // Permite o envio de tokens e headers de autenticação
                    return corsConfig;
                }))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // OBSERVAÇÃO: Garanta que esta rota bate com o que o seu JS chama!
                        // Se o seu JS chama '/auth/login', adicione o "/auth/login" aqui sem o /api também:
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/auth/login", "/api/volunteers").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        // Projetos
                        .requestMatchers(HttpMethod.POST, "/api/projects/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**").authenticated()
                        // Diretoria
                        .requestMatchers(HttpMethod.POST, "/api/board/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/board/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/board/**").authenticated()
                        // Candidaturas de voluntários
                        .requestMatchers(HttpMethod.DELETE, "/api/volunteers/**").authenticated()
                        // Página de voluntários
                        .requestMatchers(HttpMethod.PUT, "/api/volunteer/page/**").authenticated()
                        // Discografia
                        .requestMatchers(HttpMethod.POST, "/api/discography/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/discography/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/discography/**").authenticated()
                        // Notícias
                        .requestMatchers(HttpMethod.POST, "/api/news/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/news/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/news/**").authenticated()
                        // Configurações do site
                        .requestMatchers(HttpMethod.PUT, "/api/site-settings/**").authenticated()
                        // Arquivos estáticos
                        .requestMatchers("/", "/index.html", "/projetos.html", "/voluntario.html", "/noticias.html", "/styles/**", "/scripts/**", "/assets/**", "/uploads/**", "/context/**", "/admin/**", "/favicon.ico").permitAll()
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
