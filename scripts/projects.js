// Função para criar o HTML de um projeto
function ProjectCard({ id, code, title, description, image, alt }) {
  const projectId = code || id;
  return `
    <div class="group project-card">
      <div class="p-6">
        <h3 class="text-xl font-bold mb-3 project-title">
          ${title}
        </h3>
        <p class="text-gray-600 mb-4 leading-relaxed">
          ${description}
        </p>
        <a href="/projetos.html#project-${projectId}" class="inline-flex items-center space-x-2 project-link">
          <span>Saiba mais</span>
          <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>
  `;
}

// Função para renderizar projetos
function renderProjects(projectsArray, limit = null) {
  if (!projectsArray) return "";
  const projectsToRender = limit ? projectsArray.slice(0, limit) : projectsArray;
  return projectsToRender.map((project) => ProjectCard(project)).join("");
}

// Função para carregar projetos no DOM
async function loadProjects() {
  const projectsContainer = document.getElementById("projects-container");

  if (projectsContainer) {
    // Mostrar loading
    projectsContainer.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-8">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p class="text-gray-600">Carregando projetos...</p>
        </div>
      </div>
    `;

    try {
      const response = await fetch('/api/projects');
      const projects = await response.json();
      window.ProjectsManager.projects = projects;

      projectsContainer.innerHTML = renderProjects(projects, 3);

      // Adicionar animação de entrada
      const cards = projectsContainer.querySelectorAll(".project-card");
      cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.transition = "all 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 150);
      });
    } catch (e) {
      console.error(e);
      projectsContainer.innerHTML = '<p class="text-center text-red-500">Erro ao carregar projetos.</p>';
    }
  }
}

// Exportar funcionalidades
window.ProjectsManager = {
  projects: [],
  loadProjects,
  renderProjects,
  ProjectCard,
};

// Auto-executar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", loadProjects);
