# AI Needs Diagnostic

Survey app for **Professional Readiness in the Age of AI**.

## Deploy to Railway (10 minutes)

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) → **New repository** → name it `ai-diagnostic` → Private → Create
2. Unzip this folder on your computer
3. Open a terminal in the `ai-diagnostic` folder and run:

```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-diagnostic.git
git push -u origin main
```

### Step 2 — Deploy on Railway

1. Go to [railway.app](https://railway.app) → **New Project** → Deploy from GitHub repo
2. Select `ai-diagnostic` — Railway detects the config and builds automatically
3. Go to **Settings → Networking → Generate Domain**

That domain is your student link. Share it on Canvas, in a text, wherever.

## Dashboard

From the landing page, click **View dashboard** and enter the password:

```
criticalai2026
```

**Download CSV** after each class session as a backup.

## Local development

```bash
npm install
npm run dev     # frontend on :5173 (proxies /api to :3000)
node server.js  # backend on :3000
```
