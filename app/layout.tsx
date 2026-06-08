import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < e.length; j++) {if (e[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(109697187, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img 
              src="https://mc.yandex.ru/watch/109697187" 
              style={{ position: 'absolute', left: '-9999px' }} 
              alt="" 
              referrerPolicy="no-referrer"
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
