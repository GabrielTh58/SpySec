interface ContentProps {
    children: any
    className?: string
}

export function Content(props: ContentProps) {
    return (
        <div className={`
            flex flex-col flex-1 w-full min-h-full
            lg:overflow-y-auto ${props.className ?? ''}
        `}>
            {props.children}
        </div>
    )
}