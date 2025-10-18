
# Steve Sabludowsky - AI & Video Consultant Website

A Next.js 14 application with CMS for managing articles and projects.

## Features

- Landing page with AI assistant integration
- Portfolio showcase
- Article/blog management system
- Admin dashboard for content management
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ or compatible
- PostgreSQL database
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database connection and other required variables.

4. Set up the database:
   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

5. Run the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating an Admin User

Run the seed script to create an admin user:
```bash
yarn prisma db seed
```

Default admin credentials:
- Email: admin@example.com
- Password: admin123

**Change these credentials immediately after first login!**

## Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

Make sure to:
1. Set up a production PostgreSQL database
2. Configure all environment variables
3. Run `yarn build` to test the production build

## Tech Stack

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Radix UI components

## License

Private project for Steve Sabludowsky.
