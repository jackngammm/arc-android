# ARC — Alliance for Regenerative Communities (sample app)

A sample iOS app modeling the full site structure of alliance4regencomm.com,
built from a combination of public content and the documented site
architecture (nav, membership model, footer ecosystem). Where real copy
wasn't available (no login access), content is seeded with clearly marked
placeholders in the correct shape — swap those for real data whenever you
get it.

## What's real vs placeholder

- **Real**: hero copy, the two confirmed past events (Ojai, Santa Monica),
  membership tier structure (Free / Paid $400-6mo / Scholarship / Teams),
  nav structure, footer ecosystem links, legal doc list.
- **Placeholder** (marked in code and on-screen with a banner): the Oct 1,
  2026 event's full details, most resource directory entries, most
  initiatives. Auth and checkout are mocked locally — no real backend yet.

## Run it

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npx expo start
   ```
3. Scan the QR code with the **Expo Go** app on your iPhone, or press `i`
   for the iOS simulator if you have Xcode.

## Structure

```
app/
  _layout.tsx              root layout, loads fonts, wraps AppProvider
  (tabs)/
    _layout.tsx             5-tab bar: Home, Events, Resources, Initiatives, Profile
    index.tsx               Home
    events.tsx               Events (Upcoming/Past toggle)
    resources.tsx             Resources (search + category filters)
    initiatives.tsx           Initiatives (public / volunteer / member-only)
    profile.tsx                Profile (auth-gated: status, saved items, referrals, legal)
  event/[id].tsx             Event detail
  resource/[id].tsx          Resource detail
  membership.tsx             Tier comparison + join/upgrade
  sign-in.tsx                Mock sign-in
  cart.tsx                   Mock cart/checkout
context/AppContext.tsx        Global mock state: membership tier, cart, saved items
components/                   Shared UI: buttons, chip, cards, growth-rings graphic
constants/theme.ts             Colors, fonts, radii
data/                          Static content: events, resources, initiatives, tiers, ecosystem links
```

## Account model (mocked)

`userType` is one of `guest | free | paid | scholarship | team`, held in
`AppContext`. Signing in sets it to `free`; "purchasing" a tier in the
cart flow sets it to `paid` / `scholarship` / `team`. This mirrors the
real permission model (guests browse public content, free accounts get
volunteer tasks, paid+ tiers unlock member-only initiatives) without any
real backend behind it.

## Next steps

- Get real copy for the Oct 1, 2026 event and the resources/initiatives
  directory (ideally via a login or export from ARC).
- Replace mock sign-in and checkout with real auth (e.g. Supabase, Auth0)
  and payments (e.g. Stripe).
- Confirm the real destination URLs for Regen Media TV, Regen World
  Magazine, the Spatial world, and Earth Stock Foundation.
- Replace icon/splash placeholders in `app.json` with real brand assets.
- Build with EAS (`eas build --platform ios`) for TestFlight/App Store.
