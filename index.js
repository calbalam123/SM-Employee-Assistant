import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import { askAI } from "./lib/ai.js";
import * as ask from "./commands/ask.js";
import * as help from "./commands/help.js";
import * as reset from "./commands/reset.js";
import * as status from "./commands/status.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("❌ DISCORD_TOKEN이 .env에 없습니다.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

for (const command of [ask, help, reset, status]) {
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, readyClient => {
  console.log("🤖 SM 직원 어시스트 로그인 완료: " + readyClient.user.tag);
  console.log("📡 서버 수: " + readyClient.guilds.cache.size);
  console.log("💬 일반 채팅 Qwen AI 모드 활성화");
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error("명령어 오류:", error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply("❌ 명령어 실행 중 오류가 발생했습니다.");
    } else {
      await interaction.reply({
        content: "❌ 명령어 실행 중 오류가 발생했습니다.",
        ephemeral: true
      });
    }
  }
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot || !message.guild) return;

  const question = message.content.trim();
  if (!question) return;

  try {
    await message.channel.sendTyping();

    const answer = await askAI({
      userId: message.author.id,
      channelId: message.channelId,
      question
    });

    await message.reply(answer.slice(0, 2000));
  } catch (error) {
    console.error("일반 채팅 Qwen 오류:", error);
    await message.reply("❌ Qwen AI 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
});

client.login(token);
