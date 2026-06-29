window.VideoPicker = (function () {

    function _extractId(url) {
        if (!url) return null;
        const s = url.trim();
        // youtu.be/ID
        let m = s.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
        if (m) return m[1];
        // ?v=ID ou &v=ID
        m = s.match(/[?&]v=([A-Za-z0-9_-]{11})/);
        if (m) return m[1];
        // /embed/ID
        m = s.match(/\/embed\/([A-Za-z0-9_-]{11})/);
        if (m) return m[1];
        // ID puro (11 chars)
        if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
        return null;
    }

    function _buildWidget(inputEl) {
        inputEl.style.display = 'none';

        const wrapper = document.createElement('div');
        inputEl.insertAdjacentElement('afterend', wrapper);

        // ── Campo de URL ──────────────────────────────────────────
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Cole a URL do YouTube (ex: youtube.com/watch?v=...)';
        urlInput.style.cssText = [
            'width:100%;border:1px solid #d1d5db;border-radius:8px;',
            'padding:8px 12px;font-size:.875rem;box-sizing:border-box;',
            'transition:border-color .2s,box-shadow .2s;'
        ].join('');
        urlInput.addEventListener('focus', () => {
            urlInput.style.borderColor = 'var(--brand-primary,#d88e45)';
            urlInput.style.boxShadow = '0 0 0 3px rgba(216,142,69,.2)';
            urlInput.style.outline = 'none';
        });
        urlInput.addEventListener('blur', () => {
            urlInput.style.borderColor = '#d1d5db';
            urlInput.style.boxShadow = '';
        });

        // ── Mensagem de erro ──────────────────────────────────────
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = 'display:none;margin-top:4px;color:#dc2626;font-size:.78rem;';
        errorMsg.textContent = '⚠ URL do YouTube inválida. Cole um link como youtube.com/watch?v=... ou youtu.be/...';

        // ── Preview ───────────────────────────────────────────────
        const previewWrap = document.createElement('div');
        previewWrap.style.cssText = 'display:none;margin-top:8px;border-radius:10px;overflow:hidden;position:relative;background:#000;';

        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'width:100%;aspect-ratio:16/9;border:0;display:block;';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.innerHTML = '<i class="fas fa-times"></i> Remover vídeo';
        removeBtn.style.cssText = [
            'margin-top:6px;background:#fef2f2;border:1px solid #fca5a5;',
            'color:#dc2626;border-radius:6px;padding:5px 12px;',
            'font-size:.8rem;font-weight:600;cursor:pointer;'
        ].join('');
        removeBtn.addEventListener('click', () => {
            inputEl.value = '';
            urlInput.value = '';
            inputEl.dispatchEvent(new Event('change'));
        });

        previewWrap.appendChild(iframe);
        wrapper.appendChild(urlInput);
        wrapper.appendChild(errorMsg);
        wrapper.appendChild(previewWrap);
        wrapper.appendChild(removeBtn);

        // ── Lógica central ────────────────────────────────────────
        function updateUI() {
            const val = inputEl.value.trim();
            const id = _extractId(val);
            if (val && id) {
                iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0';
                previewWrap.style.display = 'block';
                removeBtn.style.display = 'inline-block';
                errorMsg.style.display = 'none';
            } else {
                previewWrap.style.display = 'none';
                removeBtn.style.display = val ? 'inline-block' : 'none';
                errorMsg.style.display = val && !id ? 'block' : 'none';
                iframe.src = '';
            }
            if (!val) urlInput.value = '';
        }

        // Sync quando código externo altera .value
        inputEl.addEventListener('change', updateUI);

        // Digitação no campo visual → propaga pro input oculto
        urlInput.addEventListener('input', () => {
            inputEl.value = urlInput.value;
            inputEl.dispatchEvent(new Event('change'));
        });

        // Estado inicial
        if (inputEl.value) urlInput.value = inputEl.value;
        updateUI();
    }

    function init(inputId) {
        const el = document.getElementById(inputId);
        if (!el || el._videoPickerInit) return;
        el._videoPickerInit = true;
        _buildWidget(el);
    }

    function initElement(inputEl) {
        if (!inputEl || inputEl._videoPickerInit) return;
        inputEl._videoPickerInit = true;
        _buildWidget(inputEl);
    }

    return { init, initElement };
})();
