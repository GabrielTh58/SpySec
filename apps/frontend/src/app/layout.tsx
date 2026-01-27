import type { Metadata } from "next";
import { Inter, Orbitron, Press_Start_2P } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "@/data/context/SessionContext";
import { MantineProvider } from '@mantine/core'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const pressStart2P = Press_Start_2P({weight: '400', subsets: ['latin'], variable: '--font-press-start-2p'})

export const metadata: Metadata = {
  title: "SpySec",
  description: "Plataforma Cibersegurança Gamificada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${orbitron.variable} ${pressStart2P.variable} antialiased`}
      >
        <MantineProvider>
          <SessionProvider>
            {children}
            <Toaster richColors theme="dark" position="top-right" />
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
