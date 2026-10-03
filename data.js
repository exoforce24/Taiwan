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
        flight:    { name: 'Home',      color: '#42a5f5' },
    };

    // Weather lookup per base
    const cities = {
        taipei:    { lat: 25.04, lon: 121.56, name: 'Taipei' },
        taichung:  { lat: 24.15, lon: 120.67, name: 'Taichung' },
        alishan:   { lat: 23.51, lon: 120.80, name: 'Alishan' },
    };

    // Easy-paced for pregnancy: no hot-spring soaks, no sulphur vents,
    // no big stair climbs, Alishan by train both ways.
    // type: stay | activity | dining | market | transport
    const days = [
        {
            day: 1, date: '2026-10-30', phase: 'taipei', title: 'Arrive in Taipei',
            stay: 'Taipei hotel, 3 nights (to book) — near Taipei Main or Zhongshan MRT',
            plan: [
                ['Arrive', 'Land at Taoyuan (TPE). Buy a SIM/eSIM and an EasyCard at arrivals.'],
                ['Transfer', 'Airport MRT express to Taipei Main Station (~40 min). Use the priority seats.'],
                ['Evening', 'Gentle stroll around Ximending, then dinner at Raohe Night Market (pepper buns at the gate).'],
            ],
            places: [
                { name: 'Taoyuan Airport (TPE)', lat: 25.0797, lng: 121.2342, type: 'transport', desc: 'Arrival from Singapore' },
                { name: 'Taipei Main Station', lat: 25.0478, lng: 121.5170, type: 'stay', desc: 'Base for 3 nights' },
                { name: 'Ximending', lat: 25.0421, lng: 121.5081, type: 'activity', desc: 'Evening stroll' },
                { name: 'Raohe Night Market', lat: 25.0509, lng: 121.5775, type: 'market', desc: 'Pepper buns' },
            ],
        },
        {
            day: 2, date: '2026-10-31', phase: 'taipei', title: 'Palace Museum & Taipei 101',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'National Palace Museum: Jadeite Cabbage and Meat-shaped Stone. Lifts throughout; tea house for a sit-down break.'],
                ['Lunch', 'Din Tai Fung (get a queue ticket on the app).'],
                ['Afternoon', 'Taipei 101 observatory (express lift, no climbing). Xinyi malls for an air-conditioned rest.'],
                ['Evening', 'Early night. Elephant Mountain is skipped (steep stairs).'],
            ],
            places: [
                { name: 'National Palace Museum', lat: 25.1024, lng: 121.5485, type: 'activity', desc: 'Imperial collection' },
                { name: 'Din Tai Fung (Xinyi Rd)', lat: 25.0336, lng: 121.5300, type: 'dining', desc: 'Xiao long bao' },
                { name: 'Taipei 101', lat: 25.0340, lng: 121.5645, type: 'activity', desc: 'Observatory by lift' },
            ],
        },
        {
            day: 3, date: '2026-11-01', phase: 'taipei', title: 'Old Taipei & Yongkang Street',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Dihua Street and Dadaocheng: old shophouses, dried fruit, a tea house break.'],
                ['Lunch', 'Yongkang Street: beef noodles (well done) and mango shaved ice.'],
                ['Afternoon', 'Huashan 1914 Creative Park: flat, shady, cafés and design shops.'],
                ['Evening', 'Dadaocheng Wharf at sunset, then Ningxia Night Market (small, flat, food-focused).'],
            ],
            places: [
                { name: 'Dihua Street', lat: 25.0560, lng: 121.5100, type: 'activity', desc: 'Old Taipei shophouses' },
                { name: 'Yongkang Street', lat: 25.0330, lng: 121.5297, type: 'dining', desc: 'Beef noodles, mango ice' },
                { name: 'Huashan 1914 Creative Park', lat: 25.0441, lng: 121.5294, type: 'activity', desc: 'Design shops & cafés' },
                { name: 'Dadaocheng Wharf', lat: 25.0566, lng: 121.5075, type: 'activity', desc: 'Riverside sunset' },
                { name: 'Ningxia Night Market', lat: 25.0560, lng: 121.5153, type: 'market', desc: 'Compact food market' },
            ],
        },
        {
            day: 4, date: '2026-11-02', phase: 'taichung', title: 'High Speed Rail to Taichung',
            stay: 'Taichung hotel, 2 nights (to book) — near Taichung HSR or Xitun',
            plan: [
                ['Morning', 'HSR Taipei → Taichung (~1 h). Reserve seats.'],
                ['Afternoon', 'National Taichung Theater, Calligraphy Greenway (Chun Shui Tang, where bubble tea was born: ask for decaf or fruit tea), Miyahara (ice cream in an old eye clinic).'],
                ['Evening', 'Fengjia Night Market. Go early (5–6 pm) before it gets packed.'],
            ],
            places: [
                { name: 'Taichung HSR', lat: 24.1121, lng: 120.6157, type: 'transport', desc: 'From Taipei' },
                { name: 'National Taichung Theater', lat: 24.1630, lng: 120.6406, type: 'activity', desc: 'Toyo Ito architecture' },
                { name: 'Calligraphy Greenway', lat: 24.1510, lng: 120.6640, type: 'activity', desc: 'Park walk, cafés' },
                { name: 'Miyahara', lat: 24.1377, lng: 120.6835, type: 'dining', desc: 'Ice cream, pineapple cakes' },
                { name: 'Fengjia Night Market', lat: 24.1755, lng: 120.6460, type: 'market', desc: 'Huge night market' },
            ],
        },
        {
            day: 5, date: '2026-11-03', phase: 'taichung', title: 'Sun Moon Lake day trip',
            stay: 'Taichung hotel',
            plan: [
                ['Morning', 'Nantou bus from Taichung HSR (~1.5 h). Buy the bus + boat combo ticket there.'],
                ['Midday', 'Lake boat between Shuishe, Xuanguang and Ita Thao piers. Lunch at Ita Thao.'],
                ['Afternoon', 'Sun Moon Lake Ropeway for the view (sit-down cable car). Flat lakeside path near Shuishe.'],
                ['Evening', 'Bus back to Taichung. Easy dinner near the hotel.'],
            ],
            places: [
                { name: 'Shuishe Pier', lat: 23.8665, lng: 120.9115, type: 'activity', desc: 'Boat & lakeside path' },
                { name: 'Ita Thao', lat: 23.8507, lng: 120.9338, type: 'dining', desc: 'Lunch' },
                { name: 'Sun Moon Lake Ropeway', lat: 23.8519, lng: 120.9289, type: 'activity', desc: 'Cable car views' },
            ],
        },
        {
            day: 6, date: '2026-11-04', phase: 'alishan', title: 'Up the Alishan Forest Railway',
            stay: 'Alishan hotel, 2 nights (BOOK FIRST) — inside the forest recreation area',
            plan: [
                ['Morning', 'Train Taichung → Chiayi (TRA ~1 h). Leave big bags in a Chiayi locker or hotel; take only 2 nights\' things up.'],
                ['Midday', 'Alishan Forest Railway Chiayi → Alishan (~2.5 h). Gentler than the winding bus.'],
                ['Afternoon', 'Check in and rest. Short, flat stroll near the hotel only: it is 2,200 m up, so let her body adjust.'],
                ['Evening', 'Early dinner and early night. It gets cold (5–10 °C), so wear the warm layers.'],
            ],
            places: [
                { name: 'Chiayi Station', lat: 23.4791, lng: 120.4410, type: 'transport', desc: 'Forest railway starts here' },
                { name: 'Alishan Station', lat: 23.5100, lng: 120.8050, type: 'stay', desc: 'Two nights in the mountains' },
            ],
        },
        {
            day: 7, date: '2026-11-05', phase: 'alishan', title: 'A slow full day in Alishan',
            stay: 'Alishan hotel',
            plan: [
                ['Optional', 'Zhushan sunrise train (~4:30–5:00). Only if she feels up to it; there is a second chance tomorrow.'],
                ['Morning', 'Giant Trees Trail boardwalk and Sister Ponds, at an easy pace with plenty of rests.'],
                ['Lunch', 'Simple hot lunch near the station. Alishan high-mountain tea (decaf options exist) to take home.'],
                ['Afternoon', 'Nap at the hotel. Later, Zhaoping Station and Shouzhen Temple are flat and close by.'],
                ['Evening', 'Watch the sea of clouds roll in at dusk if the weather is right. Early night.'],
            ],
            places: [
                { name: 'Giant Trees Trail', lat: 23.5145, lng: 120.8060, type: 'activity', desc: 'Boardwalk, ancient cypresses' },
                { name: 'Sister Ponds', lat: 23.5165, lng: 120.8040, type: 'activity', desc: 'Forest pond walk' },
                { name: 'Zhaoping Station', lat: 23.5120, lng: 120.8090, type: 'activity', desc: 'Flat, views, cherry trees' },
                { name: 'Zhushan Sunrise Viewpoint', lat: 23.5134, lng: 120.8178, type: 'activity', desc: 'Optional sunrise' },
            ],
        },
        {
            day: 8, date: '2026-11-06', phase: 'taipei', title: 'Alishan morning, back to Taipei',
            stay: 'Taipei hotel, 3 nights (to book)',
            plan: [
                ['Optional', 'Second chance at the Zhushan sunrise if yesterday was cloudy.'],
                ['Morning', 'Slow breakfast and a last forest stroll.'],
                ['Midday', 'Forest railway back down to Chiayi (~2.5 h), then taxi to Chiayi HSR (~20 min).'],
                ['Afternoon', 'HSR Chiayi → Taipei (~1.5 h). Check in and rest.'],
            ],
            places: [
                { name: 'Chiayi HSR', lat: 23.4594, lng: 120.3233, type: 'transport', desc: 'To Taipei' },
            ],
        },
        {
            day: 9, date: '2026-11-07', phase: 'taipei', title: 'Shifen lanterns & Jiufen (the easy way)',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Train to Ruifang, Pingxi Line to Shifen. Release a sky lantern; Shifen Waterfall is a fairly flat ~15 min walk.'],
                ['Afternoon', 'Taxi from Ruifang to the top of Jiufen (avoid the bus crowds). Stay on Jishan Street, which is the gentler lane. Skip the long stairway down.'],
                ['Evening', 'Tea at A-Mei Teahouse as the lanterns light up, then taxi back. A private driver for the day is worth it.'],
            ],
            places: [
                { name: 'Shifen Old Street', lat: 25.0418, lng: 121.7756, type: 'activity', desc: 'Sky lanterns' },
                { name: 'Shifen Waterfall', lat: 25.0482, lng: 121.7871, type: 'activity', desc: 'Easy walk' },
                { name: 'Jiufen (Jishan Street)', lat: 25.1094, lng: 121.8445, type: 'activity', desc: 'Top entrance, gentle lane' },
            ],
        },
        {
            day: 10, date: '2026-11-08', phase: 'taipei', title: 'Beitou walk & Tamsui sunset',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Beitou: Thermal Valley viewing path and the wooden Beitou Library. Look, don\'t soak (no hot springs in pregnancy).'],
                ['Afternoon', 'MRT to Tamsui. Flat riverside promenade and Old Street snacks (cooked only).'],
                ['Sunset', 'Fisherman\'s Wharf and Lover\'s Bridge. Pack for the flight tonight.'],
            ],
            places: [
                { name: 'Beitou Thermal Valley', lat: 25.1378, lng: 121.5160, type: 'activity', desc: 'View only, no soaking' },
                { name: 'Beitou Library', lat: 25.1365, lng: 121.5065, type: 'activity', desc: 'Wooden green library' },
                { name: 'Tamsui Old Street', lat: 25.1695, lng: 121.4390, type: 'dining', desc: 'Riverside snacks' },
                { name: 'Fisherman\'s Wharf', lat: 25.1830, lng: 121.4105, type: 'activity', desc: 'Sunset' },
            ],
        },
        {
            day: 11, date: '2026-11-09', phase: 'flight', title: 'Fly home',
            stay: 'Home 🇸🇬',
            plan: [
                ['Morning', 'Relaxed breakfast. Claim the tourist VAT refund at the airport counter before check-in.'],
                ['Transfer', 'Airport MRT express Taipei Main → Taoyuan (~40 min). Arrive 2.5 h before departure.'],
                ['Flight', 'Nonstop TPE → SIN (~4 h 30). Compression socks and plenty of water on board.'],
            ],
            places: [
                { name: 'Taoyuan Airport (TPE)', lat: 25.0797, lng: 121.2342, type: 'transport', desc: 'Nonstop to Singapore' },
            ],
        },
    ];

    const flights = [
        { id: 'fl-out', label: 'Outbound', route: 'SIN → TPE', date: 'Fri 30 Oct', detail: 'Singapore → Taipei Taoyuan. Nonstop ~4 h 30. Fill in flight no. & times once booked.' },
        { id: 'fl-home', label: 'Return', route: 'TPE → SIN', date: 'Mon 9 Nov', detail: 'Taipei Taoyuan → Singapore. Many nonstops daily. Check the airline\'s pregnancy rules (doctor\'s letter often needed after ~28 weeks).' },
    ];

    const nightMarkets = [
        { name: 'Raohe (Taipei)', days: 'Daily', note: 'Day 1' },
        { name: 'Ningxia (Taipei)', days: 'Daily', note: 'Day 3' },
        { name: 'Fengjia (Taichung)', days: 'Daily', note: 'Day 4' },
    ];

    const checklists = {
        booknow: {
            title: 'Book Now', icon: '🚨',
            items: [
                ['bk-alishan-hotel', 'Alishan hotel, 2 nights: Wed 4 & Thu 5 Nov (sells out first)'],
                ['bk-alishan-train', 'Alishan Forest Railway: up Wed 4 Nov, down Fri 6 Nov'],
                ['bk-flight-out', 'Flight SIN → TPE, Fri 30 Oct'],
                ['bk-flight-home', 'Flight TPE → SIN, Mon 9 Nov'],
                ['bk-hotel-tpe', 'Taipei hotel, 3 nights (30 Oct – 2 Nov)'],
                ['bk-hotel-txg', 'Taichung hotel, 2 nights (2 – 4 Nov)'],
                ['bk-hotel-tpe2', 'Taipei hotel, 3 nights (6 – 9 Nov)'],
                ['bk-hsr', 'HSR seats: Taipei → Taichung (2 Nov), Chiayi → Taipei (6 Nov)'],
                ['bk-driver', 'Private driver for Shifen + Jiufen (Sat 7 Nov), optional'],
                ['bk-insurance', 'Travel insurance that covers pregnancy'],
            ],
        },
        pregnancy: {
            title: 'Pregnancy Prep', icon: '🤰',
            items: [
                ['pg-doctor', 'Doctor\'s OK for the trip, including 2 nights in Alishan at 2,200 m'],
                ['pg-airline', 'Check both airlines\' pregnancy rules; get a fit-to-fly letter if needed'],
                ['pg-records', 'Copy of antenatal notes / scan reports (phone + paper)'],
                ['pg-meds', 'Prenatal vitamins and any prescribed meds, in carry-on'],
                ['pg-repellent', 'Pregnancy-safe mosquito repellent (picaridin or DEET)'],
                ['pg-socks', 'Compression socks for the flights'],
                ['pg-badge', 'Pick up a pregnancy badge at a Taipei MRT info counter (helps get a seat)'],
                ['pg-food', 'Food rule: fully cooked only (say "quán shóu"); no raw seafood, runny eggs or herbal soups'],
                ['pg-hospitals', 'Save nearest big hospitals in Google Maps for each city'],
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
                ['pre-apps', 'Apps: Google Maps (offline Taiwan), T Express (HSR), Taiwan Railway, Uber'],
                ['pre-offline', 'Download offline Google Maps for north & central Taiwan'],
                ['pre-copies', 'Copies of passports & bookings in the cloud'],
            ],
        },
        packing: {
            title: 'Packing', icon: '🎒',
            items: [
                ['pk-warm', 'Warm layer + light down jacket for Alishan (5–10 °C at night)'],
                ['pk-rain', 'Compact umbrella / rain jacket (Taipei & Jiufen drizzle)'],
                ['pk-shoes', 'Comfortable, supportive walking shoes'],
                ['pk-daypack', 'Small overnight bag for Alishan (leave big bags in Chiayi)'],
                ['pk-pillow', 'Travel pillow / back support for trains'],
                ['pk-bottle', 'Refillable water bottle & snacks'],
                ['pk-adapter', 'Plug adapter (Taiwan uses Type A/B, 110 V)'],
                ['pk-powerbank', 'Power bank (carry-on only)'],
                ['pk-meds', 'Ginger sweets / doctor-approved anti-nausea for the mountain train'],
                ['pk-bag', 'Foldable tote for shopping'],
            ],
        },
        souvenirs: {
            title: 'Souvenirs & Must-Eats', icon: '🧋',
            items: [
                ['sv-bubbletea', 'Bubble tea where it was born (Chun Shui Tang, Taichung), decaf or fruit tea'],
                ['sv-pineapple', 'Pineapple cakes (SunnyHills or Chia Te)'],
                ['sv-sunshine', 'Sun cakes from Taichung'],
                ['sv-tea', 'Alishan high-mountain oolong tea (to enjoy after baby!)'],
                ['sv-xlb', 'Xiao long bao at Din Tai Fung'],
                ['sv-lantern', 'Sky lantern at Shifen'],
                ['sv-mango', 'Mango shaved ice on Yongkang Street'],
                ['sv-pepperbun', 'Pepper bun at Raohe Night Market'],
            ],
        },
    };

    const tips = [
        ['🤰', 'Priority seats', 'MRT, buses and HSR all have priority seats. Taipei MRT info counters give out a pregnancy badge so people offer a seat.'],
        ['🍲', 'Eating safely', 'Say "quán shóu" (fully cooked). Skip raw oysters, sashimi, runny eggs and herbal soups (dong quai, ginseng).'],
        ['🚕', 'Taxis & Uber', 'Cheap and everywhere. Use them for Jiufen and anywhere uphill.'],
        ['💳', 'EasyCard', 'Tap for MRT, buses, TRA trains and 7-Eleven. Top up at any convenience store.'],
        ['🚄', 'High Speed Rail', 'Taipei → Taichung in ~1 h. Book on the T Express app.'],
        ['💵', 'Cash', 'Night-market stalls are mostly cash. 7-Eleven ATMs take foreign cards.'],
        ['🧾', 'VAT refund', 'Shops with the TRS sign refund 5% tax on purchases over NT$2,000 in one day.'],
        ['🙇', 'Etiquette', 'No eating or drinking on the MRT (fines). Stand on the right on escalators.'],
        ['🗣️', 'Phrases', 'Xièxie (thank you) · Nǐ hǎo (hello) · Duōshǎo qián? (how much?) · Bú yào là (not spicy)'],
        ['🌏', 'Time zone', 'Same as Singapore (UTC+8). No jet lag.'],
    ];

    const emergency = [
        ['🚓', 'Police', '110'],
        ['🚑', 'Ambulance / Fire', '119'],
        ['ℹ️', 'Tourist hotline (24 h, English)', '0800011765'],
        ['🇸🇬', 'MFA Singapore duty office (24 h)', '+6563798800'],
    ];

    return { START, END, phases, cities, days, flights, nightMarkets, checklists, tips, emergency };
})();
