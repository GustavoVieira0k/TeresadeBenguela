const FIELDS = [
    'heroTitle', 'heroSubtitle', 'heroImageUrl',
    'aboutTitle', 'aboutDescription',
    'aboutItem1Icon', 'aboutItem1Title', 'aboutItem1Description',
    'aboutItem2Icon', 'aboutItem2Title', 'aboutItem2Description',
    'ctaTitle', 'ctaDescription',
    'ctaBullet1', 'ctaBullet2', 'ctaBullet3', 'ctaBullet4',
    'contactPhone', 'contactEmail',
    'locationCity', 'locationSubtitle', 'locationDistance',
    'locationCommunity', 'locationCommunityDetail'
];

document.addEventListener('DOMContentLoaded', () => {
    if (window.IconPicker) {
        IconPicker.init('aboutItem1Icon');
        IconPicker.init('aboutItem2Icon');
    }
    if (window.ImagePicker) {
        ImagePicker.init('heroImageUrl');
    }
    loadSettings();
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
});

async function loadSettings() {
    try {
        const res = await fetch('/api/site-settings');
        if (!res.ok) return;
        const data = await res.json();
        FIELDS.forEach(field => {
            const el = document.getElementById(field);
            if (el) {
                el.value = data[field] || '';
                el.dispatchEvent(new Event('change'));
            }
        });
    } catch (e) {
        console.error('Erro ao carregar configurações:', e);
    }
}

async function saveSettings(e) {
    e.preventDefault();
    const payload = {};
    FIELDS.forEach(field => {
        const el = document.getElementById(field);
        payload[field] = el ? el.value : '';
    });

    try {
        const res = await fetch('/api/site-settings', {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            showAlert('Configurações salvas com sucesso!', 'success');
        } else {
            showAlert('Falha ao salvar configurações.', 'error');
        }
    } catch (e) {
        console.error(e);
        showAlert('Erro de conexão ao salvar.', 'error');
    }
}
