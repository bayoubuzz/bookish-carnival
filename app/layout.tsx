
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Steve Sabludowsky - AI & Video Consultant',
  description: 'Professional AI and video consulting services for law firms, businesses, and individuals. Solve real-world challenges with AI-powered solutions and video creation.',
  keywords: 'AI consultant, video consultant, legal AI, business automation, video production, digital strategy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
