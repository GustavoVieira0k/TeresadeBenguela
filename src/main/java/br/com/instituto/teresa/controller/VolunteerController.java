package br.com.instituto.teresa.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.instituto.teresa.domain.Volunteer;
import br.com.instituto.teresa.dto.VolunteerRequestDTO;
import br.com.instituto.teresa.service.VolunteerService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createVolunteer(@Valid @RequestBody VolunteerRequestDTO volunteerDTO) {
        volunteerService.processVolunteer(volunteerDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Candidatura enviada com sucesso!");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<List<Volunteer>> listar() {
        return ResponseEntity.ok(volunteerService.listarTodos());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        volunteerService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
