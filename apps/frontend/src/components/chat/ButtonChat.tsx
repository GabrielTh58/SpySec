import { X } from "lucide-react"

interface ButtonChatProps{
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setShowBubble: React.Dispatch<React.SetStateAction<boolean>>
}

export function ButtonChat(props: ButtonChatProps) {
	const {setShowBubble, setIsOpen, isOpen} = props

	return (
		<button 
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setShowBubble(true)}
            className="group relative w-14 h-14 rounded-full bg-linear-to-tr from-cyan-600 to-purple-600 p-[2px] 
				shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all hover:scale-105
				active:scale-95"
        >
            <div className="w-full h-full rounded-full bg-black overflow-hidden relative flex items-center justify-center">
                {isOpen ? (
                    <X className="text-white w-6 h-6 animate-in zoom-in duration-200" />
                ) : (
                    <img 
                        src="/Mascot.png" 
                        alt="SpyBot" 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Status Indicator */}
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-black rounded-full transition-colors
				${isOpen ? 'bg-red-500' : 'bg-green-500'}`}
			></span>
        </button>
	)
}
