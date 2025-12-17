import { ReactNode } from "react";
import { SessionProvider } from "@/data/context/SessionContext";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}