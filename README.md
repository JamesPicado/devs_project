# Portfolio Devs

Portafolio profesional de desarrolladores construido con Next.js 16, React 19, TypeScript y Tailwind CSS. Incluye animaciones fluidas con Framer Motion y funcionalidad de contacto mediante nodemailer.

## 🚀 Características

- **Next.js 16** con Turbopack para desarrollo ultra-rápido
- **React 19** con las últimas características
- **TypeScript** para código type-safe
- **Tailwind CSS 4** para estilos modernos y responsivos
- **Framer Motion** para animaciones suaves
- **Formulario de contacto** con integración de email
- Diseño completamente responsive

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JamesPicado/devs_project.git
   cd devs_project
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno** (si es necesario)
   Crea un archivo `.env.local` con tus configuraciones de email para nodemailer.

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000) para ver el proyecto.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🏗️ Estructura del Proyecto

```
devs_project/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── fonts.ts           # Configuración de fuentes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── NavigationMenu.tsx # Menú de navegación
│   └── TypingTitle.tsx    # Componente de título animado
├── public/                # Archivos estáticos
│   ├── icons/            # Iconos
│   └── img_projects/     # Imágenes de proyectos
└── ...configs             # Archivos de configuración
```

## 🚀 Deploy en Vercel

La forma más fácil de deployar tu aplicación Next.js es usar [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Haz push de tu código a GitHub
2. Importa tu repositorio en Vercel
3. Vercel detectará automáticamente Next.js y configurará el build

Consulta la [documentación de deployment de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 👨‍💻 Autor

**JamesPicado**

## 📄 Licencia

Este proyecto es privado.
