package br.com.instituto.teresa.service;

import br.com.instituto.teresa.domain.BoardMember;
import br.com.instituto.teresa.dto.BoardMemberRequestDTO;
import br.com.instituto.teresa.dto.BoardMemberResponseDTO;
import br.com.instituto.teresa.repository.BoardMemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardMemberService {

    private final BoardMemberRepository boardMemberRepository;

    public BoardMemberService(BoardMemberRepository boardMemberRepository) {
        this.boardMemberRepository = boardMemberRepository;
    }

    public List<BoardMemberResponseDTO> getAllBoardMembers() {
        return boardMemberRepository.findAll().stream()
                .map(BoardMemberResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public BoardMemberResponseDTO createBoardMember(BoardMemberRequestDTO dto) {
        BoardMember member = new BoardMember(dto.getRole(), dto.getName());
        return new BoardMemberResponseDTO(boardMemberRepository.save(member));
    }

    @Transactional
    public BoardMemberResponseDTO updateBoardMember(@NonNull Long id, BoardMemberRequestDTO dto) {
        BoardMember member = boardMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membro da diretoria não encontrado com o ID: " + id));
        member.setRole(dto.getRole());
        member.setName(dto.getName());
        return new BoardMemberResponseDTO(boardMemberRepository.save(member));
    }

    @Transactional
    public void deleteBoardMember(@NonNull Long id) {
        if (!boardMemberRepository.existsById(id)) {
            throw new RuntimeException("Membro da diretoria não encontrado com o ID: " + id);
        }
        boardMemberRepository.deleteById(id);
    }
}
