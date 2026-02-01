import { ForceAuth } from "@/components/auth/ForceAuth";
import { OnboardingManager } from "@/components/onboarding/OnBoardingManager";
import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { AiTutorWidget } from "@/components/template/AiTutorWidget";
import { FeedbackWidget } from "@/components/template/FeedbackWidget";
import { EducationProvider } from "@/data/context/EducationContext";
import { GamificationProvider } from "@/data/context/GamificationContext";
import { SideBarProvider } from "@/data/context/SideBarContext";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <ForceAuth>
            <EducationProvider>
                <GamificationProvider>
                    <SideBarProvider>
                        <div className="relative flex w-screen min-h-screen">
                            <Sidebar />

                            <div className="w-full">        
                                <Header />                                
                                {children}

                                <AiTutorWidget />
                            </div>
                            
                            <FeedbackWidget />
                            <OnboardingManager />
                        </div>
                    </SideBarProvider>
                </GamificationProvider>
            </EducationProvider>
        </ForceAuth>
    );
}