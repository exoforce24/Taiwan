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
        sunmoon:   { name: 'Sun Moon Lake', color: '#26a69a' },
        chiayi:    { name: 'Chiayi',    color: '#ab47bc' },
        alishan:   { name: 'Alishan',   color: '#4caf50' },
        flight:    { name: 'Home',      color: '#42a5f5' },
    };

    // Weather lookup per base
    const cities = {
        taipei:    { lat: 25.04, lon: 121.56, name: 'Taipei' },
        taichung:  { lat: 24.15, lon: 120.67, name: 'Taichung' },
        sunmoon:   { lat: 23.87, lon: 120.92, name: 'Sun Moon Lake' },
        chiayi:    { lat: 23.48, lon: 120.45, name: 'Chiayi' },
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
            day: 2, date: '2026-10-31', phase: 'taipei', title: 'Taipei 101 café view & Palace Museum',
            stay: 'Taipei hotel',
            plan: [
                ['Morning', 'Taipei 101 view the cheap way: Simple Kaffa Sola café on the 88th floor instead of the paid observatory. Go for the 10:00 opening (Saturday queues get long). Use the office-tower lobby near MRT Taipei 101 exit 4 (by the LOVE sculpture), get a ticket at reception, then lifts up. Takeaway is min. NT$240 per person and gets you the standing view area.'],
                ['Lunch', 'Din Tai Fung at Taipei 101 B1 (get a queue ticket on the app).'],
                ['Afternoon', 'National Palace Museum: Jadeite Cabbage and Meat-shaped Stone. Lifts throughout; tea house for a sit-down break.'],
                ['Evening', 'Ginger duck hotpot (薑母鴨) dinner in Zhongshan. The broth is cooked with rice wine, so ask for a no-wine (不加酒) broth for her or let her skip the soup.'],
            ],
            places: [
                { name: 'National Palace Museum', lat: 25.1024, lng: 121.5485, type: 'activity', desc: 'Imperial collection' },
                { name: 'Din Tai Fung (Taipei 101)', lat: 25.0338, lng: 121.5646, type: 'dining', desc: 'Xiao long bao' },
                { name: 'Simple Kaffa Sola (Taipei 101, 88F)', lat: 25.0340, lng: 121.5645, type: 'dining', desc: 'Coffee with the 101 view' },
                { name: 'Ginger duck hotpot, Zhongshan', lat: 25.0526, lng: 121.5204, type: 'dining', desc: 'Ask for no-wine broth' },
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
            stay: 'Taichung hotel, 1 night (to book) — near Taichung HSR or Xitun, with parking',
            plan: [
                ['Morning', 'Early HSR Taipei → Taichung (~1 h). Pick up the M4. Rainbow Village is 10 min away: a small, flat, hand-painted village.'],
                ['Lunch', 'Moment Cafe, a cat café garden near Rainbow Village. She shouldn\'t handle the cats (toxoplasmosis); wash hands before eating.'],
                ['Afternoon', 'Drive north (~40 min) to Zhongshe Flower Market in Houli: flower fields, lavender from late Oct. Flat paths, so stroll the near fields and sit in the café. NT$120 entry.'],
                ['Evening', 'Fengjia Night Market (go by 5–6 pm before it packs out), then Miyahara for ice cream in the old eye clinic.'],
            ],
            places: [
                { name: 'Taichung HSR', lat: 24.1121, lng: 120.6157, type: 'transport', desc: 'From Taipei' },
                { name: 'Rainbow Village', lat: 24.1335, lng: 120.6097, type: 'activity', desc: 'Painted village' },
                { name: 'Moment Cafe', lat: 24.1330, lng: 120.6110, type: 'dining', desc: 'Cat café garden' },
                { name: 'Zhongshe Flower Market', lat: 24.3220, lng: 120.7120, type: 'activity', desc: 'Flower fields, Houli' },
                { name: 'Miyahara', lat: 24.1377, lng: 120.6835, type: 'dining', desc: 'Ice cream, pineapple cakes' },
                { name: 'Fengjia Night Market', lat: 24.1755, lng: 120.6460, type: 'market', desc: 'Huge night market' },
            ],
        },
        {
            day: 5, date: '2026-11-03', phase: 'sunmoon', title: 'Comic Museum, then a night at Sun Moon Lake',
            stay: 'Sun Moon Lake hotel, 1 night (to book) — Ita Thao or Shuishe, with parking',
            plan: [
                ['Morning', 'Check out. National Taiwan Museum of Comics at its 10:00 opening (old police dorms, West District; closed Mondays). About an hour.'],
                ['Midday', 'Drive to Sun Moon Lake (~1 h 15, Freeway 6). The last stretch winds a little, so take it gently. Late lunch at Ita Thao.'],
                ['Afternoon', 'Check in, rest, then the lake boat between Ita Thao, Xuanguang and Shuishe piers, or the Sun Moon Lake Ropeway (check last ride).'],
                ['Evening', 'Sunset on the flat lakeside path near Shuishe, then dinner at Ita Thao. No driving after dark on the mountain road.'],
            ],
            places: [
                { name: 'National Taiwan Museum of Comics', lat: 24.1375, lng: 120.6770, type: 'activity', desc: 'Closed Mondays' },
                { name: 'Shuishe Pier', lat: 23.8665, lng: 120.9115, type: 'stay', desc: 'Lakeside night' },
                { name: 'Ita Thao', lat: 23.8507, lng: 120.9338, type: 'dining', desc: 'Lunch & dinner' },
                { name: 'Sun Moon Lake Ropeway', lat: 23.8519, lng: 120.9289, type: 'activity', desc: 'Cable car views' },
            ],
        },
        {
            day: 6, date: '2026-11-04', phase: 'chiayi', title: 'Lake morning, return the M4, on to Chiayi',
            stay: 'Chiayi hotel, 1 night (to book) — walking distance to Chiayi TRA station',
            plan: [
                ['Morning', 'Slow lakeside morning (the lake is calmest early). Leave by ~10:00 and drive back to Taichung (~1 h 15).'],
                ['Midday', 'Return the M4 to the Taichung shop (two days with the car). Taxi to Taichung HSR, HSR to Chiayi (~25 min).'],
                ['Afternoon', 'Palace Museum Southern Branch, a short taxi from Chiayi HSR: flat, air-conditioned, quiet (closed Mondays). Then taxi into Chiayi and check in.'],
                ['Evening', 'Stroll Hinoki Village (Japanese-era wooden houses) and Wenhua Road Night Market for turkey rice (火雞肉飯), Chiayi\'s famous dish.'],
            ],
            places: [
                { name: 'Palace Museum Southern Branch', lat: 23.4740, lng: 120.2900, type: 'activity', desc: 'Near Chiayi HSR' },
                { name: 'Chiayi HSR', lat: 23.4594, lng: 120.3233, type: 'transport', desc: 'From Taichung' },
                { name: 'Hinoki Village', lat: 23.4870, lng: 120.4560, type: 'activity', desc: 'Japanese-era wooden houses' },
                { name: 'Wenhua Road Night Market', lat: 23.4790, lng: 120.4490, type: 'market', desc: 'Turkey rice' },
            ],
        },
        {
            day: 7, date: '2026-11-05', phase: 'alishan', title: 'Up the Alishan Forest Railway',
            stay: 'Alishan hotel, 1 night (BOOK FIRST) — inside the forest recreation area',
            plan: [
                ['Morning', 'Sleep in and walk to Chiayi station. Leave big bags at the Chiayi hotel; take only an overnight bag up. Peek at the old steam engines at the Railway Garage Park first if there is time. Alishan Express No. 5 leaves 10:00 (the only train that goes all the way up).'],
                ['Midday', 'Lunch during the 65-min stop at Fenqihu (famous railway bento).'],
                ['Afternoon', 'Arrive Alishan 14:56. Check in and rest a little: it is 2,200 m up, so let her body adjust. Later, a gentle stroll to Zhaoping Station and Shouzhen Temple (flat, close by).'],
                ['Evening', 'Watch the sea of clouds at dusk if the weather is right. Early dinner and early night; it gets cold (5–10 °C).'],
            ],
            places: [
                { name: 'Chiayi Station', lat: 23.4791, lng: 120.4410, type: 'transport', desc: 'Forest railway starts here' },
                { name: 'Alishan Railway Garage Park', lat: 23.4880, lng: 120.4570, type: 'activity', desc: 'Old steam trains' },
                { name: 'Alishan Station', lat: 23.5100, lng: 120.8050, type: 'stay', desc: 'A night in the mountains' },
                { name: 'Zhaoping Station', lat: 23.5120, lng: 120.8090, type: 'activity', desc: 'Flat, views, cherry trees' },
            ],
        },
        {
            day: 8, date: '2026-11-06', phase: 'taipei', title: 'Alishan morning, back to Taipei',
            stay: 'Taipei hotel, 3 nights (to book)',
            plan: [
                ['Optional', 'Zhushan sunrise train (~4:30–5:00), only if she feels up to it.'],
                ['Morning', 'After breakfast, the Giant Trees Trail boardwalk and Sister Ponds at an easy pace. Pick up Alishan tea near the station.'],
                ['Midday', 'Alishan Express No. 8 leaves Alishan 11:50, arrives Chiayi 15:45. Collect bags from the Chiayi hotel, taxi to Chiayi HSR (~20 min).'],
                ['Evening', 'HSR Chiayi → Taipei (~1.5 h). Check in and rest.'],
            ],
            places: [
                { name: 'Zhushan Sunrise Viewpoint', lat: 23.5134, lng: 120.8178, type: 'activity', desc: 'Optional sunrise' },
                { name: 'Giant Trees Trail', lat: 23.5145, lng: 120.8060, type: 'activity', desc: 'Boardwalk, ancient cypresses' },
                { name: 'Sister Ponds', lat: 23.5165, lng: 120.8040, type: 'activity', desc: 'Forest pond walk' },
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
            day: 10, date: '2026-11-08', phase: 'taipei', title: 'Sports car day: Yangmingshan & the north coast',
            stay: 'Taipei hotel',
            plan: [
                ['Early', 'Pick up the sports car in Taipei around 8:00 and head up Yangmingshan before the Sunday traffic builds. Comfort mode on the hill roads, and stop if she feels queasy.'],
                ['Morning', 'Erziping Trail: flat and shady, with silver grass at its best in November. Skip Xiaoyoukeng (sulphur fumes) and the Qixing climb.'],
                ['Midday', 'Down to Jinshan for lunch, then Tiaoshi Coast. Look from the shore path; don\'t hop the slippery boulders.'],
                ['Afternoon', 'The fun part: west along the North Coast Highway (Provincial Hwy 2), sweeping and by the sea, past Shimen Arch to Tamsui. Stop every hour so she can stretch.'],
                ['Sunset', 'Fisherman\'s Wharf in Tamsui, then drive back and return the car. Pack for the flight tonight.'],
            ],
            places: [
                { name: 'Erziping Trail', lat: 25.1866, lng: 121.5287, type: 'activity', desc: 'Flat Yangmingshan trail' },
                { name: 'Jinshan Old Street', lat: 25.2220, lng: 121.6380, type: 'dining', desc: 'Lunch' },
                { name: 'Tiaoshi Coast', lat: 25.2900, lng: 121.5470, type: 'activity', desc: 'North coast boulders, view only' },
                { name: 'Shimen Arch', lat: 25.2930, lng: 121.5650, type: 'activity', desc: 'Sea arch, roadside stop' },
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
        { name: 'Wenhua Road (Chiayi)', days: 'Daily', note: 'Day 6' },
    ];

    const checklists = {
        booknow: {
            title: 'Book Now', icon: '🚨',
            items: [
                ['bk-alishan-hotel', 'Alishan hotel, 1 night: Thu 5 Nov (sells out first)'],
                ['bk-alishan-train', 'Alishan Forest Railway: Express No. 5 up Thu 5 Nov (10:00), No. 8 down Fri 6 Nov (11:50)'],
                ['bk-flight-out', 'Flight SIN → TPE, Fri 30 Oct'],
                ['bk-flight-home', 'Flight TPE → SIN, Mon 9 Nov'],
                ['bk-hotel-tpe', 'Taipei hotel, 3 nights (30 Oct – 2 Nov)'],
                ['bk-hotel-txg', 'Taichung hotel, 1 night (Mon 2 Nov)'],
                ['bk-hotel-sml', 'Sun Moon Lake hotel, 1 night (Tue 3 Nov), with parking'],
                ['bk-hotel-cyi', 'Chiayi hotel near the TRA station, 1 night (Wed 4 Nov)'],
                ['bk-hotel-tpe2', 'Taipei hotel, 3 nights (6 – 9 Nov)'],
                ['bk-hsr', 'HSR seats: Taipei → Taichung (2 Nov), Taichung → Chiayi (Wed 4 Nov, early afternoon), Chiayi → Taipei (Fri 6 Nov, ~16:30)'],
                ['bk-car', 'M4 rental Mon 2 – Wed 4 Nov (Taichung shop), returned around midday Wed 4 Nov'],
                ['bk-driver', 'Private driver for Shifen + Jiufen (Sat 7 Nov), optional'],
                ['bk-car2', 'Sports car rental in Taipei, Sun 8 Nov (one day; check the Sunday evening return time)'],
                ['bk-insurance', 'Travel insurance that covers pregnancy'],
            ],
        },
        pregnancy: {
            title: 'Pregnancy Prep', icon: '🤰',
            items: [
                ['pg-doctor', 'Doctor\'s OK for the trip, including a night in Alishan at 2,200 m'],
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
                ['pre-idp', 'International Driving Permit from the AA Singapore, plus your Singapore licence'],
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
        ['🚗', 'Driving in Taiwan', 'They drive on the RIGHT, the opposite of Singapore. Scooters filter everywhere, so check mirrors before every turn. Right turn on red is not allowed.'],
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
