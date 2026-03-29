# ProdAI - AI Productivity Assistant

![App Preview](https://imgix.cosmicjs.com/ced3ba90-2b26-11f1-9e4e-df0ebc750dd9-autopilot-photo-1460925895917-afdab827c52f-1774758110386.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern AI Productivity Assistant inspired by Google's design philosophy. ProdAI helps users manage tasks, track productivity, and leverage AI-powered insights to optimize daily workflow — all powered by [Cosmic](https://www.cosmicjs.com) CMS.

## Features

- 📊 **Dynamic Dashboard** — Real-time productivity metrics with interactive charts
- ✅ **Task Management** — Browse, filter, and manage tasks by status, priority, and category
- 🗂️ **Category Organization** — Color-coded categories with icons and descriptions
- 🤖 **AI Insights** — Personalized productivity recommendations and pattern analysis
- 📈 **Performance Visualization** — Completion rates, time tracking, and trend analysis
- ⏱️ **Time Tracking** — Estimated vs actual time comparisons
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- 🎨 **Google-Inspired Design** — Clean, minimal UI with vibrant accents

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69c8a862f9808e52fa7d9e81&clone_repository=69c8a9f3f9808e52fa7d9ee4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: AI Productivity Assistant (Inspired by Google)
>
> The AI Productivity Assistant is a full-stack web application designed to help users effectively manage tasks, track productivity, and improve daily performance through intelligent insights. Inspired by modern productivity tools developed by Google, the system aims to solve common issues such as poor time management, missed deadlines, and lack of performance awareness.
>
> This application allows users to create, update, and manage daily tasks while tracking the time spent on each activity. It provides a dynamic dashboard that visualizes productivity metrics such as completed tasks, time utilization, and performance trends using interactive charts.
>
> A key feature of the system is its AI-based suggestion engine, which analyzes user behavior and generates personalized recommendations. For example, the system identifies the user's most productive time periods, detects idle time, and suggests strategies to improve efficiency. These insights help users optimize their workflow and make better use of their time.
>
> The project is developed using a modern technology stack, including React for the frontend, FastAPI for the backend, and MongoDB for data storage. It follows the Software Development Life Cycle (SDLC) methodology, covering all phases from requirement analysis and system design to development, testing, deployment, and maintenance.
>
> Overall, the AI Productivity Assistant demonstrates how intelligent systems can be used to enhance personal productivity and decision-making through data-driven insights."

### Code Generation Prompt

> "Build a Next.js application for a website called 'ProdAI'. The content is managed in Cosmic CMS with the following object types: task-categories, tasks, ai-insights. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> AI Productivity Assistant (Inspired by Google) — The AI Productivity Assistant is a full-stack web application designed to help users effectively manage tasks, track productivity, and improve daily performance through intelligent insights. Inspired by modern productivity tools developed by Google, the system aims to solve common issues such as poor time management, missed deadlines, and lack of performance awareness."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Recharts](https://recharts.org/) — Composable chart library for React

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing task-categories, tasks, and ai-insights object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd prodai

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

// Fetch tasks with category depth
const { objects: tasks } = await cosmic.objects
  .find({ type: 'tasks' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch AI insights
const { objects: insights } = await cosmic.objects
  .find({ type: 'ai-insights' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Task Categories | `task-categories` | Organizes tasks with colors and icons |
| Tasks | `tasks` | Full task objects with priority, status, time tracking |
| AI Insights | `ai-insights` | AI-generated productivity recommendations |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->