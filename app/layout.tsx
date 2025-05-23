import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DashboardLayoutClient from './components/DashboardLayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PandawaJogja - Admin Dashboard',
  description: 'Admin dashboard for managing complaints and monitoring performance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <DashboardLayoutClient>
          {children}
        </DashboardLayoutClient>
      </body>
    </html>
  )
} 