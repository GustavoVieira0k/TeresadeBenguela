package br.com.instituto.teresa.repository;

import br.com.instituto.teresa.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByActiveTrueOrderByPublishedAtDesc();
}