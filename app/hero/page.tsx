"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Truck } from "lucide-react"
import Link from "next/link"

const floatingAnimation = `
  @keyframes floating {
    0% { transform: translate(0, 0px); }
    50% { transform: translate(0, 15px); }
    100% { transform: translate(0, -0px); }
  }

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: #fff; }
  }
`

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true) // Para controlar si está escribiendo o borrando
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0) // Índice de la letra que se está escribiendo o borrando
  const fullText = [
    "Celebrate your baby shower", "Celebrate your birthday", "Romantic date", "Business meeting", "Marriage proposal",
    "Graduation party", "Celebrate your wedding", "Let's party", "A day of fishing"
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (wordIndex < fullText.length) {
      if (isTyping) {
        // Escribiendo la palabra
        timeout = setTimeout(() => {
          setDisplayText((prevText) => prevText + fullText[wordIndex][charIndex]) // Escribe la siguiente letra
          setCharIndex(charIndex + 1) // Avanza al siguiente carácter

          if (charIndex === fullText[wordIndex].length - 1) {
            // Termina de escribir la palabra, cambia a borrado
            setIsTyping(false)
          }
        }, 700) // Velocidad de escritura (100ms por letra)
      } else {
        // Borrando la palabra
        timeout = setTimeout(() => {
          setDisplayText((prevText) => prevText.slice(0, -1)) // Borra la última letra
          setCharIndex(charIndex - 1) // Retrocede el índice de la letra

          if (charIndex === 1) {
            // Cuando termina de borrar la palabra, pasa a la siguiente palabra
            setIsTyping(true)
            setWordIndex((prevIndex) => (prevIndex + 1) % fullText.length) // Avanza al siguiente índice de palabra (en bucle)
          }
        }, 50) // Velocidad de borrado (50ms por letra)
      }
    }

    return () => clearTimeout(timeout) // Limpiar el timeout cuando se desmonte el componente o cambie el estado
  }, [charIndex, wordIndex, isTyping])

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
      {/* Dark overlay with fade effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-gray-200" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-8 mt-16">
        <h1 className="text-center">
          <span className="text-md md:text-6xl font-bold block">
            {displayText}
            <span className="border-r-2 border-white ml-1" style={{ animation: "blink 1s step-end infinite" }}>
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
