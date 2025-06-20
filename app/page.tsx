"use client"

import {
  ArrowUp,
  Headphones,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Mail,
  Bell,
  User,
  Filter,
  Star,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
const LoginPopup = dynamic(() => import("@/components/LoginPopup"), { ssr: false })
const OfferExpiredPopup = dynamic(() => import("@/components/OfferExpiredPopup"), { ssr: false })

export default function PUBGUCPurchasePage() {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
  const [loginOpen, setLoginOpen] = useState(false)
  const [offerExpiredOpen, setOfferExpiredOpen] = useState(false)
  const [expiredPlatform, setExpiredPlatform] = useState<string>("")

  // Listen for messages from login windows
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event.data) // Debug log
      if (event.data && event.data.type === 'OFFER_EXPIRED') {
        console.log('Processing OFFER_EXPIRED message for platform:', event.data.platform) // Debug log
        setLoginOpen(false) // Close login popup if open
        setExpiredPlatform(event.data.platform || 'Unknown')
        setOfferExpiredOpen(true)
      }
    }

    window.addEventListener('message', handleMessage)
    
    // Also listen for storage events as a fallback
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'offerExpired') {
        const data = JSON.parse(event.newValue || '{}')
        console.log('Storage event received:', data) // Debug log
        setLoginOpen(false)
        setExpiredPlatform(data.platform || 'Unknown')
        setOfferExpiredOpen(true)
        localStorage.removeItem('offerExpired') // Clean up
      }
    }
    
    window.addEventListener('storage', handleStorage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  // Periodic check for localStorage fallback
  useEffect(() => {
    const checkForExpiredOffer = () => {
      const expiredData = localStorage.getItem('offerExpired')
      if (expiredData) {
        try {
          const data = JSON.parse(expiredData)
          console.log('Found expired offer in localStorage:', data) // Debug log
          setLoginOpen(false)
          setExpiredPlatform(data.platform || 'Unknown')
          setOfferExpiredOpen(true)
          localStorage.removeItem('offerExpired') // Clean up
        } catch (error) {
          console.error('Error parsing expired offer data:', error)
          localStorage.removeItem('offerExpired') // Clean up invalid data
        }
      }
    }

    // Check immediately
    checkForExpiredOffer()
    
    // Check every 500ms for 10 seconds after component mounts
    const interval = setInterval(checkForExpiredOffer, 500)
    const timeout = setTimeout(() => clearInterval(interval), 10000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  // USD to PKR conversion rate (approximate)
  const USD_TO_PKR = 278

  // Helper function to convert USD to PKR
  const convertToPKR = (usdPrice: string) => {
    const usdAmount = parseFloat(usdPrice)
    const pkrAmount = Math.round(usdAmount * USD_TO_PKR)
    return pkrAmount.toLocaleString()
  }

  const ucPacks = [
    {
      uc: "60",
      bonus: "",
      price: "0.20",
      originalPrice: "0.99",
      badge: "",
      popular: true,
      discount: "80%",
      iconType: "small",
      ucImage: "/UC_image_for_30-60.png",
    },
    {
      uc: "600",
      bonus: "+ 60",
      price: "2.00",
      originalPrice: "9.99",
      badge: "Midasbuy Only",
      popular: true,
      discount: "80%",
      iconType: "small",
      ucImage: "/UC_image_for_600.png",
    },
    {
      uc: "300",
      bonus: "+ 25",
      price: "1.00",
      originalPrice: "4.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "small",
      ucImage: "/UC_image_for_300.png",
    },
    {
      uc: "1500",
      bonus: "+ 300",
      price: "5.00",
      originalPrice: "24.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "medium",
      ucImage: "/UC_image_for_1500.png",
    },
    {
      uc: "3000",
      bonus: "+ 850",
      price: "10.00",
      originalPrice: "49.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "medium",
      ucImage: "/UC_image_for_3000.png",
    },
    {
      uc: "6000",
      bonus: "+ 2100",
      price: "20.00",
      originalPrice: "99.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "medium",
      ucImage: "/UC_image_for_6000-60000.png",
    },
    {
      uc: "12000",
      bonus: "+ 4200",
      price: "40.00",
      originalPrice: "199.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "large",
      ucImage: "/UC_image_for_6000-60000.png",
    },
    {
      uc: "18000",
      bonus: "+ 6300",
      price: "60.00",
      originalPrice: "299.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "large",
      ucImage: "/UC_image_for_6000-60000.png",
    },
    {
      uc: "24000",
      bonus: "+ 8400",
      price: "80.00",
      originalPrice: "399.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "large",
      ucImage: "/UC_image_for_6000-60000.png",
    },
    {
      uc: "30000",
      bonus: "+ 10500",
      price: "100.00",
      originalPrice: "499.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "large",
      ucImage: "/UC_image_for_6000-60000.png",
    },
    {
      uc: "60000",
      bonus: "+ 21000",
      price: "200.00",
      originalPrice: "999.99",
      badge: "Midasbuy Only",
      popular: false,
      discount: "80%",
      iconType: "large",
      ucImage: "/UC_image_for_6000-60000.png",
    },
  ]

  const paymentMethods = ["Credit/Debit/Prepaid Card", "Google Pay", "Easypaisa", "Jazzcash", "Telenor", "Zong"]

  const paymentChannels = [
    { name: "Visa", image: "/credit_cards.png" },
    { name: "Google Pay", image: "/google-icon.png" },
    { name: "JazzCash", image: "/jazzcash.png" },
    { name: "Easypaisa", image: "/easypaisa.png" },
    { name: "Zong", image: "/zong.png" },
    { name: "Telenor", image: "/telenor.jpeg" },
  ]

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white font-sans">
      <div className={loginOpen ? "blur-sm pointer-events-none select-none transition-all duration-300" : "transition-all duration-300"}>
        {/* Desktop Header - Integrated with Hero Background */}
        <header className="hidden lg:block absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Left - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://cdn.midasbuy.com/oversea_web/static/media/midasbuy-logo__new.201281c3.png"
                  alt="Midasbuy Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex items-center space-x-8">
                <a href="#" className="text-sm text-white hover:text-gray-300 font-medium">
                  Home
                </a>
                <a href="#" className="text-sm text-white hover:text-gray-300 font-medium">
                  Midasbuy Events
                </a>
                <a href="#" className="text-sm text-white hover:text-gray-300 font-medium">
                  Help Center
                </a>
              </nav>
            </div>

            {/* Right - User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300" onClick={() => setLoginOpen(true)}>
              <User className="w-4 h-4 mr-2" />
              Sign in
              <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <div className="flex items-center space-x-2 bg-black/20 rounded px-2 py-1 cursor-pointer" onClick={() => setLoginOpen(true)}>
              <div className="w-6 h-4 bg-green-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">🇵🇰</span>
              </div>
              <span className="text-sm text-white font-medium">EN</span>
              </div>
              </div>
              </div>
              </header>
              
              {/* Mobile Header */}
              <header className="lg:hidden absolute top-0 left-0 right-0 z-20">
              <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
              <Image
              src="https://cdn.midasbuy.com/oversea_web/static/media/midasbuy-logo__new.201281c3.png"
              alt="Midasbuy Logo"
              width={80}
              height={24}
              className="h-6 w-auto"
              />
              </div>
              <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setLoginOpen(true)}>
              <span className="text-xs text-white font-medium">English</span>
              </div>
              <button className="text-xs text-white font-medium" onClick={() => setLoginOpen(true)}>Sign In</button>
              </div>
              </div>
              </header>
              
              {/* Hero Section with PUBG Background and Integrated Header */}
              <div className="relative bg-gradient-to-r from-[#1e2a4a] via-[#2a4a7a] to-[#4a7aba] min-h-[280px] lg:min-h-[320px] overflow-hidden">
              {/* Background Game Scene */}
              <div className="absolute inset-0">
              <Image
              src="https://cdn.midasbuy.com/images/7bg1.a1669981.jpg"
              alt="PUBG Mobile Background"
              fill
              className="object-cover"
              />
              {/* Vignette Overlay - Deeper on left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"></div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-24 pb-8 lg:pb-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              {/* Left - Game Info */}
              <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <Image
              src="https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png"
              alt="PUBG Mobile Logo"
              width={64}
              height={64}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg"
              />
              <div>
              <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">PUBG MOBILE</h1>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 font-medium flex items-center space-x-1 rounded-full">
              <Image src="/secure_icon.svg" alt="Secure" width={16} height={16} className="w-4 h-4" />
              <span>Official</span>
              </span>
              </div>
              </div>
              </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-6">
              <Button className="bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold px-8 py-3 text-base lg:text-sm shadow-lg rounded-full leading-6" onClick={() => setLoginOpen(true)}>
              Enter Your Player ID Now →
              </Button>
              </div>
              </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="bg-[#1a1f2e] border-b border-[#2a3441]">
              <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="flex">
              <button className="flex-1 lg:flex-none lg:px-8 py-4 text-center text-[#4a9eff] border-b-2 border-[#4a9eff] font-medium text-sm lg:text-base flex items-center justify-center space-x-2">
              <span>PURCHASE</span>
              </button>
              <button className="flex-1 lg:flex-none lg:px-8 py-4 text-center text-gray-400 font-medium text-sm lg:text-base flex items-center justify-center space-x-2">
              <span>REDEEM</span>
              </button>
              <button className="flex-1 lg:flex-none lg:px-8 py-4 text-center text-gray-400 font-medium text-sm lg:text-base flex items-center justify-center space-x-2">
              <span>SHOP</span>
              </button>
              <button className="flex-1 lg:flex-none lg:px-8 py-4 text-center text-gray-400 font-medium text-sm lg:text-base flex items-center justify-center space-x-2">
              <span>EVENTS</span>
              </button>
              </div>
              </div>
              </nav>
              
              {/* Orange Promotional Banner */}
              <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
              <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8e53] rounded-lg p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white bg-opacity-20 rounded-lg p-2 flex items-center justify-center font-thin px-0 py-0">
              <Image
              src="https://pagedoo.midasbuy.com/material/1450015065/148da3e2124e23db4adc8eba55130682.png"
              alt="UC Coins"
              width={48}
              height={48}
              className="rounded"
              />
              </div>
              <div>
              <p className="text-white font-bold text-sm lg:text-base">
              Recharge & Spin UC | Friends Get Free Coupons — 1000UC MAX!
              </p>
              </div>
              </div>
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 font-bold rounded-full" onClick={() => setLoginOpen(true)}>GO</Button>
              </div>
              </div>
              
              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
              <div className="flex flex-col lg:flex-row gap-6">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64">
              <div className="border-2 border-[#4a9eff] rounded-lg p-4 bg-[#1a1f2e] space-y-6">
              {/* Clear Button */}
              <div className="flex items-center justify-between">
              <Button
              size="sm"
              className="text-[white] bg-[#4a9eff]"
              >
              <img src="https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat.png" alt="bin" className="w-4 h-4" /> Clear
              </Button>
              </div>
              
              {/* Payment Methods */}
              <div>
              <h3 className="text-white font-medium mb-4">Payment</h3>
              <div className="space-y-3">
              {paymentMethods.map((method) => (
              <div key={method} className="flex items-center space-x-2">
              <Checkbox
              id={method}
              checked={selectedPaymentMethods.includes(method)}
              onCheckedChange={(checked) => {
              if (checked) {
              setSelectedPaymentMethods([...selectedPaymentMethods, method])
              } else {
              setSelectedPaymentMethods(selectedPaymentMethods.filter((m) => m !== method))
              }
              }}
              className="border-gray-400 data-[state=checked]:bg-[#4a9eff] data-[state=checked]:border-[#4a9eff]"
              />
              <label htmlFor={method} className="text-sm text-gray-300 cursor-pointer">
              {method}
              </label>
              </div>
              ))}
              </div>
              </div>
              
              {/* Amount Filter */}
              <div>
              <h3 className="text-white font-medium mb-4">Amount</h3>
              <div className="mb-3">
              <select className="w-full bg-[#2a3441] border border-[#3a4451] rounded px-3 py-2 text-white text-sm">
              <option>Filter by Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
              </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
              <select className="bg-[#2a3441] border border-[#3a4451] rounded px-3 py-2 text-white text-sm">
              <option>Min</option>
              <option>₨0</option>
              <option>₨2,780</option>
              <option>₨13,900</option>
              <option>₨27,800</option>
              </select>
              <select className="bg-[#2a3441] border border-[#3a4451] rounded px-3 py-2 text-white text-sm">
              <option>Up to</option>
              <option>₨2,780</option>
              <option>₨13,900</option>
              <option>₨27,800</option>
              <option>₨139,000</option>
              </select>
              </div>
              </div>
              
              {/* Filter Button */}
              <Button className="w-full bg-[#4a9eff] hover:bg-[#3a8eef] text-white font-medium py-2" onClick={() => setLoginOpen(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
              </Button>
              </div>
              </aside>

            {/* UC Packs Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {ucPacks.map((pack, index) => (
                  <div
                    key={index}
                    className="bg-[#2a3441] rounded-xl p-3 lg:p-4 relative cursor-pointer hover:bg-[#3a4451] transition-all duration-200 hover:scale-105 min-h-[180px] lg:min-h-[240px] flex flex-col items-center justify-between shadow-lg"
                    onClick={() => setLoginOpen(true)}
                  >
                    {/* Badges */}
                    {pack.popular && (
                      <div className="absolute top-2 left-2 bg-[#00ff88] text-black text-xs px-2 py-1 font-bold z-10 rounded-md">
                        Popular
                      </div>
                    )}
                    {pack.discount && (
                      <div
                        className="absolute top-2 right-2 text-[#ff6b35] text-xs px-0.5 py-1 z-10 border"
                        style={{
                          borderRadius: '50% 50% 50% 0',
                          borderColor: '#ff6b35',
                          backgroundColor: 'transparent',
                        }}
                      >
                        {pack.discount}
                      </div>
                    )}
                    {/* UC Icon - Centered and Prominent */}
                    <div className="mt-6 mb-4 flex justify-center">
                      <Image
                        src={pack.ucImage || "/placeholder.svg"}
                        alt="UC Currency"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>

                    {/* UC Amount - Directly below the icon */}
                    <div className="text-center mb-4 flex-grow flex flex-col justify-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <div className="flex items-center space-x-1">
                          <Image
                            src="https://cdn.midasbuy.com/images/uc-small.bc30c95b.png"
                            alt="UC"
                            width={20}
                            height={20}
                            className="rounded"
                          />
                          <span className="text-white font-bold text-xl lg:text-2xl">{pack.uc}</span>
                        </div>
                        {pack.bonus && (
                          <span className="text-[#ffd700] text-sm lg:text-base font-medium">{pack.bonus}</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className={`text-center ${pack.badge ? "mb-8" : "mb-3"}`}>
                      <div className="text-[#ffd700] font-bold text-sm lg:text-base">From ₨{convertToPKR(pack.price)} PKR</div>
                      {pack.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">₨{convertToPKR(pack.originalPrice)} PKR</div>
                      )}
                    </div>

                    {/* Midasbuy Only Badge */}
                    {pack.badge && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#ff6b35] text-white text-[10px] px-2 py-1 rounded-full font-medium flex items-center space-x-1 whitespace-nowrap">
                          <span>🔥</span>
                          <span>{pack.badge}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1a1f2e] border-t border-[#2a3441] mt-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Midasbuy Info */}
            <div className="flex items-center space-x-4 mb-8">
              <Image
                src="\midasbuy_icon.png"
                alt="Midasbuy Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-white font-bold text-lg">Midasbuy</h3>
                <p className="text-gray-300 text-sm">
                  Midasbuy is the official recharge store by Tencent. Play Safe, fast and fun at Midasbuy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Social Media */}
              <div>
                <h3 className="text-white font-medium mb-4">Follow us on</h3>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <Twitter className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#5865f2] rounded flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#ea4335] rounded flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div className="w-8 h-8 bg-[#ff4500] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-white font-medium mb-4">Midasbuy Supports Payment Channels</h3>
                <div className="grid grid-cols-4 gap-2">
                  {paymentChannels.map((method) => (
                    <div key={method.name} className="bg-[#2a3441] rounded p-2 flex items-center justify-center h-12">
                      <Image
                        src={method.image || "/placeholder.svg"}
                        alt={method.name}
                        width={40}
                        height={24}
                        className="object-contain max-h-6"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trustpilot */}
            <div className="flex items-center space-x-2 mb-6 p-4 bg-[#2a3441] rounded-lg">
              <Star className="w-5 h-5 text-green-500 fill-current" />
              <span className="text-green-500 font-medium">Trustpilot</span>
              <span className="text-gray-400 text-sm">
                Takes less than one minute to share your purchase experience with us so we can better serve you!
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
              >
                Leave a review
              </Button>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-2">Contact us</h3>
              <p className="text-gray-400 text-sm mb-2">
                If you need any help, please contact us by clicking "Customer Service" to get in touch with us.
              </p>
              <Button className="bg-[#2a3441] hover:bg-[#3a4451] text-gray-300">
                <Headphones className="w-4 h-4 mr-2" />
                Customer Service
              </Button>
            </div>

            {/* Why top up games on Midasbuy */}
            <div className="mb-6 p-4 bg-[#2a3441] rounded-lg">
              <h3 className="text-white font-bold mb-3">Why top-up games on Midasbuy?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Midasbuy is PUBG MOBILE's Official Authorized Overseas Top-up Store. As PUBG MOBILE's exclusive officially
                authorized overseas payment partner, Midasbuy provides secure and efficient UC recharge services for
                players in regions including Hong Kong, Japan, Southeast Asia, Europe, and America, supporting Alipay,
                PayPal, credit cards, and other payment methods. We recommend purchasing UC in-game items through the
                official Midasbuy store to benefit from its secure and reliable service.
              </p>
            </div>

            {/* Legal */}
            <div className="border-t border-[#2a3441] pt-6 text-center">
              <div className="flex justify-center space-x-4 text-xs text-gray-500 mb-4">
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
                <span>|</span>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
                <span>|</span>
                <a href="#" className="hover:text-white">
                  Cookie Preference
                </a>
              </div>
              <p className="text-xs text-gray-500">COPYRIGHT © High Morale Developments Limited. ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button className="fixed bottom-6 right-6 bg-[#4a9eff] text-white p-3 rounded-full shadow-lg hover:bg-[#3a8eef] transition-colors z-50">
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* VIP Badge */}
        <div className="fixed bottom-6 left-6 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-black px-4 py-2 rounded-full shadow-lg font-bold text-sm z-50">
          🏆 You get extra UC 3~7%
        </div>
      </div>
      <LoginPopup open={loginOpen} onClose={() => setLoginOpen(false)} />
      <OfferExpiredPopup 
        open={offerExpiredOpen} 
        onClose={() => setOfferExpiredOpen(false)} 
        platform={expiredPlatform}
      />
    </div>
  )
}
