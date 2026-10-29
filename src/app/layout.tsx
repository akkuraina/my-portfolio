import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
import AmbientOceanBackground from '../components/AmbientOceanBackground';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});


export const metadata = {
  title: 'Akanksha Raina | Full-Stack Developer & SDE',
  description: 'Full-stack developer building web products, backend systems, and AI-integrated applications.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}>
      <body className="bg-canvas text-ink antialiased transition-colors duration-300">
        <ThemeProvider>
          <AmbientOceanBackground />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
