import { ForceAuth } from "@/components/auth/ForceAuth";
import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SideBarProvider } from "@/data/context/SideBarContext";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <ForceAuth>
            <SideBarProvider>
                <div className="flex w-screen h-screen">
                    <Sidebar />

                    <div className="w-full">
                        <Header />
                        {children}
                    </div>

                </div>
            </SideBarProvider>
        </ForceAuth>
    );
}