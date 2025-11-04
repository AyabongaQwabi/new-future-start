import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'SASEA - South African Student Excellence Awards | Future Start',
  description:
    'Nominate outstanding students for the South African Student Excellence Awards (SASEA). A national platform celebrating student achievement across Academics, Leadership, Entrepreneurship, Sport, Arts, Music, Content Creation, Modelling, Broadcasting, and Innovation.',
}

export default function SaseaPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <Image
                src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2020.11.24-aiRSvS4nTzPtzOlvrrO8NPFtkZKU0Y.jpeg'
                alt='Future Start Logo'
                width={150}
                height={50}
                className='h-10 w-auto'
              />
            </Link>
          </div>
          <nav className='hidden md:flex gap-6'>
            <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
              Home
            </Link>
            <Link href='/#services' className='text-sm font-medium transition-colors hover:text-primary'>
              Our Services
            </Link>
            <Link href='/#testimonials' className='text-sm font-medium transition-colors hover:text-primary'>
              Testimonials
            </Link>
            <Link href='/#book' className='text-sm font-medium transition-colors hover:text-primary'>
              The Book
            </Link>
            <Link href='/contact' className='text-sm font-medium transition-colors hover:text-primary'>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className='flex-1'>
        {/* Hero */}
        <section className='w-full py-12 md:py-24 bg-gradient-to-r from-green-50 to-green-100'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-3'>
                <div className='inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full font-bold text-sm'>
                  🌟 South African Student Excellence Awards
                </div>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                  Calling All Student Achievers!
                </h1>
                <p className='max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  The South African Student Excellence Awards (SASEA) is your chance to be recognised nationally.
                  Whether in Academics, Leadership, Entrepreneurship, Sport, Arts, Music, Content creation, Modelling,
                  Broadcasting, or Innovation.
                </p>
                <div className='pt-2'>
                  <Button size='lg' className='bg-green-600 hover:bg-green-700' asChild>
                    <a
                      href='https://forms.gle/iB26NMnwpW6ntRED6'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      👉 Nominate Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About SASEA */}
        <section className='w-full py-12 md:py-24'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto max-w-4xl space-y-8'>
              <div className='space-y-4'>
                <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>What is SASEA?</h2>
                <p className='text-gray-700'>
                  The South African Students Excellence Awards (SASEA) is a prestigious national platform that celebrates and
                  elevates student achievement. Anchored by the Golden Arc of Excellence and strengthened through youth
                  empowerment initiatives, SASEA combines the honor of the awards with the transformative book
                  <span className='font-semibold'> Conquering Your Years in Tertiary Education</span>, which guides students to achieve excellence.
                </p>
                <p className='text-gray-700'>
                  The South African Students Excellence Awards (SASEA) is not just an event, but a year‑round movement that
                  inspires recognition, empowerment, and legacy‑building.
                </p>
              </div>

              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <div className='rounded-xl border bg-white p-6 shadow-sm'>
                  <h3 className='font-semibold mb-2'>Who Can Be Honored</h3>
                  <p className='text-gray-600'>
                    Students from High Schools, Colleges/FETs/TVETs, and Universities.
                  </p>
                </div>
                <div className='rounded-xl border bg-white p-6 shadow-sm'>
                  <h3 className='font-semibold mb-2'>Areas of Excellence</h3>
                  <ul className='text-gray-600 list-disc pl-5 space-y-1'>
                    <li>Academics</li>
                    <li>Leadership</li>
                    <li>Entrepreneurship</li>
                    <li>Sport</li>
                    <li>Arts & Music</li>
                    <li>Content Creation</li>
                    <li>Modelling & Broadcasting</li>
                    <li>Innovation</li>
                  </ul>
                </div>
                <div className='rounded-xl border bg-white p-6 shadow-sm'>
                  <h3 className='font-semibold mb-2'>How to Nominate</h3>
                  <p className='text-gray-600 mb-4'>
                    Nominate yourself or an outstanding student by completing the form.
                  </p>
                  <Button className='w-full bg-green-600 hover:bg-green-700' asChild>
                    <a
                      href='https://forms.gle/iB26NMnwpW6ntRED6'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Fill Nomination Form
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='w-full border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <p className='text-center text-sm leading-loose text-gray-500 md:text-left'>
            © 2025 Future Start. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link href='/terms' className='text-sm font-medium transition-colors hover:text-primary'>
              Terms
            </Link>
            <Link href='/privacy' className='text-sm font-medium transition-colors hover:text-primary'>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


