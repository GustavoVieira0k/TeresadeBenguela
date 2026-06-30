
(function () {
  function _esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _ytId(url) {
    if (!url) return null;
    const s = url.trim();
    let m = s.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    m = s.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    m = s.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    return null;
  }

  function _fmtDate(d) {
    if (!d) return '';
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return d; }
  }

  let allNews = [];

  function openModal(id) {
    const n = allNews.find(x => x.id === id);
    if (!n) return;
    const ytId = _ytId(n.videoUrl);
    const imgHtml = n.imageUrl && !ytId ? `<img src="${_esc(n.imageUrl)}" alt="${_esc(n.title)}" style="width:100%;max-height:280px;object-fit:cover;border-radius:1.5rem 1.5rem 0 0;display:block;">` : '';
    const videoHtml = ytId
      ? `<div style="position:relative;background:#000;border-radius:1.5rem 1.5rem 0 0;overflow:hidden;">
           <iframe src="https://www.youtube-nocookie.com/embed/${ytId}?rel=0&autoplay=1" style="width:100%;aspect-ratio:16/9;border:0;display:block;"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>` : '';
    const hasPad = imgHtml || videoHtml;
    document.getElementById('news-modal-body').innerHTML = `
      ${videoHtml}${imgHtml}
      <div style="padding:${hasPad ? '1.75rem 2rem 2rem' : '2rem'}">
        <p class="modal-date"><i class="fas fa-calendar-alt" style="margin-right:.4rem"></i>${_esc(_fmtDate(n.publishedAt))}</p>
        <h2>${_esc(n.title)}</h2>
        ${n.content ? `<p>${_esc(n.content)}</p>` : ''}
      </div>`;
    document.getElementById('news-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function _doClose() {
    const modal = document.getElementById('news-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    const iframe = modal.querySelector('iframe');
    if (iframe) iframe.src = '';
  }

  window.NewsManager = {
    async loadNews() {
      const container = document.getElementById('news-container');
      const section = document.getElementById('news-section');
      if (!container) return;

      try {
        const res = await fetch('https://teresadebenguela-13vo.onrender.com/api/news');
        if (!res.ok) throw new Error();
        allNews = await res.json();

        if (allNews.length === 0) {
          if (section) section.style.display = 'none';
          return;
        }

        container.innerHTML = allNews.map(n => {
          const ytId = _ytId(n.videoUrl);
          const thumbSrc = ytId
            ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
            : n.imageUrl;
          const playBadge = ytId
            ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
                <div style="width:52px;height:52px;background:rgba(0,0,0,.65);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                  <i class="fab fa-youtube" style="font-size:1.6rem;color:#ff0000;"></i>
                </div></div>` : '';
          const imgHtml = thumbSrc
            ? `<div style="position:relative;"><img src="${_esc(thumbSrc)}" alt="${_esc(n.title)}" class="news-card-img" onerror="this.parentElement.outerHTML='<div class=\\'news-card-img-placeholder\\'><i class=\\'fas fa-newspaper\\'></i></div>'">${playBadge}</div>`
            : `<div class="news-card-img-placeholder"><i class="fas fa-newspaper"></i></div>`;
          const hasDetail = n.content || _ytId(n.videoUrl);
          return `
            <div class="news-card-pub">
              ${imgHtml}
              <div class="news-card-body">
                <span class="news-date-badge"><i class="fas fa-calendar-alt"></i>${_esc(_fmtDate(n.publishedAt))}</span>
                <h3>${_esc(n.title)}</h3>
                <p>${_esc(n.summary || '')}</p>
                ${hasDetail ? `<button class="btn-read-more" onclick="window._newsOpenModal(${n.id})">Ler mais <i class="fas fa-arrow-right"></i></button>` : ''}
              </div>
            </div>`;
        }).join('');

        const modal = document.getElementById('news-modal');
        if (modal) {
          modal.addEventListener('click', e => {
            if (e.target === modal) _doClose();
          });
        }
      } catch {
        if (section) section.style.display = 'none';
      }
    }
  };

  window._newsOpenModal = openModal;

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') _doClose();
  });
})();
