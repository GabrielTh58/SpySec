"use client"
import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const localValue = localStorage.getItem(key)
		return localValue ? JSON.parse(localValue) : initialValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}
