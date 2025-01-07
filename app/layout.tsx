import { Inter } from 'next/font/google'
import './styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SkipToContent from './components/SkipToContent'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tu Portfolio Profesional',
  description: 'Portfolio profesional y blog de desarrollo web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <SkipToContent />
            <Navigation />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
