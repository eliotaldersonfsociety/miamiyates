"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const floatingAnimation = `
  @keyframes floating {
    0% { transform: translate(0, 0px); }
    50% { transform: translate(0, 15px); }
    100% { transform: translate(0, 0px); }
  }

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: #fff; }
  }
`

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const mountedRef = useRef(true)

  const fullText = [
    "Celebrate your baby shower", "Celebrate your birthday", "Romantic date", "Business meeting", "Marriage proposal",
    "Graduation party", "Celebrate your wedding", "Let's party", "A day of fishing"
  ]

  useEffect(() => {
    console.log("Hero montado")
    return () => {
      console.log("Hero desmontado")
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (wordIndex < fullText.length) {
      if (isTyping) {
        timeout = setTimeout(() => {
          // Verificar que el componente sigue montado
          if (!mountedRef.current) return

          setDisplayText((prevText) => prevText + fullText[wordIndex][charIndex])
          setCharIndex((prev) => prev + 1)
          console.log(`Escribiendo: ${fullText[wordIndex].slice(0, charIndex + 1)}`)

          if (charIndex === fullText[wordIndex].length - 1) {
            setIsTyping(false)
          }
        }, 700)
      } else {
        timeout = setTimeout(() => {
          if (!mountedRef.current) return

          setDisplayText((prevText) => prevText.slice(0, -1))
          setCharIndex((prev) => prev - 1)
          console.log(`Borrando: ${displayText.slice(0, -1)}`)

          if (charIndex === 1) {
            setIsTyping(true)
            setWordIndex((prevIndex) => (prevIndex + 1) % fullText.length)
          }
        }, 50)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, wordIndex, isTyping, displayText, fullText])

  return (
    <div className="relative w-full h-[400px]">
      <style jsx>{floatingAnimation}</style>
      <Image
        src="/1f.jpg"
        alt="Dallas skyline at sunset with urban infrastructure"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-gray-200" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-8 mt-16">
        <h1 className="text-center">
          <span className="text-md md:text-6xl font-bold block">
            {displayText}
            <span
              className="border-r-2 border-white ml-1"
              style={{ animation: "blink 1s step-end infinite" }}
            >
              &nbsp;
            </span>
          </span>
          <span
            className="text-7xl md:text-8xl font-extrabold block mt-2 text-yellow-400"
            style={{
              animation: "floating 3s ease-in-out infinite",
              display: "inline-block",
            }}
          >
            Luxury
          </span>
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="https://w.app/miamiyates">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Purchase by WhatsApp
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
