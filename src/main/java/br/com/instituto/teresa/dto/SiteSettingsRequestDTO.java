package br.com.instituto.teresa.dto;

public record SiteSettingsRequestDTO(
    String heroTitle,
    String heroSubtitle,
    String heroImageUrl,
    String aboutTitle,
    String aboutDescription,
    String aboutItem1Icon,
    String aboutItem1Title,
    String aboutItem1Description,
    String aboutItem2Icon,
    String aboutItem2Title,
    String aboutItem2Description,
    String ctaTitle,
    String ctaDescription,
    String ctaBullet1,
    String ctaBullet2,
    String ctaBullet3,
    String ctaBullet4,
    String contactPhone,
    String contactEmail,
    String locationCity,
    String locationSubtitle,
    String locationDistance,
    String locationCommunity,
    String locationCommunityDetail
) {}