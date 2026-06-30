package br.com.instituto.teresa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private static final Set<String> ALLOWED_IMAGE_TYPES = Set.of(
            "image/jpeg", "image/png", "image/gif", "image/webp"
    );

    private static final Set<String> ALLOWED_AUDIO_TYPES = Set.of(
            "audio/mpeg", "audio/mp3", "audio/ogg", "audio/wav",
            "audio/mp4", "audio/aac", "audio/flac", "audio/x-flac",
            "audio/x-wav", "audio/vorbis"
    );

    private static final String UPLOAD_DIR = "./uploads/";
    // Adicionamos a URL base do seu servidor no Render
    private static final String BASE_URL = "https://teresadebenguela-13vo.onrender.com";

    @PostMapping
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Arquivo vazio"));
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Tipo não permitido. Use JPG, PNG, GIF ou WEBP."));
        }

        return ResponseEntity.ok(Map.of("url", saveFile(file, ".jpg")));
    }

    @PostMapping("/audio")
    public ResponseEntity<Map<String, String>> uploadAudio(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Arquivo vazio"));
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_AUDIO_TYPES.contains(contentType)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Tipo não permitido. Use MP3, OGG, WAV, AAC ou FLAC."));
        }

        return ResponseEntity.ok(Map.of("url", saveFile(file, ".mp3")));
    }

    private String saveFile(MultipartFile file, String defaultExt) throws IOException {
        String original = file.getOriginalFilename();
        String ext = (original != null && original.contains("."))
                ? original.substring(original.lastIndexOf('.'))
                : defaultExt;

        String filename = UUID.randomUUID() + ext;
        Path dir = Paths.get(UPLOAD_DIR);
        Files.createDirectories(dir); // Garante que a pasta existe
        Files.write(dir.resolve(filename), file.getBytes());
        
        // Retorna a URL absoluta apontando para o Render
        return BASE_URL + "/uploads/" + filename;
    }
}