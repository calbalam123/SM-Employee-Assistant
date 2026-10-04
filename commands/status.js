import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("status")
  .setDescription("봇 상태를 확인합니다.");

export async function execute(interaction) {
  const model = process.env.AI_MODEL || "qwen/qwen-2.5-72b-instruct";
  await interaction.reply(
    "🟢 **SM 직원 어시스트 정상 작동**\n• WebSocket: " +
    interaction.client.ws.ping + "ms\n• AI 모델: " + model
  );
}
