import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PatternAI — Análise de Padrões',
  description: 'Sistema inteligente de identificação de padrões e alertas de previsibilidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0e1a] text-[#e0e6f0] min-h-screen">
        {children}
      </body>
    </html>
  )
}
