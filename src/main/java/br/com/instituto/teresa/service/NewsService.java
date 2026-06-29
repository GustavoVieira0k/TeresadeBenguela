package br.com.instituto.teresa.service;

import br.com.instituto.teresa.domain.News;
import br.com.instituto.teresa.dto.NewsRequestDTO;
import br.com.instituto.teresa.dto.NewsResponseDTO;
import br.com.instituto.teresa.repository.NewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<NewsResponseDTO> getActiveNews() {
        return newsRepository.findByActiveTrueOrderByPublishedAtDesc()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<NewsResponseDTO> getAllNews() {
        return newsRepository.findAll()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional
    public NewsResponseDTO createNews(NewsRequestDTO dto) {
        News news = new News();
        applyDto(news, dto);
        return mapToDTO(newsRepository.save(news));
    }

    @Transactional
    public NewsResponseDTO updateNews(long id, NewsRequestDTO dto) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notícia não encontrada: " + id));
        applyDto(news, dto);
        return mapToDTO(newsRepository.save(Objects.requireNonNull(news)));
    }

    @Transactional
    public void deleteNews(long id) {
        newsRepository.deleteById(id);
    }

    private void applyDto(News news, NewsRequestDTO dto) {
        news.setTitle(dto.title());
        news.setSummary(dto.summary());
        news.setContent(dto.content());
        news.setImageUrl(dto.imageUrl());
        news.setVideoUrl(dto.videoUrl());
        news.setPublishedAt(dto.publishedAt());
        news.setActive(dto.active());
    }

    private NewsResponseDTO mapToDTO(News news) {
        return new NewsResponseDTO(
                news.getId(),
                news.getTitle(),
                news.getSummary(),
                news.getContent(),
                news.getImageUrl(),
                news.getVideoUrl(),
                news.getPublishedAt(),
                news.isActive()
        );
    }
}