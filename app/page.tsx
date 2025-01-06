import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Skills from '@/app/components/Skills'
import Portfolio from '@/app/components/Portfolio'
import Testimonials from '@/app/components/Testimonials'
import Timeline from '@/app/components/Timeline'
import ContactCTA from '@/app/components/ContactCTA'


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Timeline />
      <ContactCTA />
    </main>
  )
}

