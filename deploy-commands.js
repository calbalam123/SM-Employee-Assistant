import "dotenv/config";
import { REST, Routes } from "discord.js";
import { data as ask } from "./commands/ask.js";
import { data as help } from "./commands/help.js";
import { data as reset } from "./commands/reset.js";
import { data as status } from "./commands/status.js";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error("DISCORD_TOKEN, CLIENT_ID, GUILD_ID를 .env에 설정하세요.");
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
  { body: [ask, help, reset, status].map(command => command.toJSON()) }
);

console.log("✅ Discord 슬래시 명령어 등록 완료");
