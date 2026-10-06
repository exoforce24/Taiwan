# Taiwan

Trip dashboard for our Taiwan trip, 30 Oct – 9 Nov 2026:
Taipei → Taichung → Sun Moon Lake → Chiayi → Alishan → back to Taipei (pregnancy-friendly pace).

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
3. In the database's **Rules** tab, paste this and **Publish**. It blocks listing or wiping the whole database; only someone who knows your trip code can find your data:
   ```json
   {
     "rules": {
       ".read": false,
       ".write": false,
       "$trip": {
         ".read": "$trip.matches(/^trip_[0-9a-f]{40}$/)",
         ".write": "$trip.matches(/^trip_[0-9a-f]{40}$/)"
       }
     }
   }
   ```
4. **Project settings (⚙️) → General → Your apps → Web (`</>`)**, register an app, and copy the `firebaseConfig` object.
5. Paste it into `firebase-config.js` as `window.FIREBASE_CONFIG = { ... };`.
6. On each phone, tap the 🔒 sync bar and enter the same trip code (8+ characters, something only the two of you know), or open the site once as `https://your-site/#code=YOURCODE`.

The trip code is never stored in this repo. The database path is a SHA-256 of it, so it can't be worked out from the public source.
