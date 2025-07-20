import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
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
            <Link
              href='/'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Home
            </Link>
            <Link
              href='/#services'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Our Services
            </Link>
            <Link
              href='/#testimonials'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Testimonials
            </Link>
            <Link
              href='/#book'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              The Book
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium transition-colors hover:text-primary font-semibold text-green-600'
            >
              Contact
            </Link>
          </nav>
          <div>
            <Button asChild>
              <a
                href="https://wa.me/27720419723?text=I'm%20interested%20in%20buying%20the%20book%20'Conquering%20Your%20Years%20in%20Tertiary%20Education'"
                target='_blank'
                rel='noopener noreferrer'
              >
                Buy Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 bg-gradient-to-r from-green-50 to-green-100'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                  Contact Us
                </h1>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  We're here to help you on your academic journey. Reach out to
                  us with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className='w-full py-12 md:py-24'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-10 lg:grid-cols-2 items-start'>
              {/* Contact Details */}
              <div className='space-y-8'>
                <div>
                  <h2 className='text-3xl font-bold tracking-tighter mb-6'>
                    Get In Touch
                  </h2>
                  <p className='text-gray-500 mb-8'>
                    Have questions about our services or the book? We're here to
                    help you navigate your academic journey. Contact us through
                    any of the methods below.
                  </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-5 w-5 text-green-600' />
                        <CardTitle className='text-lg'>Email</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-500'>
                        info@futurestart.co.za
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-5 w-5 text-green-600' />
                        <CardTitle className='text-lg'>Phone</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-500'>+27 72 041 9723</p>
                      <p className='text-sm text-gray-500'>
                        Monday - Friday, 8am - 5pm
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex items-center gap-2'>
                        <MapPin className='h-5 w-5 text-green-600' />
                        <CardTitle className='text-lg'>Location</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-500'>
                        123 University Avenue
                      </p>
                      <p className='text-sm text-gray-500'>
                        Johannesburg, South Africa
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <div className='flex items-center gap-2'>
                        <Clock className='h-5 w-5 text-green-600' />
                        <CardTitle className='text-lg'>Office Hours</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-500'>
                        Monday - Friday: 8am - 5pm
                      </p>
                      <p className='text-sm text-gray-500'>
                        Saturday: 9am - 1pm
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className='flex flex-col space-y-8'>
                <div className='bg-white p-8 rounded-lg shadow-sm'>
                  <div className='text-center mb-8'>
                    <h3 className='text-2xl font-bold mb-2'>
                      Contact Us Directly
                    </h3>
                    <p className='text-gray-500'>
                      We're here to help with any questions you might have
                    </p>
                  </div>

                  <div className='space-y-6'>
                    <Button
                      size='lg'
                      className='bg-green-600 hover:bg-green-700 h-16 text-xl w-full'
                      asChild
                    >
                      <a href='mailto:info@futurestart.co.za'>
                        <Send className='mr-2 h-6 w-6' /> Email Us
                      </a>
                    </Button>

                    <Button
                      size='lg'
                      className='bg-green-500 hover:bg-green-600 h-16 text-xl w-full'
                      asChild
                    >
                      <a
                        href='https://wa.me/27720419723'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='mr-2 h-6 w-6'
                        >
                          <path d='M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z' />
                        </svg>
                        WhatsApp Us: +27 72 041 9723
                      </a>
                    </Button>
                  </div>
                </div>

                <div className='bg-white p-8 rounded-lg shadow-sm'>
                  <h3 className='text-xl font-bold mb-4'>Our Services</h3>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-2'>
                      <div className='h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                        <span className='text-green-600 text-xs font-bold'>
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className='font-medium'>Let's Apply For You</h4>
                        <p className='text-sm text-gray-500'>
                          We handle the entire university application process
                        </p>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-green-600'
                          asChild
                        >
                          <a
                            href='https://forms.gle/H3ByufVPG5DrPFik7'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Application Assistance Request Form →
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className='flex items-start gap-2'>
                      <div className='h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                        <span className='text-green-600 text-xs font-bold'>
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className='font-medium'>Expert Advice</h4>
                        <p className='text-sm text-gray-500'>
                          Personalized mentoring and coaching programs
                        </p>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-green-600'
                          asChild
                        >
                          <a
                            href='https://forms.gle/gzUZerF5dnetQGkK7'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Mentorship Registration →
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className='flex items-start gap-2'>
                      <div className='h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                        <span className='text-green-600 text-xs font-bold'>
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className='font-medium'>Accommodation Services</h4>
                        <p className='text-sm text-gray-500'>
                          Find safe and affordable student housing
                        </p>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-green-600'
                          asChild
                        >
                          <a
                            href='https://forms.gle/v8ChPFiKzx1P9YrWA'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Accommodation Reservations →
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='w-full py-12 md:py-24 bg-gray-50'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-12'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                  Frequently Asked Questions
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Find answers to common questions about our services and book
                </p>
              </div>
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader>
                  <CardTitle>How do I purchase the book?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    You can purchase "Conquering Your Years in Tertiary
                    Education" directly from our website or through major
                    bookstores. We offer both physical and digital copies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    What does the application service include?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    Our application service includes researching suitable
                    institutions, preparing application documents, writing
                    personal statements, and submitting applications on your
                    behalf.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How much does mentoring cost?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    Mentoring costs vary based on the program you choose. We
                    offer different packages to suit various needs and budgets.
                    Contact us for a personalized quote.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Do you help with scholarship applications?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    Yes, our premium application package includes assistance
                    with scholarship applications to help you secure financial
                    support for your studies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    What areas do you offer accommodation in?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    We offer accommodation services near major universities and
                    colleges across South Africa, with a focus on safe,
                    affordable options within reasonable distance to campus.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    How soon should I contact you before applying?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>
                    We recommend contacting us at least 3-6 months before
                    application deadlines to ensure we have sufficient time to
                    prepare the strongest possible applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id='contact'
          className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-blue-50'
        >
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
              <div className='space-y-6'>
                <div className='text-center lg:text-left'>
                  <div className='inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4'>
                    💬 LET'S CHAT
                  </div>
                  <h2 className='text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4'>
                    Slide Into Our DMs! 📱
                  </h2>
                  <p className='text-xl text-gray-600'>
                    Got questions? Need help? Just want to chat about uni life?
                    We're here for it! 💯
                  </p>
                </div>

                <div className='space-y-4'>
                  <div className='bg-white p-4 rounded-2xl shadow-lg border-l-4 border-green-500'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-green-100 p-2 rounded-full'>
                        <Send className='h-5 w-5 text-green-600' />
                      </div>
                      <div>
                        <p className='font-bold'>📧 Email Us</p>
                        <p className='text-gray-600'>info@futurestart.co.za</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-white p-4 rounded-2xl shadow-lg border-l-4 border-blue-500'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-blue-100 p-2 rounded-full'></div>
                      <div>
                        <p className='font-bold'>📱 Follow Us</p>
                        <p className='text-gray-600'>@conqueringtertiary</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='relative rounded-3xl overflow-hidden shadow-xl'>
                  <Image
                    src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                    alt='Modern university campus'
                    width={400}
                    height={300}
                    className='object-cover w-full h-48'
                  />
                  <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl p-3'>
                    <p className='font-bold text-sm'>🏫 Your Future Campus!</p>
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='bg-white rounded-3xl p-8 shadow-xl'>
                  <div className='text-center mb-6'>
                    <h3 className='text-2xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                      Ready to Connect? 🚀
                    </h3>
                    <p className='text-gray-600'>
                      Hit us up and let's make your uni dreams happen!
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <Button
                      size='lg'
                      className='w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-full py-6 shadow-lg'
                      asChild
                    >
                      <a href='mailto:info@futurestart.co.za'>
                        <Send className='mr-2 h-6 w-6' /> 📧 Email Us Now!
                      </a>
                    </Button>

                    <Button
                      size='lg'
                      className='w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-full py-6 shadow-lg'
                      asChild
                    >
                      <a
                        href='https://wa.me/27720419723'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='mr-2 h-6 w-6'
                        >
                          <path d='M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z' />
                        </svg>
                        💬 WhatsApp: +27 72 041 9723
                      </a>
                    </Button>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='text-center'>
                    <h4 className='font-bold text-lg mb-4 text-gray-800'>
                      Follow Us on Social Media! 📱
                    </h4>
                  </div>

                  <Button
                    size='lg'
                    className='w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold text-lg rounded-full py-6 shadow-lg'
                    asChild
                  >
                    <a
                      href='https://whatsapp.com/channel/0029VbBVlOr9WtCC1ab9Bv11'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='mr-2 h-6 w-6'
                      >
                        <path d='M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z' />
                      </svg>
                      📢 Join Our WhatsApp Channel
                    </a>
                  </Button>

                  <Button
                    size='lg'
                    className='w-full bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-full py-6 shadow-lg'
                    asChild
                  >
                    <a
                      href='https://www.tiktok.com/@officialfuturesta?_t=ZM-8xpeEQLgsvV&_r=1'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='mr-2 h-6 w-6'
                      >
                        <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                      </svg>
                      🎵 Follow Us on TikTok
                    </a>
                  </Button>

                  <Button
                    size='lg'
                    className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-bold text-lg rounded-full py-6 shadow-lg'
                    asChild
                  >
                    <a
                      href='https://www.instagram.com/official_futurestart1/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='mr-2 h-6 w-6'
                      >
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                      📸 Follow Us on Instagram
                    </a>
                  </Button>
                </div>

                <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-xl'>
                  <div className='text-center'>
                    <div className='text-3xl mb-2'>🎉</div>
                    <h4 className='font-bold text-lg mb-2'>
                      Ready to Start Your Journey?
                    </h4>
                    <p className='text-purple-100 text-sm'>
                      Join thousands of students who are already winning at uni
                      life! Your future self will thank you! 🙌
                    </p>
                  </div>
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
            <Link
              href='/terms'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Terms
            </Link>
            <Link
              href='/privacy'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
