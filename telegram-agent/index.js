import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, PORT = 3001, APP_URL = 'http://localhost:5173' } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN is required in .env');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

app.use(cors({ origin: APP_URL }));
app.use(express.json({ limit: '10mb' }));

// In-memory store of received designs
const designs = [];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `*Welcome to InteriorAI Room Planner Bot!*\n\n` +
    `Your Chat ID: \`${chatId}\`\n\n` +
    `Add this to your \`telegram-agent/.env\` file:\n` +
    `\`TELEGRAM_CHAT_ID=${chatId}\`\n\n` +
    `Then click *Share to Telegram* in the app to send your designs here.\n\n` +
    `Commands:\n` +
    `/help — Show this help\n` +
    `/status — Agent status\n` +
    `/latest — Most recent design\n` +
    `/list — All shared designs`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `*InteriorAI Room Planner Bot*\n\n` +
    `Share room designs from the web app directly to this chat.\n\n` +
    `Commands:\n` +
    `/start — Setup & get your Chat ID\n` +
    `/status — Check agent status\n` +
    `/latest — Show latest design\n` +
    `/list — List all shared designs`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/status/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `✅ *Agent is running*\n` +
    `Designs received: ${designs.length}\n` +
    `App URL: ${APP_URL}`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/latest/, (msg) => {
  const design = designs[designs.length - 1];
  if (!design) {
    bot.sendMessage(msg.chat.id, 'No designs shared yet. Use the Share button in the app!');
    return;
  }
  bot.sendMessage(msg.chat.id, formatDesign(design), { parse_mode: 'Markdown' });
});

bot.onText(/\/list/, (msg) => {
  if (designs.length === 0) {
    bot.sendMessage(msg.chat.id, 'No designs shared yet.');
    return;
  }
  const list = designs
    .slice(-10)
    .reverse()
    .map((d, i) => `${i + 1}. ${d.room.name} — ${new Date(d.sharedAt).toLocaleString()}`)
    .join('\n');
  bot.sendMessage(msg.chat.id, `*Last ${Math.min(10, designs.length)} designs:*\n\n${list}`, { parse_mode: 'Markdown' });
});

// POST /share — called by the React app
app.post('/share', async (req, res) => {
  const { room, items, theme } = req.body;
  if (!room || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid payload: room and items are required' });
  }
  if (!TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'TELEGRAM_CHAT_ID not set in agent .env' });
  }

  const design = { room, items, theme, sharedAt: new Date().toISOString() };
  designs.push(design);

  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, formatDesign(design), { parse_mode: 'Markdown' });
    res.json({ success: true, message: 'Design sent to Telegram!' });
  } catch (err) {
    console.error('Telegram send error:', err.message);
    res.status(500).json({ error: 'Failed to send to Telegram. Check TELEGRAM_CHAT_ID.' });
  }
});

app.get('/health', (_, res) => res.json({ status: 'ok', designs: designs.length }));

function formatDesign({ room, items, theme, sharedAt }) {
  const date = new Date(sharedAt).toLocaleString();
  const furniture =
    items.length === 0
      ? '  _Empty room_'
      : items.map((i) => `  • ${i.label}`).join('\n');

  return (
    `🏠 *Room Design Shared*\n\n` +
    `📐 *Room:* ${room.name} (${room.width} × ${room.height} ft)\n` +
    `🎨 *Theme:* ${theme?.name || 'Default'}\n` +
    `🪑 *Furniture (${items.length} item${items.length !== 1 ? 's' : ''}):*\n` +
    `${furniture}\n\n` +
    `🕐 _${date}_`
  );
}

app.listen(PORT, () => {
  console.log(`Telegram agent listening on http://localhost:${PORT}`);
  console.log(`Telegram bot polling started — send /start to your bot to get your Chat ID`);
});
