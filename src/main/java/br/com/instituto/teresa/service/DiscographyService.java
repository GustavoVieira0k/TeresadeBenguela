package br.com.instituto.teresa.service;

import br.com.instituto.teresa.domain.DiscographyTrack;
import br.com.instituto.teresa.dto.DiscographyTrackRequestDTO;
import br.com.instituto.teresa.dto.DiscographyTrackResponseDTO;
import br.com.instituto.teresa.repository.DiscographyTrackRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiscographyService {

    private final DiscographyTrackRepository repository;

    public DiscographyService(DiscographyTrackRepository repository) {
        this.repository = repository;
    }

    public List<DiscographyTrackResponseDTO> getAllTracks() {
        return repository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public DiscographyTrackResponseDTO createTrack(DiscographyTrackRequestDTO dto) {
        DiscographyTrack track = new DiscographyTrack(null, dto.code(), dto.title(), dto.artist(), dto.audioFile());
        return mapToDTO(repository.save(track));
    }

    @Transactional
    public DiscographyTrackResponseDTO updateTrack(long id, DiscographyTrackRequestDTO dto) {
        DiscographyTrack track = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Faixa não encontrada: " + id));
        track.setCode(dto.code());
        track.setTitle(dto.title());
        track.setArtist(dto.artist());
        track.setAudioFile(dto.audioFile());
        return mapToDTO(repository.save(track));
    }

    @Transactional
    public void deleteTrack(long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Faixa não encontrada: " + id);
        }
        repository.deleteById(id);
    }

    private DiscographyTrackResponseDTO mapToDTO(DiscographyTrack track) {
        return new DiscographyTrackResponseDTO(
            track.getId(),
            track.getCode(),
            track.getTitle(),
            track.getArtist(),
            track.getAudioFile()
        );
    }
}
