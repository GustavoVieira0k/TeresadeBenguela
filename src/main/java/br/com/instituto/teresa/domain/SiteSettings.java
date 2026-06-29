package br.com.instituto.teresa.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "site_settings")
public class SiteSettings {

    @Id
    private Long id = 1L;

    // Hero
    private String heroTitle;
    @Column(columnDefinition = "TEXT")
    private String heroSubtitle;
    private String heroImageUrl;

    // About
    private String aboutTitle;
    @Column(columnDefinition = "TEXT")
    private String aboutDescription;
    private String aboutItem1Icon;
    private String aboutItem1Title;
    @Column(columnDefinition = "TEXT")
    private String aboutItem1Description;
    private String aboutItem2Icon;
    private String aboutItem2Title;
    @Column(columnDefinition = "TEXT")
    private String aboutItem2Description;

    // CTA
    private String ctaTitle;
    @Column(columnDefinition = "TEXT")
    private String ctaDescription;
    private String ctaBullet1;
    private String ctaBullet2;
    private String ctaBullet3;
    private String ctaBullet4;

    // Contact
    private String contactPhone;
    private String contactEmail;

    // Location
    private String locationCity;
    private String locationSubtitle;
    private String locationDistance;
    private String locationCommunity;
    private String locationCommunityDetail;

    public SiteSettings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHeroTitle() { return heroTitle; }
    public void setHeroTitle(String heroTitle) { this.heroTitle = heroTitle; }

    public String getHeroSubtitle() { return heroSubtitle; }
    public void setHeroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; }

    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }

    public String getAboutTitle() { return aboutTitle; }
    public void setAboutTitle(String aboutTitle) { this.aboutTitle = aboutTitle; }

    public String getAboutDescription() { return aboutDescription; }
    public void setAboutDescription(String aboutDescription) { this.aboutDescription = aboutDescription; }

    public String getAboutItem1Icon() { return aboutItem1Icon; }
    public void setAboutItem1Icon(String aboutItem1Icon) { this.aboutItem1Icon = aboutItem1Icon; }

    public String getAboutItem1Title() { return aboutItem1Title; }
    public void setAboutItem1Title(String aboutItem1Title) { this.aboutItem1Title = aboutItem1Title; }

    public String getAboutItem1Description() { return aboutItem1Description; }
    public void setAboutItem1Description(String aboutItem1Description) { this.aboutItem1Description = aboutItem1Description; }

    public String getAboutItem2Icon() { return aboutItem2Icon; }
    public void setAboutItem2Icon(String aboutItem2Icon) { this.aboutItem2Icon = aboutItem2Icon; }

    public String getAboutItem2Title() { return aboutItem2Title; }
    public void setAboutItem2Title(String aboutItem2Title) { this.aboutItem2Title = aboutItem2Title; }

    public String getAboutItem2Description() { return aboutItem2Description; }
    public void setAboutItem2Description(String aboutItem2Description) { this.aboutItem2Description = aboutItem2Description; }

    public String getCtaTitle() { return ctaTitle; }
    public void setCtaTitle(String ctaTitle) { this.ctaTitle = ctaTitle; }

    public String getCtaDescription() { return ctaDescription; }
    public void setCtaDescription(String ctaDescription) { this.ctaDescription = ctaDescription; }

    public String getCtaBullet1() { return ctaBullet1; }
    public void setCtaBullet1(String ctaBullet1) { this.ctaBullet1 = ctaBullet1; }

    public String getCtaBullet2() { return ctaBullet2; }
    public void setCtaBullet2(String ctaBullet2) { this.ctaBullet2 = ctaBullet2; }

    public String getCtaBullet3() { return ctaBullet3; }
    public void setCtaBullet3(String ctaBullet3) { this.ctaBullet3 = ctaBullet3; }

    public String getCtaBullet4() { return ctaBullet4; }
    public void setCtaBullet4(String ctaBullet4) { this.ctaBullet4 = ctaBullet4; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }

    public String getLocationSubtitle() { return locationSubtitle; }
    public void setLocationSubtitle(String locationSubtitle) { this.locationSubtitle = locationSubtitle; }

    public String getLocationDistance() { return locationDistance; }
    public void setLocationDistance(String locationDistance) { this.locationDistance = locationDistance; }

    public String getLocationCommunity() { return locationCommunity; }
    public void setLocationCommunity(String locationCommunity) { this.locationCommunity = locationCommunity; }

    public String getLocationCommunityDetail() { return locationCommunityDetail; }
    public void setLocationCommunityDetail(String locationCommunityDetail) { this.locationCommunityDetail = locationCommunityDetail; }
}
