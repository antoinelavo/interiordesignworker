import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'

export default function ViewQuote() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setQuote(null)

    try {
      const response = await fetch('/api/quotes/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact, password }),
      })

      const result = await response.json()

      if (result.success) {
        setQuote(result.data)
      } else {
        setError(result.message || '견적을 찾을 수 없거나 연락처/비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatBoolean = (value) => {
    if (value === null) return '미입력'
    return value ? '예' : '아니오'
  }

  return (
    <>
      <Head>
        <title>견적 조회 - 셀프레벨링의 모든 것</title>
        <meta name="description" content="제출하신 견적 문의 내용을 조회하세요." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Header/>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-700 to-stone-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              견적 조회
            </h1>
            <p className="mt-4 text-xl text-stone-200">
              연락처와 비밀번호를 입력하여 제출하신 견적 내용을 확인하세요
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/quotes" className="inline-flex items-center text-stone-200 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                새로운 견적 문의하기
              </Link>
            </div>
          </div>
        </section>

        {/* Search Form */}
        {!quote && (
          <section className="py-12 bg-stone-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-stone-700 mb-2">
                      연락처
                    </label>
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                      placeholder="견적 문의 시 입력한 연락처를 입력하세요"
                      className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                    />
                    <p className="mt-2 text-sm text-stone-500">예: 01012345678</p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="설정하신 비밀번호를 입력하세요"
                      className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-300 rounded-md p-4">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-stone-700 text-white py-4 px-6 rounded-md font-medium text-lg hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '조회 중...' : '견적 조회하기'}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Quote Details */}
        {quote && (
          <section className="py-12 bg-stone-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-stone-200">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">견적 문의 내용</h2>
                    <p className="text-sm text-stone-500">제출일시: {formatDate(quote.created_at)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setQuote(null)
                      setContact('')
                      setPassword('')
                      setError('')
                    }}
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">헤베수 or 평수</p>
                      <p className="text-lg font-medium text-stone-800">{quote.area_size || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">셀프레벨링 두께</p>
                      <p className="text-lg font-medium text-stone-800">{quote.thickness || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">마감재</p>
                      <p className="text-lg font-medium text-stone-800">{quote.finish_material || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">지역</p>
                      <p className="text-lg font-medium text-stone-800">{quote.location || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md md:col-span-2">
                      <p className="text-sm text-stone-600 mb-1">현재 바닥 상태</p>
                      <p className="text-lg font-medium text-stone-800">{quote.floor_condition || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">엘리베이터 사용 가능</p>
                      <p className="text-lg font-medium text-stone-800">{formatBoolean(quote.elevator_available)}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">물 사용 가능</p>
                      <p className="text-lg font-medium text-stone-800">{formatBoolean(quote.water_available)}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">바닥 형태</p>
                      <p className="text-lg font-medium text-stone-800">{quote.floor_type || '미입력'}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md">
                      <p className="text-sm text-stone-600 mb-1">바닥 샌딩 필요</p>
                      <p className="text-lg font-medium text-stone-800">{formatBoolean(quote.sanding_required)}</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-md md:col-span-2">
                      <p className="text-sm text-stone-600 mb-1">연락처</p>
                      <p className="text-lg font-medium text-stone-800">{quote.contact}</p>
                    </div>

                    {quote.additional_notes && (
                      <div className="bg-stone-50 p-4 rounded-md md:col-span-2">
                        <p className="text-sm text-stone-600 mb-1">추가 요청사항</p>
                        <p className="text-lg font-medium text-stone-800 whitespace-pre-wrap">{quote.additional_notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="text-sm font-semibold text-blue-800 mb-1">담당자가 검토 중입니다</h3>
                        <p className="text-sm text-blue-700">제출하신 견적 내용을 검토한 후 입력하신 연락처로 연락드리겠습니다.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Link href="/quotes" className="inline-flex items-center px-6 py-3 border border-stone-700 text-base font-medium rounded-md text-stone-700 bg-white hover:bg-stone-700 hover:text-white transition-colors">
                    새로운 견적 문의하기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
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
                <p>주소: 분당구</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 2025 셀프레벨링의 모든 것. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}