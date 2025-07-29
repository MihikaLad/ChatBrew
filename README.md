## 🔐 Supabase Setup

This app uses Supabase for backend services (auth, database, and storage).

To run the project:

1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Create the following tables:
   - `user` (columns: id, displayName, email, etc.)
   - `messages` (columns: id, text, createdAt, etc.)
4. In your project dashboard, go to **Settings > API** and copy:
   - Project URL
   - Anon Public API Key

5. Create a `.env` file in the root of the frontend folder:(if .env is already there, then just add url and anon key from supabase and create table).
