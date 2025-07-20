# Trip Tracker UI

A modern, responsive web application for tracking and monitoring trips with comprehensive multilingual support and RTL/LTR layouts.

## 🚀 Features

- **🌍 Multilingual Support**: Arabic and English with automatic RTL/LTR layout switching
- **📱 Responsive Design**: Mobile-first approach with adaptive navigation
- **🎨 Dynamic Theming**: Customizable color system with CSS variables
- **🔤 Smart Typography**: Automatic font switching (Cairo for Arabic, Roboto for English)
- **⚡ Performance Optimized**: Built with Next.js 15 and modern React patterns
- **♿ Accessibility**: WCAG 2.1 compliant with full keyboard navigation
- **🎯 Type Safe**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Cairo, Roboto)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Development**: ESLint, Prettier

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/ahmed-reda-301/trip-tracker-ui.git

# Navigate to project directory
cd trip-tracker-ui

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
trip-tracker-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── providers/        # Context providers
│   │   ├── shared/           # Shared components
│   │   └── ui/               # UI components
│   ├── contexts/             # React contexts
│   │   └── LanguageContext.tsx
│   ├── lib/                  # Utilities
│   │   └── translations.ts
│   └── types/                # TypeScript definitions
├── docs/                     # Documentation
│   ├── document-layout.md    # Architecture guide
│   └── color-system.md       # Color customization guide
├── public/                   # Static assets
└── configuration files
```

## 🌐 Internationalization

### Supported Languages

- **English (en)**: Left-to-right layout with Roboto font
- **Arabic (ar)**: Right-to-left layout with Cairo font

### Adding Translations

1. Update `src/lib/translations.ts`
2. Add new translation keys
3. Test both RTL and LTR layouts

### Language Switching

The language preference is automatically saved to localStorage and persists across sessions.

## 🎨 Customization

### Color System

The application uses CSS custom properties for easy theming. See [Color System Guide](docs/color-system.md) for detailed customization instructions.

#### Quick Color Changes

```css
/* In src/app/globals.css */
:root {
  --header-primary: 0 36 71; /* Header background */
  --nav-active: 5 148 211; /* Active navigation */
  --nav-hover: 97 179 79; /* Hover states */
  --gradient-primary: #0895d3; /* Primary gradient */
  --gradient-secondary: #60b460; /* Secondary gradient */
}
```

### Typography

Fonts are automatically switched based on the selected language:

- **Arabic**: Cairo font family
- **English**: Roboto font family

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px (Sidebar navigation)
- **Tablet**: 768px - 1024px (Hybrid navigation)
- **Desktop**: > 1024px (Horizontal navigation)

### Navigation Patterns

- **Desktop**: Horizontal navigation bar with dropdowns
- **Mobile**: Collapsible sidebar with touch-friendly interactions

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (if configured)

### Component Development

1. Create components in appropriate folders
2. Add TypeScript interfaces
3. Include JSDoc documentation
4. Export from index files
5. Test responsive behavior

## 📚 Documentation

- **[Document Layout](docs/document-layout.md)**: Complete architecture guide
- **[Color System](docs/color-system.md)**: Color customization guide
- **Component Documentation**: Inline JSDoc comments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for components
- Ensure responsive design
- Test RTL/LTR layouts
- Maintain accessibility standards

## 🐛 Troubleshooting

### Common Issues

#### Fonts Not Loading

- Ensure Google Fonts are properly imported
- Check network connectivity
- Verify font variable names in CSS

#### RTL Layout Issues

- Check CSS logical properties usage
- Verify Tailwind RTL classes
- Test with Arabic content

#### Build Errors

- Clear `.next` folder and rebuild
- Check TypeScript errors
- Verify all imports are correct

### Performance Issues

- Use Next.js Image component for images
- Implement code splitting for large components
- Monitor bundle size with `npm run analyze`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Ahmed Reda** - Lead Developer
- **Trip Tracker Team** - Development Team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Google Fonts for the beautiful typography
- Lucide for the icon library
- Open source community for inspiration and tools

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` folder

---

**Built with ❤️ by the Trip Tracker Team**
