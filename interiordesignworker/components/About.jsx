import React from 'react'

const AboutComponent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            셀프레벨링, 보이지 않는 곳에서 완성도를 만드는 기술
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            바닥은 눈에 잘 보이지 않지만, 모든 마감재의 품질을 결정짓는 핵심 요소입니다.<br />
            셀프레벨링은 바닥을 고르게 다듬어, 안정적이고 완성도 높은 시공을 가능하게 합니다.
          </p>
        </div>

        {/* What is Self-Leveling */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">셀프레벨링 정의 (What is)</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">셀프레벨링은 바닥을 평탄하게 만드는 시공 공법입니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">바닥을 고르게 정돈</h3>
              <p className="text-gray-600 text-sm">높낮이를 통일하게 부분을 제거하고 매끈하게 만듭니다.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">마감재 품질 보증</h3>
              <p className="text-gray-600 text-sm">마루 장판·타일이 제 성능을 발휘할 수 있게 받쳐줍니다.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">시공 최적 적용</h3>
              <p className="text-gray-600 text-sm">습도, 강화질, 소음 같은 문제를 획기적으로 차단합니다.</p>
            </div>
          </div>
        </div>

        {/* Why Needed */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">왜 필요한가 (Why)</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">평탄한 않은 시공은 반드시 하자를 불러옵니다.</p>
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span className="text-gray-700">마무가 들뜨거나 틈이 발어짐</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span className="text-gray-700">강화 한 음지나 조촉이 성장</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span className="text-gray-700">타일이 깨지거나 소음 발생</span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-amber-800">셀프레벨링을 거친 바닥은 안정적이고, 마감재가 오래갑니다.</span>
            </div>
            <p className="text-amber-700 text-sm">"보이지 않는 바닥에서부터 완성도의 차이가 시작됩니다."</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">셀프레벨링 장점 (Benefits)</h2>
          </div>
          <p className="text-lg text-gray-700 mb-8">시공사와 고객이 모두 수 있는 장점</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">시공 효율 향상</h3>
                  <p className="text-gray-600 text-sm">빠르고 간단한 시공으로 공사 기간 단축</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">하자 최소화</h3>
                  <p className="text-gray-600 text-sm">균일한만 유지보수 비용 절감</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">품질 보증</h3>
                  <p className="text-gray-600 text-sm">고객 만족도 상승, 재시공 리스크 감소</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">다양한 현장 적용</h3>
                  <p className="text-gray-600 text-sm">아파트, 상가, 사무실 등 어떤 바닥에도 적용 가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">시공 프로세스 (How)</h2>
          </div>
          <p className="text-lg text-gray-700 mb-8">셀프레벨링은 체계적인 방법에 거쳐 완성됩니다.</p>
          <div className="space-y-4">
            {[
              { step: 1, title: "현장 점검", desc: "바닥 상태와 수분, 라벨 확인" },
              { step: 2, title: "바닥면 준비", desc: "청소 및 프라이머 처리" },
              { step: 3, title: "수평물 타설", desc: "레벨링 적정으로 바닥 고르게 형성" },
              { step: 4, title: "양성", desc: "완전 건상 시간 등안 경화 및 안정화" },
              { step: 5, title: "마감재 시공", desc: "장판, 마루, 타일 등 마감재 부착" }
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

export default AboutComponent