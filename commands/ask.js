import { SlashCommandBuilder } from "discord.js";
import { askAI } from "../lib/ai.js";

export const data = new SlashCommandBuilder()
  .setName("ask")
  .setDescription("AI 직원 어시스턴트에게 질문합니다.")
  .addStringOption(option =>
    option.setName("question")
      .setDescription("질문이나 업무 내용을 입력하세요.")
      .setRequired(true)
      .setMaxLength(2000)
  );

export async function execute(interaction) {
  const question = interaction.options.getString("question", true);
  await interaction.deferReply();

  try {
    const answer = await askAI({
      userId: interaction.user.id,
      channelId: interaction.channelId,
      question
    });
    await interaction.editReply(answer.slice(0, 2000));
  } catch (error) {
    console.error(error);
    await interaction.editReply("❌ 처리하지 못했습니다.\n" + error.message);
  }
}
