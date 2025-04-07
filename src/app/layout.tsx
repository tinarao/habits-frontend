import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Привычкинг.рф - Умное отслеживание привычек',
  description:
    'Создавайте и отслеживайте полезные привычки, достигайте целей и развивайтесь с помощью нашего удобного приложения. Персональная статистика, напоминания и мотивация.',
  keywords:
    'привычки, трекер привычек, развитие, самосовершенствование, достижение целей, продуктивность',
  openGraph: {
    title: 'Привычкинг.рф - Умное отслеживание привычек',
    description:
      'Создавайте и отслеживайте полезные привычки, достигайте целей и развивайтесь с помощью нашего удобного приложения.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Привычкинг.рф',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: 'https://привычкинг.рф',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
