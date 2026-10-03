# Taiwan

Trip dashboard for our Taiwan trip, 30 Oct – 9 Nov 2026:
Taipei → Taichung → Alishan → Tainan → Kaohsiung.

A static site (no build step) in the same style as the Canada trip site: countdown, live "today" view during the trip, map, day-by-day itinerary with notes, checklists, weather, SGD/TWD converter and emergency numbers. Works offline once opened and can be added to the phone home screen.

## Editing the plan

Everything trip-specific lives in **`data.js`**: days, places (map pins), flights, checklists, tips. Change it there and every section updates.

## Hosting

`.github/workflows/deploy-pages.yml` deploys to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Syncing checklists & notes between phones (Firebase)

Without a config the site still works; ticks and notes just stay on each phone.

1. Go to https://console.firebase.google.com and **Create a project** (e.g. `taiwan-trip`; Google Analytics can be off).
2. **Build → Realtime Database → Create database**. Pick **Singapore (asia-southeast1)**, start in **locked mode**.
3. In the database's **Rules** tab, paste this and **Publish** (test mode rules expire after 30 days, before the trip ends):
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
4. **Project settings (⚙️) → General → Your apps → Web (`</>`)**, register an app, and copy the `firebaseConfig` object.
5. Paste it into `firebase-config.js` as `window.FIREBASE_CONFIG = { ... };` and optionally change `SYNC_KEY`.

The Firebase web config is not a secret (it ships to every browser), but anyone with the URL and key could edit the checklist, so keep `SYNC_KEY` to yourselves.
