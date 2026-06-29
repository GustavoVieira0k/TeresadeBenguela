package br.com.instituto.teresa.domain;

import jakarta.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Entity // Indica que a classe representa uma tabela no banco de dados
@Table(name = "projects") // Fornece nome específico para a tabela criada
public class Project {

    @Id // Configura este campo como chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Seta este atributo para ter auto incremento da chave primária
    private Long id;

    private String code;
    private String title;
    private String subtitle;
    
    @Column(columnDefinition = "TEXT") // Especifica o tipo nativo da coluna como texto longo/grande
    private String description;
    
    @Column(columnDefinition = "TEXT") // Especifica o tipo nativo da coluna como texto longo/grande
    private String impact;
    
    private String image;

    private String videoUrl;

    @ElementCollection // Mapeia uma coleção de tipos básicos ou entidades embutidas (List) relacionada à classe principal
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id")) // Nomeia a tabela dependente e define qual será sua chave estrangeira
    private List<ProjectFeature> features;
    
    @ElementCollection // Mapeia um Map (chave/valor) que pertence à entidade em uma tabela externa própria
    @CollectionTable(name = "project_details", joinColumns = @JoinColumn(name = "project_id")) // Nome da tabela do Map e sua respectiva foreign key
    @MapKeyColumn(name = "detail_key") // Coluna que armazenará a chave do Map
    @Column(name = "detail_value", columnDefinition = "TEXT") // Coluna que armazenará o valor do Map
    private Map<String, String> details = new HashMap<>();

    public Project() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImpact() { return impact; }
    public void setImpact(String impact) { this.impact = impact; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public List<ProjectFeature> getFeatures() { return features; }
    public void setFeatures(List<ProjectFeature> features) { this.features = features; }
    public Map<String, String> getDetails() { return details; }
    public void setDetails(Map<String, String> details) { this.details = details; }
}
