# Portfolio Devs

Professional developer portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Includes smooth animations with Framer Motion and contact functionality via Nodemailer.

## 🚀 Features

- **Next.js 16** with Turbopack for ultra-fast development
- **React 19** with the latest features
- **TypeScript** for type-safe code
- **Tailwind CSS 4** for modern and responsive styling
- **Framer Motion** for smooth animations
- **Pexels API** integration for dynamic photo gallery
- **Contact Form** with email integration
- Fully responsive design

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JamesPicado/devs_project.git
   cd devs_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file based on `.env.local.example`:

   ```bash
   cp .env.local.example .env.local
   ```

   Then add your credentials:
   - **PEXELS_API_KEY**: Get your free API key from [Pexels API](https://www.pexels.com/api/)
   - **EMAIL_USER** & **EMAIL_PASSWORD**: For the contact form (optional)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the project.

## 📦 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates the production version
- `npm run start` - Starts the production server
- `npm run lint` - Runs the linter

## 🏗️ Project Structure

```
devs_project/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── fonts.ts           # Font configuration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   ├── page.tsx           # Home page
│   ├── NavigationMenu.tsx # Navigation menu
│   └── TypingTitle.tsx    # Animated title component
├── public/                # Static files
│   ├── icons/            # Icons
│   └── img_projects/     # Project images
└── ...configs             # Configuration files
```

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js application is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository into Vercel
3. Vercel will automatically detect Next.js and configure the build

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 👨‍💻 Author

**JamesPicado**

## 📄 License

This project is private.
