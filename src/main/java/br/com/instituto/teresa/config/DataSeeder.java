package br.com.instituto.teresa.config;

import br.com.instituto.teresa.domain.AdminUser;
import br.com.instituto.teresa.domain.News;
import br.com.instituto.teresa.domain.SiteSettings;
import br.com.instituto.teresa.domain.BoardMember;
import br.com.instituto.teresa.domain.DiscographyTrack;
import br.com.instituto.teresa.domain.Project;
import br.com.instituto.teresa.domain.ProjectFeature;
import br.com.instituto.teresa.domain.VolunteerBenefit;
import br.com.instituto.teresa.domain.VolunteerPage;
import br.com.instituto.teresa.repository.AdminUserRepository;
import br.com.instituto.teresa.repository.BoardMemberRepository;
import br.com.instituto.teresa.repository.DiscographyTrackRepository;
import br.com.instituto.teresa.repository.ProjectRepository;
import br.com.instituto.teresa.repository.NewsRepository;
import br.com.instituto.teresa.repository.SiteSettingsRepository;
import br.com.instituto.teresa.repository.VolunteerPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private DiscographyTrackRepository trackRepository;
    @Autowired private BoardMemberRepository boardMemberRepository;
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private VolunteerPageRepository volunteerPageRepository;
    @Autowired private SiteSettingsRepository siteSettingsRepository;
    @Autowired private NewsRepository newsRepository;

    @Override
    @SuppressWarnings("null")
    public void run(String... args) throws Exception {
        if (adminUserRepository.count() == 0) {
            String encryptedPassword = new BCryptPasswordEncoder().encode("admin123");
            AdminUser admin = new AdminUser("admin", encryptedPassword);
            adminUserRepository.save(admin);
        }

        if (boardMemberRepository.count() == 0) {
            boardMemberRepository.save(new BoardMember("Presidente", "Robin \"Robinho\" Profeta da Cruz"));
            boardMemberRepository.save(new BoardMember("Diretor Executivo", "Elísio Ferreira de Souza"));
            boardMemberRepository.save(new BoardMember("Diretor Administrativo", "Nelson Lopes Filho"));
        }

        if (volunteerPageRepository.count() == 0) {
            VolunteerPage page = new VolunteerPage(
                "Transforme vidas através da",
                "Cultura Quilombola",
                "Una-se a uma comunidade apaixonada por preservar tradições centenárias. Cada voluntário é uma peça fundamental na nossa missão cultural."
            );
            page.setBenefits(Arrays.asList(
                new VolunteerBenefit("fas fa-heart", "Impacto Social", "Contribua diretamente para a preservação cultural"),
                new VolunteerBenefit("fas fa-users", "Comunidade", "Faça parte de uma família acolhedora"),
                new VolunteerBenefit("fas fa-graduation-cap", "Aprendizado", "Aprenda sobre cultura e tradições únicas"),
                new VolunteerBenefit("fas fa-star", "Experiência", "Desenvolva habilidades e conecte-se com pessoas")
            ));
            volunteerPageRepository.save(page);
        }

        if (siteSettingsRepository.count() == 0) {
            SiteSettings settings = new SiteSettings();
            settings.setId(1L);
            settings.setHeroTitle("Preservando a cultura");
            settings.setHeroSubtitle("Mais de 100 anos de história, tradições e resistência cultural em Vila Bela da Santíssima Trindade - MT");
            settings.setAboutTitle("Conheça o Instituto Tereza de Benguela");
            settings.setAboutDescription("Dedicamos nossa missão a preservar, valorizar e fomentar a rica cultura quilombola de Vila Bela da Santíssima Trindade - MT, onde mais de 100 anos de isolamento forjaram uma identidade cultural única e profundamente africanizada.");
            settings.setAboutItem1Icon("fas fa-landmark");
            settings.setAboutItem1Title("História Centenária");
            settings.setAboutItem1Description("Após 1835, com a mudança da capital para Cuiabá, nossa comunidade desenvolveu autonomamente tecnologias sociais únicas em educação, saúde e agricultura.");
            settings.setAboutItem2Icon("fas fa-users");
            settings.setAboutItem2Title("Movimento Quilombola");
            settings.setAboutItem2Description("Articulamos e organizamos comunidades quilombolas da região, promovendo sua integração aos movimentos estadual e nacional.");
            settings.setCtaTitle("Faça Parte da Nossa História");
            settings.setCtaDescription("O Instituto Tereza de Benguela preserva mais de um século de tradições culturais únicas. Sua contribuição fortalece nossa missão de manter viva a herança quilombola para as futuras gerações.");
            settings.setCtaBullet1("Preservação de tecnologias sociais centenárias");
            settings.setCtaBullet2("Fortalecimento da identidade quilombola");
            settings.setCtaBullet3("Articulação de comunidades regionais");
            settings.setCtaBullet4("Educação e valorização cultural");
            settings.setContactPhone("(65) 99247-4141");
            settings.setContactEmail("institutoterezadebenguela@gmail.com");
            settings.setLocationCity("Vila Bela da Santíssima Trindade - MT");
            settings.setLocationSubtitle("Primeira capital de Mato Grosso");
            settings.setLocationDistance("520km de Cuiabá");
            settings.setLocationCommunity("Comunidade Resiliente");
            settings.setLocationCommunityDetail("Mais de 100 anos de autonomia");
            siteSettingsRepository.save(settings);
        }

        if (newsRepository.count() == 0) {
            News news = new News();
            news.setTitle("Instituto Tereza de Benguela inaugura novo ciclo de atividades culturais");
            news.setSummary("O instituto abre as portas para uma nova temporada de preservação e valorização da cultura quilombola de Vila Bela da Santíssima Trindade.");
            news.setContent("O Instituto Tereza de Benguela anuncia o início de um novo ciclo de atividades voltadas à preservação da cultura quilombola. Com projetos que vão desde oficinas de dança tradicional até rodas de conversa sobre história afro-brasileira, a programação promete reunir moradores e visitantes em torno da rica herança cultural da região.");
            news.setImageUrl("");
            news.setPublishedAt(java.time.LocalDate.now());
            news.setActive(true);
            newsRepository.save(news);
        }

        if (projectRepository.count() == 0) {
            Project p1 = new Project();
            p1.setCode("projeto-1");
            p1.setTitle("Festança do Congo");
            p1.setSubtitle("Testemunho Vivo da Resistência Afro-Brasileira");
            p1.setDescription(
                    "Em Vila Bela da Santíssima Trindade, primeira capital de Mato Grosso, a Festança do Congo é muito mais que uma celebração - é um testemunho vivo da resistência, fé e identidade do povo negro que moldou a região. Esta complexa teia de rituais católicos e manifestações culturais de matriz africana, em devoção a São Benedito, ao Divino Espírito Santo e à Santíssima Trindade, transforma a cidade em julho num palco de história e ancestralidade.");
            p1.setImpact(
                    "Patrimônio imaterial de inestimável importância para o Brasil, a festividade preserva a memória e identidade afro-brasileira, reunindo moradores e visitantes numa celebração comunitária de fé e ancestralidade que remonta ao período pós-escravidão.");
            p1.setImage("assets/imagem1.jpeg");
            p1.setFeatures(Arrays.asList(
                    new ProjectFeature("fas fa-crown", "Dança do Congo: encenação diplomática entre reinos africanos"),
                    new ProjectFeature("fas fa-wine-bottle", "Dança do Chorado: tributo à resiliência das mulheres negras"),
                    new ProjectFeature("fas fa-church", "Rituais católicos integrados às tradições de matriz africana"),
                    new ProjectFeature("fas fa-home", "Cortejos e rezas cantadas nas casas dos festeiros")));

            Map<String, String> p1Details = new HashMap<>();
            p1Details.put("dancaCongo", "O coração da festa é a dramática Dança do Congo, que encena um conflito diplomático entre o altivo Rei do Congo e o Embaixador do Rei de Bamba, que pede a mão da filha real em casamento.");
            p1Details.put("dancaChorado", "Realizada pelas mulheres da comunidade com garrafas de 'Kanjinjim' equilibradas na cabeça, a Dança do Chorado é um tributo à astúcia das mulheres negras durante a escravidão.");
            p1Details.put("tradicaoFamiliar", "Os cargos de Rei, Embaixador e outros personagens são passados de geração em geração, mantendo viva a tradição familiar e comunitária.");
            p1.setDetails(p1Details);

            Project p2 = new Project();
            p2.setCode("projeto-2");
            p2.setTitle("Festival de Praia");
            p2.setSubtitle("Movimentando Turismo e Cultura Local");
            p2.setDescription(
                    "Anteriormente conhecido como Festival de Pesca, o Festival de Praia é um evento estratégico que movimenta o turismo e fortalece a cultura local de Vila Bela da Santíssima Trindade. Realizado anualmente entre setembro e outubro, representa uma importante oportunidade de desenvolvimento econômico e cultural para a região.");
            p2.setImpact(
                    "O festival é fundamental para o desenvolvimento turístico da região, proporcionando visibilidade para grupos culturais que não conseguem financiamento direto da prefeitura e criando oportunidades econômicas para a comunidade local.");
            p2.setImage("");
            p2.setFeatures(Arrays.asList(
                    new ProjectFeature("fas fa-calendar-alt", "Realizado anualmente entre setembro e outubro"),
                    new ProjectFeature("fas fa-plane", "Movimenta o turismo regional e gera renda local"),
                    new ProjectFeature("fas fa-hands-helping", "Instituto apoia grupos sem financiamento municipal"),
                    new ProjectFeature("fas fa-users", "Viabiliza participação de atividades culturais diversas")));

            Project p3 = new Project();
            p3.setCode("projeto-3");
            p3.setTitle("Dia da Consciência Negra");
            p3.setSubtitle("Reflexão e Valorização da Cultura Afro-Brasileira");
            p3.setDescription(
                    "O Dia da Consciência Negra, celebrado em 20 de novembro, é marcado pelo Instituto Tereza de Benguela como um momento especial de reflexão e valorização da cultura afro-brasileira. Este evento anual representa uma oportunidade fundamental para promover o diálogo, a educação e o reconhecimento da importância da herança africana na formação da identidade brasileira.");
            p3.setImpact(
                    "O evento promove a consciência racial e fortalece o orgulho da identidade quilombola, criando espaços de diálogo e educação que conectam gerações e valorizam a rica herança cultural afro-brasileira de Vila Bela da Santíssima Trindade.");
            p3.setImage("assets/imagem2.png");
            p3.setFeatures(Arrays.asList(
                    new ProjectFeature("fas fa-calendar-check", "Celebrado anualmente em 20 de novembro"),
                    new ProjectFeature("fas fa-microphone", "Palestras com personalidades relevantes da cultura afro-brasileira"),
                    new ProjectFeature("fas fa-palette", "Ações culturais e artísticas diversificadas"),
                    new ProjectFeature("fas fa-graduation-cap", "Reflexão e valorização da identidade afro-brasileira")));

            projectRepository.saveAll(Arrays.asList(p1, p2, p3));
        }

        if (trackRepository.count() == 0) {
            String artist = "Quilombo Aurora do Quariterê";
            trackRepository.saveAll(Arrays.asList(
                    new DiscographyTrack(null, "track-1", "Poema para Vila Bela", artist, "./assets/discografia/00 - Poema para Vila Bela"),
                    new DiscographyTrack(null, "track-2", "A rosa", artist, "./assets/discografia/01 - A rosa"),
                    new DiscographyTrack(null, "track-3", "Nunca te darei perdão", artist, "./assets/discografia/02 - Nunca te darei perdão"),
                    new DiscographyTrack(null, "track-4", "Campo Verde Serenado", artist, "./assets/discografia/03- Campo Verde Serenado"),
                    new DiscographyTrack(null, "track-5", "Ranchinho", artist, "./assets/discografia/04 - Ranchinho"),
                    new DiscographyTrack(null, "track-6", "Ó de casa", artist, "./assets/discografia/05 - Mulher ingrata"),
                    new DiscographyTrack(null, "track-7", "Pássaro Preto", artist, "./assets/discografia/06 - Lembrança de mim"),
                    new DiscographyTrack(null, "track-8", "Lamento Sertanejo", artist, "./assets/discografia/07 - Mora na terra quem pode"),
                    new DiscographyTrack(null, "track-9", "Canção do Carreiro", artist, "./assets/discografia/08 - Na beira da praia"),
                    new DiscographyTrack(null, "track-10", "Rasqueado Mineiro", artist, "./assets/discografia/09 - Vou nadar"),
                    new DiscographyTrack(null, "track-11", "Beijinho Doce", artist, "./assets/discografia/10 - Vela acesa"),
                    new DiscographyTrack(null, "track-12", "Viola Cabocla", artist, "./assets/discografia/11 - Passarinho"),
                    new DiscographyTrack(null, "track-13", "Cabocla Teresa", artist, "./assets/discografia/12 - As onze horas da noite"),
                    new DiscographyTrack(null, "track-14", "Cuiabá Formosa", artist, "./assets/discografia/14 - Onde está você"),
                    new DiscographyTrack(null, "track-15", "O Sabiá e a Grola", artist, "./assets/discografia/15 - As folhas da malva gira"),
                    new DiscographyTrack(null, "track-16", "Encerramento", artist, "./assets/discografia/Encerramento")));
        }
    }
}
