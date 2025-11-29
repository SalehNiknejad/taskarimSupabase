# Taskarim Supabase

A lightweight task management and tracking project built with **Supabase**, designed for simplicity and scalability.

## 🚀 Features

* Full CRUD for tasks
* Real-time updates using Supabase
* Authentication (email/password or magic link)
* Clean and minimal UI
* Easy to deploy and extend

## 📦 Tech Stack

* **Supabase** (Auth, Database, Realtime)
* **Next.js / React** (if applicable)
* **TypeScript**
* **TailwindCSS** (optional)

## 📁 Project Structure

```
/project-root
  ├── supabase/        # Database & config
  ├── src/             # Source code
  ├── components/      # UI components
  ├── pages/ or app/   # Next routing
  └── README.md
```

## 🛠 Setup & Installation

1. Clone the repo:

```bash
git clone https://github.com/SalehNiknejad/taskarimSupabase.git
cd taskarimSupabase
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

4. Run the development server:

```bash
npm run dev
```

## 🗄 Database Schema

Basic table example:

```
tasks (
  id uuid primary key,
  title text,
  completed boolean default false,
  created_at timestamp default now()
)
```

## 📚 API Examples

Fetch tasks:

```ts
const { data } = await supabase.from('tasks').select('*')
```

Add task:

```ts
await supabase.from('tasks').insert({ title: 'New Task' })
```

## 📌 Roadmap

* [ ] User-specific tasks
* [ ] Categories & labels
* [ ] Drag & drop UI
* [ ] Analytics dashboard

## 🤝 Contributing

Pull requests are welcome!
****
