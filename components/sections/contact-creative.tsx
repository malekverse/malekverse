"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Send,
  Star,
  Sun,
  Rocket,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
  Sparkles,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Custom animated planet component
const AnimatedPlanet = ({ delay = 0, size = 6, color = "#4FD1C5", className = "" }) => {
  return (
    <motion.div
      className={cn("absolute rounded-full opacity-70 blur-sm", className)}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        background: color,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}


// Form step interface
interface FormStep {
  id: string
  title: string
  icon: React.ReactNode
}

export function ContactCreative() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState(false)

  const steps: FormStep[] = [
    { id: "personal", title: "Personal Info", icon: <Sun className="h-5 w-5" /> },
    { id: "message", title: "Your Message", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "review", title: "Review", icon: <Star className="h-5 w-5" /> },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission with random success/failure
    setTimeout(() => {
      setIsSubmitting(false)

      // 90% chance of success
      if (Math.random() > 0.1) {
        setFormSuccess(true)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          priority: "medium",
        })
      } else {
        setFormError(true)
      }

      // Reset success/error message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false)
        setFormError(false)
        setCurrentStep(0)
      }, 5000)
    }, 2000)
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

  const priorityOptions = [
    { value: "low", label: "Low Priority", color: "bg-blue-500" },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-500" },
    { value: "high", label: "High Priority", color: "bg-red-500" },
  ]

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950 opacity-80" />
      <AnimatedPlanet delay={0} size={12} color="#4FD1C5" className="-top-20 -left-20" />
      <AnimatedPlanet delay={2} size={8} color="#805AD5" className="bottom-40 -right-10" />
      <AnimatedPlanet delay={4} size={6} color="#F56565" className="top-1/2 -left-10" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-xl" />
              <div className="relative bg-navy-800/80 p-4 rounded-full border border-teal-500/30">
                <Rocket className="h-8 w-8 text-teal-400" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-500">
            Let's Connect
          </h2>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ready to embark on a cosmic journey together? Send a transmission and I'll respond faster than light.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 relative">
          {/* Contact info sidebar */}
          <motion.div className="lg:col-span-2" style={{ y, opacity }}>
            <div className="space-y-6 sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-navy-800/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/20 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-teal-400" />
                  <span>Cosmic Coordinates</span>
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start p-4 rounded-xl border border-navy-600 bg-navy-700/50 hover:bg-navy-700/80 transition-all group"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(79, 209, 197, 0.3)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="mr-4 p-3 rounded-full bg-navy-600 group-hover:bg-teal-500/20 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-lg text-gray-200">{info.title}</h4>
                        <p className="text-gray-400 group-hover:text-teal-300 transition-colors">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-navy-800/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/20 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">Response Time</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Emails</span>
                    <span className="text-teal-400 font-medium">~2 hours</span>
                  </div>
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Phone Calls</span>
                    <span className="text-teal-400 font-medium">~30 minutes</span>
                  </div>
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-400">
                  <p>Available Monday-Friday, 9AM-6PM (GMT+1)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Multi-step form */}
          <motion.div className="lg:col-span-3" style={{ scale }} ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-navy-800/80 backdrop-blur-sm rounded-2xl border border-teal-500/20 shadow-lg overflow-hidden"
            >
              {/* Form header with steps */}
              <div className="border-b border-navy-700 p-6">
                <div className="flex justify-between items-center">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                          currentStep === index
                            ? "bg-teal-500 text-navy-900"
                            : currentStep > index
                              ? "bg-teal-700 text-white"
                              : "bg-navy-700 text-gray-400",
                        )}
                      >
                        {currentStep > index ? <Check className="h-5 w-5" /> : step.icon}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium hidden md:block",
                          currentStep === index ? "text-teal-400" : "text-gray-500",
                        )}
                      >
                        {step.title}
                      </span>

                      {/* Progress line */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-0 right-0 flex justify-center">
                          <div className="w-16 md:w-24 h-0.5 bg-navy-700 mt-5">
                            <motion.div
                              className="h-full bg-teal-500"
                              initial={{ width: "0%" }}
                              animate={{
                                width: currentStep > index ? "100%" : "0%",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!formSuccess && !formError && (
                    <motion.form
                      key={`step-${currentStep}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={
                        currentStep === steps.length - 1
                          ? handleSubmit
                          : (e) => {
                              e.preventDefault()
                              nextStep()
                            }
                      }
                    >
                      {/* Step 1: Personal Info */}
                      {currentStep === 0 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold">Personal Information</h3>
                          <p className="text-gray-400 mb-6">Let me know who you are so I can get back to you.</p>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name" className="text-gray-300">
                                Full Name
                              </Label>
                              <div className="relative mt-1">
                                <Input
                                  id="name"
                                  name="name"
                                  placeholder="Your name"
                                  value={formState.name}
                                  onChange={handleChange}
                                  required
                                  className="pl-10 bg-navy-700/50 border-navy-600 focus:border-teal-500 text-gray-200"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500">
                                    <Sun className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="email" className="text-gray-300">
                                Email Address
                              </Label>
                              <div className="relative mt-1">
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="your.email@example.com"
                                  value={formState.email}
                                  onChange={handleChange}
                                  required
                                  className="pl-10 bg-navy-700/50 border-navy-600 focus:border-teal-500 text-gray-200"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500">
                                    <Mail className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="priority" className="text-gray-300">
                                Message Priority
                              </Label>
                              <div className="grid grid-cols-3 gap-3 mt-2">
                                {priorityOptions.map((option) => (
                                  <button
                                    key={option.value}
                                    type="button"
                                    className={cn(
                                      "flex items-center justify-center p-3 rounded-lg border transition-all",
                                      formState.priority === option.value
                                        ? "border-teal-500 bg-navy-700/80"
                                        : "border-navy-600 bg-navy-700/30 hover:bg-navy-700/50",
                                    )}
                                    onClick={() => setFormState({ ...formState, priority: option.value })}
                                  >
                                    <div className="flex flex-col items-center">
                                      <div className={cn("w-3 h-3 rounded-full mb-2", option.color)} />
                                      <span className="text-sm font-medium text-gray-300">{option.label}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Message */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold">Your Message</h3>
                          <p className="text-gray-400 mb-6">What would you like to discuss?</p>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="subject" className="text-gray-300">
                                Subject
                              </Label>
                              <div className="relative mt-1">
                                <Input
                                  id="subject"
                                  name="subject"
                                  placeholder="What's this about?"
                                  value={formState.subject}
                                  onChange={handleChange}
                                  required
                                  className="pl-10 bg-navy-700/50 border-navy-600 focus:border-teal-500 text-gray-200"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500">
                                    <Star className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="message" className="text-gray-300">
                                Message
                              </Label>
                              <div className="relative mt-1">
                                <Textarea
                                  id="message"
                                  name="message"
                                  placeholder="Your message"
                                  rows={6}
                                  value={formState.message}
                                  onChange={handleChange}
                                  required
                                  className="pl-10 bg-navy-700/50 border-navy-600 focus:border-teal-500 text-gray-200"
                                />
                                <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none">
                                  <span className="text-gray-500">
                                    <MessageCircle className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">Min 20 characters</span>
                                <span className="text-xs text-gray-500">{formState.message.length} / 500</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Review */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold">Review Your Message</h3>
                          <p className="text-gray-400 mb-6">Please review your information before sending.</p>

                          <div className="space-y-4">
                            <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600">
                              <h4 className="font-medium text-gray-300 mb-2">Personal Information</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Name</p>
                                  <p className="text-gray-300">{formState.name || "Not provided"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Email</p>
                                  <p className="text-gray-300">{formState.email || "Not provided"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Priority</p>
                                  <div className="flex items-center">
                                    <div
                                      className={cn(
                                        "w-2 h-2 rounded-full mr-2",
                                        formState.priority === "low"
                                          ? "bg-blue-500"
                                          : formState.priority === "medium"
                                            ? "bg-yellow-500"
                                            : "bg-red-500",
                                      )}
                                    />
                                    <p className="text-gray-300 capitalize">{formState.priority}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600">
                              <h4 className="font-medium text-gray-300 mb-2">Message</h4>
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm text-gray-500">Subject</p>
                                  <p className="text-gray-300">{formState.subject || "Not provided"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Message</p>
                                  <p className="text-gray-300 whitespace-pre-line">
                                    {formState.message || "Not provided"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-8">
                        {currentStep > 0 ? (
                          <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="border-navy-600 text-gray-300 hover:bg-navy-700"
                          >
                            Back
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-navy-900 font-medium">
                          {currentStep === steps.length - 1 ? (
                            <span className="flex items-center">
                              {isSubmitting ? (
                                <>
                                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Message
                                </>
                              )}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}

                  {/* Success message */}
                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1,
                        }}
                        className="mx-auto mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
                        <div className="relative bg-green-500/20 p-4 rounded-full border border-green-500/30 w-20 h-20 flex items-center justify-center mx-auto">
                          <Check className="h-10 w-10 text-green-500" />
                        </div>
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-400 mb-6">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>

                      <div className="flex justify-center">
                        <Button
                          type="button"
                          onClick={() => {
                            setFormSuccess(false)
                            setCurrentStep(0)
                          }}
                          className="bg-teal-500 hover:bg-teal-600 text-navy-900"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Error message */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1,
                        }}
                        className="mx-auto mb-6 relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
                        <div className="relative bg-red-500/20 p-4 rounded-full border border-red-500/30 w-20 h-20 flex items-center justify-center mx-auto">
                          <span className="text-red-500 text-3xl font-bold">!</span>
                        </div>
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-2">Oops! Something went wrong</h3>
                      <p className="text-gray-400 mb-6">There was an error sending your message. Please try again.</p>

                      <div className="flex justify-center">
                        <Button
                          type="button"
                          onClick={() => {
                            setFormError(false)
                            setCurrentStep(2)
                          }}
                          className="bg-teal-500 hover:bg-teal-600 text-navy-900"
                        >
                          Try Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
