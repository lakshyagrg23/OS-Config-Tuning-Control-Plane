# Backend

Minimal Prisma setup for the Drift control plane.

## Database

Create a PostgreSQL database named `drift_control_plane` and set `DATABASE_URL` in `.env`.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/drift_control_plane?schema=public"
```

## Prisma

Install dependencies and apply the schema:

```bash
npm install
npx prisma generate
npx prisma db push
```

## Initial tables

- `nodes`
- `events`
- `policies`
