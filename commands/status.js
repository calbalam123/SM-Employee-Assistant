import { SlashCommandBuilder } from "discord.js";
import { getQwenConfig } from "../lib/ai.js";

export const data = new SlashCommandBuilder()
  .setName("status")
  .setDescription("봇 상태와 Qwen 설정을 확인합니다.");

export async function execute(interaction) {
  const { model, region } = getQwenConfig();

  await interaction.reply(
    "🟢 **SM 직원 어시스트 정상 작동**\n" +
    "• WebSocket: " + interaction.client.ws.ping + "ms\n" +
    "• AI: Alibaba Cloud Qwen\n" +
    "• Qwen 모델: " + model + "\n" +
    "• Qwen 리전: " + region
  );
}
