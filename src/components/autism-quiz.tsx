"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Confetti from "react-confetti"

const thinkingQuotes = [
    "Hmm... thinking about it",
    "Beep... boop... computer thinking",
    "Analyzing neurodiversity...",
    "Consulting the autism oracle...",
    "Crunching the numbers...",
    "Rerouting neural pathways...",
    "Untangling my special interest spaghetti...",
    "Stimming for better processing power...",
    "Adjusting sensory input levels...",
    "Decoding neurotypical social cues...",
    "Channeling my inner savant...",
    "Aligning my brain's CPU and GPU...",
    "Switching to hyperfocus mode...",
    "Translating from Aspie to NT and back...",
    "Calibrating my social battery...",
  ]

export default function AutismQuiz() {
  const [result, setResult] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [thinking, setThinking] = useState<string | null>(null)

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowDimensions()
    window.addEventListener("resize", updateWindowDimensions)
    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, [])

  const playAudio = async () => {
    try {
      const audio = new Audio("/applause.mp3")
      await audio.play()
    } catch (error) {
      console.error("Error playing audio:", error)
      // Fallback to browser API if available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Applause!")
        speechSynthesis.speak(utterance)
      }
    }
  }

  const handleFindOut = () => {
    setResult(null)
    setThinking(thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)])
    
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? "YES" : "NO"
      setResult(newResult)
      setThinking(null)
      setShowConfetti(true)
      playAudio()
      setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
    }, 2000) // Delay the result by 2 seconds
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-black">Are you autistic?</h1>
      <p className="text-xl md:text-2xl mb-8 text-center text-gray-600">Discover your neurodiversity</p>
      <Button
        onClick={handleFindOut}
        className="text-lg md:text-xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
        disabled={thinking !== null}
      >
        {result ? "Find out again" : "Find out"}
      </Button>
      {thinking && (
        <p className="mt-4 text-xl md:text-2xl text-center animate-pulse text-black">{thinking}</p>
      )}
      {result && (
        <div 
          className="mt-12 text-8xl md:text-9xl font-bold text-center animate-bounce text-black" 
          style={{fontSize: "clamp(5rem, 15vw, 15rem)"}}
          aria-live="assertive"
        >
          {result}
        </div>
      )}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
    </div>
  )
}