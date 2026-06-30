window.ImagePicker = (function () {

    function _buildWidget(inputEl) {
        // Oculta o input original no lugar — não o move
        inputEl.style.display = 'none';

        // Wrapper inserido logo após o input
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:100%;';
        inputEl.insertAdjacentElement('afterend', wrapper);

        // Input de arquivo — escondido, fora do fluxo de formulário
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg,image/png,image/gif,image/webp';
        fileInput.style.cssText = 'display:none;position:absolute;';
        wrapper.appendChild(fileInput);

        // ── Zona principal ────────────────────────────────────────
        const zone = document.createElement('div');
        zone.style.cssText = [
            'width:100%;border:2px dashed #d1d5db;border-radius:10px;',
            'min-height:128px;cursor:pointer;position:relative;',
            'background:#fafafa;transition:border-color .2s,background .2s;',
            'overflow:hidden;'
        ].join('');

        zone.addEventListener('mouseenter', () => {
            if (!zone._loading) zone.style.borderColor = 'var(--brand-primary,#d88e45)';
        });
        zone.addEventListener('mouseleave', () => {
            if (!zone._loading) zone.style.borderColor = '#d1d5db';
        });
        zone.addEventListener('click', () => {
            if (!zone._loading) fileInput.click();
        });

        // ── Estado vazio ──────────────────────────────────────────
        const emptyState = document.createElement('div');
        emptyState.style.cssText = [
            'display:flex;flex-direction:column;align-items:center;',
            'justify-content:center;gap:8px;padding:28px 16px;',
            'color:#9ca3af;text-align:center;min-height:128px;'
        ].join('');
        emptyState.innerHTML = [
            '<i class="fas fa-image" style="font-size:2.2rem;color:#d1d5db;"></i>',
            '<span style="font-size:.875rem;font-weight:500;">Clique para selecionar imagem</span>',
            '<span style="font-size:.75rem;">JPG, PNG, GIF ou WEBP — até 10MB</span>'
        ].join('');

        // ── Estado com preview ────────────────────────────────────
        const previewState = document.createElement('div');
        previewState.style.cssText = 'display:none;position:relative;';

        const previewImg = document.createElement('img');
        previewImg.alt = 'Preview';
        previewImg.style.cssText = 'width:100%;max-height:240px;object-fit:cover;display:block;';
        previewImg.addEventListener('error', () => {
            previewImg.style.display = 'none';
            brokenMsg.style.display = 'flex';
        });
        previewImg.addEventListener('load', () => {
            previewImg.style.display = 'block';
            brokenMsg.style.display = 'none';
        });

        const brokenMsg = document.createElement('div');
        brokenMsg.style.cssText = [
            'display:none;align-items:center;justify-content:center;',
            'gap:8px;padding:28px;background:#f9fafb;color:#6b7280;font-size:.8rem;min-height:100px;'
        ].join('');
        brokenMsg.innerHTML = '<i class="fas fa-image-slash" style="font-size:1.5rem;color:#d1d5db;"></i><span>Imagem não encontrada (caminho inválido)</span>';

        const overlay = document.createElement('div');
        overlay.style.cssText = [
            'position:absolute;bottom:0;left:0;right:0;',
            'background:linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 100%);',
            'padding:12px;display:flex;gap:8px;justify-content:flex-end;',
            'pointer-events:none;'
        ].join('');

        const changeBtn = _btn(
            '<i class="fas fa-sync-alt"></i> Alterar',
            'rgba(255,255,255,.92)', '#374151'
        );
        changeBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });

        const removeBtn = _btn(
            '<i class="fas fa-times"></i> Remover',
            'rgba(220,38,38,.88)', '#fff'
        );
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            inputEl.value = '';
            inputEl.dispatchEvent(new Event('change'));
        });

        overlay.appendChild(changeBtn);
        overlay.appendChild(removeBtn);

        previewState.appendChild(previewImg);
        previewState.appendChild(brokenMsg);
        previewState.appendChild(overlay);

        // ── Estado de loading ─────────────────────────────────────
        const loadingState = document.createElement('div');
        loadingState.style.cssText = [
            'display:none;flex-direction:column;align-items:center;',
            'justify-content:center;gap:10px;padding:28px 16px;',
            'color:#6b7280;text-align:center;min-height:128px;'
        ].join('');
        loadingState.innerHTML = [
            '<i class="fas fa-spinner fa-spin" style="font-size:1.8rem;color:var(--brand-primary,#d88e45);"></i>',
            '<span style="font-size:.875rem;">Enviando imagem…</span>'
        ].join('');

        zone.appendChild(emptyState);
        zone.appendChild(previewState);
        zone.appendChild(loadingState);

        // ── Mensagem de erro (fora da zone) ───────────────────────
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = [
            'display:none;margin-top:6px;padding:8px 12px;',
            'background:#fef2f2;border:1px solid #fca5a5;',
            'border-radius:8px;color:#dc2626;font-size:.8rem;'
        ].join('');

        wrapper.appendChild(zone);
        wrapper.appendChild(errorMsg);

        // ── Lógica central de atualização ─────────────────────────
        function updateUI() {
            const val = inputEl.value.trim();
            if (val) {
                previewImg.src = val;
                brokenMsg.style.display = 'none';
                previewState.style.display = 'block';
                emptyState.style.display = 'none';
            } else {
                previewState.style.display = 'none';
                emptyState.style.display = 'flex';
                previewImg.src = '';
            }
            loadingState.style.display = 'none';
            errorMsg.style.display = 'none';
            zone._loading = false;
            zone.style.cursor = 'pointer';
            zone.style.borderColor = '#d1d5db';
        }

        // Sincroniza quando código externo altera .value + dispatchEvent('change')
        inputEl.addEventListener('change', updateUI);

        // Seta estado inicial
        updateUI();

        // ── Upload ────────────────────────────────────────────────
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file) return;
            fileInput.value = '';

            zone._loading = true;
            emptyState.style.display = 'none';
            previewState.style.display = 'none';
            loadingState.style.display = 'flex';
            errorMsg.style.display = 'none';
            zone.style.cursor = 'default';
            zone.style.borderColor = 'var(--brand-primary,#d88e45)';

            try {
                const headers = {};
                if (window.getAuthHeaders) {
                    const h = getAuthHeaders();
                    if (h.Authorization) headers.Authorization = h.Authorization;
                }

                const formData = new FormData();
                formData.append('file', file);

                // CORREÇÃO: URL absoluta apontando para a sua API no Render
                const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/upload', {
                    method: 'POST',
                    headers,
                    body: formData
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Erro no servidor');

                inputEl.value = data.url;
                inputEl.dispatchEvent(new Event('change')); // chama updateUI()

            } catch (err) {
                errorMsg.textContent = '⚠ ' + (err.message || 'Falha ao enviar. Tente novamente.');
                errorMsg.style.display = 'block';
                updateUI(); // restaura estado anterior
            }
        });
    }

    function _btn(html, bg, color) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = html;
        btn.style.cssText = [
            `background:${bg};color:${color};border:none;`,
            'border-radius:6px;padding:5px 11px;font-size:.8rem;font-weight:600;',
            'cursor:pointer;pointer-events:auto;transition:opacity .15s;gap:5px;',
            'display:inline-flex;align-items:center;'
        ].join('');
        btn.addEventListener('mouseenter', () => btn.style.opacity = '.85');
        btn.addEventListener('mouseleave', () => btn.style.opacity = '1');
        return btn;
    }

    function init(inputId) {
        const el = document.getElementById(inputId);
        if (!el || el._imagePickerInit) return;
        el._imagePickerInit = true;
        _buildWidget(el);
    }

    function initElement(inputEl) {
        if (!inputEl || inputEl._imagePickerInit) return;
        inputEl._imagePickerInit = true;
        _buildWidget(inputEl);
    }

    return { init, initElement };
})();