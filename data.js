/* ========================================
   Taiwan Trip - Trip Data
   Edit this file to change the plan; every
   section of the site renders from it.
   ======================================== */

window.TRIP = (function () {
    'use strict';

    // Taiwan is UTC+8, same as Singapore
    const START = '2026-10-30';
    const END = '2026-11-09';

    const phases = {
        taipei:    { name: 'Taipei',    color: '#e53950' },
        taichung:  { name: 'Taichung',  color: '#f5a623' },
        alishan:   { name: 'Alishan',   color: '#4caf50' },
        tainan:    { name: 'Tainan',    color: '#ff7043' },
        kaohsiung: { name: 'Kaohsiung', color: '#00bcd4' },
        flight:    { name: 'Home',      color: '#42a5f5' },
    };

    // Weather lookup per base
    const cities = {
        taipei:    { lat: 25.04, lon: 121.56, name: 'Taipei' },
        taichung:  { lat: 24.15, lon: 120.67, name: 'Taichung' },
        alishan:   { lat: 23.51, lon: 120.80, name: 'Alishan' },
        tainan:    { lat: 22.99, lon: 120.20, name: 'Tainan' },
        kaohsiung: { lat: 22.63, lon: 120.30, name: 'Kaohsiung' },
    };

    // type: stay | activity | dining | market | transport
    const days = [
        {
            day: 1, date: '2026-10-30', phase: 'taipei', title: 'Arrive in Taipei',
            stay: 'Taipei hotel (to book) — near Taipei Main or Zhongshan MRT',
            plan: [
                ['Arrive', 'Land at Taoyuan (TPE). Buy a SIM/eSIM and an EasyCard at arrivals.'],
                ['Transfer', 'Airport MRT express to Taipei Main Station (~40 min).'],
                ['Evening', 'Stroll Ximending, then dinner at Raohe Night Market (pepper buns at the gate).'],
            ],
            places: [
                { name: 'Taoyuan Airport (TPE)', lat: 25.0797, lng: 121.2342, type: 'transport', desc: 'Arrival from Singapore' },
                { name: 'Taipei Main Station', lat: 25.0478, lng: 121.5170, type: 'stay', desc: 'Base for 4 nights' },
                { name: 'Ximending', lat: 25.0421, lng: 121.5081, type: 'activity', desc: 'Evening stroll' },
                { name: 'Raohe Night Market', lat: 25.0509, lng: 121.5775, type: 'market', desc: 'Pepper buns, herbal ribs' },
            ],
        },
        {
            day: 2, date: '2026-10-31', phase: 'taipei', title: 'Palace Museum & Taipei 101',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'National Palace Museum: Jadeite Cabbage and Meat-shaped Stone.'],
                ['Lunch', 'Din Tai Fung (join the queue early or use the app ticket).'],
                ['Afternoon', 'Taipei 101 observatory, Xinyi shopping.'],
                ['Sunset', 'Elephant Mountain hike (~20 min of stairs) for the classic 101 view.'],
            ],
            places: [
                { name: 'National Palace Museum', lat: 25.1024, lng: 121.5485, type: 'activity', desc: 'Imperial collection' },
                { name: 'Din Tai Fung (Xinyi Rd)', lat: 25.0336, lng: 121.5300, type: 'dining', desc: 'Xiao long bao' },
                { name: 'Taipei 101', lat: 25.0340, lng: 121.5645, type: 'activity', desc: 'Observatory, 89F' },
                { name: 'Elephant Mountain', lat: 25.0273, lng: 121.5767, type: 'activity', desc: 'Sunset over 101' },
            ],
        },
        {
            day: 3, date: '2026-11-01', phase: 'taipei', title: 'Shifen, Houtong & Jiufen',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Train to Ruifang, Pingxi Line to Shifen. Release a sky lantern, walk to Shifen Waterfall.'],
                ['Midday', 'Houtong Cat Village on the way back down the line.'],
                ['Late afternoon', 'Bus up to Jiufen Old Street; stay until the red lanterns light up. Tea at A-Mei Teahouse.'],
                ['Tip', 'Last buses from Jiufen back to Taipei get full on Sundays; a taxi to Ruifang station is a good backup.'],
            ],
            places: [
                { name: 'Shifen Old Street', lat: 25.0418, lng: 121.7756, type: 'activity', desc: 'Sky lanterns' },
                { name: 'Shifen Waterfall', lat: 25.0482, lng: 121.7871, type: 'activity', desc: '"Niagara of Taiwan"' },
                { name: 'Houtong Cat Village', lat: 25.0870, lng: 121.8273, type: 'activity', desc: 'Old mining town, many cats' },
                { name: 'Jiufen Old Street', lat: 25.1094, lng: 121.8445, type: 'activity', desc: 'Lantern-lit hillside lanes' },
            ],
        },
        {
            day: 4, date: '2026-11-02', phase: 'taipei', title: 'Beitou, Yangmingshan & Shilin',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Yangmingshan: Xiaoyoukeng fumaroles and grassland trail.'],
                ['Afternoon', 'Beitou Thermal Valley and a hot spring soak (private room or public bath).'],
                ['Late afternoon', 'Dihua Street and Dadaocheng for dried goods, tea and old shophouses.'],
                ['Evening', 'Shilin Night Market.'],
            ],
            places: [
                { name: 'Xiaoyoukeng', lat: 25.1770, lng: 121.5465, type: 'activity', desc: 'Volcanic fumaroles' },
                { name: 'Beitou Thermal Valley', lat: 25.1378, lng: 121.5160, type: 'activity', desc: 'Hot springs' },
                { name: 'Dihua Street', lat: 25.0560, lng: 121.5100, type: 'activity', desc: 'Old Taipei shophouses' },
                { name: 'Shilin Night Market', lat: 25.0880, lng: 121.5241, type: 'market', desc: 'Biggest night market' },
            ],
        },
        {
            day: 5, date: '2026-11-03', phase: 'taichung', title: 'High Speed Rail to Taichung',
            stay: 'Taichung hotel (to book) — Xitun / Fengjia area or near Taichung Station',
            plan: [
                ['Morning', 'HSR Taipei → Taichung (~1 h).'],
                ['Afternoon', 'National Taichung Theater, Calligraphy Greenway, Miyahara (ice cream in an old eye clinic).'],
                ['Sunset', 'Gaomei Wetlands: wind turbines and mirror-like tidal flats (check sunset time).'],
                ['Evening', 'Fengjia Night Market.'],
            ],
            places: [
                { name: 'Taichung HSR', lat: 24.1121, lng: 120.6157, type: 'transport', desc: 'From Taipei' },
                { name: 'National Taichung Theater', lat: 24.1630, lng: 120.6406, type: 'activity', desc: 'Toyo Ito architecture' },
                { name: 'Calligraphy Greenway', lat: 24.1510, lng: 120.6640, type: 'activity', desc: 'Park walk, cafés' },
                { name: 'Miyahara', lat: 24.1377, lng: 120.6835, type: 'dining', desc: 'Ice cream, pineapple cakes' },
                { name: 'Gaomei Wetlands', lat: 24.3125, lng: 120.5497, type: 'activity', desc: 'Sunset' },
                { name: 'Fengjia Night Market', lat: 24.1755, lng: 120.6460, type: 'market', desc: 'Huge student night market' },
            ],
        },
        {
            day: 6, date: '2026-11-04', phase: 'taichung', title: 'Sun Moon Lake (optional)',
            stay: 'Taichung hotel',
            plan: [
                ['Option A', 'Sun Moon Lake day trip: Nantou bus from Taichung HSR (~1.5 h), lake boat pass, ropeway to Formosan Aboriginal Culture Village, cycling path.'],
                ['Option B', 'Slow day in Taichung: Rainbow Village, Taichung Park, Second Market food, Yizhong Street.'],
                ['Tip', 'Get the Sun Moon Lake bus + boat combo ticket at Taichung HSR.'],
            ],
            places: [
                { name: 'Sun Moon Lake (Shuishe Pier)', lat: 23.8665, lng: 120.9115, type: 'activity', desc: 'Optional day trip' },
                { name: 'Rainbow Village', lat: 24.1336, lng: 120.6100, type: 'activity', desc: 'Painted village' },
            ],
        },
        {
            day: 7, date: '2026-11-05', phase: 'alishan', title: 'Up the Alishan Forest Railway',
            stay: 'Alishan hotel (BOOK FIRST) — inside the forest recreation area',
            plan: [
                ['Morning', 'Train Taichung → Chiayi (TRA ~1 h).'],
                ['Midday', 'Alishan Forest Railway Chiayi → Alishan (~2.5 h). Pack light; leave big bags at a Chiayi hotel or locker.'],
                ['Afternoon', 'Giant Trees Trail, Sister Ponds, Shouzhen Temple, Zhaoping Station.'],
                ['Evening', 'Early dinner and early night. It gets cold (5–10 °C).'],
            ],
            places: [
                { name: 'Chiayi Station', lat: 23.4791, lng: 120.4410, type: 'transport', desc: 'Forest railway starts here' },
                { name: 'Alishan Station', lat: 23.5100, lng: 120.8050, type: 'stay', desc: 'Overnight in the mountains' },
                { name: 'Giant Trees Trail', lat: 23.5145, lng: 120.8060, type: 'activity', desc: 'Ancient red cypresses' },
                { name: 'Sister Ponds', lat: 23.5165, lng: 120.8040, type: 'activity', desc: 'Forest pond walk' },
            ],
        },
        {
            day: 8, date: '2026-11-06', phase: 'tainan', title: 'Alishan sunrise, down to Tainan',
            stay: 'Tainan hotel (to book) — West Central District',
            plan: [
                ['Pre-dawn', 'Zhushan sunrise train (~4:30–5:00, times posted the evening before). Sea of clouds at ~6:00.'],
                ['Morning', 'Breakfast, last forest walk, then the bus down to Chiayi HSR (~2.5 h).'],
                ['Afternoon', 'HSR Chiayi → Tainan (~15 min), shuttle bus or taxi into the old town.'],
                ['Evening', 'Shennong Street, then Dadong Night Market (open Mon, Tue, Fri).'],
            ],
            places: [
                { name: 'Zhushan Sunrise Viewpoint', lat: 23.5134, lng: 120.8178, type: 'activity', desc: 'Sea of clouds' },
                { name: 'Chiayi HSR', lat: 23.4594, lng: 120.3233, type: 'transport', desc: 'Bus from Alishan' },
                { name: 'Shennong Street', lat: 22.9975, lng: 120.1970, type: 'activity', desc: 'Old lantern street' },
                { name: 'Dadong Night Market', lat: 22.9810, lng: 120.2240, type: 'market', desc: 'Open Fri' },
            ],
        },
        {
            day: 9, date: '2026-11-07', phase: 'tainan', title: 'Old Tainan & Anping',
            stay: 'Tainan hotel',
            plan: [
                ['Breakfast', 'Fresh beef soup (served from early morning).'],
                ['Morning', 'Chihkan Tower and Confucius Temple; danzai noodles for a snack.'],
                ['Afternoon', 'Anping Old Fort, Anping Tree House, Anping Old Street (shrimp rolls).'],
                ['Evening', 'Garden Night Market (open Thu, Sat, Sun).'],
            ],
            places: [
                { name: 'Chihkan Tower', lat: 22.9975, lng: 120.2025, type: 'activity', desc: 'Dutch-era fort' },
                { name: 'Confucius Temple', lat: 22.9906, lng: 120.2040, type: 'activity', desc: 'Taiwan\'s first' },
                { name: 'Anping Old Fort', lat: 23.0015, lng: 120.1606, type: 'activity', desc: 'Fort Zeelandia' },
                { name: 'Anping Tree House', lat: 23.0035, lng: 120.1595, type: 'activity', desc: 'Banyan-swallowed warehouse' },
                { name: 'Garden Night Market', lat: 23.0110, lng: 120.2000, type: 'market', desc: 'Open Sat' },
            ],
        },
        {
            day: 10, date: '2026-11-08', phase: 'kaohsiung', title: 'Kaohsiung harbour city',
            stay: 'Kaohsiung hotel (to book) — near Formosa Boulevard or Sizihwan',
            plan: [
                ['Morning', 'Train Tainan → Kaohsiung (~30 min). Lotus Pond: Dragon & Tiger Pagodas.'],
                ['Midday', 'Formosa Boulevard MRT station (Dome of Light).'],
                ['Afternoon', 'Pier-2 Art Center, then the ferry to Cijin Island for seafood and sunset.'],
                ['Evening', 'Liuhe or Ruifeng Night Market. Pack for the flight.'],
            ],
            places: [
                { name: 'Lotus Pond', lat: 22.6800, lng: 120.2945, type: 'activity', desc: 'Dragon & Tiger Pagodas' },
                { name: 'Formosa Boulevard Station', lat: 22.6315, lng: 120.3020, type: 'activity', desc: 'Dome of Light' },
                { name: 'Pier-2 Art Center', lat: 22.6200, lng: 120.2815, type: 'activity', desc: 'Warehouse art district' },
                { name: 'Cijin Island', lat: 22.6130, lng: 120.2665, type: 'dining', desc: 'Seafood & sunset' },
                { name: 'Liuhe Night Market', lat: 22.6320, lng: 120.2990, type: 'market', desc: 'Seafood night market' },
            ],
        },
        {
            day: 11, date: '2026-11-09', phase: 'flight', title: 'Fly home',
            stay: 'Home 🇸🇬',
            plan: [
                ['If flying from KHH', 'Kaohsiung airport is 20 min by MRT from the city. Arrive 2.5 h before departure.'],
                ['If flying from TPE', 'HSR Zuoying → Taoyuan (~2 h) + Airport MRT/bus. Leave Kaohsiung at least 5 h before departure.'],
                ['Before leaving', 'Claim the tourist VAT refund at the airport counter before check-in.'],
            ],
            places: [
                { name: 'Kaohsiung Airport (KHH)', lat: 22.5771, lng: 120.3500, type: 'transport', desc: 'Nonstop to Singapore (China Airlines)' },
                { name: 'Zuoying HSR', lat: 22.6873, lng: 120.3076, type: 'transport', desc: 'If flying out of TPE' },
            ],
        },
    ];

    const flights = [
        { id: 'fl-out', label: 'Outbound', route: 'SIN → TPE', date: 'Fri 30 Oct', detail: 'Singapore → Taipei Taoyuan. Nonstop ~4 h 30. Fill in flight no. & times once booked.' },
        { id: 'fl-home', label: 'Return', route: 'KHH → SIN', date: 'Mon 9 Nov', detail: 'Kaohsiung → Singapore. China Airlines / Mandarin Airlines list nonstop flights (~4 h 25, a few per week). Scoot & AirAsia are cheaper but stop on the way. Fallback: fly from TPE.' },
    ];

    const nightMarkets = [
        { name: 'Raohe (Taipei)', days: 'Daily', note: 'Day 1' },
        { name: 'Shilin (Taipei)', days: 'Daily', note: 'Day 4' },
        { name: 'Fengjia (Taichung)', days: 'Daily', note: 'Day 5' },
        { name: 'Dadong (Tainan)', days: 'Mon, Tue, Fri', note: 'Day 8 (Fri)' },
        { name: 'Garden (Tainan)', days: 'Thu, Sat, Sun', note: 'Day 9 (Sat)' },
        { name: 'Liuhe (Kaohsiung)', days: 'Daily', note: 'Day 10' },
    ];

    const checklists = {
        booknow: {
            title: 'Book Now', icon: '🚨',
            items: [
                ['bk-alishan-hotel', 'Alishan hotel for Thu 5 Nov (sells out first)'],
                ['bk-alishan-train', 'Alishan Forest Railway: Chiayi → Alishan, Thu 5 Nov'],
                ['bk-flight-out', 'Flight SIN → TPE, Fri 30 Oct'],
                ['bk-flight-home', 'Flight home Mon 9 Nov (KHH nonstop or TPE)'],
                ['bk-hotel-tpe', 'Taipei hotel, 4 nights (30 Oct – 3 Nov)'],
                ['bk-hotel-txg', 'Taichung hotel, 2 nights (3 – 5 Nov)'],
                ['bk-hotel-tnn', 'Tainan hotel, 2 nights (6 – 8 Nov)'],
                ['bk-hotel-khh', 'Kaohsiung hotel, 1 night (8 – 9 Nov)'],
                ['bk-hsr', 'HSR seats Taipei → Taichung (3 Nov) and Chiayi → Tainan (6 Nov)'],
                ['bk-insurance', 'Travel insurance'],
            ],
        },
        predeparture: {
            title: 'Before We Fly', icon: '🕑',
            items: [
                ['pre-passport', 'Passports valid 6+ months'],
                ['pre-twac', 'Taiwan Arrival Card filled in online before landing'],
                ['pre-esim', 'eSIM / SIM sorted'],
                ['pre-cash', 'Some TWD cash for night markets'],
                ['pre-cards', 'Tell the bank about overseas card use'],
                ['pre-apps', 'Apps: Google Maps (offline Taiwan), T Express (HSR), Taiwan Railway, Bus+'],
                ['pre-offline', 'Download offline Google Maps for west Taiwan'],
                ['pre-copies', 'Copies of passports & bookings in the cloud'],
            ],
        },
        packing: {
            title: 'Packing', icon: '🎒',
            items: [
                ['pk-warm', 'Warm layer + light down jacket for Alishan (5–10 °C at sunrise)'],
                ['pk-rain', 'Compact umbrella / rain jacket (Taipei & Jiufen drizzle)'],
                ['pk-shoes', 'Comfortable walking shoes (Elephant Mountain stairs)'],
                ['pk-swim', 'Swimwear for Beitou hot springs'],
                ['pk-daypack', 'Small overnight bag for Alishan (leave big bags in Chiayi)'],
                ['pk-adapter', 'Plug adapter (Taiwan uses Type A/B, 110 V)'],
                ['pk-powerbank', 'Power bank (carry-on only)'],
                ['pk-meds', 'Medicine & motion-sickness tablets (Alishan bus is winding)'],
                ['pk-bag', 'Foldable tote for night-market shopping'],
                ['pk-tissue', 'Pocket tissues & wet wipes'],
            ],
        },
        souvenirs: {
            title: 'Souvenirs & Must-Eats', icon: '🧋',
            items: [
                ['sv-bubbletea', 'Bubble tea from where it was born (Chun Shui Tang, Taichung)'],
                ['sv-pineapple', 'Pineapple cakes (SunnyHills or Chia Te)'],
                ['sv-sunshine', 'Sun cakes from Taichung'],
                ['sv-tea', 'Alishan high-mountain oolong tea'],
                ['sv-xlb', 'Xiao long bao at Din Tai Fung'],
                ['sv-beefsoup', 'Tainan beef soup breakfast'],
                ['sv-danzai', 'Danzai noodles in Tainan'],
                ['sv-lantern', 'Sky lantern at Shifen'],
                ['sv-mango', 'Mango shaved ice'],
            ],
        },
    };

    const tips = [
        ['💳', 'EasyCard', 'Tap for MRT, buses, TRA trains and 7-Eleven. Top up at any convenience store.'],
        ['🚄', 'High Speed Rail', 'Taipei → Kaohsiung in ~1.5 h. Book on the T Express app; non-reserved cars 10–12 are cheaper.'],
        ['💵', 'Cash', 'Night-market stalls are mostly cash. 7-Eleven ATMs take foreign cards.'],
        ['🧾', 'VAT refund', 'Shops with the TRS sign refund 5% tax on purchases over NT$2,000 in one day.'],
        ['🙇', 'Etiquette', 'No eating or drinking on the MRT (fines). Stand on the right on escalators.'],
        ['🗣️', 'Phrases', 'Xièxie (thank you) · Nǐ hǎo (hello) · Duōshǎo qián? (how much?) · Bú yào là (not spicy)'],
        ['🌏', 'Time zone', 'Same as Singapore (UTC+8). No jet lag.'],
        ['🔌', 'Power', 'Type A/B plugs, 110 V. Most phone chargers are fine.'],
    ];

    const emergency = [
        ['🚓', 'Police', '110'],
        ['🚑', 'Ambulance / Fire', '119'],
        ['ℹ️', 'Tourist hotline (24 h, English)', '0800011765'],
        ['🇸🇬', 'MFA Singapore duty office (24 h)', '+6563798800'],
    ];

    return { START, END, phases, cities, days, flights, nightMarkets, checklists, tips, emergency };
})();
