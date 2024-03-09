const TelegramBot = require("node-telegram-bot-api");

const token = "6778485351:AAF3n665bZjMYQTQEVQVqMsu6dyoWIQodYs";

const bot = new TelegramBot(token, { polling: true });

const logo = "./totalBlack.jpeg";

const operatorContact = "https://t.me/Magnetificc";

const handleOperator = async (msg) => {
  const chatId = msg.chat.id;
  const message =
    "❗️ Актуальные контакты оператора. Писать строго по делу, без мета вопросов! ❗️\n\n фейк телеграм (посилання буде автоматичне)";
  const options = {
    reply_markup: {
      keyboard: [["⛓️ Меню ⛓️"]],
      resize_keyboard: true,
    },
  };
  await bot.sendMessage(chatId, message, options);
};

const defaultMurkup = (titleMessage) => {
  const options = {
    caption: titleMessage,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💊 Каталог", callback_data: "catalog" },
          { text: "⚡️Профиль", callback_data: "profile" },
          { text: "ℹ️ Информация", callback_data: "info" },
        ],
        [
          { text: "🛒 Мои покупки", callback_data: "purchases" },
          { text: "🚕 Доставка", callback_data: "delivery" },
        ],
        [
          { text: "🔥 Работа", callback_data: "work" },
          { text: "🧑‍💻 Оператор", callback_data: "operator" },
          { text: "👥 Реферальная программа", callback_data: "ref" },
        ],
        [{ text: "💲 Пополнить баланс 💲", callback_data: "balance" }],
      ],
    },
  };
  return options;
};

const handleStart = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const titleMessage =
      "⚡️ Добро пожаловать в магазин @tootalblackbot ⚡️\n\n▪️ В данном магазине вы можете получить в короткие сроки необходимый вам товар.\n ▪️ Выдача адресов происходит круглосуточно через бота.\n▪️ Внимательней проверяйте адрес оператора, остерегайтесь фейков.\n▪️ Если вашего города нет в каталоге, напишите оператору, оформим предзаказ или доставку.";
    const options = defaultMurkup(titleMessage);
    console.log(msg);
    await bot
      .sendMessage(chatId, "💊")
      .then(bot.sendPhoto(chatId, logo, options));
  } catch (error) {
    console.error("Помилка в обробці команди /start:", error.message);
  }
};

function getFormattedTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const miliseconds = now.getMilliseconds().toString().padStart(3, "0");
  return `${+hours + 1}:${minutes}:${seconds}:${miliseconds}`;
}

const profile = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const time = getFormattedTime();
    const titleMessage = `<strong>⚡️ Профиль ⚡️</strong>\n\n👤 <strong>Пользователь:</strong> <code>${msg.chat.first_name}</code>\n╠ Логин: @${msg.chat.username}\n╠ ID: <code>${chatId}</code>\n╠ Рейтинг: <code>0%</code>\n╠ Открытые диспуты: <code>0</code>\n╚ Активированный промокод: <code>Отсутсвует</code>\n\n💵 Баланс: <code>0</code> ₽\n\nОбновлено: ${time}`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки profile:", error.message);
  }
};

const info = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>ℹ️ Информация ℹ️</strong>\n\n▪️ Все наши сотрудники проходят обучение в соответствии с высокими стандартами безопасности. Их безопасность - это безопасность наших клиентов.\n\n▪️ Все клады делаются надежным способом, вероятность их подрыва равносильна вероятности форс мажора (убрали забор, перекопали землю и т.д.). \n\n▪️ Товар проходит двух этапное тестирование. Сначала мы тестируем то, что предлагают наши поставщики, а потом мы тестируем уже приобретенный товар. Наши клиенты могут быть всегда уверены в высочайшем качестве любой позиции из ассортимента.\n\n▪️ Работа каждого участника в команде контролируется.\n\n▪️ Клады делаются на магнитах в городской черте, в пешей доступности от метро или крупных транспортных узлов. Закапываются в случае, если делаются в лесу или парке.\n\n▪️ Персональные, комбинированные и заказы на опт, исполняются в течение 24 часов после оплаты.\n\n📑 Отзывы наших покупателей — перейти ${operatorContact}`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки info:", error.message);
  }
};
const purchases = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `🛒 История покупок не найдена... 🛒\n\n По вопросам заказов: перейти ${operatorContact}`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки purchases:", error.message);
  }
};

const delivery = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>🚕 Доставка 🚕</strong>\n\n▪️ При покупке любого товара с витрины вы можете заказать доставку.\n\n▪️ Если вы не нашли интересующий товар, напишите оператору, чтобы оформить предзаказ или доставку. Предзаказ имеет смысл, если в данный момент нет товара в наличии.\n▪️ Доставка полностью анонимная. Никаких контактов с курьером. Для осуществления доставки необходимо указать желаемый адрес и курьер оставит клад в радиусе 300м, после чего сообщит координаты с фото.\n\n💸 Стоимость доставки:\n▫️ Обычная — 1900 ₽\n╚ Срок выполнения: от 4 до 12 часов\n▫️ Ускоренная — 2500 ₽\n╚ Срок выполнения: от 1 до 2 часов\n▫️ Предзаказ — оплата только стоимости товара\n╚ Срок выполнения: до 36 часов.\n\n▪️ При заказе от 10000 ₽ доставка за счет магазина.`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки delivery:", error.message);
  }
};

const operator = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>👨‍💻 Оператор 👨‍💻</strong>\n\n▪️ В данном разделе можно сверить контакты оператора, либо же начать с ним диалог.\n\n▪️ Остерегайтесь фейков, оператор никогда не напишет первым и осущетсвляет поддержку с помощью бота. (а не с какого-то аккаунта)\n\n<strong>▪️ Важные правила при общении с оператором:</strong>\n\n▪️ Сообщения не несущие смысловой нагрузки, по типу: "привет", "можете подсказать?", "что есть?" будут игнорироваться. Не нужно задавать мета вопросов.\n\n▪️ Сообщения по типу: "Сколько стоит экстази/мефедрон" без указания города, района и веса будут игнорироваться. Мы не можем угадать что конкретно вам нужно.\n\n▪️ Пишите сразу по делу, в одно сообщение, например: "г. Москва, район ЦАО, хочу сделать предзаказ на 3г кокаина"\n\n▪️ Различный спам, флуд или оскорбление будут караться блокровкой в нашем магазине.\n\n✅ Актуальные контакты оператора — перейти ${operatorContact}`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки operator:", error.message);
  }
};
const ref = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>👥 Реферальная программа 👥</strong>\n\nВаша реферальная ссылка: <code>https://t.me/tootalblackbot?start=6MME88</code>\n\n▪️ Заработано за всё время: 0 ₽\n\nЕсли человек, приглашенный по реферальной ссылке, пополнит баланс, то вы получите 25% от суммы его депозита`;
    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки purchases:", error.message);
  }
};
const backMenu = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage =
      "⚡️ Добро пожаловать в магазин @tootalblackbot ⚡️\n\n▪️ В данном магазине вы можете получить в короткие сроки необходимый вам товар.\n ▪️ Выдача адресов происходит круглосуточно через бота.\n▪️ Внимательней проверяйте адрес оператора, остерегайтесь фейков.\n▪️ Если вашего города нет в каталоге, напишите оператору, оформим предзаказ или доставку.";

    const options = defaultMurkup();

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки backMenu:", error.message);
  }
};

//Каталог
const catalog = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий город:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💠 Архангельск", callback_data: "archReg" },
            { text: "💠 Барнаул", callback_data: "barnReg" },
          ],
          [
            { text: "💠 Белгород", callback_data: "belReg" },
            { text: "💠 Владивосток", callback_data: "wladReg" },
          ],
          [
            { text: "💠 Воронеж", callback_data: "voronReg" },
            { text: "💠 Екатиринбург", callback_data: "ekatReg" },
          ],
          [
            { text: "💠 Иркутск", callback_data: "irkReg" },
            { text: "💠 Казань", callback_data: "kazReg" },
          ],
          [
            { text: "💠 Красноярск", callback_data: "krasnoReg" },
            { text: "💠 Нижний Новгород", callback_data: "novReg" },
          ],
          [
            { text: "💠 Омск", callback_data: "omskReg" },
            { text: "💠 Оренбург", callback_data: "orenReg" },
          ],
          [
            { text: "💠 Москва", callback_data: "moscReg" },
            { text: "💠 Санкт Петербург", callback_data: "peterReg" },
          ],
          [
            { text: "💠 Саратов", callback_data: "saratReg" },
            { text: "💠 Тольятти", callback_data: "tolReg" },
          ],
          [
            { text: "💠 Томск", callback_data: "tomsReg" },
            { text: "💠 Тюмень", callback_data: "tumReg" },
          ],
          [
            { text: "💠 Ульяновск", callback_data: "ulianReg" },
            { text: "💠 Уфа", callback_data: "ufaReg" },
          ],
          [
            { text: "💠 Хабаровск", callback_data: "habarReg" },
            { text: "💠 Ярославль", callback_data: "iarosReg" },
          ],
          [
            { text: "💠 Чита", callback_data: "chitaReg" },
            { text: "💠 Новосибирск", callback_data: "novosReg" },
          ],
          [
            { text: "💠 Сургут", callback_data: "surgReg" },
            { text: "💠 Пермь", callback_data: "permReg" },
          ],
          [
            { text: "💠 Ангарск", callback_data: "angReg" },
            { text: "💠 Соликамск", callback_data: "solikReg" },
          ],
          [
            { text: "💠 Челябинск", callback_data: "chelReg" },
            { text: "💠 Бийск", callback_data: "biyskReg" },
          ],
          [
            { text: "💠 Краснодар", callback_data: "krasReg" },
            { text: "💠 Волгоград", callback_data: "volgReg" },
          ],
          [
            { text: "💠 Луганск", callback_data: "luganReg" },
            { text: "💠 Новокузнецк", callback_data: "novokReg" },
          ],
          [
            { text: "💠 Волжский", callback_data: "volzReg" },
            { text: "💠 Геническ", callback_data: "genicReg" },
          ],
          [{ text: "💠 Мелитополь", callback_data: "melitReg" }],
          [{ text: "🔙 Назад", callback_data: "backMenu" }],
        ],
      },
    };

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const archReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Октябрський", callback_data: "drugs" },
            { text: "🛡️ Северный", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Цигломенский", callback_data: "drugs" },
            { text: "🛡️ Соломбальский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const barnReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Железнодорожный", callback_data: "drugs" },
            { text: "🛡️ Октябрський", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const belReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Гипер Лента", callback_data: "drugs" },
            { text: "🛡️ ТРЦ рио", callback_data: "drugs" },
          ],
          [{ text: "🛡️ ул. Победы", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const wladReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Ленинский", callback_data: "drugs" },
            { text: "🛡️ Первомайский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Первореченский", callback_data: "drugs" },
            { text: "🛡️ Советский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const voronReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Коминтерновский", callback_data: "drugs" },
            { text: "🛡️ Левобережный", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Ленинский", callback_data: "drugs" },
            { text: "🛡️ Советский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const ekatReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Верх-Исетский", callback_data: "drugs" },
            { text: "🛡️ Кировский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Октябрьский", callback_data: "drugs" },
            { text: "🛡️ Чкаловский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Железнодорожный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const irkReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Ленинский", callback_data: "drugs" },
            { text: "🛡️ Октябрьский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Свердловский", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const kazReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Авиастроителей", callback_data: "drugs" },
            { text: "🛡️ Вахитовский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Московский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Приволжский", callback_data: "drugs" },
            { text: "🛡️ Советский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const krasnoReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Взлетка", callback_data: "drugs" },
            { text: "🛡️ Пакровка", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Остров Татышев", callback_data: "drugs" },
            { text: "🛡️ Черемушки", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const novReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Автозавордкий", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Московский", callback_data: "drugs" },
            { text: "🛡️ Советский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const omskReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Советский", callback_data: "drugs" },
            { text: "🛡️ Октябрьский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const orenReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Дзержинский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Промышленний", callback_data: "drugs" },
            { text: "🛡️ Центральный", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const moscReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Крілатское", callback_data: "drugs" },
            { text: "🛡️ Скольники", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Ховрино", callback_data: "drugs" },
            { text: "🛡️ Чертановская", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const peterReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Калининский", callback_data: "drugs" },
            { text: "🛡️ Московский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Пушкинский", callback_data: "drugs" },
            { text: "🛡️ Центральный", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Фрунзецкий", callback_data: "drugs" },
            { text: "🛡️ Невский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Кудрово", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const saratReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Заводской", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Октябрьский", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const tolReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Автозаводской", callback_data: "drugs" },
            { text: "🛡️ Комсомольский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const tomsReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Октябрьский", callback_data: "drugs" },
            { text: "🛡️ Советский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const tumReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Войновка", callback_data: "drugs" },
            { text: "🛡️ Маяк", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Московский тракт", callback_data: "drugs" },
            { text: "🛡️ Центр", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const ulianReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Железнодорожный", callback_data: "drugs" },
            { text: "🛡️ Заволжский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Засвийжский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const ufaReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Демский", callback_data: "drugs" },
            { text: "🛡️ Калининский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const habarReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Краснофлотский", callback_data: "drugs" },
            { text: "🛡️ Центральный", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const iarosReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Дзержинский", callback_data: "drugs" },
            { text: "🛡️ Заволжский", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Кировский", callback_data: "drugs" },
            { text: "🛡️ Фрунзенский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Ленинский", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const chitaReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Железнодорожный", callback_data: "drugs" },
            { text: "🛡️ Центральный", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const novosReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Дзержинский", callback_data: "drugs" },
            { text: "🛡️ Калининский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Советский", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const surgReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Северный жилой", callback_data: "drugs" },
            { text: "🛡️ Центральный", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Северо-восточный жилой", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const permReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Ленинский", callback_data: "drugs" },
            { text: "🛡️ Кировский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Орджоникидзевский", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const angReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Микрорайон 12А", callback_data: "drugs" },
            { text: "🛡️ Микрорайон Байкальск", callback_data: "drugs" },
          ],
          [{ text: "🛡️Микрорайон Майск", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const solikReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Боровск", callback_data: "drugs" },
            { text: "🛡️ Красное", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Поспелово", callback_data: "drugs" },
            { text: "🛡️ Нижний Больничный", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const chelReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Калининский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const biyskReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ 23-й микрорайон", callback_data: "drugs" },
            { text: "🛡️ Микрорайон Заречье", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Октябрьский", callback_data: "drugs" },
            { text: "🛡️ Чкаловский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ микрорайон Зеленый Клин", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const krasReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Западный", callback_data: "drugs" },
            { text: "🛡️ Прикубанский", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Центральный", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const volgReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Красноармейский район", callback_data: "drugs" },
            { text: "🛡️ Советский район", callback_data: "drugs" },
          ],
          [
            { text: "🛡️ Дзержинский район", callback_data: "drugs" },
            { text: "🛡️ Краснооктябрьский район", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const luganReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Артёмовский", callback_data: "drugs" },
            { text: "🛡️ Ленинский", callback_data: "drugs" },
          ],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const novokReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Кузнецкий", callback_data: "drugs" },
            { text: "🛡️ Новоильинский", callback_data: "drugs" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const volzReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ 10 мкр", callback_data: "drugs" },
            { text: "🛡️ Центр", callback_data: "drugs" },
          ],
          [{ text: "🛡️ 7-й Квартал", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const genicReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Центр", callback_data: "drugs" },
            { text: "🛡️ Арабатская стрелка", callback_data: "drugs" },
          ],
          [{ text: "🛡️ ЖилПоселок", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
const melitReg = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий район:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛡️ Центр", callback_data: "drugs" },
            { text: "🛡️ Новый Мелитополь", callback_data: "drugs" },
          ],
          [{ text: "🛡️ Окраина", callback_data: "drugs" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки catalog:", error.message);
  }
};
// drugs
const drugs = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `💠 Выберите интересующий товар:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🔮 Гашишь (Euro)", callback_data: "gash" },
            { text: "🔮 VHQ Мефедрон кристалл", callback_data: "meph" },
          ],
          [
            { text: "🔮 [VHQ] Метадон 98%", callback_data: "meth" },
            { text: "🔮 [VHQ] Шишки griega", callback_data: "shish" },
          ],
          [
            { text: "🔮 xtc Экстази 380мг", callback_data: "ekz" },
            { text: "🔮 [VHQ] Кокаин Боливия 99%", callback_data: "cocain" },
          ],
          [
            { text: "🔮 Гашишь Lemon", callback_data: "gashL" },
            { text: "🔮 AlphaPVP Blue", callback_data: "alpha" },
          ],
          [{ text: "🔮 Героин 777 VHQ", callback_data: "ger" }],
          [
            { text: "🔙 Назад", callback_data: "catalog" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const gash = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>Гашишь (Euro)</strong>\n\n🍭 [VHQ] Гашиш Евро\n🎉 Покупок: 4000+⭐️ Рейтинг: 4.7🔥 Отзывы: 1125\nКлассический сорт гашиша. Отлично подходит для новичков или тех, кто любит чуть-чуть поднять себе настроение. Под этим гашишем можно спокойно находиться в обществе. Отсутствую ярко выраженные эффекты, свойственные изоляторам. Вмеру приятный накур, который хорошо поднимает настроение. Пожалуй, это единственный сорт на нашей витрине, который подходит для ежедневного употребления с самого утра. Мы бы назвали этот сорт - лучшим сортом микродозинга ТГК.\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 3200 ₽ | Гашишь(Euro)",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const meph = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage =
      "<strong>VHQ Мефедрон кристалл</strong>\n\n🍭 [VHQ] Мефедрон Кристалл\n🎉 Покупок: 5000+⭐️ Рейтинг: 4.8🔥 Отзывы: 1155\n\nПриветствуйте - источник страсти и эйфории Мефедрон Кристалл! Изготовленный на современном оборудовании, с применением собственной технологии двойной очистки, прошедший все пробы и тесты, наш мяу заставит окунуться в море эйфории и тепла. Вам захочется поделиться любовью со всеми, кто вас окружает, а повышение либидо сделает вас лучшим любовником в мире! Мягкий вход, длительный эффект, легчайший выход - все это про наш продукт! Бережет ваш нос и нервную систему, что говорит о высокой чистоте вещества. Новичкам начинать с небольших порций!\nДозировки\nИнтраназально:\nСредняя дозировка 100-250 мг.\nВход - 2-5 минут.\nПродолжительность действия 40-90 минут\n\nПерорально:\nСредняя дозировка 200-350 мг.\nВход - 20-40 минут.\nПродолжительность действия 1-3 часа.\n\n💠 Выберите интересующий позицию:";
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 3800 ₽ | Меф тайник",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 2.0г | 6200 ₽ | Меф магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const meth = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage =
      "<strong>[VHQ] Метадон 98%</strong>\n\n🍭 [VHQ] Метадон VHQ 99.3%\n🎉 Покупок: 9000+⭐️ Рейтинг: 4.9🔥 Отзывы: 3612\n\nТеплый колючий плед, объятия любимой женщины, капсула спокойствия - с чем только не ассоциируется этот король опиатов!\n\nНаш магазин предлагает чистейший Метадон, европейского производства, с заботой доставленный прямо на нашу витрину. Соблюдены все тонкости хранения и транспортировки. Стерильные условия фасовки и ответственная работа курьеров позволяют вам не задумываясь приобретать наш Метадон каждый раз, и просто наслаждаться этим творением современной науки.\n\nПРОБОВАТЬ С ОСТОРОЖНОСТЬЮ! чистота 99,3%\n\nДозировка подбирается индивидуально, в зависимости от чистоты вещества и Вашей толерантности. Рекомендуем при знакомстве с данным веществом начинать с самого минимума, опьяняющий эффект проявляется от приема 5мг.\nСредняя разовая доза составляет 10-15мг\n\n💠 Выберите интересующий позицию:";
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 4200 ₽ | Метадон прикоп",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 2.0г | 6900 ₽ | Метадон магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const shish = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>[VHQ] Шишки griega</strong>\n\n🍭 [VHQ] Шишки Griega\n🎉 Покупок: 43000+⭐️ Рейтинг: 4.8🔥 Отзывы: 11906\nСорт Griega - бережно выращен нашими гроверами для самых настоящих любителей сативы и мощного накура.Содержание ТГК достигает аж 27%, а его эффект способен вскружить голову даже самому прожженному Толе. Этот сорт конопли новичкам следует пробовать с особенной осторожностью!\nСорт стал знаменит благодаря своим целительным качествам. Его активно прописывают пациентам с мигренями, синдромом хронической усталости, при потере аппетита и депрессии.Шишка обладает мощным психоактивным воздействием, пробуждает коммуникативные навыки, способствует улучшению настроения, часто наблюдается прилив эйфории - все вокруг становится веселым и завлекающим. С нашей шишкой ты получишь яркие переживания, а все твои проблемы уйдут на второй план. Тебе понравится)\nСатива - 80%Индика - 20 %Содержание ТГК - 27.12%\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 3400 ₽ | Шишки тайник",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 2.0г | 6600 ₽ | Шишки магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const ekz = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>xtc Экстази 380мг</strong>\n\n🍭 [VHQ] Экстази MIX\n🎉 Покупок: 1000+⭐️ Рейтинг: 4.9🔥 Отзывы: 435\nКто пробовал экстази, тот знает, что большинство дисков между собой похожи. Мы решили сыграть на этом и собрали для вас наш Экстази Микс. Разнообразные формы, мощный эффект,содержание МДМА 250-270 мг, собранные от нескольких крупных поставщиков Европы, порадуют как любителей откровенных разговоров с друзьями, так и прожженных рейверов! Отличаются скоростью входа и выхода, разница в мощности незначительна.\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 2.0г | 3800 ₽ | Экстази тайник",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 4.0г | 6900 ₽ | Экстази магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const cocain = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `[VHQ] Кокаин Боливия 99%\n\n🍭 [VHQ] Кокаин Боливия\n🎉 Покупок: 100+⭐️ Рейтинг: 5.0🔥 Отзывы: 25\nПроизводство - BoliviaНастоящий Фишскейл, при верном расчете дозировки подойдет как для вечеринки, так и для приватного времяпрепровождения со второй половинкой, а может и с тремя обожаемыми четвертинками! Правильная горечь во вкусе, которая не останется на долго.Эффекты:• Стимуляция• Эйфория• Прилив сил• Усиление умственной активности• Физическая выносливость• Снижение потребности во сне и еде Характеристики:• Цвет - Белый• Вкус - Горьковатый, с послевкусием и соответствующим онемением• Структура камня – Хлопьевидная• Эффект продлится от 20 до 40 минут.Дозировка: Назально - 30-60 мг. Ожидание составляет в среднем 3-5 минут.\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 0.5г | 6900 ₽ | Кокаин прикоп",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 1.0г | 14800 ₽ | Кокаин магнит🧲",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 2.0г | 23899 ₽ | Надежный тайник!",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const gashL = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `Гашишь Lemon\n\n🍭 [VHQ] Гашиш Lemon Ice-o-lator\n🎉 Покупок: 20000+⭐️ Рейтинг: 4.8🔥 Отзывы: 5514\nВашему вниманию предлагаем новинку рынка - ICE-O-LATOR LEMON. Создан по старой доброй технологии ледяной экстракции, с использованием новейшего оборудования. В качестве сырья для данного гашиша использованы сативные растения сорта Lemon Haze. Оттенки напоминают аромат лимона - пробьёт любой осенний насморк. Мягкий, липкий, плавится прямо в руках, что говорит о правильно подготовленном сырье. Перед употреблением рекомендуем выдержать его в морозилке несколько минут. После первой ляпки всё тело погружается в тёплые волны релакса. Остаётся включить комедию и заварить чай. Гашиш свежий, партия этого года!\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 3400 ₽ | Экстази тайник",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 2.0г | 5700 ₽ | Экстази магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const alpha = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `AlphaPVP Blue\n\n\n\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 1.0г | 3400 ₽ | Альфа тайник",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};
const ger = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `Героин 777 VHQ\n\n\n\n\n💠 Выберите интересующий позицию:`;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🪄 0.5г | 3700 ₽ | Героин тайник",
              url: operatorContact,
            },
          ],
          [
            {
              text: "🪄 1.0г | 5800 ₽ | Героин магнит🧲",
              url: operatorContact,
            },
          ],
          [
            { text: "🔙 Назад", callback_data: "drugs" },
            { text: "🔙 Главное меню", callback_data: "backMenu" },
          ],
        ],
      },
    };
    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки drugs:", error.message);
  }
};

// Робота
const workerMurkup = () => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🏃 Курьер", callback_data: "deliveryMan" },
          { text: "🖼️ Трафаретчик", callback_data: "stenciller" },
          { text: "🚛 Водитель", callback_data: "deliveryCar" },
        ],
        [
          { text: "📄 Верификация", callback_data: "verify" },
          { text: "🧑‍💻 Оператор", callback_data: "operatorWork" },
        ],
        [{ text: "✍️ Написать оператору", url: `${operatorContact}` }],
        [{ text: "🔙 Назад", callback_data: "backMenu" }],
      ],
    },
  };
  return options;
};
const work = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `🛒 История покупок не найдена... 🛒\n\n По вопросам заказов: перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
const deliveryMan = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `🏃‍♂️ Курьер 🏃‍♂️\n\nНам требуются как опытные сотрудники, так и люди без опыта работы.\nПочему именно мы? Чем мы лучше других организаций? Что же мы предлагаем? Давайте по порядку:\n\n▪️ Мы платим за загруженные адреса, Вам не нужно ожидать продажи клада.\n▪️ Оплата за выполненую работу в этот же день.\n▪️ Премии, бонусы и конкурсы среди курьеров организуются ежемесячно.\n▪️ Обладаем огромной библиотекой обучающих материалов. Обучение проводится сотрудниками со стажем работы более пяти лет.\n▪️ Присутствует чат для курьеров, в котором Вы сможете обмениваться опытом с другими сотрудниками.\n▪️ Возможность карьерного роста вплоть до куратора.\n\nУстройство исключительно по залогу от 3000 ₽. Для начала трудоустройства напишите свой город оператору.\n\n👨‍💻 Оператор — перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
const stenciller = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `🖼 Траффаретчик 🖼\n\nСуть работы - нанесение рисунка на проходимые места, фотографирование граффити через приложение NoteCam\n\n▪️ Оплата 140 ₽/граффити.\n▪️ Выплата от 20 граффити.\n▪️ Текст граффити выдаст оператор.\n▪️ Чек при покупке краски сохраняйте, за краску выплачиваем вместе с ЗП.\n▪️ На одном доме до 2х рисунков. Минимальное расстояние между друг другом — 50м.\n▪️ Запрещенно делать на заброшках, малопроходимых местах и так далее.\n▪️ Разрешено делать на остановках, многоэтажках, магазинах и так далее.\n\nДля начала трудоустройства напишите свой город оператору и купите баллон с краской\n\n👨‍💻 Оператор — перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
const deliveryCar = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `🚛 Водитель 🚛\n\nГрафик не нормирован, рейсы на разные расстояния, ЗП от 1000$ за рейс, работа с большим весом.\n\nСуть работы - перевозка товара(хим. состава нелегального характера между городами).\n\n▪️ Все расходные материалы покрывают отдельно (ГСМ, аренда жилья по надобности).\n▪️ Оплату получаете после доставки товара, когда его проверят, все расходы так же возмещают в ЗП.\n▪️ Выплаты на биткоин кошелек, если не умеете им пользоваться этому обучат, не проблема.\n▪️ После устройства куратор так же проведет полный инструктаж по работе и по технике безопасности, расскажет что и как делать маскировать + будет один стажировочный рейс по месту (оплачиваемый).\n\nУстройство исключительно по залогу от 60000 ₽. Для начала трудоустройства напишите свой город оператору.\n\n👨‍💻 Оператор — перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
const verify = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `📰 Верификация 📰\n\nСуть работы - прохождение верификации на различных биржах\n\n▪️ Доступно от 2х заданий ежедневно.\n▪️ Выплата после проверки документом сервисом. 2 задания = 2000 ₽.\n▪️ Оплату за верификацию можно использовать как залог для другой вакансии.\n\nДля начала трудоустройства пришлите фото первой страницы паспорта оператору. Пример: перейти (https://telegra.ph/file/52e526bf246fbd07eb5e5.png)\n\n👨‍💻 Оператор — перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
const operatorWork = async (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const titleMessage = `👨‍💻 Оператор 👨‍💻\n\nСуть работы - прием оплаты от клиентов, консультация, выдача координатов.\n\n▪️ График выстраиваете себе самостоятельно (5/2, 2/2 и так далее).\n▪️ Минимальное время работы в день - 4 часа. Но не менее 30ч в неделю.\n▪️ ЗП рассчитывается от % выполненых продаж + премии за количество отвеченных сообщений клиентам.\n▪️ % от продаж рассчитывается от времени суток. Дневное время 5%, ночное 10%.\n▪️ Работа очень тяжелая. Необходим навык быстрого печатания, без допущения орфографических ошибок.\n\nУстройство исключительно по залогу от 5000 ₽. Для начала трудоустройства напишите свой город оператору.\n\n👨‍💻 Оператор — перейти ${operatorContact}`;
  const options = workerMurkup();
  try {
    bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки work:", error.message);
  }
};
//Баланс
const balance = async (msg) => {
  try {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const titleMessage = `<strong>💳 Выберете платёжную систему для депозита:</strong>`;
    const options = {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🥝 QIWI/💳 CARD", url: `${operatorContact}` }],
          [{ text: "🧅 ONION", url: `${operatorContact}` }],
          [{ text: "🌑 CRYPTO", url: `${operatorContact}` }],
          [{ text: "🔙 Назад", callback_data: "backMenu" }],
        ],
      },
    };

    await bot.editMessageCaption(titleMessage, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: options.reply_markup,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Помилка в обробці кнопки balance:", error.message);
  }
};

const commands = {
  start: /\/start/,
  operator: /\/operator/,
};

const handlers = {
  start: handleStart,
  operator: handleOperator,
};

bot.onText(/\/(.+)/, async (msg, match) => {
  const command = match[1];
  if (command in handlers) {
    await handlers[command](msg);
  } else {
    console.log("Невідома команда: " + command);
  }
});

bot.onText(/⛓️ Меню ⛓️/, async (msg) => {
  handleStart(msg);
});

const tempo_operations = {
  catalog: (msg) => {
    catalog(msg);
    console.log("catalog");
  },
  profile: (msg) => {
    profile(msg);
    console.log("profile");
  },
  info: (msg) => {
    info(msg);
    console.log("info");
  },
  purchases: (msg) => {
    purchases(msg);
    console.log("purchases");
  },
  delivery: (msg) => {
    delivery(msg);
    console.log("delivery");
  },
  work: (msg) => {
    work(msg);
    console.log("work");
  },
  operator: (msg) => {
    operator(msg);
    console.log("operator");
  },
  ref: (msg) => {
    ref(msg);
    console.log("ref");
  },
  balance: (msg) => {
    balance(msg);
    console.log("balance");
  },
  backMenu: (msg) => {
    backMenu(msg);
    console.log("backMenu");
  },
  deliveryMan: (msg) => {
    deliveryMan(msg);
    console.log("deliveryMan");
  },
  stenciller: (msg) => {
    stenciller(msg);
    console.log("stenciller");
  },
  deliveryCar: (msg) => {
    deliveryCar(msg);
    console.log("deliveryCar");
  },
  verify: (msg) => {
    verify(msg);
    console.log("verify");
  },
  operatorWork: (msg) => {
    operatorWork(msg);
    console.log("operatorWork");
  },
  archReg: (msg) => {
    archReg(msg);
    console.log("archReg");
  },
  barnReg: (msg) => {
    barnReg(msg);
    console.log("barnReg");
  },
  belReg: (msg) => {
    belReg(msg);
    console.log("belReg");
  },
  wladReg: (msg) => {
    wladReg(msg);
    console.log("wladReg");
  },
  voronReg: (msg) => {
    voronReg(msg);
    console.log("voronReg");
  },
  ekatReg: (msg) => {
    ekatReg(msg);
    console.log("ekatReg");
  },
  irkReg: (msg) => {
    irkReg(msg);
    console.log("irkReg");
  },
  kazReg: (msg) => {
    kazReg(msg);
    console.log("kazReg");
  },
  krasnoReg: (msg) => {
    krasnoReg(msg);
    console.log("krasnoReg");
  },
  novReg: (msg) => {
    novReg(msg);
    console.log("novReg");
  },
  omskReg: (msg) => {
    omskReg(msg);
    console.log("omskReg");
  },
  orenReg: (msg) => {
    orenReg(msg);
    console.log("orenReg");
  },
  moscReg: (msg) => {
    moscReg(msg);
    console.log("moscReg");
  },
  peterReg: (msg) => {
    peterReg(msg);
    console.log("peterReg");
  },
  saratReg: (msg) => {
    saratReg(msg);
    console.log("saratReg");
  },
  tolReg: (msg) => {
    tolReg(msg);
    console.log("tolReg");
  },
  tomsReg: (msg) => {
    tomsReg(msg);
    console.log("tomsReg");
  },
  tumReg: (msg) => {
    tumReg(msg);
    console.log("tumReg");
  },
  ulianReg: (msg) => {
    ulianReg(msg);
    console.log("ulianReg");
  },
  ufaReg: (msg) => {
    ufaReg(msg);
    console.log("ufaReg");
  },
  habarReg: (msg) => {
    habarReg(msg);
    console.log("habarReg");
  },
  iarosReg: (msg) => {
    iarosReg(msg);
    console.log("iarosReg");
  },
  chitaReg: (msg) => {
    chitaReg(msg);
    console.log("chitaReg");
  },
  novosReg: (msg) => {
    novosReg(msg);
    console.log("novosReg");
  },
  surgReg: (msg) => {
    surgReg(msg);
    console.log("surgReg");
  },
  permReg: (msg) => {
    permReg(msg);
    console.log("permReg");
  },
  angReg: (msg) => {
    angReg(msg);
    console.log("angReg");
  },
  solikReg: (msg) => {
    solikReg(msg);
    console.log("solikReg");
  },
  chelReg: (msg) => {
    chelReg(msg);
    console.log("chelReg");
  },
  biyskReg: (msg) => {
    biyskReg(msg);
    console.log("biyskReg");
  },
  krasReg: (msg) => {
    krasReg(msg);
    console.log("krasReg");
  },
  volgReg: (msg) => {
    volgReg(msg);
    console.log("volgReg");
  },
  luganReg: (msg) => {
    luganReg(msg);
    console.log("luganReg");
  },
  novokReg: (msg) => {
    novokReg(msg);
    console.log("novokReg");
  },
  volzReg: (msg) => {
    volzReg(msg);
    console.log("volzReg");
  },
  genicReg: (msg) => {
    genicReg(msg);
    console.log("genicReg");
  },
  melitReg: (msg) => {
    melitReg(msg);
    console.log("melitReg");
  },
  drugs: (msg) => {
    drugs(msg);
    console.log("drugs");
  },
  gash: (msg) => {
    gash(msg);
    console.log("gash");
  },
  meph: (msg) => {
    meph(msg);
    console.log("meph");
  },
  meth: (msg) => {
    meth(msg);
    console.log("meth");
  },
  shish: (msg) => {
    shish(msg);
    console.log("shish");
  },
  ekz: (msg) => {
    ekz(msg);
    console.log("ekz");
  },
  cocain: (msg) => {
    cocain(msg);
    console.log("cocain");
  },
  gashL: (msg) => {
    gashL(msg);
    console.log("gashL");
  },
  alpha: (msg) => {
    alpha(msg);
    console.log("alpha");
  },
  ger: (msg) => {
    ger(msg);
    console.log("ger");
  },
};

handleCallbackQuery = async (query) => {
  const msg = query.message;
  await bot.answerCallbackQuery(query.id);
  if (query.data in tempo_operations) {
    tempo_operations[query.data](msg, query);
  } else {
    console.log("Невідоме значення query.data: " + query.data);
  }
};

// Використовуємо абстрактний метод on для обробки будь-якого типу події
bot.on("callback_query", handleCallbackQuery);
