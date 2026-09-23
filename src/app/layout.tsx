import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ilma Siddiqui — UI/UX Designer & Visual Designer',
  description:
    'Continuous 3D spatial portfolio of Ilma Siddiqui featuring UI/UX design, visual branding, creative leadership, and CSE background.',
  keywords: [
    'Ilma Siddiqui',
    'UI/UX Designer',
    'Visual Designer',
    'Figma',
    'Canva',
    '3D Spatial Portfolio',
    'Google Developer Group',
    'Web Design'
  ],
  authors: [{ name: 'Ilma Siddiqui' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
