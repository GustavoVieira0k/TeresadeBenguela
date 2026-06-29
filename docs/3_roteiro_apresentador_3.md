# Roteiro de Apresentação - Parte 3
**Responsabilidade:** Apresentador 3
**Foco:** Módulos de Voluntariado, Discografia, Configurações do Site (CMS) e Fluxo Frontend.

## 1. Módulo de Captação e Gestão de Voluntariado
Este módulo envolve dupla responsabilidade: recepção externa e gestão de configuração da página.
*   **`Volunteer` (Domain)**: Entidade que armazena os dados dos candidatos enviados pela rota pública.
*   **`VolunteerService` e `VolunteerController`**: Expõem um POST aberto para recebimento de candidaturas (`VolunteerRequestDTO`). O serviço valida os dados e persiste. Possui rotas GET protegidas para que o administrador liste os interessados.
*   **`VolunteerPage` e `VolunteerBenefit` (Domains)**: Classes atreladas ao funcionamento de CMS. Permitem alterar os textos motivacionais e os benefícios exibidos na página pública de voluntários, sem necessidade de *deploy* de código. A classe `VolunteerBenefit` é persistida de forma relacional à configuração geral da página.
*   **`VolunteerPageController`**: Rota administrativa para o update destas propriedades dinâmicas da tela de captação.

## 2. Módulo de Discografia
*   **`DiscographyTrack` (Domain)**: Mapeia as faixas musicais atreladas ao projeto, guardando o título, número da faixa e o caminho para o arquivo de áudio (upload feito pelo `UploadController`).
*   **`DiscographyService` e `DiscographyController`**: Realiza o provimento da lista de faixas musicais, ordenadas, para que o *player* desenvolvido no frontend possa consumi-las via chamadas assíncronas.

## 3. Configurações Globais do Site (CMS)
*   **`SiteSettings` (Domain)**: Uma entidade singular que funciona como repositório de configuração em tempo real. Armazena dados de contato (WhatsApp, E-mail, Endereço), links de redes sociais e textos dinâmicos de áreas específicas do portal.
*   **`SiteSettingsRepository` e `SiteSettingsController`**: O repositório garante a existência de um único registro de configuração (padrão *Singleton* em banco). O controlador permite que o painel admin modifique esses links vitais sem depender de configurações no `application.properties`.

## 4. Integração com Frontend Estático
Por fim, explicarei o acoplamento do *Client-Side*.
*   O frontend é servido diretamente pela pasta `/src/main/resources/static/`. Não utilizamos motores de template no servidor (como Thymeleaf). A abordagem utiliza **HTML, CSS e JavaScript puro (Vanilla)**.
*   **Público vs Admin**: Os arquivos estáticos raízes (`index.html`, arquivos sob `/scripts` e `/styles`) consomem os endpoints HTTP públicos. Já os arquivos sob o diretório `/admin/` (ex: `auth.js`, `projects.js`) integram-se ao fluxo de segurança, enviando o `Bearer Token` do JWT via LocalStorage em cada requisição do tipo *Fetch API*. Isso garante um desacoplamento limpo entre o comportamento visual e as regras da API de forma monolítica, mas logicamente separada.
