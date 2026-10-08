## Setup

1. Create `.env.local` in the project root (add values):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

2. Backend (terminal 1, project root), runs on http://localhost:3000:

```bash
npm install
npm run dev
```

3. Frontend (terminal 2), open http://localhost:3001:

```bash
cd client
npm install
npm run dev -- -p 3001
```

## API

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/movies`     | List movies           |
| POST   | `/api/movies`     | Add a movie           |
| PATCH  | `/api/movies/:id` | Update (e.g. watched) |
| DELETE | `/api/movies/:id` | Delete a movie        |

## Status

Done: add, list, edit, delete, mark as watched (saved in Supabase).

Not done: All / Watched / Unwatched filter; login, JWT and owner_id (skipped by team decision, one demo user).
