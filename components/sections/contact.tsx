"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSuccess(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false)
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-teal-500" />,
      title: "Email",
      value: "malek.magraoui3@gmail.com",
      link: "mailto:malek.magraoui3@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-teal-500" />,
      title: "Phone",
      value: "(+216) 94 181 481",
      link: "tel:+21694181481",
    },
    {
      icon: <MapPin className="h-6 w-6 text-teal-500" />,
      title: "Location",
      value: "Ariana, Borjlouzir, Tunisia",
      link: "https://maps.google.com/?q=Ariana,Borjlouzir,Tunisia",
    },
  ]

  return (
    <section id="contact" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            Ready to create something extraordinary? Don't hesitate to reach out. I'm always open to discussing new
            projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border border-gray-200 dark:border-gray-800 shadow-lg dark:bg-navy-500/50 h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  {formSuccess && (
                    <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                      Thank you for your message! I'll get back to you soon.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/5 dark:bg-navy-500/50 hover:shadow-md transition-shadow"
                  >
                    <div className="mr-4">{info.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <Card className="border border-gray-200 dark:border-gray-800 shadow-lg dark:bg-navy-500/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-teal-500" />
                  <CardTitle>Chat with Me</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-navy-600 p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    Hi there! 👋 Thanks for visiting my portfolio. Feel free to ask me anything about my work, skills,
                    or if you'd like to discuss a potential collaboration.
                  </p>
                </div>

                <div className="flex">
                  <Input placeholder="Type your message..." className="mr-2" />
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                  You can also reach me on WhatsApp at (+216) 94 181 481
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1 text-teal-500 hover:text-teal-600 transition-colors"
          >
            <span>Learn more about contacting me</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
