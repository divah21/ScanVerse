# ScamVerse

An AI-powered cybersecurity platform that protects users from online scams and fraud.

## Features

🛡️ **Real-time URL Analysis** - Advanced AI-powered scam detection using Moonshot AI
🔍 **Deep Security Scanning** - Comprehensive analysis of websites for threats
👨‍💼 **Admin Dashboard** - Professional management interface with analytics
🤖 **AI Assistant** - Interactive chat bot for security guidance
📊 **Analytics & Reporting** - Detailed insights and threat monitoring
🎨 **Modern UI** - Beautiful dark theme with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Animations**: GSAP with ScrollTrigger
- **AI Integration**: OpenRouter API with Moonshot AI (kimi-dev-72b)
- **Backend**: Next.js API routes
- **Database**: Ready for integration (Appwrite/Supabase)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/divah21/ScanVerse.git
   cd ScanVerse
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=moonshot/kimi-dev-72b:free
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
scamverse/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   └── analyze/           # Analysis pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── analyze/          # Analysis components
│   ├── common/           # Shared components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript definitions
```

## Key Features

### 🔍 AI-Powered Analysis

- Deep URL security scanning
- Real-time threat detection
- Confidence scoring and risk assessment
- Detailed security recommendations

### 👨‍💼 Admin Dashboard

- Collapsible sidebar navigation
- Real-time analytics and metrics
- Report management system
- User and threat monitoring

### 🤖 Intelligent AI Assistant

- Natural conversation interface
- Automatic URL analysis detection
- Contextual security advice
- Animated floating interface

### 🎨 Modern Design

- Dark theme with blue/cyan accents
- Smooth GSAP animations
- Responsive design
- Professional UI components

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
```

## Environment Variables

Create a `.env.local` file with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=moonshot/kimi-dev-72b:free
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

This project handles security-related data. Please ensure:

- Never commit API keys or sensitive data
- Keep dependencies updated
- Follow security best practices
- Report security issues responsibly

---

Built with ❤️ for a safer internet
