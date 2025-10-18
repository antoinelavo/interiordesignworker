import Link from 'next/link'
import { useState } from 'react'

export default function Header({ currentPage = 'home' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: '/', label: '홈', key: 'home' },
    { href: '/about', label: '소개', key: 'about' },
    { href: '/quotes', label: '견적문의', key: 'quotes' },
    { href: '/portfolio', label: '시공사례', key: 'portfolio' },
    { href: '/youtube', label: '유튜브', key: 'youtube' },
  ]

  return (
    <nav className="bg-stone-900 fixed w-full z-50 top-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-stone-100 font-bold text-xl">
              셀프레벨링의 모든 것
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.key
                      ? 'text-stone-100 bg-stone-700 rounded-md'
                      : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-300 hover:text-stone-100 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-600"
            >
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-stone-800">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium ${
                currentPage === item.key
                  ? 'text-stone-100 bg-stone-700 rounded-md'
                  : 'text-stone-300 hover:text-stone-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}