import { env } from '@/env'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(env.GEMINI_KEY)

export async function geminiAI(data: string) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'Você é um agente que vai analisar os dados de treino do usuário com base nas informações dos últimos 7 dias, fornecendo insights sobre frequência, intensidade e progresso. A análise deve ser objetiva, comparativa e direcionada à otimização do desempenho do usuário.',
  })

  const prompt = `Análise a seguinte informação: ${data}`

  const result = await model.generateContent(prompt)

  return result.response.text()
}
