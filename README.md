# BrewHaus — Cinematic Coffee Frontend (Angular 20)

A frontend prototype of the BrewHaus premium in-café ordering experience.
This package contains the **Angular frontend only** — no backend required
to run and explore the full ordering flow (data is mocked in-memory /
sessionStorage so the demo works end to end).

## Run locally

```bash
npm install
npm start
```

Then open: `http://localhost:4200/?table=12`

The `?table=12` query param simulates a customer scanning the QR code on
table 12. The table number is detected automatically, persisted for the
session, and shown throughout the navbar, cart, checkout, and order tracking.

## Routes

- `/` — Cinematic hero scroll story + category section ("Our Story" + "Contact" in footer/navbar)
- `/menu/hot-drinks`, `/menu/iced-drinks`, `/menu/fresh-juice` — Category pages with product cards
- `/checkout` — Live receipt + payment method (Cash / Card)
- `/order-status/:id` — Animated order tracking (Received → Preparing → Ready → Served)
- `/admin` — Operations dashboard: incoming orders, status updates, payment method, menu overview

## Structure

```
src/app/
  core/
    models/        Product, CartItem, Order types
    services/      TableService, CartService, MenuService, OrderService
  shared/components/
    navbar/         Transparent glass navbar with table badge + cart icon
    cart-drawer/     Slide-in cart
    product-drawer/  Slide-up customization sheet
    floating-particles/ Ambient steam/dust particle layer
  features/
    home/           Hero (GSAP ScrollTrigger pinned scenes) + categories + story
    menu/           Category product grid
    checkout/       Receipt + payment selection
    order-status/   Animated progress tracker
    admin/          Orders + menu management dashboard
```

## Connecting to a real backend

`MenuService`, `CartService`, and `OrderService` are written as the
integration seams for the ASP.NET Core Web API described in the original
brief (Clean Architecture, Repository Pattern, JWT auth). Swap their
in-memory logic for `HttpClient` calls to:

- `GET /api/categories`, `GET /api/categories/{slug}/products`
- `POST /api/orders` (create order from cart → returns receipt number)
- `PATCH /api/orders/{id}/status` (admin status updates)
- `GET /api/orders` (admin live order feed — ideally via SignalR for real-time push)

Authentication for `/admin` should be gated behind a JWT-protected route
guard once the API is connected.
# AromaCafe
