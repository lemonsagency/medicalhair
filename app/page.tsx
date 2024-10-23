"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sprout, Leaf, Scissors, Stethoscope, UserCheck, Zap, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-IqTAyj66AeUCYNjtKTPGb4j4doLg1K.png"
        alt="Medical Hair Logo"
        width={222}
        height={38}
      />
      <Button variant="outline" className="bg-[#e5f1f8] text-[#0063af] hover:bg-[#d0e8f5]">
        Free Consultation
      </Button>
    </header>
  )
}

function HeroSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      // Reset form or show success message
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      alert('Thank you for your submission!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Regain Your Hair in Just One Day – <span className="text-[#96B91B]">For Life!</span>
          </h1>
          <p className="text-xl mb-6">The permanent solution for hair loss</p>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Before and After"
              width={600}
              height={400}
              className="rounded-lg w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 p-2 rounded-bl-lg">
              <p className="text-sm">Nick H.</p>
              <p className="text-xs">MedicalHair Patient</p>
              <p className="text-xs">Results may vary</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#1c2641] mb-4">Schedule Your Free Consultation Today!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-[#1c2641]">First Name*</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-[#1c2641]">Last Name*</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-[#1c2641]">Phone*</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#1c2641]">Email*</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <p className="text-xs text-[#1c2641]">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
              <p className="text-xs text-[#1c2641]">
                By submitting this form, I authorize MedicalHair to contact me by phone or text utilizing automated dialing equipment, as well as by email or mail with information about appointments, products, services, news or promotions. I understand that I&apos;m not required to give consent as a condition of purchasing any property, goods, or services. I also agree to MedicalHair&apos;s Terms of Service.
              </p>
              <Button type="submit" className="w-full bg-[#0063af] hover:bg-[#004d8c] text-white" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Get Started'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

function AnnouncementBar() {
  const announcements = [
    { number: '25+', text: 'Years of experience' },
    { number: '35+', text: 'Locations worldwide' },
    { number: '100+', text: 'Outstanding professionals' },
    { number: '600,000+', text: 'Successful cases' },
  ];

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden py-2">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
      <div className="animate-scroll flex whitespace-nowrap">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex">
            {announcements.map((announcement, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-2xl font-bold mr-2">{announcement.number}</span>
                <span className="text-sm">{announcement.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function HairRestorationSteps() {
  const steps = [
    {
      title: "Consultation & Personalized Planning",
      description: "Your journey starts with a one-on-one consultation where we collaborate with you to design the perfect plan. The design room is where we prepare your scalp, carefully marking the areas for surgery. You'll have an active role in this process, ensuring the design aligns with your vision for natural-looking results.",
      icon: <Stethoscope className="w-8 h-8 text-lime-500" />,
    },
    {
      title: "Precision Surgery: Extraction & Implantation",
      description: "During the procedure, we use advanced techniques to extract hair follicles from the donor area with care and precision. Each follicle is classified and implanted strategically. Single-hair follicles create a natural hairline, while multi-hair units are used to improve density in areas that need it most, ensuring a flawless, even appearance.",
      icon: <Scissors className="w-8 h-8 text-lime-500" />,
    },
    {
      title: "Recovery & Ongoing Support",
      description: "After the surgery, your recovery process begins with detailed post-op care instructions. Our team will guide you every step of the way, from immediate aftercare to regular follow-ups over the next year, ensuring your implant looks great and lasts for the long term.",
      icon: <UserCheck className="w-8 h-8 text-lime-500" />,
    },
  ]

  return (
    <div className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">3 Steps to Hair Restoration Success</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our comprehensive approach ensures the best possible results for your hair restoration journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 bg-gray-900 p-6 rounded-lg">
              <div className="flex-shrink-0">
                {step.icon}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TestimonialCarousel() {
  const testimonials = [
    {
      image: "/images/carousel/testimonial1.jpg",
      text: "This product exceeded all my expectations. Highly recommended!",
      name: "Sarah J."
    },
    {
      image: "/images/carousel/testimonial2.jpg",
      text: "I've seen amazing results. This is truly a game-changer.",
      name: "Mike R."
    },
    {
      image: "/images/carousel/testimonial3.jpg",
      text: "From skeptic to believer. I'm so glad I gave this a try!",
      name: "Emily T."
    },
    {
      image: "/images/carousel/testimonial4.jpg",
      text: "The results are incredible. I feel like a new person!",
      name: "David L."
    },
    {
      image: "/images/carousel/testimonial5.jpg",
      text: "Professional service and amazing outcomes. Thank you!",
      name: "Lisa M."
    }
  ]

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">What Our Customers Say</h2>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="mb-6">
                    <Image
                      src={testimonial.image}
                      alt={`Testimonial image for ${testimonial.name}`}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg mb-4 italic text-gray-300">&ldquo;{testimonial.text}&rdquo;</p>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  )
}

function BenefitsSection() {
  return (
    <div className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Our Unique Technique</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            At Medical Hair, we are pioneers in using sapphire blades for the FUE hair implant technique, bringing the latest innovation in the field to our patients. The fine V-shaped sapphire blades allow us to precisely determine the natural direction and angle of the implanted hair, ensuring optimal results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BenefitCard
            icon={<Scissors className="w-8 h-8 text-lime-500" />}
            title="Less Invasive"
            description="The use of sapphire blades enables smaller, more refined incisions, leading to better follicle implantation and minimizing trauma to the scalp."
          />
          <BenefitCard
            icon={<Sprout className="w-8 h-8 text-lime-500" />}
            title="Increased Density"
            description="Ideal for patients with more severe hair loss, this technique allows us to implant more hair in the same area, achieving a fuller and more natural appearance."
          />
          <BenefitCard
            icon={<Zap className="w-8 h-8 text-lime-500" />}
            title="Faster Recovery"
            description="As a natural stone material, sapphire reduces the risk of allergic reactions, promotes faster healing, and minimizes post-transplant swelling for a quicker recovery."
          />
          <BenefitCard
            icon={<Leaf className="w-8 h-8 text-lime-500" />}
            title="Natural Results"
            description="Our advanced technique allows for more precise follicle distribution, achieving a natural and harmonious appearance of the transplanted hair."
          />
        </div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4 bg-gray-900 p-6 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

function FAQSection() {
  return (
    <div className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
          Frequently Asked Questions about Hair Implants
        
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full text-white">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:text-gray-400">How much does a hair implant cost?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Before providing a price, the first step is a free consultation with one of our doctors. During the consultation, your type of hair loss will be evaluated, and once we confirm that you are a suitable candidate for a hair implant, we will provide you with a personalized treatment quote.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:text-gray-400">Who performs the surgery?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                A highly trained doctor is responsible for the surgical plan and is present during all the key stages of the procedure. However, since thousands of follicles are implanted, a team effort is required. Typically, a team of 2 to 3 technicians assists in the extraction, classification, and implantation phases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:text-gray-400">What can I do during the procedure?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Except for certain moments during the extraction phase, where your movement may be limited, you are free to enjoy activities to make the process more comfortable. Most of our patients watch TV, listen to their favorite music, or use their cell phones during the procedure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:text-gray-400">What is the recovery process like?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                For the first few days, we will provide you with a post-operative care kit, along with hygiene and scalp care instructions. You&apos;ll have a follow-up appointment at our center for your initial washes. Over the first year, regular check-ups with your doctor are included to monitor your progress and ensure the best results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Miami Office</h2>
          <address className="not-italic">
            <div className="flex justify-center items-center mb-2">
              <MapPin className="mr-2 flex-shrink-0" size={18} />
              <p>
                Av. 323 Sunny Isles Blvd.<br />
                Suite 502, Sunny Isles Beach, FL 33160
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Phone className="mr-2 flex-shrink-0" size={18} />
              <a href="tel:+13058684811" className="hover:underline">+1 (305) 868-4811</a>
            </div>
          </address>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MedicalHair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <HeroSection />
      </div>
      <AnnouncementBar />
      <HairRestorationSteps />
      <TestimonialCarousel />
      <BenefitsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}