'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import Header from '@/components/common/Header'
import AuthProvider from '@/components/auth/authProvider'
import "react-notifications-component/dist/theme.css"
import { ReactNotifications } from 'react-notifications-component'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <AuthProvider>
            <div className='bg-gray-900 min-h-screen'>
              <ReactNotifications className='absolute top-[60px]' />
              <Header />
              {children}
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
