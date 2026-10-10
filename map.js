/* ========================================
   Taiwan Trip - Interactive Map
   ======================================== */

(function () {
    'use strict';

    if (typeof L === 'undefined') {
        document.getElementById('trip-map').innerHTML = '<p class="map-offline">Map needs a connection to load.</p>';
        return;
    }

    const T = window.TRIP;
    const { esc } = window.TripApp;
    const typeIcons = { stay: '🏨', activity: '📍', dining: '🍜', market: '🏮', transport: '🚄' };

    const map = L.map('trip-map', { scrollWheelZoom: false, dragging: !L.Browser.mobile }).setView([23.9, 120.9], 7);
    // Keyless tiles: OpenStreetMap first, Esri if OSM keeps failing
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);
    let tileErrors = 0;
    osm.on('tileerror', () => {
        if (++tileErrors !== 4) return;
        map.removeLayer(osm);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 19,
        }).addTo(map);
    });

    const layers = {};
    const route = [];

    T.days.forEach(d => {
        const color = T.phases[d.phase].color;
        if (!layers[d.phase]) layers[d.phase] = L.layerGroup().addTo(map);
        d.places.forEach(p => {
            const icon = L.divIcon({
                className: 'map-pin',
                html: `<span style="--phase:${color}">${typeIcons[p.type] || '📍'}</span>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
            });
            L.marker([p.lat, p.lng], { icon })
                .bindPopup(`<strong>${esc(p.name)}</strong><br><small>Day ${d.day} &middot; ${esc(window.TripApp.fmtDate(d.date))}</small><br>${esc(p.desc)}`)
                .addTo(layers[d.phase]);
            if (p.type === 'stay' || p.type === 'transport') route.push([p.lat, p.lng]);
        });
    });

    L.polyline(route, { color: '#d4a853', weight: 2, opacity: 0.6, dashArray: '6 6' }).addTo(map);

    // Phase filters
    const all = Object.values(layers);
    const filters = document.getElementById('map-filters');
    const phases = Object.keys(layers);
    filters.innerHTML = `<button class="map-filter active" data-phase="all">All</button>` +
        phases.map(p => `<button class="map-filter" data-phase="${p}" style="--phase:${T.phases[p].color}">${esc(T.phases[p].name)}</button>`).join('');

    filters.addEventListener('click', e => {
        const btn = e.target.closest('.map-filter');
        if (!btn) return;
        filters.querySelectorAll('.map-filter').forEach(b => b.classList.toggle('active', b === btn));
        const phase = btn.dataset.phase;
        all.forEach(l => map.removeLayer(l));
        if (phase === 'all') {
            all.forEach(l => l.addTo(map));
            map.setView([23.9, 120.9], 7);
        } else {
            layers[phase].addTo(map);
            const pts = T.days.filter(d => d.phase === phase).flatMap(d => d.places.map(p => [p.lat, p.lng]));
            map.fitBounds(pts, { padding: [30, 30], maxZoom: 13 });
        }
    });

    document.getElementById('map-legend').innerHTML = Object.entries(typeIcons)
        .map(([t, i]) => `<span>${i} ${t.charAt(0).toUpperCase() + t.slice(1)}</span>`).join('');
})();
