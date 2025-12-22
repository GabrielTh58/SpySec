import { ForceAuth } from "@/components/auth/ForceAuth";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <ForceAuth>
            {children}
        </ForceAuth>    
    );
}