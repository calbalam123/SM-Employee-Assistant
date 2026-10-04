import { SlashCommandBuilder } from "discord.js";
import { clearHistory } from "../lib/memory.js";

export const data = new SlashCommandBuilder()
  .setName("reset")
  .setDescription("현재 채널에서 AI와의 대화 문맥을 초기화합니다.");

export async function execute(interaction) {
  clearHistory(interaction.user.id, interaction.channelId);
  await interaction.reply("🧹 현재 채널의 대화 문맥을 초기화했습니다.");
}
