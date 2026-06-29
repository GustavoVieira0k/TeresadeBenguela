package br.com.instituto.teresa.controller;

import br.com.instituto.teresa.dto.DiscographyTrackRequestDTO;
import br.com.instituto.teresa.dto.DiscographyTrackResponseDTO;
import br.com.instituto.teresa.service.DiscographyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discography")
public class DiscographyController {

    private final DiscographyService discographyService;

    public DiscographyController(DiscographyService discographyService) {
        this.discographyService = discographyService;
    }

    @GetMapping
    public List<DiscographyTrackResponseDTO> getAllTracks() {
        return discographyService.getAllTracks();
    }

    @PostMapping
    public ResponseEntity<DiscographyTrackResponseDTO> createTrack(@RequestBody @Valid DiscographyTrackRequestDTO dto) {
        return ResponseEntity.ok(discographyService.createTrack(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiscographyTrackResponseDTO> updateTrack(@PathVariable long id, @RequestBody @Valid DiscographyTrackRequestDTO dto) {
        return ResponseEntity.ok(discographyService.updateTrack(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable long id) {
        discographyService.deleteTrack(id);
        return ResponseEntity.noContent().build();
    }
}
