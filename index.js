require('dotenv').config();

const fs = require('fs')
const translate = require('translate-google');

const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const { getRandomQuestion, getCorrectAnswer } = require('./src/data/utils/utils');


const bot = new Bot(process.env.BOT_API_KEY);

console.log('I\'m started - English-questions_TelegramBot');

bot.api.setMyCommands([
    { command: '/start', description: 'запустить бот' },
    { command: '/write_creator', description: 'написать создателю бота' }
]);

bot.command('start', async (ctx) => {

    const user_data_file = './src/users/user_data_file.txt'

    const userData =
        `First name: ${ctx.msg.from.first_name}\n` +
        ` Last name: ${ctx.msg.from.last_name}\n` +
        `  Username: @${ctx.msg.from.username}\n` +
        `     Wrote: ${ctx.msg.text}\n\n`;

    fs.appendFile(user_data_file, userData, (err) => {
        if (err) {
            console.log('№1 -> ❌ Ошибка во время записи данных в файл ❌: ', err)
        } else {
            console.log('№1 -> ✅ Даныне записались в файл ✅')
        }
    })

    const startKeyboard = new Keyboard()
        .text('🐻Животные🐰')
        .text('❓Вопросы❔')
        .row()
        .text('👆Местоимения👇')
        .text('📘Другие слова📕')
        .row()
        .text('🎲Случайный вопрос🎲')
        .resized();

    await ctx.replyWithSticker('https://media.stickerswiki.app/cute_little_chicken_full_english_wszb/3358516.160.webp');

    await ctx.reply('<b>Привет!</b>👋\n\n<b>Я - English is very easy</b>\n\nЯ помогу выучить тебе Английский язык👅', {
        parse_mode: 'HTML'
    });
    await ctx.reply('<b>🎉Давай начнём!🎉</b>\nВыбери тему вопроса в меню👇', {
        parse_mode: 'HTML',
        reply_markup: startKeyboard
    });
});

let waitingWrite = false;
bot.command('write_creator', async (ctx) => {

    await ctx.reply('📞<b>Слушаю тебя</b>📞\n\nНапиши что ты хочешь, и я это увижу🤩', {
        parse_mode: 'HTML',
    })
    waitingWrite = true;

})

bot.on('message', async (ctx) => {

    if (waitingWrite && ctx.update.message.text) {

        const user_write_creator_file = './src/users/user_write_creator_file.txt'

        const userWrite =
            `First name: ${ctx.msg.from.first_name}\n` +
            ` Last name: ${ctx.msg.from.last_name}\n` +
            `  Username: @${ctx.msg.from.username}\n` +
            `     Wrote: ${ctx.msg.text}\n\n`;

        fs.appendFile(user_write_creator_file, userWrite, (err) => {
            if (err) {
                console.log('№2 -> ❌ Ошибка во время записи данных в файл ❌: ', err)
            } else {
                console.log('№2 -> ✅ Даныне записались в файл ✅')
            }
        })

        waitingWrite = false;

        await ctx.reply('✅<b>Принято</b>✅\n\nСоздатель прочитае твоё сообщение🤗', {
            parse_mode: 'HTML',
        })

    } else {
        await ctx.reply('✖️<b>Ошибка</b>✖️\n\nТы можешь отправлять только текст😥', {
            parse_mode: 'HTML',
        })
    }

})

bot.hears('Я Алеся', async (ctx) => {
    await ctx.replyWithSticker('https://media.stickerswiki.app/lovetotalsigilo/128307.160.webp');
    await ctx.reply('❤️❤️❤️');

    await setTimeout(() => {
        ctx.reply('У меня тут есть для тебя письмо...');
        console.log('1')
    }, 4000);

    await setTimeout(() => {
        ctx.reply('Тааак... чичас, надо достать');
        console.log('2')
    }, 6000);

    await setTimeout(() => {
        ctx.reply('Чичас чичас, я почти...');
        console.log('3')
    }, 10000);

    await setTimeout(() => {
        ctx.reply('Ох и глубоко оно...');
        console.log('4')
    }, 14000);

    await setTimeout(() => {
        ctx.reply('Это всё потому что я достаю его из своего сердечка');
        console.log('5')
    }, 16000);

    await setTimeout(() => {
        ctx.reply('А письмо для тебя, у меня глубоко глубоко внутри');
        console.log('6')
    }, 18000);

    await setTimeout(() => {
        ctx.reply('Оооо! ДОСТАЛ!!!');
        console.log('7')
    }, 22000);

    await setTimeout(() => {
        ctx.reply('Так... читаю...');
        console.log('8')
    }, 24000);

    await setTimeout(() => {
        ctx.reply('Мг мг... мг мг..');
        console.log('9')
    }, 26000);

    await setTimeout(() => {
        ctx.reply('Это точно тебе!!!');
        console.log('10')
    }, 30000);

    await setTimeout(() => {
        ctx.reply('На главной странице написано - «Для лучшей Жены на свете»');
        console.log('11')
    }, 32000);

    await setTimeout(() => {
        ctx.reply('❤️❤️❤️❤️❤️❤️');
        console.log('12')
    }, 40500);

    await setTimeout(() => {
        ctx.reply('❤️Я ТЕБЯ ЛЮБЛЮ❤️');
        console.log('13')
    }, 41000);

    await setTimeout(() => {
        ctx.reply('❤️❤️❤️❤️❤️❤️');
        console.log('14')
    }, 41500);

})

bot.hears(['🐻Животные🐰', '❓Вопросы❔', '👆Местоимения👇', '📘Другие слова📕', '🎲Случайный вопрос🎲'], async (ctx) => {

    let topic = ctx.message.text.toLowerCase();

    if (topic === '❓вопросы❔') {

        // Удаление первого и последнего символа
        let delFirstSymbol = topic.slice(1);
        let delLastSymbol = delFirstSymbol.slice(0, -1);
        topic = delLastSymbol;

    } else {

        // Удаление первых двух и последних двух символов
        let delFirstSymbol = topic.slice(2);
        let delLastSymbol = delFirstSymbol.slice(0, -2);
        topic = delLastSymbol;
    }

    await translate(topic, { to: 'en' }).then(res => {

        // Перевод на английский
        topic = res

        // Разделение по пробелу; перевод в нижний регистр; объединение массива в одну строчку; удаление пробелов
        let split = topic.split(' ');
        let toLowercase = split.map(word => word.toLowerCase());
        let unification = toLowercase.join(' ');
        let delSpace = unification.replace(/\s/g, '');
        topic = delSpace;

    }).catch(err => {
        console.error(err)
    })

    console.log(topic)

    const { question, questionTopic } = getRandomQuestion(topic);

    let inlineKeyboard;

    if (question.hasOptions) {

        const buttonRows = question.options.map((option) => [
            InlineKeyboard.text(
                option.text,
                JSON.stringify({
                    type: `${questionTopic}-options`,
                    isCorrect: option.isCorrect,
                    questionId: question.id,
                }),
            ),
        ]);

        inlineKeyboard = InlineKeyboard.from(buttonRows);

    } else {

        inlineKeyboard = new InlineKeyboard()
            .text(
                'Узнать ответ',
                JSON.stringify({
                    type: questionTopic,
                    questionId: question.id,
                }),
            );

    }

    await ctx.reply(question.text, {
        reply_markup: inlineKeyboard
    });

});

bot.on('callback_query:data', async (ctx) => {
    const callbackData = JSON.parse(ctx.callbackQuery.data);

    if (!callbackData.type.includes('option')) {

        const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);

        await ctx.reply(answer, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });
        await ctx.answerCallbackQuery();

        return;
    }

    if (callbackData.isCorrect) {
        await ctx.reply('Верно✅');
        await ctx.answerCallbackQuery();
        return;
    }

    const answer = getCorrectAnswer(callbackData.type.split('-')[0], callbackData.questionId);

    await ctx.reply(`Неверно ❌ Правильный ответ: ${answer}`);
    await ctx.answerCallbackQuery();

});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    } else {
        console.error("Неизвестная ошибка:", e);
    }
});

bot.start();