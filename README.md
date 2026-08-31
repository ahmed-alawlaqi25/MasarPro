# MasarPro (مسار برو)

A job application tracker built with Flask and Supabase — Kanban-style board, magic link auth, resume/cover letter management, and RLS-secured multi-user data isolation.

🔗 Live: [masarpro.app](https://masarpro.app)

> **Note:** This is my first full-stack project, built from scratch to learn backend development. The code is functional but not clean — I'm aware of the rough edges (see below). I'm currently rebuilding it with a Node/Express + React stack to apply what I learned the first time around with better architecture.

## Features

- **Magic link authentication** — passwordless login via Supabase Auth + custom SMTP (Resend)
- **Kanban job tracker** — drag-and-drop cards across status columns (Wishlist → Applied → Interviewing → Offered → Accepted), with persistent state synced to the database
- **Document management** — upload CVs and cover letters, link specific documents to specific job applications, secure signed URLs for private file access
- **Row Level Security (RLS)** — every user's data is isolated at the database level, not just the application level
- **Rate limiting & spam protection** — honeypot fields and request validation on public endpoints after discovering a real bot attack in production

## Tech Stack

- **Backend:** Python, Flask
- **Database & Auth:** Supabase (PostgreSQL, Auth, Storage)
- **Frontend:** Jinja2, vanilla JavaScript, CSS
- **Email:** Resend (SMTP)
- **Hosting:** Render
- **Domain/DNS:** Cloudflare

## What I Learned

This project was my introduction to:
- Designing and securing a relational database schema with RLS policies
- Token-based auth flows (access/refresh tokens, session management, handling expiry)
- Building drag-and-drop UI with vanilla JS event handling
- Debugging a real production security gap — discovered and fixed an RLS misconfiguration that could have exposed cross-user data
- Performance optimization — reduced a slow route from ~7s to ~1.7s using parallel queries and batched signed URL requests
- The gap between understanding a concept and being able to write it from scratch under pressure

## Known Issues / Why It's Being Rebuilt

- Frontend logic is tightly coupled to Jinja2 templates, making the JS harder to maintain
- Some routes have inconsistent patterns from earlier iterations before I standardized on user-scoped Supabase clients
- No test coverage
- The rebuild uses React + Node/Express with cleaner separation of concerns, learned directly from this version's mistakes


