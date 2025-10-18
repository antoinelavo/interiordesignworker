import { useState, useEffect } from 'react'
import Link from 'next/link'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "20년 경력,",
      subtitle: "1,000건 이상의 시공 경험",
      description: "셀프레벨링 한 분야만 집중해온 경험이 완벽한 품질을 만듭니다.",
      backgroundImage: "/images/1.png"
    },
    {
      id: 2,
      title: "병원·사무실·학교·GMP까지",
      subtitle: "모든 공간 완벽 시공",
      description: "공간의 쓰임새와 조건에 맞춘 최적의 평탄화 솔루션을 제공합니다.",
      backgroundImage: "/images/2.png"
    },
    {
      id: 3,
      title: "셀프레벨링의 모든것,",
      subtitle: "대한민국 대표 전문팀",
      description: "20년 이상 한 길만 걸어온 집중된 전문성이 곧 신뢰입니다.",
      backgroundImage: "/images/3.png"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative min-w-full h-full flex items-center justify-center"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-stone-900/60" />
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block mb-2">{slide.title}</span>
                <span className="block text-white-400">{slide.subtitle}</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl sm:text-1xl text-stone-200 leading-relaxed">
                {slide.description}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-stone-800 hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  자세히 알아보기
                </Link>
                <Link 
                  href="/quotes" 
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-md text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  문의하기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg 
          className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg 
          className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection