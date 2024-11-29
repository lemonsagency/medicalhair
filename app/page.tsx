"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sprout, Leaf, Scissors, Stethoscope, UserCheck, Zap, MapPin, Phone, Star, CheckCircle } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FormStatus } from '@/components/FormStatus';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import ReactPixel from 'react-facebook-pixel';

function Header() {
  return (
    <header className="flex justify-between items-center py-4 border-b border-white border-opacity-50">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-IqTAyj66AeUCYNjtKTPGb4j4doLg1K.png"
        alt="Medical Hair Logo"
        width={222}
        height={38}
      />
      <a 
        href="tel:+13058684811" 
        className="bg-[#96B91B] text-black font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#85A619] transition-colors duration-300"
      >
        Free Consultation
      </a>
    </header>
  )
}

function HeroSection() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value;

    if (name === 'phone') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      // Format as XXX-XXX-XXXX
      formattedValue = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: formattedValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number in the format 123-456-7890');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setFormStatus('submitting');
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
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      setFormStatus('success');
      ReactPixel.track('Lead', { content_name: 'Consultation Form' });
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  }

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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-medicalhair2-oP0uGoVyzNzNvNJWueoYwQnKF1hdls.jpg"
              alt="Before and After Hair Restoration"
              width={600}
              height={330}
              className="rounded-lg w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 p-2 rounded-bl-lg">
              <p className="text-sm">Williams</p>
              <p className="text-xs">MedicalHair Patient</p>
              <p className="text-xs">Results may vary</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#1c2641] mb-4">Schedule Your Free Consultation Today!</h2>
            <form id="consultation-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-[#1c2641]">First Name*</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[#1c2641]"
                  placeholder="Enter your first name"
                  maxLength={50}
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
                  className="w-full text-[#1c2641]"
                  placeholder="Enter your last name"
                  maxLength={50}
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
                  className="w-full text-[#1c2641]"
                  placeholder="🇺🇸 Enter your phone number"
                  maxLength={12}
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full text-[#1c2641]"
                  placeholder="Enter your email address"
                  maxLength={100}
                />
              </div>
              <p className="text-xs text-[#1c2641]">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
              <p className="text-xs text-[#1c2641]">
                By submitting this form, I authorize MedicalHair to contact me by phone or text utilizing automated dialing equipment, as well as by email or mail with information about appointments, products, services, news or promotions. I understand that I&apos;m not required to give consent as a condition of purchasing any property, goods, or services. I also agree to MedicalHair&apos;s Terms of Service.
              </p>
              <Button type="submit" className="w-full bg-[#0063af] hover:bg-[#004d8c] text-white" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Submitting...' : 'Get Started'}
              </Button>
              <FormStatus status={formStatus} />
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
      title: "Consultation & Planning",
      description: "Begin with a personalized consultation to design your hair restoration plan. In the design room, we prepare your scalp, marking the surgery areas, and collaborate with you to achieve your vision for natural results.",
      icon: <Stethoscope className="w-8 h-8 text-lime-500" />,
    },
    {
      title: "Precision Surgery",
      description: "We utilize advanced techniques to extract hair follicles carefully and implant them strategically. Single-hair follicles create a natural hairline, while multi-hair units enhance density, ensuring a flawless appearance.",
      icon: <Scissors className="w-8 h-8 text-lime-500" />,
    },
    {
      title: "Recovery & Support",
      description: "Post-surgery, you'll receive detailed aftercare instructions, with our team supporting you through recovery and regular follow-ups to ensure lasting results.",
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

function ReviewsCarousel() {
  const reviews = [
  {
    name: "Jake",
    location: "Miami Clinic",
    content: "I got my hair back in just one day! The procedure was quick, and now I have a natural look that lasts. Highly recommend Medical Hair!",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_06-ahWqX9Ys8BXCaC7vqgHSu30ElMhMjI.jpg"
  },
  {
    name: "Mark",
    location: "Miami Clinic",
    content: "Medical Hair transformed my confidence! The results are invisible, and I love that it's my own hair. Permanent and hassle-free!",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_01-c5qYz0mKI4anuemXuLhvAcWFspv1uH.jpg"
  },
  {
    name: "Ryan",
    location: "Miami Clinic",
    content: "Fast and safe! The team at Medical Hair made the transplant easy. I was back to my routine in no time with stunning results!",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_04-i0paSc0bo4hrzS1JnXm6yFrQJ2n9df.jpg"
  },
  {
    name: "Chris",
    location: "Miami Clinic",
    content: "I can't believe how natural my hair looks after the transplant. No scars and no one can tell! Medical Hair truly delivers.",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_02-6SngljOz3cIvQWVB0SIx2pg13gmwxe.jpg"
  },
  {
    name: "Daniel",
    location: "Miami Clinic",
    content: "Amazing experience! The procedure was quick, and I felt no complications. My hair has grown back beautifully and is here to stay!",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_03-HtbUTGEgpSMseiv1pj0SJTz0D8HNom.jpg"
  },
  {
    name: "David",
    location: "Miami Clinic",
    content: "I'm thrilled with my new hair! The Medical Hair team was professional and made sure everything went smoothly. Highly satisfied!",
    rating: 5,
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rev_05-T5Qsv2XBISWxi9QTdwCYkgN8aT9wyp.jpg"
  }
  ]

  return (
    <div className="bg-black py-12 flex flex-col items-center justify-center relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">What Our Patients Say</h2>
      <div className="absolute w-[600px] h-[600px] bg-[#96b91b] rounded-full blur-[150px] opacity-20 -top-[300px] -left-[300px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#96b91b] rounded-full blur-[150px] opacity-20 -bottom-[300px] -right-[300px]"></div>
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto relative z-10">
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index}>
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-full mb-4 aspect-[4/3] relative overflow-hidden rounded-md">
                    <Image
                      src={review.imageSrc}
                      alt={`Before and after hair transplant for ${review.name}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-indigo-500 font-semibold mb-2">{review.location}</div>
                      <p className="text-sm text-gray-600 mb-4">{review.content}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{review.name}</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Customer
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white bg-black/50 hover:bg-black/70" />
        <CarouselNext className="text-white bg-black/50 hover:bg-black/70" />
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

function ClinicGallery() {
  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241022-WA0011-qXMF9cxZkhxOPCUbjuRejBLzSDIbDh.jpg",
      alt: "Exterior view of Medical Hair building"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241022-WA0010-7BlREVeSphW2UiFNKXGNgCUtkD0qnj.jpg",
      alt: "Medical treatment room with white chair"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241022-WA0004-9XYdnoaLfAD9b39488CHvBcjqQPbqt.jpg",
      alt: "Lounge area with city view"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241022-WA0006-2AIHJsBfBjKkPn072MCDQ2rqUf93sY.jpg",
      alt: "Another medical treatment room"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241022-WA0008-4vdAg2jMi7XYlAsboFpYkpkhoWHEUa.jpg",
      alt: "Office space with wooden desk and computer"
    }
  ];

  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Miami Clinic</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="rounded-lg object-cover w-full h-[400px]"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
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
        <div className="mt-4 text-center">
          <Link href="/consent" className="text-sm hover:underline">
            SMS Terms & Conditions
          </Link>
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
      <ReviewsCarousel />
      <div className="bg-black py-12 text-center">
        <a href="#consultation-form">
          <Button size="lg" className="bg-[#96B91B] text-black hover:bg-[#85A619] transition-colors duration-300">
            Get my free consultation
          </Button>
        </a>
      </div>
      <BenefitsSection />
      <FAQSection />
      <ClinicGallery />
      <Footer />
    </div>
  )
}