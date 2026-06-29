let tracksData = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTracks();
    document.getElementById('track-form').addEventListener('submit', saveTrack);
    document.getElementById('audio-file-input').addEventListener('change', handleAudioFileChange);
});

async function loadTracks() {
    const list = document.getElementById('tracks-list');
    list.innerHTML = '<p class="text-gray-500">Carregando...</p>';
    try {
        const res = await fetch('/api/discography');
        tracksData = await res.json();
        renderTracksList();
    } catch (e) {
        list.innerHTML = '<p class="text-red-500">Erro ao carregar faixas.</p>';
    }
}

function renderTracksList() {
    const list = document.getElementById('tracks-list');
    if (tracksData.length === 0) {
        list.innerHTML = '<p class="text-gray-500">Nenhuma faixa cadastrada.</p>';
        return;
    }
    list.innerHTML = tracksData.map((t, i) => `
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="text-xs font-mono text-gray-400 w-6 text-center">${i + 1}</span>
                <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">${t.title}</p>
                    <p class="text-xs text-gray-500 truncate">${t.artist || ''} &mdash; <span class="font-mono">${t.audioFile || ''}</span></p>
                </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
                <button onclick="editTrack(${t.id})" class="btn-edit-brand">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="deleteTrack(${t.id})" class="text-red-600 hover:text-red-800 text-sm font-medium">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

async function handleAudioFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const btn = document.getElementById('audio-upload-btn');
    const hint = document.getElementById('audio-hint');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';
    btn.classList.add('pointer-events-none', 'opacity-60');

    try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload/audio', {
            method: 'POST',
            headers: { 'Authorization': getAuthHeaders()['Authorization'] },
            body: form
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Falha no upload');

        document.getElementById('track-audio').value = data.url;
        hint.textContent = `✓ ${file.name} enviado com sucesso.`;
        hint.classList.add('text-green-600');
        hint.classList.remove('text-gray-400');
        updateAudioPreview();
    } catch (err) {
        hint.textContent = `Erro: ${err.message}`;
        hint.classList.add('text-red-600');
        hint.classList.remove('text-gray-400');
    } finally {
        btn.innerHTML = '<i class="fas fa-upload"></i> Enviar arquivo';
        btn.classList.remove('pointer-events-none', 'opacity-60');
        e.target.value = '';
    }
}

function updateAudioPreview() {
    const val = document.getElementById('track-audio').value.trim();
    const player = document.getElementById('audio-preview');
    if (!val) { player.classList.add('hidden'); return; }
    const src = val.startsWith('/') || val.startsWith('http') ? val : val + '.mp3';
    player.src = src;
    player.classList.remove('hidden');
}

function editTrack(id) {
    const t = tracksData.find(x => x.id === id);
    if (!t) return;
    document.getElementById('track-id').value = t.id;
    document.getElementById('track-title').value = t.title || '';
    document.getElementById('track-artist').value = t.artist || '';
    document.getElementById('track-code').value = t.code || '';
    document.getElementById('track-audio').value = t.audioFile || '';
    document.getElementById('form-title').textContent = 'Editando: ' + t.title;
    document.getElementById('cancel-btn').classList.remove('hidden');
    updateAudioPreview();
    document.getElementById('track-form').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('track-id').value = '';
    document.getElementById('track-form').reset();
    document.getElementById('form-title').textContent = 'Nova Faixa';
    document.getElementById('cancel-btn').classList.add('hidden');
    const player = document.getElementById('audio-preview');
    player.src = '';
    player.classList.add('hidden');
    const hint = document.getElementById('audio-hint');
    hint.textContent = 'Cole um caminho existente ou clique em "Enviar arquivo" para fazer upload.';
    hint.className = 'mt-1 text-xs text-gray-400';
}

async function saveTrack(e) {
    e.preventDefault();
    const id = document.getElementById('track-id').value;
    const payload = {
        title: document.getElementById('track-title').value,
        artist: document.getElementById('track-artist').value,
        code: document.getElementById('track-code').value,
        audioFile: document.getElementById('track-audio').value
    };

    const url = id ? `/api/discography/${id}` : '/api/discography';
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(payload) });
        if (res.ok) {
            showAlert(id ? 'Faixa atualizada!' : 'Faixa adicionada!', 'success');
            resetForm();
            loadTracks();
        } else {
            showAlert('Falha ao salvar faixa.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}

async function deleteTrack(id) {
    const track = tracksData.find(x => x.id === id);
    if (!confirm(`Excluir "${track?.title}"?`)) return;
    try {
        const res = await fetch(`/api/discography/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        if (res.ok) {
            showAlert('Faixa excluída.', 'success');
            loadTracks();
        } else {
            showAlert('Falha ao excluir.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}
