import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("SM 직원 어시스트 사용법을 확인합니다.");

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setTitle("🤖 SM 직원 어시스트")
    .setDescription("업무 정리와 질문을 도와주는 AI Discord 봇입니다.")
    .addFields(
      { name: "/ask", value: "AI에게 질문하거나 업무 내용을 입력합니다." },
      { name: "/reset", value: "현재 채널에서 나와의 대화 문맥을 초기화합니다." },
      { name: "/status", value: "봇 상태와 현재 AI 모델을 확인합니다." }
    )
    .setFooter({ text: "비공식 업무 보조 AI • 중요한 업무 결정은 담당자 확인 필요" });

  await interaction.reply({ embeds: [embed] });
}
