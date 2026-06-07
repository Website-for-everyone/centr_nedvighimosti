import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ВАЖНО: Импортируем умные скрипты Next.js

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Единый Центр Недвижимости",
  description: "Интерактивный расчет ипотеки и подбор жилья",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // ⚡ ВСТАВЬ СЮДА СВОЙ ID СЧЕТЧИКА ИЗ КАБИНЕТА ЯНДЕКС МЕТРИКИ (только цифры в кавычках)
  const METRIKA_ID = "ТВОЙ_НОМЕР_СЧЕТЧИКА"; 

  return (
    <html lang="ru">
      <head>
        {/* Кристально правильное подключение Яндекс Метрики для Next.js App Router */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < e.scripts.length; j++) {if (e.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${METRIKA_ID}, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Исправленный тег noscript, адаптированный под правила JSX/React */}
        <noscript>
          <div>
            <img 
              src={`https://mc.yandex.ru/watch/${METRIKA_ID}`} 
              style={{ position: "absolute", left: "-9999px" }} 
              alt="" 
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
