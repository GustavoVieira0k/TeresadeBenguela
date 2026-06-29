# Documentação Técnica: Site Teresa de Benguela

## 1. Visão Geral do Sistema

O **Site Teresa de Benguela** consiste em um sistema construído sobre a arquitetura cliente-servidor, englobando um painel administrativo (CMS) e um portal público (Frontend estático renderizado pelo navegador) integrados a uma API RESTful desenvolvida em **Java** com o framework **Spring Boot**.

A aplicação fornece endpoints de integração para gerenciamento de conteúdo institucional, como projetos, notícias, voluntários, diretoria (board) e discografia, além de viabilizar a recepção de cadastros de voluntariado e armazenamento de mídias dinâmicas.

## 2. Arquitetura e Estrutura do Projeto

A arquitetura do backend segue o padrão de camadas (**Layered Architecture** / **MVC Adaptado para REST**), separando responsabilidades e facilitando a manutenibilidade:

*   **Controllers (`br.com.instituto.teresa.controller`)**: Camada de roteamento e apresentação. Recebe as requisições HTTP (GET, POST, PUT, DELETE), lida com a validação dos DTOs (*Data Transfer Objects*) via *Jakarta Validation* e invoca os serviços apropriados.
*   **Services (`br.com.instituto.teresa.service`)**: Camada de regras de negócios. Orquestra operações complexas, valida a lógica interna antes de prosseguir com alterações no banco de dados e gerencia integrações (como geração de tokens).
*   **Repositories (`br.com.instituto.teresa.repository`)**: Interfaces que herdam do *Spring Data JPA* (ex: `JpaRepository`), fornecendo abstração total do banco de dados relacional. Responsáveis pelas transações e consultas sem a necessidade de escrever SQL cru (*boilerplate*).
*   **Domain/Entities (`br.com.instituto.teresa.domain`)**: Classes de modelo que representam as tabelas do banco de dados (anotadas com `@Entity`). Utilizam o padrão ORM (Object-Relational Mapping) por meio do Hibernate.
*   **DTOs (`br.com.instituto.teresa.dto`)**: Objetos utilizados para trafegar dados entre as requisições de rede e a camada de controle, evitando expor a estrutura interna das entidades (Domains) diretamente na API.

O frontend está acoplado no mesmo repositório do Spring Boot, servido a partir do diretório `/src/main/resources/static/`. As páginas (HTML, CSS e JavaScript vanilla) consomem a API REST localmente. A administração é restrita ao diretório `/admin/` e requer autenticação para o consumo dos serviços.

## 3. Fluxo de Autenticação e Segurança (SecurityFlow)

O modelo de segurança foi implementado utilizando o **Spring Security** com autenticação em formato **Stateless** via tokens **JWT (JSON Web Tokens)**.

1.  **Login e Emissão de Token (`AuthController`)**: O administrador envia as credenciais (login e senha) para `/api/auth/login`. O `AuthenticationManager` valida o hash no banco. Se autenticado, o `TokenService` gera um JWT assinado usando o algoritmo HMAC256.
2.  **Interceptação de Requisição (`SecurityFilter`)**: Cada requisição feita a rotas protegidas passa por um *OncePerRequestFilter*. Este filtro verifica o header HTTP `Authorization`. Se válido, ele extrai o escopo e usuário ("subject") do JWT e injeta a sessão do usuário no `SecurityContextHolder`.
3.  **Controle de Acesso (`SecurityConfig`)**: A classe de configuração central define quem tem permissão para os recursos.
    *   **Rotas Públicas (`permitAll`)**: Leitura (GET) de todos os dados do `/api/**`, arquivos de front-end estáticos `/index.html`, `/assets/**`, além do POST para se registrar como voluntário (`/api/volunteers`) e a rota de login (`/api/auth/login`).
    *   **Rotas Privadas (`authenticated`)**: Toda operação que envolve a mutação de dados da plataforma (POST, PUT, DELETE nas rotas de projetos, diretoria, discografia, configurações e upload).

## 4. Módulos e Classes Principais

### 4.1. Módulo de Projetos
*   **Classe `Project` (Entity)**: Mapeia um projeto. Possui atributos complexos como `features` (mapeada com `@ElementCollection` gerando a tabela dependente `project_features`) e `details` (um `Map<String, String>` que gera chaves e valores dinâmicos atrelados ao projeto).
*   **Classe `ProjectController`**: Expoe endpoints para o CRUD de projetos, acessíveis apenas para administradores, exceto pela listagem geral.

### 4.2. Módulo de Voluntariado
*   **Classe `Volunteer` (Entity)**: Armazena dados dos candidatos interessados.
*   **Classe `VolunteerController`**: Permite o frontend público realizar o envio (POST) de intenção de voluntariado, processando a entrada pelo `VolunteerService`. Possui uma rota GET para o painel administrativo visualizar os candidatos.

### 4.3. Módulo de Mídia (Upload)
*   **Classe `UploadController`**: Lida com a recepção de dados via `MultipartFile`. Impõe limites lógicos e validações rigorosas (MIME type constraint checking), permitindo apenas tipos seguros de imagem (JPEG, PNG, GIF, WEBP) e áudios pré-configurados.
*   Salva fisicamente no sistema de arquivos local sob a pasta `/uploads/` na raiz do projeto (gerando um nome de arquivo seguro randomizado via `UUID`).
*   O tamanho máximo global de arquivos é de 10MB (definido no `application.properties`).

### 4.4. Módulo de Configuração Dinâmica
*   **Classe `SiteSettings` e `VolunteerPage`**: Entidades utilizadas para dinamicamente alterar blocos de texto, benefícios e descrições das páginas públicas diretamente pelo painel administrativo, agindo como um CMS.

## 5. Configuração e Variáveis de Ambiente

Para o gerenciamento de configuração em múltiplos ambientes e segurança dos dados, a aplicação usa propriedades de injenção externalizadas, ativadas no arquivo `application.properties`.

### 5.1. O Arquivo `.env.example`
Seguindo as melhores práticas (como a cartilha 12-Factor App), as chaves criptográficas (como `JWT_SECRET`) e as credenciais do banco de dados de produção (PostgreSQL) nunca devem ser commitadas no controlador de versões (`.git`).

*   O projeto disponibiliza um template seguro chamado `.env.example`.
*   O desenvolvedor/administrador de sistemas deve criar uma cópia deste arquivo e renomeá-lo para `.env` localmente ou no servidor.
*   **O que o arquivo contém:** Declara as chaves exigidas para a subida do projeto (URL do banco de dados, Usuário, Senha e o Segredo do JWT).
*   **Como o Spring age:** Por meio do comando `spring.config.import=optional:file:.env[.properties]`, o Spring Boot interpreta estas chaves durante a injeção do contexto, substituindo os placeholders `${DB_PG_URL}`, `${JWT_SECRET}`, entre outros.

### 5.2. Banco de Dados (Estratégia de Ambientes)
A aplicação possui dupla camada de drivers (`org.postgresql.Driver` e `org.h2.Driver`):
*   **Desenvolvimento:** Uso recomendado do **H2 Database**, um banco de dados em memória ou de persistência em arquivo raso (salvo em `./data/teresadb`), permitindo rápido ciclo de reset/desenvolvimento (`ddl-auto=update`).
*   **Produção:** Configuração voltada para o **PostgreSQL**, recomendada por sua estabilidade e integridade transacional com escalabilidade para os dados. A alteração entre eles é feita comentando/descomentando as linhas chave do `application.properties`.
