"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function Music() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState(0)

  const playlists = [
    {
      name: "Metal Favorites",
      description: "My top metal tracks that inspire creativity",
      coverImage: "/placeholder.svg?height=300&width=300",
      tracks: [
        { title: "Master of Puppets", artist: "Metallica", duration: "8:36" },
        { title: "Paranoid", artist: "Black Sabbath", duration: "2:48" },
        { title: "The Trooper", artist: "Iron Maiden", duration: "4:12" },
      ],
    },
    {
      name: "Coding Focus",
      description: "Perfect background music for deep work sessions",
      coverImage: "/placeholder.svg?height=300&width=300",
      tracks: [
        { title: "Strobe", artist: "Deadmau5", duration: "10:37" },
        { title: "Midnight City", artist: "M83", duration: "4:03" },
        { title: "Intro", artist: "The xx", duration: "2:07" },
      ],
    },
    {
      name: "Chill Vibes",
      description: "Relaxing tunes for unwinding after a long day",
      coverImage: "/placeholder.svg?height=300&width=300",
      tracks: [
        { title: "Redbone", artist: "Childish Gambino", duration: "5:27" },
        { title: "Breathe", artist: "Pink Floyd", duration: "2:43" },
        { title: "Dreams", artist: "Fleetwood Mac", duration: "4:17" },
      ],
    },
  ]

  const currentPlaylistData = playlists[currentPlaylist]

  return (
    <section id="music" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading">Music</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            In my free time, I draw inspiration from Metal, Pop, and Chill music. Here are some of my favorite playlists
            that fuel my creativity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {playlists.map((playlist, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    currentPlaylist === index ? "ring-2 ring-teal-500" : ""
                  } dark:bg-navy-500/50`}
                  onClick={() => setCurrentPlaylist(index)}
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={playlist.coverImage || "/placeholder.svg"}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{playlist.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg dark:bg-navy-500/50">
              <div className="relative h-64 w-full">
                <Image
                  src={currentPlaylistData.coverImage || "/placeholder.svg"}
                  alt={currentPlaylistData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">{currentPlaylistData.name}</h3>
                  <p className="text-white/80 text-sm">{currentPlaylistData.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  {currentPlaylistData.tracks.map((track, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-md ${
                        index === 0 ? "bg-teal-500/10" : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      } transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center">
                        <span className="w-6 text-center text-gray-500 dark:text-gray-400">{index + 1}</span>
                        <div className="ml-4">
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{track.duration}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-full">
                      <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>1:12</span>
                        <span>3:45</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                        <SkipBack size={20} />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition-colors"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                        <SkipForward size={20} />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Volume2 size={18} className="text-gray-600 dark:text-gray-300" />
                      <Slider defaultValue={[70]} max={100} step={1} className="w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/music"
            className="group inline-flex items-center gap-1 text-teal-500 hover:text-teal-600 transition-colors"
          >
            <span>Learn more about my music</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
