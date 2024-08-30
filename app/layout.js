import { Providers } from "@/redux/provider"
import Loader from "@/component/core/Loader"
import "@/style/style.map.scss"
import Footer from "@/component/core/Footer"
import  {Toaster}  from "react-hot-toast"


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
          <Footer/>
        </Providers>
          <Toaster
           position="top-right"
           reverseOrder={false}
           />
      </body>   
    </html>
  )
}
