package br.com.instituto.teresa.controller;

import br.com.instituto.teresa.dto.ProjectResponseDTO;
import br.com.instituto.teresa.service.ProjectService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @Test
    public void testGetAllProjects() throws Exception {
        ProjectResponseDTO p1 = new ProjectResponseDTO(
            1L, "code", "Test Project", "Sub", "Desc", "Impact", "img.jpg", null, Collections.emptyList(), Collections.emptyMap()
        );

        Mockito.when(projectService.getAllProjects()).thenReturn(Arrays.asList(p1));

        mockMvc.perform(get("/api/projects"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].title").value("Test Project"));
    }
}
