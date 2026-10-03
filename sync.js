/* ========================================
   Firebase Real-Time Sync
   Syncs checklists & notes between devices
   ======================================== */

(function () {
    'use strict';

    const bar = document.getElementById('sync-bar');

    // Site works fully offline/local without sync
    if (typeof firebase === 'undefined' || !window.FIREBASE_CONFIG) {
        if (typeof firebase === 'undefined') console.warn('Firebase SDK not loaded — sync disabled');
        return;
    }

    // Trip code: shared only between the two of you, never stored in the repo.
    // Open the site once with #code=YOURCODE (or tap the sync bar) on each phone.
    const CODE_KEY = 'taiwan-trip-sync-code';

    function getCode() {
        const m = location.hash.match(/code=([^&]+)/);
        if (m) {
            const code = decodeURIComponent(m[1]).trim();
            try { localStorage.setItem(CODE_KEY, code); } catch {}
            history.replaceState(null, '', location.pathname + location.search);
            return code;
        }
        try { return localStorage.getItem(CODE_KEY); } catch { return null; }
    }

    function askForCode() {
        const code = (prompt('Enter your trip code to sync checklists & notes between phones:') || '').trim();
        if (code.length < 8) {
            if (code) alert('Use at least 8 characters.');
            return;
        }
        try { localStorage.setItem(CODE_KEY, code); } catch {}
        location.reload();
    }

    bar.hidden = false;
    const code = getCode();
    if (!code || !(window.crypto && crypto.subtle)) {
        document.getElementById('sync-icon').textContent = '🔒';
        document.getElementById('sync-text').textContent = 'Tap to enter trip code and sync between phones';
        bar.style.cursor = 'pointer';
        bar.addEventListener('click', askForCode);
        return;
    }

    // DB path is a SHA-256 of the code, so it can't be guessed from the site's source
    crypto.subtle.digest('SHA-256', new TextEncoder().encode('taiwan-2026:' + code)).then(buf => {
        const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
        start('trip_' + hex.slice(0, 40));
    });

    function start(DB_PATH) {
    try {

    firebase.initializeApp(window.FIREBASE_CONFIG);
    const db = firebase.database();

    const checklistRef = db.ref(DB_PATH + '/checklist');
    const notesRef = db.ref(DB_PATH + '/notes');

    const { CHECKLIST_KEY, NOTES_KEY, updateProgress } = window.TripApp;

    function load(key) {
        try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
    }
    function save(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }

    function updateSyncStatus(status, text) {
        const icon = document.getElementById('sync-icon');
        const textEl = document.getElementById('sync-text');
        const states = {
            connected: ['🟢', 'Synced across devices'],
            syncing:   ['🔄', 'Syncing...'],
            offline:   ['🔴', 'Offline — changes saved on this phone'],
        };
        const [i, t] = states[status] || ['🔄', 'Connecting...'];
        icon.textContent = i;
        textEl.textContent = text || t;
        bar.className = 'sync-bar' + (states[status] ? ' sync-' + status : '');
    }

    // ===== CHECKLIST =====
    let firstChecklist = true;
    checklistRef.on('value', snap => {
        const remote = snap.val() || {};
        let merged;
        if (firstChecklist) {
            // First load: keep anything ticked on this phone while offline
            const local = load(CHECKLIST_KEY);
            merged = { ...remote, ...local };
            const missing = {};
            Object.keys(local).forEach(k => { if (!remote[k]) missing[k] = true; });
            if (Object.keys(missing).length) checklistRef.update(missing);
            firstChecklist = false;
        } else {
            merged = remote;
        }
        save(CHECKLIST_KEY, merged);
        document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb => {
            cb.checked = !!merged[cb.dataset.id];
        });
        updateProgress();
        updateSyncStatus('connected');
    });

    document.addEventListener('change', e => {
        const cb = e.target;
        if (cb.type !== 'checkbox' || !cb.dataset.id) return;
        updateSyncStatus('syncing');
        if (cb.checked) checklistRef.child(cb.dataset.id).set(true);
        else checklistRef.child(cb.dataset.id).remove();
    });

    // ===== NOTES =====
    let firstNotes = true;
    notesRef.on('value', snap => {
        const remote = snap.val() || {};
        let merged;
        if (firstNotes) {
            const local = load(NOTES_KEY);
            merged = { ...local, ...remote };
            const missing = {};
            Object.keys(local).forEach(k => { if (!(k in remote)) missing[k] = local[k]; });
            if (Object.keys(missing).length) notesRef.update(missing);
            firstNotes = false;
        } else {
            merged = remote;
        }
        save(NOTES_KEY, merged);
        document.querySelectorAll('textarea[data-note]').forEach(ta => {
            const v = merged[ta.dataset.note] || '';
            // Don't clobber what someone is typing right now
            if (document.activeElement !== ta && ta.value !== v) ta.value = v;
        });
    });

    let notesTimer;
    document.addEventListener('input', e => {
        const ta = e.target;
        if (ta.tagName !== 'TEXTAREA' || !ta.dataset.note) return;
        clearTimeout(notesTimer);
        notesTimer = setTimeout(() => {
            updateSyncStatus('syncing');
            if (ta.value.trim()) notesRef.child(ta.dataset.note).set(ta.value);
            else notesRef.child(ta.dataset.note).remove();
        }, 800);
    });

    // ===== CONNECTION STATE =====
    db.ref('.info/connected').on('value', snap => {
        updateSyncStatus(snap.val() === true ? 'connected' : 'offline');
    });

    } catch (err) {
        console.warn('Firebase sync failed to initialize:', err);
        bar.hidden = true;
    }
    }
})();
