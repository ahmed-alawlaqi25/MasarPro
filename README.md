# MasarPro (مسار برو)

MasarPro helps you track job applications and keep your CVs and cover letters in one place.

I built this version with Flask and Supabase as my first full-stack project. I learned a lot from building, deploying, and fixing problems after launch. Some parts need cleanup, so I’m rebuilding the app with React and Node/Express.

[Live website](https://masarpro.app)

## Features

- Passwordless login through Supabase magic links, with email sent through Resend.
- A drag-and-drop board for moving applications through Wishlist, Applied, Interviewing, Offered, and Accepted.
- CV and cover letter uploads, with documents linked to individual applications.
- Private document access through signed URLs.
- Supabase Row Level Security policies to keep each user’s data separate.
- Rate limits, honeypot fields, and request validation added after a bot attack in production.

## Built with

- Python and Flask
- Supabase PostgreSQL, Auth, and Storage
- Jinja2, vanilla JavaScript, and CSS
- Resend for email
- Render for hosting
- Cloudflare for DNS

## What I learned

Working on MasarPro taught me how to handle authentication, sessions, database permissions, and private file access.

I found and fixed an RLS configuration error with the potential to expose data between users. This pushed me to check database permissions more carefully.

I also reduced one route’s response time from about 7 seconds to 1.7 seconds by running independent queries in parallel and batching signed URL requests.

Building the drag-and-drop board helped me practice JavaScript event handling. Maintaining the app showed me where my early design choices made changes harder.

## Why I’m rebuilding

The JavaScript is closely tied to the Jinja2 templates. Some routes still use patterns from earlier versions, and the project has no automated tests.

The React and Node/Express version gives me a chance to separate the frontend from the backend, use consistent patterns, and apply what I learned from this version.
