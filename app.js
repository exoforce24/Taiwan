/* ========================================
   Taiwan Trip - App Logic
   Renders sections from data.js, countdown,
   checklist & notes persistence
   ======================================== */

(function () {
    'use strict';

    const T = window.TRIP;
    const CHECKLIST_KEY = 'taiwan-trip-checklist';
    const NOTES_KEY = 'taiwan-trip-notes';

    function esc(str) {
        return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function load(key) {
        try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
    }

    function save(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }

    function fmtDate(iso) {
        const d = new Date(iso + 'T12:00:00+08:00');
        return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Taipei' });
    }

    // ===== COUNTDOWN =====
    // Placeholder departure time until flights are booked (Singapore time)
    const DEPARTURE = new Date(T.START + 'T08:00:00+08:00');

    function updateCountdown() {
        const diff = DEPARTURE - new Date();
        const set = (id, v) => { document.getElementById(id).textContent = String(v).padStart(2, '0'); };

        if (diff <= 0) {
            document.getElementById('countdown-label').textContent = 'The adventure has begun!';
            ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => set(id, 0));
            return;
        }
        set('cd-days', Math.floor(diff / 86400000));
        set('cd-hours', Math.floor((diff / 3600000) % 24));
        set('cd-mins', Math.floor((diff / 60000) % 60));
        set('cd-secs', Math.floor((diff / 1000) % 60));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== CHECKLISTS =====
    document.querySelectorAll('.checklist[data-list]').forEach(el => {
        const list = T.checklists[el.dataset.list];
        if (!list) return;
        el.innerHTML = list.items.map(([id, text]) =>
            `<label class="check-item"><input type="checkbox" data-id="${esc(id)}"><span>${esc(text)}</span></label>`
        ).join('');
    });

    // Collapsible checklist sections with a done/total count in the title
    const COLLAPSE_KEY = 'taiwan-trip-collapsed';
    const collapsed = Object.assign({ predeparture: true, packing: true, souvenirs: true }, load(COLLAPSE_KEY));
    document.querySelectorAll('.checklist[data-list]').forEach(el => {
        const title = el.closest('.container').querySelector('.section-title');
        if (!title) return;
        const key = el.dataset.list;
        const section = el.closest('.section');
        title.classList.add('collapsible');
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.insertAdjacentHTML('beforeend', `<span class="list-count" data-count="${esc(key)}"></span><span class="chevron" aria-hidden="true">&#9662;</span>`);
        const apply = () => {
            section.classList.toggle('collapsed', !!collapsed[key]);
            title.setAttribute('aria-expanded', String(!collapsed[key]));
        };
        const toggle = () => {
            collapsed[key] = !collapsed[key];
            save(COLLAPSE_KEY, collapsed);
            apply();
        };
        title.addEventListener('click', toggle);
        title.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
        apply();
    });

    // ===== FLIGHTS =====
    document.getElementById('flight-grid').innerHTML = T.flights.map(f => `
        <div class="card flight-card">
            <div class="flight-label">${esc(f.label)} &middot; ${esc(f.date)}</div>
            <div class="flight-route">${esc(f.route)}</div>
            <p class="flight-detail">${esc(f.detail)}</p>
            <div class="day-notes"><textarea data-note="${esc(f.id)}" rows="2" placeholder="Flight no., times, booking ref..."></textarea></div>
        </div>`).join('');

    // ===== ITINERARY =====
    const phaseOrder = [];
    T.days.forEach(d => { if (!phaseOrder.includes(d.phase)) phaseOrder.push(d.phase); });

    document.getElementById('phase-chips').innerHTML = phaseOrder.map(p => {
        const first = T.days.find(d => d.phase === p);
        return `<a class="phase-chip" href="#day-${first.day}" style="--phase:${T.phases[p].color}">${esc(T.phases[p].name)}</a>`;
    }).join('');

    document.getElementById('days').innerHTML = T.days.map(d => `
        <article class="day-card" id="day-${d.day}" style="--phase:${T.phases[d.phase].color}">
            <button class="day-header" aria-expanded="false">
                <span class="day-num">Day ${d.day}</span>
                <span class="day-date">${esc(fmtDate(d.date))}</span>
                <span class="day-title">${esc(d.title)}</span>
                <span class="day-phase">${esc(T.phases[d.phase].name)}</span>
            </button>
            <div class="day-body">
                <ul class="plan-list">
                    ${d.plan.map(([when, what]) => `<li><strong>${esc(when)}</strong><span>${esc(what)}</span></li>`).join('')}
                </ul>
                <p class="day-stay">&#127976; ${esc(d.stay)}</p>
                ${d.places && d.places.length ? `<div class="day-places">${d.places.map(pl =>
                    `<a class="place-link" href="https://www.google.com/maps/search/?api=1&query=${pl.lat},${pl.lng}" target="_blank" rel="noopener">&#128205; ${esc(pl.name)}</a>`).join('')}</div>` : ''}
                <div class="day-notes"><textarea data-note="day-${d.day}" rows="2" placeholder="Notes for day ${d.day}..."></textarea></div>
            </div>
        </article>`).join('');

    document.querySelectorAll('.day-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.day-card');
            const open = card.classList.toggle('open');
            btn.setAttribute('aria-expanded', open);
        });
    });

    // Open a day when navigated to
    function openFromHash() {
        const m = location.hash.match(/^#day-(\d+)$/);
        if (!m) return;
        const card = document.getElementById('day-' + m[1]);
        if (card) {
            card.classList.add('open');
            card.querySelector('.day-header').setAttribute('aria-expanded', 'true');
        }
    }
    window.addEventListener('hashchange', openFromHash);
    openFromHash();

    // ===== NIGHT MARKETS =====
    document.querySelector('#nm-table tbody').innerHTML = T.nightMarkets.map(m =>
        `<tr><td>${esc(m.name)}</td><td>${esc(m.days)}</td><td>${esc(m.note)}</td></tr>`).join('');

    // ===== TIPS =====
    document.getElementById('tips-grid').innerHTML = T.tips.map(([icon, title, text]) =>
        `<div class="card tip-card"><div class="tip-icon">${icon}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`).join('');

    // ===== EMERGENCY =====
    document.getElementById('sos-grid').innerHTML = T.emergency.map(([icon, label, num]) =>
        `<a class="card sos-card" href="tel:${esc(num)}"><span class="sos-icon">${icon}</span><span class="sos-label">${esc(label)}</span><span class="sos-num">${esc(num)}</span></a>`).join('');

    // ===== ROUTE STOPS (hero) =====
    const stops = [];
    T.days.forEach(d => {
        if (!stops.length || stops[stops.length - 1].phase !== d.phase) stops.push({ phase: d.phase, day: d.day });
    });
    document.getElementById('route-stops').innerHTML = stops.map(s =>
        `<span class="route-stop" data-day="${s.day}" title="${esc(T.phases[s.phase].name)}">${esc(T.phases[s.phase].name)}</span>`).join('');

    // ===== CHECKLIST PERSISTENCE =====
    const checked = load(CHECKLIST_KEY);
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');

    function updateProgress() {
        const total = document.querySelectorAll('.check-item input[type="checkbox"]').length;
        const done = document.querySelectorAll('.check-item input[type="checkbox"]:checked').length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        document.getElementById('progress-bar').style.width = Math.max(pct, 2) + '%';
        document.getElementById('progress-text').textContent = pct + '%';
        document.getElementById('progress-detail').textContent = `${done} of ${total} items checked`;
        document.querySelectorAll('.list-count[data-count]').forEach(badge => {
            const list = document.querySelector(`.checklist[data-list="${badge.dataset.count}"]`);
            const n = list.querySelectorAll('input[type="checkbox"]').length;
            const d = list.querySelectorAll('input[type="checkbox"]:checked').length;
            badge.textContent = `${d}/${n}`;
            badge.classList.toggle('complete', n > 0 && d === n);
        });
    }

    checkboxes.forEach(cb => {
        if (checked[cb.dataset.id]) cb.checked = true;
        cb.addEventListener('change', () => {
            const items = load(CHECKLIST_KEY);
            if (cb.checked) items[cb.dataset.id] = true; else delete items[cb.dataset.id];
            save(CHECKLIST_KEY, items);
            updateProgress();
        });
    });
    updateProgress();

    // ===== NOTES PERSISTENCE =====
    const notes = load(NOTES_KEY);
    document.querySelectorAll('textarea[data-note]').forEach(ta => {
        ta.value = notes[ta.dataset.note] || '';
        ta.addEventListener('input', () => {
            const all = load(NOTES_KEY);
            const v = ta.value.trim();
            if (v) all[ta.dataset.note] = ta.value; else delete all[ta.dataset.note];
            save(NOTES_KEY, all);
        });
    });

    // ===== QUICK NAV: highlight the section in view =====
    const navLinks = [...document.querySelectorAll('.quick-nav a')];
    if ('IntersectionObserver' in window && navLinks.length) {
        const byId = new Map(navLinks.map(a => [a.getAttribute('href').slice(1), a]));
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                const link = byId.get(en.target.id);
                if (!link) return;
                navLinks.forEach(a => a.classList.toggle('active', a === link));
                // Only move the bar sideways; scrollIntoView here interrupts the page's own scrolling on phones
                const nav = link.parentElement;
                nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        byId.forEach((_, id) => { const sec = document.getElementById(id); if (sec) io.observe(sec); });
    }

    // Shared with sync.js and livestatus.js
    window.TripApp = { CHECKLIST_KEY, NOTES_KEY, updateProgress, fmtDate, esc };
})();
