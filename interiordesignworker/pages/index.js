import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Head>
        <title>셀프레벨링의 모든 것 - 전문 바닥 레벨링 서비스</title>
        <meta name="description" content="전문적인 셀프레벨링 콘크리트 시공 서비스를 제공합니다. 완벽한 바닥 마감을 위한 최고의 선택." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-stone-100 fixed w-full z-50 top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-stone-800 font-bold text-xl">
                셀프레벨링의 모든 것
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-stone-800 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  홈
                </Link>
                <Link href="/about" className="text-stone-600 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  소개
                </Link>
                <Link href="/portfolio" className="text-stone-600 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  시공사례
                </Link>
                <Link href="/contact" className="text-stone-600 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  상담문의
                </Link>
                <Link href="/calculator" className="text-stone-600 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  모의계산기
                </Link>
                <Link href="/blog" className="text-stone-600 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors">
                  블로그
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-stone-800 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-600"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-stone-50">
            <Link href="/" className="text-stone-800 block px-3 py-2 text-base font-medium">
              홈
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-800 block px-3 py-2 text-base font-medium">
              소개
            </Link>
            <Link href="/portfolio" className="text-stone-600 hover:text-stone-800 block px-3 py-2 text-base font-medium">
              시공사례
            </Link>
            <Link href="/contact" className="text-stone-600 hover:text-stone-800 block px-3 py-2 text-base font-medium">
              상담문의
            </Link>
            <Link href="/calculator" className="text-stone-600 hover:text-stone-800 block px-3 py-2 text-base font-medium">
              모의계산기
            </Link>
            <Link href="/blog" className="text-stone-600 hover:text-stone-800 block px-3 py-2 text-base font-medium">
              블로그
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-stone-200/30 mix-blend-multiply" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 mt-16">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 sm:text-5xl md:text-6xl">
                <span className="block">완벽한 바닥 마감을</span>
                <span className="block text-amber-700">셀프레벨링으로</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-stone-700">
                전문적인 셀프레벨링 콘크리트 시공으로 평평하고 매끄러운 바닥을 만들어드립니다. 
                집과 상업 공간 모두에 최적화된 솔루션을 제공합니다.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-lg">
                  무료 상담 받기
                </Link>
                <Link href="/portfolio" className="inline-flex items-center px-8 py-3 border border-stone-400 text-base font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 transition-colors">
                  시공사례 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl">
                셀프레벨링 전문가와 함께하세요
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600">
                수년간의 경험과 전문 기술로 최고 품질의 바닥 레벨링 서비스를 제공합니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg p-6 text-center shadow-md border border-stone-200">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">품질 보장</h3>
                <p className="text-stone-600">최고급 재료와 전문 기술로 완벽한 마감을 약속드립니다</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md border border-stone-200">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">신속한 시공</h3>
                <p className="text-stone-600">효율적인 작업 프로세스로 빠르고 정확한 시공을 진행합니다</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center shadow-md border border-stone-200">
                <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">합리적 가격</h3>
                <p className="text-stone-600">투명한 견적과 경쟁력 있는 가격으로 최고의 가치를 제공합니다</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Gallery */}
        <section className="py-16 bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl">
                최근 시공사례
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600">
                다양한 공간에서 진행된 셀프레벨링 시공 결과를 확인해보세요
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md border border-stone-200">
                  <div className="aspect-w-3 aspect-h-2 w-full">
                    <div className="w-full h-64 bg-stone-200 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-stone-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-stone-500 text-sm">시공사례 이미지</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">프로젝트 {item}</h3>
                      <p className="text-stone-200 text-sm">주거/상업 공간 셀프레벨링</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/portfolio" className="inline-flex items-center px-6 py-3 border border-amber-700 text-base font-medium rounded-md text-amber-700 bg-white hover:bg-amber-700 hover:text-white transition-colors shadow-md">
                전체 시공사례 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-amber-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              지금 바로 상담 받으세요
            </h2>
            <p className="mt-4 text-xl text-amber-100 max-w-2xl mx-auto">
              전문가와 함께 여러분의 공간에 맞는 최적의 셀프레벨링 솔루션을 찾아보세요. 
              무료 상담과 견적을 제공해드립니다.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-amber-700 transition-colors shadow-lg">
                상담 문의하기
              </Link>
              <Link href="/calculator" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-white hover:bg-stone-50 transition-colors shadow-lg">
                비용 계산해보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 border-t border-stone-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">셀프레벨링의 모든 것</h3>
              <p className="text-stone-300 text-sm">
                전문적인 셀프레벨링 콘크리트 시공 서비스로 완벽한 바닥 마감을 제공합니다.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-sm text-stone-300">
                <li><Link href="/portfolio" className="hover:text-amber-400 transition-colors">시공사례</Link></li>
                <li><Link href="/calculator" className="hover:text-amber-400 transition-colors">비용 계산</Link></li>
                <li><Link href="/contact" className="hover:text-amber-400 transition-colors">상담 문의</Link></li>
                <li><Link href="/blog" className="hover:text-amber-400 transition-colors">블로그</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">연락처</h3>
              <div className="space-y-2 text-sm text-stone-300">
                <p>전화: 010-0000-0000</p>
                <p>이메일: info@selfleveling.com</p>
                <p>주소: 서울시 강남구 테헤란로</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 2024 셀프레벨링의 모든 것. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}