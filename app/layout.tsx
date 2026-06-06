import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Центр Недвижимости — Расчет Льготной Ипотеки',
  description: 'Продажа и покупка квартир с субсидией, льготной ипотекой и маткапиталом. Быстрый и честный расчет.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-gray-900 bg-slate-50 min-h-screen selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
