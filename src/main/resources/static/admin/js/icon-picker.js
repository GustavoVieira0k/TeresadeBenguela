window.IconPicker = (function () {

    const ICONS = [
        // Pessoas e comunidade
        'fas fa-users', 'fas fa-user', 'fas fa-user-circle', 'fas fa-user-friends',
        'fas fa-user-tie', 'fas fa-user-graduate', 'fas fa-user-md', 'fas fa-baby',
        'fas fa-child', 'fas fa-people-carry', 'fas fa-handshake', 'fas fa-hands-helping',
        'fas fa-hand-holding-heart', 'fas fa-hand-holding-usd', 'fas fa-hands',
        'fas fa-fist-raised', 'fas fa-thumbs-up', 'fas fa-hand-paper', 'fas fa-hand-peace',
        'fas fa-praying-hands', 'fas fa-peace',
        // Cultura e arte
        'fas fa-music', 'fas fa-guitar', 'fas fa-drum', 'fas fa-paint-brush',
        'fas fa-palette', 'fas fa-theater-masks', 'fas fa-film', 'fas fa-camera',
        'fas fa-camera-retro', 'fas fa-feather', 'fas fa-feather-alt', 'fas fa-scroll',
        'fas fa-book', 'fas fa-book-open', 'fas fa-newspaper', 'fas fa-photo-video',
        'fas fa-record-vinyl', 'fas fa-compact-disc', 'fas fa-microphone',
        'fas fa-headphones', 'fas fa-volume-up', 'fas fa-play', 'fas fa-image',
        'fas fa-images', 'fas fa-video',
        // Educação
        'fas fa-graduation-cap', 'fas fa-school', 'fas fa-chalkboard',
        'fas fa-chalkboard-teacher', 'fas fa-pencil-alt', 'fas fa-pen', 'fas fa-pen-alt',
        'fas fa-pencil-ruler', 'fas fa-ruler', 'fas fa-calculator',
        // Natureza
        'fas fa-tree', 'fas fa-leaf', 'fas fa-seedling', 'fas fa-sun', 'fas fa-moon',
        'fas fa-cloud', 'fas fa-mountain', 'fas fa-water', 'fas fa-wind',
        'fas fa-snowflake', 'fas fa-fire', 'fas fa-rainbow', 'fas fa-cloud-sun',
        'fas fa-cloud-rain', 'fas fa-umbrella', 'fas fa-globe-americas', 'fas fa-globe',
        // Localização e construção
        'fas fa-map-marker-alt', 'fas fa-map', 'fas fa-compass', 'fas fa-route',
        'fas fa-road', 'fas fa-building', 'fas fa-landmark', 'fas fa-university',
        'fas fa-church', 'fas fa-home', 'fas fa-city', 'fas fa-monument',
        'fas fa-archway', 'fas fa-place-of-worship', 'fas fa-store', 'fas fa-warehouse',
        // Saúde e bem-estar
        'fas fa-heart', 'fas fa-heartbeat', 'fas fa-hospital', 'fas fa-medkit',
        'fas fa-cross', 'fas fa-plus', 'fas fa-spa', 'fas fa-smile', 'fas fa-laugh',
        // Conquistas e destaque
        'fas fa-star', 'fas fa-star-half-alt', 'fas fa-crown', 'fas fa-trophy',
        'fas fa-award', 'fas fa-medal', 'fas fa-certificate', 'fas fa-gem',
        'fas fa-bolt', 'fas fa-rocket', 'fas fa-magic', 'fas fa-flag',
        // Comunicação
        'fas fa-phone', 'fas fa-envelope', 'fas fa-comment', 'fas fa-comments',
        'fas fa-bullhorn', 'fas fa-broadcast-tower', 'fas fa-satellite-dish',
        'fas fa-at', 'fas fa-share-alt', 'fas fa-rss', 'fas fa-wifi',
        // Ações e interface
        'fas fa-check-circle', 'fas fa-info-circle', 'fas fa-question-circle',
        'fas fa-exclamation-circle', 'fas fa-arrow-right', 'fas fa-arrow-left',
        'fas fa-arrow-up', 'fas fa-arrow-down', 'fas fa-external-link-alt',
        'fas fa-search', 'fas fa-filter', 'fas fa-sort', 'fas fa-cog', 'fas fa-tools',
        'fas fa-wrench', 'fas fa-hammer', 'fas fa-hard-hat', 'fas fa-tractor',
        // Finanças e organização
        'fas fa-coins', 'fas fa-dollar-sign', 'fas fa-piggy-bank', 'fas fa-wallet',
        'fas fa-chart-bar', 'fas fa-chart-line', 'fas fa-chart-pie',
        'fas fa-tasks', 'fas fa-project-diagram', 'fas fa-sitemap', 'fas fa-calendar',
        'fas fa-clock', 'fas fa-list', 'fas fa-list-ul', 'fas fa-th',
        // Religioso e simbólico
        'fas fa-yin-yang', 'fas fa-ankh', 'fas fa-om', 'fas fa-star-of-david',
        'fas fa-menorah', 'fas fa-khanda', 'fas fa-mosque', 'fas fa-synagogue',
        // Esportes e atividade
        'fas fa-running', 'fas fa-walking', 'fas fa-bicycle', 'fas fa-dumbbell',
        'fas fa-swimmer', 'fas fa-hiking', 'fas fa-football-ball', 'fas fa-basketball-ball',
        // Animais e terra
        'fas fa-dove', 'fas fa-paw', 'fas fa-horse', 'fas fa-dog', 'fas fa-cat',
        'fas fa-fish', 'fas fa-frog', 'fas fa-dragon',
        // Utilidades diversas
        'fas fa-gift', 'fas fa-tag', 'fas fa-tags', 'fas fa-bell', 'fas fa-shield-alt',
        'fas fa-lock', 'fas fa-key', 'fas fa-lightbulb', 'fas fa-flask',
        'fas fa-microscope', 'fas fa-atom', 'fas fa-dna', 'fas fa-recycle',
        'fas fa-solar-panel', 'fas fa-plug', 'fas fa-battery-full',
        'fas fa-laptop', 'fas fa-mobile-alt', 'fas fa-desktop', 'fas fa-server',
        'fas fa-database', 'fas fa-code', 'fas fa-bug',
        'fas fa-suitcase', 'fas fa-plane', 'fas fa-bus', 'fas fa-car', 'fas fa-train',
        'fas fa-hat-cowboy', 'fas fa-glasses', 'fas fa-tshirt', 'fas fa-ring',
        'fas fa-bed', 'fas fa-couch', 'fas fa-utensils', 'fas fa-coffee',
        'fas fa-apple-alt', 'fas fa-carrot', 'fas fa-bread-slice',
        'fas fa-id-card', 'fas fa-passport', 'fas fa-fingerprint',
        'fas fa-paperclip', 'fas fa-link', 'fas fa-file', 'fas fa-file-alt',
        'fas fa-folder', 'fas fa-clipboard', 'fas fa-print', 'fas fa-eye',
        'fas fa-quote-left', 'fas fa-paragraph', 'fas fa-align-left',
        'fas fa-bold', 'fas fa-italic', 'fas fa-list-ol',
        'fas fa-ellipsis-h', 'fas fa-bars', 'fas fa-grip-horizontal',
        'fas fa-redo', 'fas fa-sync', 'fas fa-expand', 'fas fa-compress',
        'fas fa-cut', 'fas fa-copy', 'fas fa-paste',
    ];

    let _modal = null;
    let _searchInput = null;
    let _iconGrid = null;
    let _currentInput = null;

    function _ensureModal() {
        if (_modal) return;

        _modal = document.createElement('div');
        _modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.55);align-items:center;justify-content:center;';
        _modal.addEventListener('click', function (e) { if (e.target === _modal) _close(); });

        const card = document.createElement('div');
        card.style.cssText = 'background:#fff;border-radius:14px;padding:20px;width:580px;max-width:96vw;max-height:82vh;display:flex;flex-direction:column;gap:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3);';

        const header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';
        const title = document.createElement('h3');
        title.textContent = 'Selecionar Ícone';
        title.style.cssText = 'font-weight:700;font-size:1rem;color:#111827;margin:0;';
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:1.1rem;color:#6b7280;padding:4px 8px;border-radius:6px;transition:background .15s;';
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = '#f3f4f6');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'none');
        closeBtn.addEventListener('click', _close);
        header.appendChild(title);
        header.appendChild(closeBtn);

        _searchInput = document.createElement('input');
        _searchInput.type = 'text';
        _searchInput.placeholder = 'Buscar ícone… ex: heart, users, music, tree';
        _searchInput.style.cssText = 'border:1px solid #d1d5db;border-radius:8px;padding:9px 13px;font-size:0.875rem;width:100%;box-sizing:border-box;outline:none;transition:border-color .15s;';
        _searchInput.addEventListener('focus', () => _searchInput.style.borderColor = '#3b82f6');
        _searchInput.addEventListener('blur', () => _searchInput.style.borderColor = '#d1d5db');
        _searchInput.addEventListener('input', () => _renderGrid(_searchInput.value));

        const gridWrapper = document.createElement('div');
        gridWrapper.style.cssText = 'overflow-y:auto;flex:1;padding-right:4px;';

        _iconGrid = document.createElement('div');
        _iconGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px;';
        gridWrapper.appendChild(_iconGrid);

        const hint = document.createElement('p');
        hint.textContent = 'Clique no ícone para selecionar';
        hint.style.cssText = 'font-size:0.72rem;color:#9ca3af;margin:0;padding-top:4px;';

        card.appendChild(header);
        card.appendChild(_searchInput);
        card.appendChild(gridWrapper);
        card.appendChild(hint);
        _modal.appendChild(card);
        document.body.appendChild(_modal);
    }

    function _renderGrid(filter) {
        const term = (filter || '').toLowerCase().replace(/fas fa-/, '').trim();
        const list = term
            ? ICONS.filter(ic => ic.replace('fas fa-', '').replace(/-/g, ' ').includes(term))
            : ICONS;

        _iconGrid.innerHTML = '';

        if (list.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'Nenhum ícone encontrado.';
            empty.style.cssText = 'grid-column:1/-1;color:#9ca3af;font-size:0.875rem;padding:12px 0;';
            _iconGrid.appendChild(empty);
            return;
        }

        list.forEach(iconClass => {
            const cell = document.createElement('button');
            cell.type = 'button';
            cell.title = iconClass;
            cell.style.cssText = [
                'display:flex;flex-direction:column;align-items:center;gap:5px;',
                'padding:10px 4px 8px;border:1.5px solid #e5e7eb;border-radius:9px;',
                'background:#fff;cursor:pointer;font-size:0.6rem;color:#374151;',
                'word-break:break-all;transition:all 0.12s;line-height:1.3;'
            ].join('');
            cell.innerHTML = `<i class="${iconClass}" style="font-size:1.4rem;color:#4b5563;"></i><span>${iconClass.replace('fas fa-', '')}</span>`;

            cell.addEventListener('mouseenter', () => {
                cell.style.background = '#eff6ff';
                cell.style.borderColor = '#3b82f6';
                cell.querySelector('i').style.color = '#2563eb';
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.background = '#fff';
                cell.style.borderColor = '#e5e7eb';
                cell.querySelector('i').style.color = '#4b5563';
            });
            cell.addEventListener('click', () => _selectIcon(iconClass));
            _iconGrid.appendChild(cell);
        });
    }

    function _open(inputEl) {
        _ensureModal();
        _currentInput = inputEl;
        _searchInput.value = '';
        _renderGrid('');
        _modal.style.display = 'flex';
        setTimeout(() => _searchInput.focus(), 60);
    }

    function _close() {
        if (_modal) _modal.style.display = 'none';
        _currentInput = null;
    }

    function _selectIcon(iconClass) {
        if (_currentInput) {
            _currentInput.value = iconClass;
            _currentInput.dispatchEvent(new Event('change'));
        }
        _close();
    }

    function _buildWidget(inputEl) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:inline-flex;align-items:center;gap:6px;width:100%;';

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.style.cssText = [
            'display:flex;align-items:center;gap:8px;',
            'padding:7px 12px;border:1px solid #d1d5db;border-radius:6px;',
            'background:#fff;cursor:pointer;font-size:0.875rem;color:#374151;',
            'width:100%;text-align:left;transition:border-color .15s,background .15s;'
        ].join('');
        trigger.addEventListener('mouseenter', () => { trigger.style.background = '#f9fafb'; trigger.style.borderColor = '#9ca3af'; });
        trigger.addEventListener('mouseleave', () => { trigger.style.background = '#fff'; trigger.style.borderColor = '#d1d5db'; });

        function updateTrigger() {
            const val = inputEl.value;
            if (val) {
                trigger.innerHTML = `<i class="${val}" style="font-size:1.15rem;width:22px;text-align:center;flex-shrink:0;color:#374151;"></i><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${val}</span><i class="fas fa-chevron-down" style="font-size:0.65rem;color:#9ca3af;flex-shrink:0;"></i>`;
            } else {
                trigger.innerHTML = `<i class="fas fa-icons" style="font-size:1.15rem;width:22px;text-align:center;flex-shrink:0;color:#d1d5db;"></i><span style="flex:1;color:#9ca3af;">Selecionar ícone…</span><i class="fas fa-chevron-down" style="font-size:0.65rem;color:#9ca3af;flex-shrink:0;"></i>`;
            }
        }

        updateTrigger();
        inputEl.addEventListener('change', updateTrigger);
        trigger.addEventListener('click', () => _open(inputEl));

        inputEl.parentNode.insertBefore(wrapper, inputEl);
        wrapper.appendChild(inputEl);
        wrapper.appendChild(trigger);
        inputEl.style.display = 'none';
    }

    function init(inputId) {
        const el = document.getElementById(inputId);
        if (!el || el._iconPickerInit) return;
        el._iconPickerInit = true;
        _buildWidget(el);
    }

    function initElement(inputEl) {
        if (!inputEl || inputEl._iconPickerInit) return;
        inputEl._iconPickerInit = true;
        _buildWidget(inputEl);
    }

    return { init, initElement };
})();
