import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn("Telegram Bot Integration: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment variables.");
      return NextResponse.json({
        success: true,
        message: "Lead processed locally (Telegram not configured)",
      });
    }

    // Design a clear and beautiful notification message for Telegram
    const formattedDate = lead.submittedAt || new Date().toLocaleString("ru-RU");
    const isBuy = lead.goal === "buy";
    
    let message = `🎯 *НОВЫЙ ЛИД — ЦЕНТР НЕДВИЖИМОСТИ*\n`;
    message += `📅 *Дата:* ${formattedDate}\n\n`;
    message += `👤 *Клиент:* ${lead.name} ${lead.lastName || ""}\n`;
    message += `📞 *Телефон:* \`${lead.phone}\`\n`;
    message += `💬 *Способ связи:* ${lead.contactMethod || "Не указан"}\n`;
    if (lead.telegramUsername) {
      const username = lead.telegramUsername.startsWith('@') ? lead.telegramUsername : `@${lead.telegramUsername}`;
      message += `✈️ *Telegram:* ${username}\n`;
    }
    message += `\n`;

    message += `🏢 *Цель:* ${isBuy ? "🔑 Хочет Купить Квартиру" : "💰 Хочет Продать Квартиру"}\n`;

    if (isBuy) {
      if (lead.program) {
        message += `📋 *Программа:* ${lead.program}\n`;
      }
      if (lead.propertyValue) {
        message += `💵 *Стоимость жилья:* ${lead.propertyValue.toLocaleString("ru-RU")} ₽\n`;
      }
      if (lead.downPayment) {
        message += `💸 *Первоначальный взнос:* ${lead.downPayment.toLocaleString("ru-RU")} ₽\n`;
      }
      if (lead.useMatCap) {
        message += `👶 *Использовать маткапитал:* Да\n`;
      }
      if (lead.monthlyPayment) {
        message += `🗓️ *Ежемесячный платеж (ориентир):* ${lead.monthlyPayment.toLocaleString("ru-RU")} ₽/мес\n`;
      }
      if (lead.rooms) {
        message += `🚪 *Комнат:* ${lead.rooms}\n`;
      }
      if (lead.locationType) {
        message += `📍 *Город:* ${lead.locationType}\n`;
      }
      if (lead.readiness) {
        message += `⏳ *Сроки:* ${lead.readiness}\n`;
      }
      if (lead.condition) {
        message += `✨ *Тип льготы:* ${lead.condition}\n`;
      }
    } else {
      // Selling
      if (lead.propertyValue) {
        message += `💵 *Желаемая цена:* ${lead.propertyValue.toLocaleString("ru-RU")} ₽\n`;
      }
      if (lead.rooms) {
        message += `🚪 *Комнат:* ${lead.rooms}\n`;
      }
      if (lead.locationType) {
        message += `📍 *Город:* ${lead.locationType}\n`;
      }
      if (lead.condition) {
        message += `💎 *Льгота:* ${lead.condition}\n`;
      }
      if (lead.urgency) {
        message += `⚡ *Срочность:* ${lead.urgency}\n`;
      }
    }

    if (lead.details && Array.isArray(lead.details)) {
      message += `\n📋 *Ответы на квиз:*\n`;
      lead.details.forEach((detail: string) => {
        message += `${detail}\n`;
      });
    }

    // Call Telegram API
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(tgUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Telegram API error response:", errorText);
      throw new Error(`Telegram API responded with status ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      message: "Lead sent to Telegram successfully!",
    });
  } catch (err: any) {
    console.warn("Error sending lead to Telegram:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
