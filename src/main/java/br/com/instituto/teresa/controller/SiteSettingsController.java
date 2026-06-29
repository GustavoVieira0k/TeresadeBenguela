package br.com.instituto.teresa.controller;

import br.com.instituto.teresa.domain.SiteSettings;
import br.com.instituto.teresa.dto.SiteSettingsRequestDTO;
import br.com.instituto.teresa.repository.SiteSettingsRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/site-settings")
public class SiteSettingsController {

    private final SiteSettingsRepository repository;

    public SiteSettingsController(SiteSettingsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<SiteSettings> getSettings() {
        return repository.findById(1L)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    @Transactional
    public ResponseEntity<SiteSettings> updateSettings(@RequestBody SiteSettingsRequestDTO dto) {
        SiteSettings settings = repository.findById(1L).orElse(new SiteSettings());
        settings.setId(1L);
        settings.setHeroTitle(dto.heroTitle());
        settings.setHeroSubtitle(dto.heroSubtitle());
        settings.setHeroImageUrl(dto.heroImageUrl());
        settings.setAboutTitle(dto.aboutTitle());
        settings.setAboutDescription(dto.aboutDescription());
        settings.setAboutItem1Icon(dto.aboutItem1Icon());
        settings.setAboutItem1Title(dto.aboutItem1Title());
        settings.setAboutItem1Description(dto.aboutItem1Description());
        settings.setAboutItem2Icon(dto.aboutItem2Icon());
        settings.setAboutItem2Title(dto.aboutItem2Title());
        settings.setAboutItem2Description(dto.aboutItem2Description());
        settings.setCtaTitle(dto.ctaTitle());
        settings.setCtaDescription(dto.ctaDescription());
        settings.setCtaBullet1(dto.ctaBullet1());
        settings.setCtaBullet2(dto.ctaBullet2());
        settings.setCtaBullet3(dto.ctaBullet3());
        settings.setCtaBullet4(dto.ctaBullet4());
        settings.setContactPhone(dto.contactPhone());
        settings.setContactEmail(dto.contactEmail());
        settings.setLocationCity(dto.locationCity());
        settings.setLocationSubtitle(dto.locationSubtitle());
        settings.setLocationDistance(dto.locationDistance());
        settings.setLocationCommunity(dto.locationCommunity());
        settings.setLocationCommunityDetail(dto.locationCommunityDetail());
        return ResponseEntity.ok(repository.save(settings));
    }
}