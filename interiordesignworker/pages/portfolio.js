import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('전체')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ['전체', '병원', '주거', '상업', '오피스', '학교']

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      category: '병원',
      title: '일산 의료원',
      description: '병원 내부 복도 및 진료실 바닥 셀프레벨링 작업. 완벽한 평탄도로 의료 장비 안정성 확보.',
      images: [
        '/images/portfolio/1-1.jpeg',
        '/images/portfolio/1-2.jpeg',
        '/images/portfolio/1-3.jpeg',
        '/images/portfolio/1-4.jpeg',
      ]
    }
  ]

  const filteredProjects = activeTab === '전체' 
    ? projects 
    : projects.filter(project => project.category === activeTab)

  const openModal = (project, imageIndex) => {
    setCurrentProject(project)
    setCurrentImageIndex(imageIndex)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === currentProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProject.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <>
      <Head>
        <title>시공사례 - 셀프레벨링의 모든 것</title>
        <meta name="description" content="다양한 공간에서 진행된 셀프레벨링 시공 사례를 확인하세요." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header currentPage="portfolio" />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-700 to-stone-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              시공사례
            </h1>
            <p className="text-xl text-stone-200">
              다양한 공간에서 완성한 완벽한 바닥 작업
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-white border-b border-stone-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === category
                      ? 'border-stone-700 text-stone-900'
                      : 'border-transparent text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-stone-500 text-lg">해당 카테고리의 시공사례가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-stone-100 text-stone-700">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-stone-800 mb-4">
                        {project.title}
                      </h2>
                      <p className="text-lg text-stone-600 mb-6">
                        {project.description}
                      </p>
                      
                      {/* Image Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.images.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => openModal(project, index)}
                            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                          >
                                <img 
                                src={image} 
                                alt={`${project.title} - 이미지 ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover z-10"
                                />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center z-0">
                              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-stone-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              다음 프로젝트는 여러분의 공간입니다
            </h2>
            <p className="mt-4 text-xl text-stone-100 max-w-2xl mx-auto">
              전문가와 함께 완벽한 바닥을 만들어보세요.
            </p>
            <div className="mt-10">
              <a href="/quotes" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-stone-700 transition-colors shadow-lg">
                무료 견적 받기
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {isModalOpen && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={closeModal}>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-stone-300 transition-colors z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-stone-300 transition-colors z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
<img 
  src={currentProject.images[currentImageIndex]} 
  alt={`${currentProject.title} - 이미지 ${currentImageIndex + 1}`}
  className="w-full h-full object-contain"
  style={{ maxHeight: '80vh' }}
/>
            <div className="bg-white p-4">
              <h3 className="text-xl font-semibold text-stone-800">{currentProject.title}</h3>
              <p className="text-stone-600 mt-2">{currentProject.description}</p>
              <p className="text-sm text-stone-500 mt-2">
                이미지 {currentImageIndex + 1} / {currentProject.images.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}