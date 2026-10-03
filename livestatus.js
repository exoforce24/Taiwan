/* ========================================
   Live Trip Status: Day Counter, Today's Plan,
   Hero Route Progress
   ======================================== */

(function () {
    'use strict';

    const T = window.TRIP;
    const { esc } = window.TripApp;
    const TOTAL = T.days.length;

    // Today's date in Taiwan time (YYYY-MM-DD)
    function todayTW() {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' });
    }

    function currentDay() {
        const d = T.days.find(x => x.date === todayTW());
        return d ? d.day : null;
    }

    function update() {
        const today = todayTW();
        let day = currentDay();

        // Hero route progress
        let pct = 0;
        if (today > T.END) pct = 100;
        else if (day) pct = ((day - 1) / (TOTAL - 1)) * 100;
        document.getElementById('route-filled').style.width = pct + '%';
        document.getElementById('route-car').style.left = pct + '%';
        document.querySelectorAll('.route-stop').forEach(s => {
            s.classList.toggle('reached', day ? +s.dataset.day <= day : today > T.END);
        });

        const section = document.getElementById('live-status');
        if (!day) { section.hidden = true; return; }
        section.hidden = false;

        const d = T.days[day - 1];
        document.getElementById('live-day-num').textContent = day;
        document.getElementById('live-day-fill').style.width = (day / TOTAL) * 100 + '%';
        document.getElementById('live-today-title').textContent = d.title;
        document.getElementById('live-today-plan').innerHTML = d.plan
            .map(([when, what]) => `<li><strong>${esc(when)}</strong><span>${esc(what)}</span></li>`).join('');
        document.getElementById('live-today-link').href = '#day-' + day;

        // Auto-open today's card in the itinerary
        const card = document.getElementById('day-' + day);
        if (card && !card.dataset.autoOpened) {
            card.classList.add('open', 'today');
            card.dataset.autoOpened = '1';
        }
    }

    update();
    setInterval(update, 60000);
})();
