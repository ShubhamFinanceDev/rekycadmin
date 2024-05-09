import { Providers } from "@/redux/provider"
import Loader from "@/component/core/Loader"
import Footer from '@/components/core/Footer'

import "@/style/style.map.scss"


export const metadata = {
  title: 'Shubham Housing Finance RE_KYC_ADMIN',
  description: 'Shubham Housing Finance RE_KYC_ADMIN provide affordable housing rekyc with a hassle-free documentation process .',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          <div>
          {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
