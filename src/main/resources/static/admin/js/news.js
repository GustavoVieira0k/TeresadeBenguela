let newsData = [];

function _esc(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.ImagePicker) ImagePicker.init('news-image');
    if (window.VideoPicker) VideoPicker.init('news-video');
    loadNews();
    document.getElementById('news-form').addEventListener('submit', saveNews);
});

async function loadNews() {
    const list = document.getElementById('news-list');
    list.innerHTML = '<p class="text-gray-500">Carregando...</p>';
    try {
        // CORREÇÃO: URL do Render
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/news/all', { headers: getAuthHeaders() });
        newsData = await res.json();
        renderNewsList();
    } catch (e) {
        list.innerHTML = '<p class="text-red-500">Erro ao carregar notícias.</p>';
    }
}

function renderNewsList() {
    const list = document.getElementById('news-list');
    if (newsData.length === 0) {
        list.innerHTML = '<p class="text-gray-500">Nenhuma notícia cadastrada.</p>';
        return;
    }
    list.innerHTML = newsData.map(n => `
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div class="flex-1 min-w-0 overflow-hidden">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-900 truncate min-w-0">${_esc(n.title)}</span>
                    <span class="flex-shrink-0 px-2 py-0.5 text-xs rounded-full ${n.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}">
                        ${n.active ? 'Publicada' : 'Rascunho'}
                    </span>
                </div>
                <p class="text-xs text-gray-500 mt-0.5">${_esc(n.publishedAt || 'Sem data')}</p>
            </div>
            <div class="flex items-center gap-2 ml-4 flex-shrink-0">
                <button onclick="editNews(${n.id})" class="btn-edit-brand">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="deleteNews(${n.id})" class="text-red-600 hover:text-red-800 text-sm font-medium">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function editNews(id) {
    const n = newsData.find(x => x.id === id);
    if (!n) return;
    document.getElementById('news-id').value = n.id;
    document.getElementById('news-title').value = n.title || '';
    document.getElementById('news-summary').value = n.summary || '';
    document.getElementById('news-content').value = n.content || '';
    const imgEl = document.getElementById('news-image');
    imgEl.value = n.imageUrl || '';
    imgEl.dispatchEvent(new Event('change'));
    const vidEl = document.getElementById('news-video');
    vidEl.value = n.videoUrl || '';
    vidEl.dispatchEvent(new Event('change'));
    document.getElementById('news-date').value = n.publishedAt || '';
    document.getElementById('news-active').checked = n.active;
    document.getElementById('form-title').textContent = 'Editando: ' + n.title;
    document.getElementById('cancel-btn').classList.remove('hidden');
    document.getElementById('news-form').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('news-id').value = '';
    document.getElementById('news-form').reset();
    document.getElementById('news-active').checked = true;
    const imgEl = document.getElementById('news-image');
    imgEl.value = '';
    imgEl.dispatchEvent(new Event('change'));
    const vidEl = document.getElementById('news-video');
    vidEl.value = '';
    vidEl.dispatchEvent(new Event('change'));
    document.getElementById('form-title').textContent = 'Nova Notícia';
    document.getElementById('cancel-btn').classList.add('hidden');
}

async function saveNews(e) {
    e.preventDefault();
    const id = document.getElementById('news-id').value;
    const payload = {
        title: document.getElementById('news-title').value,
        summary: document.getElementById('news-summary').value,
        content: document.getElementById('news-content').value,
        imageUrl: document.getElementById('news-image').value,
        videoUrl: document.getElementById('news-video').value || null,
        publishedAt: document.getElementById('news-date').value || null,
        active: document.getElementById('news-active').checked
    };

    // CORREÇÃO: URL do Render
    const url = id ? `https://teresadebenguela-13vo.onrender.com/api/news/${id}` : 'https://teresadebenguela-13vo.onrender.com/api/news';
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(payload) });
        if (res.ok) {
            showAlert(id ? 'Notícia atualizada!' : 'Notícia criada!', 'success');
            resetForm();
            loadNews();
        } else {
            showAlert('Falha ao salvar notícia.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}

async function deleteNews(id) {
    const news = newsData.find(x => x.id === id);
    if (!confirm(`Excluir "${news?.title}"?`)) return;
    try {
        // CORREÇÃO: URL do Render
        const res = await fetch(`https://teresadebenguela-13vo.onrender.com/api/news/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        if (res.ok) {
            showAlert('Notícia excluída.', 'success');
            loadNews();
        } else {
            showAlert('Falha ao excluir.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}