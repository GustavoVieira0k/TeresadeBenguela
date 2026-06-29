let projectsData = [];

document.addEventListener('DOMContentLoaded', () => {
    if (window.ImagePicker) ImagePicker.init('project-image');
    if (window.VideoPicker) VideoPicker.init('project-video');
    loadProjects();
    document.getElementById('project-form').addEventListener('submit', saveProject);
    document.getElementById('btn-new-project').addEventListener('click', showNewForm);
});

async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '<p class="col-span-full text-gray-500">Carregando...</p>';
    try {
        const res = await fetch('/api/projects');
        projectsData = await res.json();
        grid.innerHTML = '';
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'bg-white overflow-hidden shadow border border-gray-200 rounded-lg';
            card.innerHTML = `
                <div class="p-5 cursor-pointer hover:bg-gray-50" onclick="showEditForm(${project.id})">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">${project.title}</h3>
                    <p class="mt-1 text-sm text-gray-500 truncate">${project.subtitle || 'Sem subtítulo'}</p>
                </div>
                <div class="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
                    <span onclick="showEditForm(${project.id})" class="text-sm font-medium btn-edit-brand cursor-pointer">Editar &rarr;</span>
                    <button onclick="deleteProject(${project.id})" class="text-sm font-medium text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (e) {
        grid.innerHTML = '<p class="col-span-full text-red-500">Erro ao carregar projetos.</p>';
    }
}

function showNewForm() {
    clearForm();
    document.getElementById('current-editing-title').textContent = 'Novo Projeto';
    document.getElementById('edit-form-card').classList.remove('hidden');
    document.getElementById('edit-form-card').scrollIntoView({ behavior: 'smooth' });
}

function showEditForm(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;
    document.getElementById('current-editing-title').textContent = project.title;
    document.getElementById('project-id').value = project.id;
    document.getElementById('project-code').value = project.code || '';
    document.getElementById('project-title').value = project.title || '';
    document.getElementById('project-subtitle').value = project.subtitle || '';
    document.getElementById('project-description').value = project.description || '';
    document.getElementById('project-impact').value = project.impact || '';
    const imgEl = document.getElementById('project-image');
    imgEl.value = project.image || '';
    imgEl.dispatchEvent(new Event('change'));
    const vidEl = document.getElementById('project-video');
    vidEl.value = project.videoUrl || '';
    vidEl.dispatchEvent(new Event('change'));
    renderFeaturesEditor(project.features || []);
    document.getElementById('edit-form-card').classList.remove('hidden');
    document.getElementById('edit-form-card').scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
    document.getElementById('project-id').value = '';
    document.getElementById('project-code').value = '';
    document.getElementById('project-title').value = '';
    document.getElementById('project-subtitle').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-impact').value = '';
    const imgEl = document.getElementById('project-image');
    imgEl.value = '';
    imgEl.dispatchEvent(new Event('change'));
    const vidEl = document.getElementById('project-video');
    vidEl.value = '';
    vidEl.dispatchEvent(new Event('change'));
    renderFeaturesEditor([]);
}

function hideEditForm() {
    document.getElementById('edit-form-card').classList.add('hidden');
}

// --- Features dinâmicas ---

function renderFeaturesEditor(features) {
    const container = document.getElementById('features-container');
    container.innerHTML = '';
    features.forEach((f, i) => addFeatureRow(f.icon, f.text));
}

function addFeatureRow(icon = '', text = '') {
    const container = document.getElementById('features-container');
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2';

    const iconInput = document.createElement('input');
    iconInput.type = 'text';
    iconInput.value = icon;
    iconInput.placeholder = 'fas fa-star';
    iconInput.className = 'feature-icon w-36 border border-gray-300 rounded-md p-2 text-sm';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = text;
    textInput.placeholder = 'Descrição da característica';
    textInput.className = 'feature-text flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'text-red-500 hover:text-red-700 px-2 flex-shrink-0';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(iconInput);
    row.appendChild(textInput);
    row.appendChild(removeBtn);
    container.appendChild(row);

    if (window.IconPicker) {
        IconPicker.initElement(iconInput);
    }
}

function collectFeatures() {
    const rows = document.querySelectorAll('#features-container > div');
    return Array.from(rows).map(row => ({
        icon: row.querySelector('.feature-icon').value,
        text: row.querySelector('.feature-text').value
    })).filter(f => f.text.trim() !== '');
}

// --- Salvar / Excluir ---

async function saveProject(e) {
    e.preventDefault();
    const id = document.getElementById('project-id').value;
    const projectOriginal = id ? projectsData.find(p => p.id == id) : null;

    const payload = {
        code: document.getElementById('project-code').value,
        title: document.getElementById('project-title').value,
        subtitle: document.getElementById('project-subtitle').value,
        description: document.getElementById('project-description').value,
        impact: document.getElementById('project-impact').value,
        image: document.getElementById('project-image').value,
        videoUrl: document.getElementById('project-video').value || null,
        features: collectFeatures(),
        details: projectOriginal ? projectOriginal.details : {}
    };

    const url = id ? `/api/projects/${id}` : '/api/projects';
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(payload) });
        if (res.ok) {
            showAlert(id ? 'Projeto atualizado!' : 'Projeto criado!', 'success');
            loadProjects();
            hideEditForm();
        } else {
            showAlert('Falha ao salvar projeto.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}

async function deleteProject(id) {
    const project = projectsData.find(p => p.id === id);
    if (!confirm(`Excluir o projeto "${project?.title}"? Esta ação não pode ser desfeita.`)) return;
    try {
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        if (res.ok) {
            showAlert('Projeto excluído.', 'success');
            hideEditForm();
            loadProjects();
        } else {
            showAlert('Falha ao excluir projeto.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}
