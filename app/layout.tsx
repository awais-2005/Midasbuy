import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'PUBG Mobile UC Official Store',
  description: 'Buy PUBG Mobile UC at the best prices with Midas Buy',
  generator: 'v0.dev',
  openGraph: {
    title: 'PUBG Mobile UC Official Store',
    description: 'Buy PUBG Mobile UC at the best prices with Midas Buy',
    url: 'https://7803-182-185-84-179.ngrok-free.app', // change this to your actual site
    siteName: 'Midas Buy',
    images: [
      {
        url: 'https://scontent.fmfg1-1.fna.fbcdn.net/v/t1.6435-9/143092010_729972667709234_4342993697656160521_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-8cfxsSw-NEQ7kNvwHFSupW&_nc_oc=AdnqWqn72_rG7NcSZR_JV2apNAdY8-OGhhFGwHObrgZAvyL3VYx8yxSuxQX-3miON3w&_nc_zt=23&_nc_ht=scontent.fmfg1-1.fna&_nc_gid=8u56WF6kTD6lYslb3eVVtg&oh=00_AfNEUrcn5OGAjuDYF5dRXG3WxAvma0LLGTygeZp9pbmdKQ&oe=687A27E2',
        width: 1200,
        height: 630,
        alt: 'PUBG UC Promo Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUBG Mobile UC Official Store',
    description: 'Buy PUBG Mobile UC at the best prices with Midas Buy',
    images: [
      'https://scontent.fmfg1-1.fna.fbcdn.net/v/t1.6435-9/143092010_729972667709234_4342993697656160521_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-8cfxsSw-NEQ7kNvwHFSupW&_nc_oc=AdnqWqn72_rG7NcSZR_JV2apNAdY8-OGhhFGwHObrgZAvyL3VYx8yxSuxQX-3miON3w&_nc_zt=23&_nc_ht=scontent.fmfg1-1.fna&_nc_gid=8u56WF6kTD6lYslb3eVVtg&oh=00_AfNEUrcn5OGAjuDYF5dRXG3WxAvma0LLGTygeZp9pbmdKQ&oe=687A27E2',
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/midasbuy_icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/midasbuy_icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
