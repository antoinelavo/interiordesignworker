import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'


const TextImageSplit = () => {
  const [isVisible, setIsVisible] = useState(false)
  const textRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element comes into view
      }
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [])
  return (
    <section className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row h-full min-h-screen">
        {/* Text Section - Left on desktop, Top on mobile */}
        <div className="flex-1 bg-stone-900 flex items-center justify-center p-8 lg:p-16">
          <div 
            ref={textRef}
            className="max-w-lg w-full space-y-8"
          >
            
            {/* Text Box 1 */}
            <div className={`bg-transparent rounded-lg shadow-md transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}>
              <h2 className="text-4xl font-bold text-white mb-5 leading-[1.5em]">
                "바닥이 고르면, <br />
                마감은 완벽해집니다."
              </h2>
              <p className="text-gray-300 leading-relaxed">
                눈에 보이지 않는 바닥의 정밀함이
                시공의 품질과 공간의 가치를 결정합니다.
                셀프레벨링은 완성도를 높이는 첫 단계입니다.
              </p>
            </div>

            <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-left transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-stone-600 hover:bg-stone-300 hover:text-stone-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  소개
                </Link>
                                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-stone-600 hover:bg-stone-300 hover:text-stone-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  자세히 보기
                </Link>

              </div>

          </div>
        </div>

        {/* Image Section - Right on desktop, Bottom on mobile */}
        <div className="flex-1 bg-stone-100 relative overflow-hidden">
          {/* Actual Image */}
          <img 
            src="/images/4.png" 
            alt="Self-leveling concrete construction work" 
            className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-70 scale-105'
            }`}
          />
        </div>
      </div>
    </section>
  )
}

export default TextImageSplit