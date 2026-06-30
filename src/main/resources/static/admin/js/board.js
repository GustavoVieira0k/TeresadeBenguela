document.addEventListener('DOMContentLoaded', () => {
    loadBoardMembers();
    document.getElementById('new-member-form').addEventListener('submit', createMember);
});

async function loadBoardMembers() {
    const container = document.getElementById('board-container');
    const template = document.getElementById('board-member-template');

    try {
        // CORREÇÃO: URL do Render
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/board');
        const members = await res.json();
        container.innerHTML = '';

        members.forEach(member => {
            const clone = Array.from(template.content.cloneNode(true).children);
            const el = clone.find(el => el.classList.contains('bg-gray-50'));
            el.querySelector('.member-role-title').textContent = member.role;
            el.querySelector('.member-id').value = member.id;
            el.querySelector('.member-role').value = member.role;
            el.querySelector('.member-name').value = member.name;
            el.querySelector('.member-delete-btn').setAttribute('onclick', `deleteMember(${member.id}, '${member.name.replace(/'/g, "\\'")}')`);
            container.appendChild(el);
        });
    } catch (e) {
        container.innerHTML = '<p class="text-red-500">Erro ao carregar dados do servidor.</p>';
    }
}

async function updateMember(event, form) {
    event.preventDefault();
    const id = form.querySelector('.member-id').value;
    const role = form.querySelector('.member-role').value;
    const name = form.querySelector('.member-name').value;

    try {
        // CORREÇÃO: URL do Render
        const res = await fetch(`https://teresadebenguela-13vo.onrender.com/api/board/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ role, name })
        });
        if (res.ok) {
            showAlert('Membro atualizado com sucesso!');
            loadBoardMembers();
        } else {
            showAlert('Erro ao atualizar membro.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}

async function createMember(e) {
    e.preventDefault();
    const role = document.getElementById('new-role').value.trim();
    const name = document.getElementById('new-name').value.trim();
    if (!role || !name) return;

    try {
        // CORREÇÃO: URL do Render
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/board', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ role, name })
        });
        if (res.ok) {
            showAlert('Membro adicionado com sucesso!');
            document.getElementById('new-member-form').reset();
            loadBoardMembers();
        } else {
            showAlert('Erro ao adicionar membro.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}

async function deleteMember(id, name) {
    if (!confirm(`Excluir o membro "${name}"?`)) return;
    try {
        // CORREÇÃO: URL do Render
        const res = await fetch(`https://teresadebenguela-13vo.onrender.com/api/board/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        if (res.ok) {
            showAlert('Membro excluído.', 'success');
            loadBoardMembers();
        } else {
            showAlert('Erro ao excluir membro.', 'error');
        }
    } catch (e) {
        showAlert('Erro de conexão.', 'error');
    }
}