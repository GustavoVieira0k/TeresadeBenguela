document.addEventListener('DOMContentLoaded', () => {
    if (window.IconPicker) {
        [0, 1, 2, 3].forEach(i => IconPicker.init(`benefit-icon-${i}`));
    }
    loadVolunteerContent();
    loadVolunteers();
    document.getElementById('volunteer-form').addEventListener('submit', updateVolunteerContent);
    initMsgModal();
});

async function loadVolunteerContent() {
    try {
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/volunteer/page');
        if (!res.ok) return;
        const data = await res.json();
        document.getElementById('v-title1').value = data.title1 || '';
        document.getElementById('v-title2').value = data.title2 || '';
        document.getElementById('v-description').value = data.description || '';

        const benefits = data.benefits || [];
        for (let i = 0; i < 4; i++) {
            const b = benefits[i] || {};
            const iconEl = document.getElementById(`benefit-icon-${i}`);
            iconEl.value = b.icon || '';
            iconEl.dispatchEvent(new Event('change'));
            document.getElementById(`benefit-title-${i}`).value = b.title || '';
            document.getElementById(`benefit-description-${i}`).value = b.description || '';
        }
    } catch (e) {
        console.error('Erro ao carregar conteúdo de voluntários:', e);
        showAlert('Erro ao ler do banco.', 'error');
    }
}

async function updateVolunteerContent(e) {
    e.preventDefault();

    const benefits = [];
    for (let i = 0; i < 4; i++) {
        benefits.push({
            icon: document.getElementById(`benefit-icon-${i}`).value,
            title: document.getElementById(`benefit-title-${i}`).value,
            description: document.getElementById(`benefit-description-${i}`).value
        });
    }

    const payload = {
        title1: document.getElementById('v-title1').value,
        title2: document.getElementById('v-title2').value,
        description: document.getElementById('v-description').value,
        benefits
    };

    try {
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/volunteer/page', {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            showAlert('Página de Voluntários atualizada com sucesso!', 'success');
        } else {
            showAlert('Falha ao atualizar textos.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão ao salvar.', 'error');
    }
}

async function loadVolunteers() {
    try {
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/volunteers', { headers: getAuthHeaders() });
        if (!res.ok) throw new Error();
        const volunteers = await res.json();
        const container = document.getElementById('volunteers-list');
        container.innerHTML = '';

        if (volunteers.length === 0) {
            container.innerHTML = '<p class="text-gray-500">Nenhum voluntário cadastrado.</p>';
            return;
        }

        volunteers.forEach(v => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100';
            row.dataset.id = v.id;
            row.innerHTML = `
                <td class="py-2 px-3 text-sm text-gray-900">${escapeHtml(v.name)}</td>
                <td class="py-2 px-3 text-sm text-gray-600">${escapeHtml(v.email)}</td>
                <td class="py-2 px-3 text-sm text-gray-600">${escapeHtml(v.phone || '—')}</td>
                <td class="py-2 px-3 text-sm text-gray-500">${escapeHtml(v.age || '—')}</td>
                <td class="py-2 px-3 flex items-center gap-2">
                    <button class="btn-ver-msg inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                        data-name="${escapeHtml(v.name)}" data-msg="${escapeHtml(v.motivation || '')}">
                        <i class="fas fa-envelope"></i> Ver mensagem
                    </button>
                    <button class="btn-excluir inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                        data-id="${v.id}" data-name="${escapeHtml(v.name)}">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </td>
            `;
            container.appendChild(row);
        });

        container.addEventListener('click', e => {
            const btnMsg = e.target.closest('.btn-ver-msg');
            if (btnMsg) openMsgModal(btnMsg.dataset.name, btnMsg.dataset.msg);

            const btnDel = e.target.closest('.btn-excluir');
            if (btnDel) deleteVolunteer(btnDel.dataset.id, btnDel.dataset.name);
        });
    } catch (e) {
        document.getElementById('volunteers-list').innerHTML =
            '<tr><td colspan="5" class="text-red-500 p-3">Erro ao carregar voluntários.</td></tr>';
    }
}

function initMsgModal() {
    const modal = document.getElementById('msg-modal');
    const close = () => modal.classList.add('hidden');
    document.getElementById('msg-modal-close').addEventListener('click', close);
    document.getElementById('msg-modal-ok').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
}

function openMsgModal(name, msg) {
    document.getElementById('msg-modal-name').textContent = name;
    document.getElementById('msg-modal-body').textContent = msg || '(sem mensagem)';
    document.getElementById('msg-modal').classList.remove('hidden');
}

async function deleteVolunteer(id, name) {
    if (!confirm(`Excluir a candidatura de "${name}"? Esta ação não pode ser desfeita.`)) return;
    try {
        const res = await fetch(`https://teresadebenguela-13vo.onrender.com/api/volunteers/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (res.ok) {
            showAlert(`Candidatura de "${name}" excluída.`, 'success');
            const row = document.querySelector(`#volunteers-list tr[data-id="${id}"]`);
            if (row) row.remove();
        } else {
            showAlert('Falha ao excluir candidatura.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão ao excluir.', 'error');
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}