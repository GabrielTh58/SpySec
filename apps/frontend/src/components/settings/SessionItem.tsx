export interface SessionItemProps {
    icon: React.ElementType;
    device: string;
    location: string;
    status: "active" | "inactive";
    lastActive: string;
}

export function SessionItem(props: SessionItemProps) {
    const { icon: Icon, device, location, status, lastActive } = props

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-800 last:border-0 hover:bg-gray-900/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">{device}</p>
                    <p className="text-xs text-gray-500">{location} • {lastActive}</p>
                </div>
            </div>
            {status === 'active' && (
                <span className="px-2 py-1 rounded text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 font-bold uppercase tracking-wider">
                    Atual
                </span>
            )}
        </div>
    )
}