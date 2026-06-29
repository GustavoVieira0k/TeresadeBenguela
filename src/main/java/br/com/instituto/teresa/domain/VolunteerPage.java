package br.com.instituto.teresa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "volunteer_page")
public class VolunteerPage {

    @Id
    private Long id = 1L; // Teremos apenas uma configuração

    private String title1;
    private String title2;

    @Column(columnDefinition = "TEXT")
    private String description;


    @ElementCollection
    private List<VolunteerBenefit> benefits = new ArrayList<>();

    public VolunteerPage() {}

    public VolunteerPage(String title1, String title2, String description) {
        this.id = 1L;
        this.title1 = title1;
        this.title2 = title2;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle1() { return title1; }
    public void setTitle1(String title1) { this.title1 = title1; }

    public String getTitle2() { return title2; }
    public void setTitle2(String title2) { this.title2 = title2; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<VolunteerBenefit> getBenefits() { return benefits; }
    public void setBenefits(List<VolunteerBenefit> benefits) { this.benefits = benefits; }
}
