import type { Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "@/data/context/SessionContext";
import { MantineProvider } from '@mantine/core'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

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
        className={`${inter.variable} ${orbitron.variable} antialiased`}
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
