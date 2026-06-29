package br.com.instituto.teresa.controller;

import br.com.instituto.teresa.dto.BoardMemberRequestDTO;
import br.com.instituto.teresa.dto.BoardMemberResponseDTO;
import br.com.instituto.teresa.service.BoardMemberService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardMemberController {

    private final BoardMemberService boardMemberService;

    public BoardMemberController(BoardMemberService boardMemberService) {
        this.boardMemberService = boardMemberService;
    }

    @GetMapping
    public List<BoardMemberResponseDTO> getAllBoardMembers() {
        return boardMemberService.getAllBoardMembers();
    }

    @PostMapping
    public ResponseEntity<BoardMemberResponseDTO> createBoardMember(@RequestBody @Valid BoardMemberRequestDTO dto) {
        return ResponseEntity.ok(boardMemberService.createBoardMember(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardMemberResponseDTO> updateBoardMember(@PathVariable long id, @RequestBody @Valid BoardMemberRequestDTO dto) {
        return ResponseEntity.ok(boardMemberService.updateBoardMember(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoardMember(@PathVariable long id) {
        boardMemberService.deleteBoardMember(id);
        return ResponseEntity.noContent().build();
    }
}
