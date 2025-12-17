import { Content } from "@/components/template/Content";


export default function Layout(props: any) {
    return (
        <div
            className={`
                flex flex-col items-center h-screen w-screen
                bg-linear-to-r from-zinc-900 via-zinc-900 to-black text-white 
            `}
        >
            <Content>{props.children}</Content>
        </div>
    )
}
