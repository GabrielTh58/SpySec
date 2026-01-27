import { IdUnique } from "@spysec/utils"
import { Message } from "@/model/Message"
import { useState } from "react"
import { talk } from "../functions/chat"
import { useLocalStorage } from "./useLocalStorage"

export function useChat() {
	const [chatId] = useLocalStorage<string>("spysec_chat_id", IdUnique.generate())
	const [messages, setMessages] = useLocalStorage<Message[]>("spysec_messages", [])
	const [thinking, setThinking] = useState(false)

	async function addMessage(text: string) {
		try {
			setThinking(true)
			const newMessage: Message = {   
				id: IdUnique.generate(),
				text,
				author: "Visitor",
				side: "right",
			}

			setMessages((msgs) => [...msgs, newMessage])

			const response = await talk(chatId, newMessage)

			if (!response) return

			const responseMessage: Message = {
				id: IdUnique.generate(),
				text: response,
				author: "Assistant",
				side: "left",
			}

			setMessages((msgs) => [...msgs, responseMessage])
		} finally {
			setThinking(false)
		}
	}

	function clearMessages() {
		setMessages([])
	}

	return {
		chatId,
		messages,
		thinking,
		addMessage,
		clearMessages,
	}
}
