export interface TxtGradientProps {
    colors?: string[]
    children: any
}

export function TxtGradient(props: TxtGradientProps) {
    return (
        <span className={`
            text-transparent bg-clip-text 
            bg-linear-to-r
            ${props.colors?.[0] ?? 'from-cyan-500'} ${props.colors?.[1] ?? 'to-magenta'}
        `}>{props.children}</span>
    )
}