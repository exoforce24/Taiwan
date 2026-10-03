/* ========================================
   Extras: Live Weather, Currency Converter
   ======================================== */

(function () {
    'use strict';

    const T = window.TRIP;
    const { esc } = window.TripApp;

    // ===== WEATHER (Open-Meteo, no key needed) =====
    const codes = {
        0: ['☀️', 'Clear'], 1: ['🌤️', 'Mostly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁️', 'Overcast'],
        45: ['🌫️', 'Fog'], 48: ['🌫️', 'Fog'], 51: ['🌦️', 'Drizzle'], 53: ['🌦️', 'Drizzle'], 55: ['🌧️', 'Drizzle'],
        61: ['🌧️', 'Light rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy rain'], 80: ['🌦️', 'Showers'],
        81: ['🌧️', 'Showers'], 82: ['⛈️', 'Heavy showers'], 95: ['⛈️', 'Thunderstorm'],
    };

    const grid = document.getElementById('weather-grid');
    const entries = Object.entries(T.cities);
    grid.innerHTML = entries.map(([key, c]) =>
        `<div class="card weather-card" id="wx-${key}" style="--phase:${T.phases[key].color}">
            <div class="wx-city">${esc(c.name)}</div>
            <div class="wx-temp">--</div>
            <div class="wx-desc">Loading...</div>
        </div>`).join('');

    async function loadWeather() {
        const lat = entries.map(([, c]) => c.lat).join(',');
        const lon = entries.map(([, c]) => c.lon).join(',');
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=1&timezone=Asia%2FTaipei`);
            let data = await resp.json();
            if (!Array.isArray(data)) data = [data];
            data.forEach((w, i) => {
                const card = document.getElementById('wx-' + entries[i][0]);
                const [icon, desc] = codes[w.current.weather_code] || ['🌡️', ''];
                card.querySelector('.wx-temp').textContent = `${icon} ${Math.round(w.current.temperature_2m)}°`;
                card.querySelector('.wx-desc').textContent =
                    `${desc} · ${Math.round(w.daily.temperature_2m_min[0])}–${Math.round(w.daily.temperature_2m_max[0])}° · ☔ ${w.daily.precipitation_probability_max[0]}%`;
            });
        } catch {
            grid.querySelectorAll('.wx-desc').forEach(el => { el.textContent = 'Weather unavailable offline'; });
        }
    }
    loadWeather();

    // ===== CURRENCY (SGD <-> TWD) =====
    const RATE_KEY = 'taiwan-trip-rate';
    let rate = 24.5; // Fallback SGD to TWD
    try {
        const cached = JSON.parse(localStorage.getItem(RATE_KEY));
        if (cached && cached.rate) rate = cached.rate;
    } catch {}

    const sgd = document.getElementById('sgd-input');
    const twd = document.getElementById('twd-input');
    const rateEl = document.getElementById('currency-rate');

    function showRate(live) {
        rateEl.textContent = `1 SGD = ${rate.toFixed(2)} TWD  •  NT$100 = S$${(100 / rate).toFixed(2)}${live ? '' : '  (saved rate)'}`;
        twd.value = sgd.value ? (sgd.value * rate).toFixed(0) : '';
    }

    sgd.addEventListener('input', () => { twd.value = sgd.value ? (sgd.value * rate).toFixed(0) : ''; });
    twd.addEventListener('input', () => { sgd.value = twd.value ? (twd.value / rate).toFixed(2) : ''; });

    showRate(false);
    fetch('https://open.er-api.com/v6/latest/SGD')
        .then(r => r.json())
        .then(data => {
            if (data && data.rates && data.rates.TWD) {
                rate = data.rates.TWD;
                try { localStorage.setItem(RATE_KEY, JSON.stringify({ rate })); } catch {}
                showRate(true);
            }
        })
        .catch(() => {});
})();
