package br.com.instituto.teresa.controller;

import br.com.instituto.teresa.dto.NewsRequestDTO;
import br.com.instituto.teresa.dto.NewsResponseDTO;
import br.com.instituto.teresa.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<NewsResponseDTO> getActiveNews() {
        return newsService.getActiveNews();
    }

    @GetMapping("/all")
    public List<NewsResponseDTO> getAllNews() {
        return newsService.getAllNews();
    }

    @PostMapping
    public ResponseEntity<NewsResponseDTO> createNews(@RequestBody @Valid NewsRequestDTO dto) {
        return ResponseEntity.ok(newsService.createNews(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsResponseDTO> updateNews(@PathVariable long id, @RequestBody @Valid NewsRequestDTO dto) {
        return ResponseEntity.ok(newsService.updateNews(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}