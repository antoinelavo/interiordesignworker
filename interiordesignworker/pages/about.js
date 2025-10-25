import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>소개 - 셀프레벨링의 모든 것</title>
        <meta name="description" content="셀프레벨링 전문 시공팀의 철학과 전문성을 소개합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header currentPage="about" />

      <main className="pt-16">

        {/* Section 1 - 브랜드 철학 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-w-4 aspect-h-3 bg-stone-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-96 bg-stone-200 flex items-center justify-center">
                    <div className="text-center">
                                                <img 
                            src="/images/brand-philosophy.png" 
                            alt="브랜드 철학" 
                            className="w-full h-96 object-cover"
                            />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl mb-6">
                  보이지 않는 곳에서<br />완성도를 만드는 기술
                </h2>
                <div className="prose prose-lg text-stone-600">
                  <p className="text-lg leading-relaxed">
                    셀프레벨링은 바닥을 고르게 다듬는 기술 이상의 의미를 지닙니다.
                  </p>
                  <p className="text-lg leading-relaxed">
                    눈에 보이지 않는 정밀함이, 마감의 품질을 결정합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - 철학 & 시공 철학 */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl mb-6">
                  우리는 단순히<br />몰탈을 붓지 않습니다.
                </h2>
                <div className="prose prose-lg text-stone-600">
                  <p className="text-lg leading-relaxed">
                    바닥을 읽고, 재료를 이해하며, 환경에 맞춰 조정합니다.
                  </p>
                  <p className="text-lg leading-relaxed">
                    수많은 현장에서 얻은 경험이<br />
                    오늘의 완벽한 평탄도를 만듭니다.
                  </p>
                </div>
              </div>
              <div>
                <div className="aspect-w-4 aspect-h-3 bg-stone-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-96 bg-stone-200 flex items-center justify-center">
                    <div className="text-center">
                                                <img 
                            src="/images/work-philosophy.png" 
                            alt="브랜드 철학" 
                            className="w-full h-96 object-cover"
                            />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - 전문성과 신뢰 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-w-4 aspect-h-3 bg-stone-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-96 bg-stone-200 flex items-center justify-center">
                    <div className="text-center">
                                                <img 
                            src="/images/professionalism.png" 
                            alt="브랜드 철학" 
                            className="w-full h-96 object-cover"
                            />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl mb-6">
                  20년 경력 · 1,000건 시공 ·<br />정밀 시공
                </h2>
                <div className="prose prose-lg text-stone-600">
                  <p className="text-lg leading-relaxed">
                    셀프레벨링 한 길만 걸어온 전문 시공팀.
                  </p>
                  <p className="text-lg leading-relaxed">
                    완벽한 평탄화로 마감재의 품질을 극대화합니다.
                  </p>
                  <p className="text-lg leading-relaxed">
                    정밀함과 노하우, 그리고 신뢰가 우리의 기반입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-stone-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              전문가와 함께하는 완벽한 시공
            </h2>
            <p className="mt-4 text-xl text-stone-100 max-w-2xl mx-auto">
              20년의 경험과 노하우로 여러분의 공간을 완성합니다.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quotes" className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-stone-700 transition-colors shadow-lg">
                견적 문의하기
              </a>
              <a href="/portfolio" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 transition-colors shadow-lg">
                시공사례 보기
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}