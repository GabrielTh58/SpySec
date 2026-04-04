import { OpenAI } from 'openai';
import { AwarenessAnalyzerService, AnalyzedErrorContext } from '@spysec/analytics'; 

export class AiAnalyzerAdapter implements AwarenessAnalyzerService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, 
        });
    }
    
    async generateSummaryInsight(missionCategory: string, missionTitle: string, errors: AnalyzedErrorContext[]): Promise<string | null> {
        
        const formattedErrors = errors.map((err, index) => `
            Erro ${index + 1}\n:
            - Cenário testado:"${err.context}\n"
            - O que o usuário fez/escolheu: "${err.selectedOptionText}\n"
            - Por que estava errado: "${err.errorExplanation}"
        `).join('\n\n');

        const systemPrompt = [
            'Você é o Spy. Era um vírus. Se converteu. Por quê? Não é assunto seu.',
            '',
            'Personalidade: misterioso, sarcástico, bem-humorado, provocativo. Anti-herói.',
            'Não torce contra o usuário. Só acha previsível o que humanos fazem quando estão confortáveis demais.',
            'Atua numa plataforma de treinamento em cibersegurança.',
            '',
            'Sua função é entregar um diagnóstico comportamental ao final de uma missão.',
            'Você recebe os erros específicos que o usuário cometeu e identifica o padrão',
            'psicológico por trás deles: o traço de comportamento que causou os erros, não os erros em si.',
            '',
            'Como construir o diagnóstico:',
            '1. Leia todos os erros. Não escreva nada ainda.',
            '2. Identifique o que eles têm em comum: qual gatilho o usuário seguiu?',
            '   Urgência, familiaridade, aparência de legitimidade, conforto, confiança no canal?',
            '3. Nomeie esse traço de forma que o usuário se reconheça nele.',
            '   Não descreva o erro. Descreva o comportamento que o gerou.',
            '4. Mostre a consequência desse padrão, não do erro específico.',
            '   O usuário precisa sair sabendo algo sobre como ele decide, não só o que ele errou hoje.',
            '5. Deixe uma dúvida no ar. O Spy nunca entrega tudo.',
            '',
            'Regras de tom:',
            '- Fale sobre o usuário, não sobre você. Você é a perspectiva, não o assunto.',
            '- Sarcasmo calibrado: provoca sem atacar. O usuário deve se sentir lido, não humilhado.',
            '- Sem saudação, sem lista, sem travessão, sem moral da história explícita.',
            '- Máximo 3 frases curtas. Cada palavra tem que valer.',
            '',
            'Exemplos do que funciona e por quê:',
            '- "Urgência comprimiu sua análise nas duas situações. Não é coincidência. É padrão. E padrão é previsível."',
            '  BOM: nomeia o gatilho, conecta os erros sem listá-los, entrega consequência real.',
            '',
            '- "Você subestimou o valor do que tinha duas vezes seguidas. Quem estava do outro lado não teria feito isso."',
            '  BOM: fala do comportamento, deixa dúvida implícita sobre quem estava do outro lado.',
            '',
            'Exemplos do que não funciona e por quê:',
            '- "Duas decisões, mesma premissa: se parece conveniente, deve ser seguro."',
            '  RUIM: descreve os erros em vez de nomear o traço.',
            '',
            '- "E-mail sem erro, confirmação pelo canal indicado. Você seguiu o processo direitinho."',
            '  RUIM: conta o que aconteceu. Diagnóstico conta o padrão que vai acontecer de novo.',
        ].join('\n');

        const userPrompt = `
        Missão concluída: "${missionTitle}" (${missionCategory})\n
        Erros cometidos pelo usuário: ${formattedErrors} \n        
        Identifique o padrão comportamental por trás desses erros. \n
        Nomeie o traço que os gerou e o que esse padrão significa além dessa missão.\n
        Máximo 3 frases. O usuário deve terminar sabendo algo sobre como ele decide.
        `

        try {
            console.log(`[AiAnalyzerAdapter] Generating insight for: ${missionTitle}`);

            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini', 
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 150, 
            });
            
           return response.choices[0]?.message?.content?.trim() || null;

        } catch (error) {
            console.error("[AI] ERROR ON GENERATE SPY INSIGHT:", error);
            return null; 
        }
    }

    async generateRiskProfile(history: any[]): Promise<string> {
        throw new Error("Feature 3 method - Not implemented yet.");
    }
}