# Roteiro de Apresentação - Parte 1
**Responsabilidade:** Apresentador 1
**Foco:** Arquitetura Core, Configurações Globais e Modelo de Segurança.

## 1. Introdução à Arquitetura
Iniciaremos a apresentação descrevendo a arquitetura do projeto. O sistema adota o padrão cliente-servidor, utilizando Spring Boot para a construção de uma API RESTful *stateless* e um frontend estático renderizado pelo navegador. A divisão do backend ocorre em camadas lógicas: Controllers (roteamento HTTP e validação), Services (regras de negócio), Repositories (persistência com Spring Data JPA) e Domains/Entities (mapeamento objeto-relacional).

## 2. Camada de Configuração Global (`br.com.instituto.teresa.config`)
Nesta seção, abordarei como a aplicação é inicializada e gerencia seus comportamentos globais.
*   **`WebConfig`**: Define as configurações de CORS (Cross-Origin Resource Sharing) e mapeamento de recursos estáticos do frontend.
*   **`DataSeeder`**: Classe responsável por popular o banco de dados no momento da inicialização (Bootstraping) com dados iniciais necessários, como o usuário administrador default, caso o banco esteja vazio.

## 3. Tratamento de Exceções (`br.com.instituto.teresa.exception`)
*   **`GlobalExceptionHandler`**: Utiliza a anotação `@RestControllerAdvice` para capturar exceções lançadas em qualquer Controller da aplicação. Esta classe traduz erros internos (como *EntityNotFoundException* ou falhas de validação de DTOs) em respostas HTTP padronizadas, evitando a exposição de *stacktraces* ao cliente.

## 4. Modelo de Segurança e Autenticação
O núcleo de segurança protege as rotas administrativas através do Spring Security e tokens JWT.
*   **`SecurityConfig`**: Define a cadeia de filtros (`SecurityFilterChain`), as políticas de criação de sessão como *Stateless* e o mapeamento de quais rotas exigem autenticação (`authenticated`) e quais são públicas (`permitAll`).
*   **`SecurityFilter`**: Um `OncePerRequestFilter` que intercepta requisições HTTP, extrai o *Bearer Token* do cabeçalho `Authorization`, valida-o e injeta o contexto de segurança (usuário logado) na thread atual via `SecurityContextHolder`.
*   **`AdminUser` (Domain)**: Entidade que implementa `UserDetails`, representando o usuário administrativo no banco de dados.
*   **`AuthorizationService`**: Serviço atrelado ao `UserDetailsService` do Spring Security, responsável por buscar o `AdminUser` no repositório.
*   **`TokenService`**: Serviço de utilidade responsável pela geração, assinatura (HMAC256) e validação dos tokens JWT.
*   **`AuthController`**: Expõe o endpoint `/api/auth/login`, recebe o `AuthenticationRequestDTO` e devolve o `LoginResponseDTO` contendo o JWT caso a autenticação no `AuthenticationManager` tenha sucesso.
