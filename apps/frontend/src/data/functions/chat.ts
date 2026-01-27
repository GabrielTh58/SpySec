"use server"
import { Message } from "@/model/Message"

export async function talk(chatId: string, message: Message): Promise<string | null> {
	const webhookUrl = process.env.CHAT_WEBHOOK
	if (!webhookUrl) return null

	try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatId,
                message: message.text,
            }),
        })
        const msg = await response.json()
        return msg.response || msg.output || "Erro ao processar resposta."; 
    } catch (error) {
        console.error("Erro no Chat:", error);
        return "Desculpe, estou com problemas de conexão no momento.";
    }
}
