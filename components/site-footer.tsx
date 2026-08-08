import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-gray-400">
          © 2026 Future Start Excellence Academy. Transforming potential into leadership excellence.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="text-sm font-medium transition-colors hover:text-green-400">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-green-400">
            Privacy
          </Link>
          <Link href="/about-developer" className="text-sm font-medium transition-colors hover:text-green-400">
            <small style={{ color: "#3c4557" }}>About the developer</small>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
