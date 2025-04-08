import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  description:
    'Привычкинг поможет вам формировать полезные привычки, отслеживать прогресс и достигать своих целей. Бесплатный сервис для развития личной эффективности.',
  keywords:
    'привычки, формирование привычек, трекер привычек, личная эффективность, саморазвитие, достижение целей',
  openGraph: {
    title: 'Привычкинг - Ваш помощник в формировании привычек',
    description:
      'Формируйте полезные привычки, отслеживайте прогресс и достигайте целей с помощью удобного трекера привычек',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Привычкинг',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  alternates: {
    canonical: 'https://привычкинг.рф',
  },
};

export default async function Home() {
  return (
    <main className="flex items-center justify-between min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Привычкинг.рф
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Формируйте полезные привычки и достигайте своих целей
          </p>
          <div className="flex justify-center gap-6">
            <Button asChild size="lg">
              <Link href="/app">
                Начать бесплатно <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Отслеживание привычек
            </h3>
            <p className="text-gray-600">
              Ежедневный мониторинг ваших привычек и прогресса
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Статистика</h3>
            <p className="text-gray-600">Детальная аналитика вашего развития</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Напоминания</h3>
            <p className="text-gray-600">
              Своевременные уведомления о важных привычках
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
