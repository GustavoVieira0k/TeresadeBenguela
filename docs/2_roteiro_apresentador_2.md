# Roteiro de Apresentação - Parte 2
**Responsabilidade:** Apresentador 2
**Foco:** Módulos de Conteúdo Principal (Projetos, Notícias, Diretoria) e Gestão de Uploads.

## 1. Módulo de Gestão de Mídias
Para que as demais entidades possam ter imagens e arquivos associados, explicarei primeiro a estratégia de recepção de arquivos.
*   **`UploadController`**: Responsável por receber dados do tipo `MultipartFile`. A classe realiza checagem de tipos MIME rigorosa (permitindo apenas extensões seguras de imagem e áudio). Os arquivos são persistidos no sistema de arquivos local (`/uploads/`) gerando um identificador único (UUID) para evitar colisões e path traversal. O limite de tamanho (10MB) é imposto a nível de Servlet no `application.properties`.

## 2. Módulo de Projetos
Este é o módulo mais complexo em termos de mapeamento relacional.
*   **`Project` (Domain)**: Entidade central que mapeia projetos. O detalhe arquitetural reside no uso das anotações `@ElementCollection` e `@CollectionTable`. Isso permite que listas (`List<ProjectFeature>`) e mapas chave-valor (`Map<String, String>` para o atributo `details`) sejam persistidos em tabelas normalizadas dependentes (`project_features` e `project_details`) sem a necessidade de entidades complexas separadas.
*   **`ProjectFeature` (Domain)**: Classe embutida (`@Embeddable`) que compõe a lista de características dos projetos.
*   **`ProjectService` e `ProjectController`**: O controlador recebe DTOs (`ProjectRequestDTO`), repassa ao serviço que cuida da regra de negócio (inserção/atualização e tratamento de entidades não encontradas) e devolve respostas mapeadas via `ProjectResponseDTO`, isolando o Domain da borda da API.

## 3. Módulo de Notícias
Responsável pela dinamicidade de conteúdo informacional do instituto.
*   **`News` (Domain)**: Mapeia o esquema de notícias, contendo dados como título, resumo, conteúdo em formato de texto longo e referência para a imagem (armazenada via `UploadController`).
*   **`NewsService` e `NewsController`**: Implementam operações padrão de CRUD REST. O serviço gerencia também a ordenação e paginação para entregar a listagem ao frontend de maneira otimizada.

## 4. Módulo de Diretoria (Board)
Gerencia a exibição dos membros da instituição.
*   **`BoardMember` (Domain)**: Representa membros do conselho/diretoria, contendo atributos como nome, cargo (role) e foto.
*   **`BoardMemberService` e `BoardMemberController`**: Camadas que disponibilizam as informações publicamente via GET para a renderização da seção "Sobre Nós" no frontend, ao mesmo tempo que protegem os métodos de mutação (POST, PUT, DELETE) limitando-os apenas à sessão autenticada do administrador.
