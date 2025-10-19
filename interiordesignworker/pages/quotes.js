import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Quotes() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [submittedContact, setSubmittedContact] = useState('')

  const [formData, setFormData] = useState({
    area_size: '',
    thickness: '',
    finish_material: '',
    location: '',
    floor_condition: '',
    elevator_available: null,
    water_available: null,
    floor_type: '',
    sanding_required: null,
    contact: '',
    password: '',
    additional_notes: ''
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

if (result.success) {
  setSubmittedContact(formData.contact) // Save the contact before resetting
  setSubmitSuccess(true)
  window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  // Reset form
  setFormData({
          area_size: '',
          thickness: '',
          finish_material: '',
          location: '',
          floor_condition: '',
          elevator_available: null,
          water_available: null,
          floor_type: '',
          sanding_required: null,
          contact: '',
          password: '',
          additional_notes: ''
        })
      } else {
        setSubmitError(result.error || '견적 요청 중 오류가 발생했습니다.')
      }
    } catch (error) {
      setSubmitError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>견적 문의 - 셀프레벨링의 모든 것</title>
        <meta name="description" content="셀프레벨링 시공 견적을 문의하세요. 정확한 정보를 제공하시면 더욱 정밀한 견적이 가능합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Header/>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-700 to-stone-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              견적 문의
            </h1>
            <p className="mt-4 text-xl text-stone-200">
              상세한 정보를 작성해주시면 더욱 정밀한 견적을 제공해드립니다
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/quotes/view" className="inline-flex items-center text-stone-200 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                제출한 견적 조회하기
              </Link>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {submitSuccess && (
          <section className="py-8 bg-green-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-md border-2 border-green-400 p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">견적 문의가 성공적으로 제출되었습니다!</h3>
                    <p className="text-stone-700 mb-3">담당자가 확인 후 연락드리겠습니다.</p>
<div className="bg-stone-100 p-4 rounded-md mb-4">
  <p className="text-sm text-stone-600 mb-2">견적 내용 조회 방법:</p>
  <p className="text-stone-700 mb-2">입력하신 연락처 <span className="font-semibold text-lg">{submittedContact}</span>와 비밀번호로 언제든지 견적 내용을 조회할 수 있습니다.</p>
</div>
                    <Link href="/quotes/view" className="inline-flex items-center text-green-700 hover:text-green-800 font-medium">
                      지금 조회하기
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Form Section */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Area Size */}
                <div>
                  <label htmlFor="area_size" className="block text-sm font-medium text-stone-700 mb-2">
                    1. 헤베수 or 평수
                  </label>
                  <input
                    type="text"
                    id="area_size"
                    name="area_size"
                    value={formData.area_size}
                    onChange={handleChange}
                    placeholder="예: 30평, 100㎡"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Thickness */}
                <div>
                  <label htmlFor="thickness" className="block text-sm font-medium text-stone-700 mb-2">
                    2. 셀프레벨링 두께
                  </label>
                  <input
                    type="text"
                    id="thickness"
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleChange}
                    placeholder="예: 5mm, 10mm"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Finish Material */}
                <div>
                  <label htmlFor="finish_material" className="block text-sm font-medium text-stone-700 mb-2">
                    3. 마감재 (셀프레벨링 위에 올라가는 마감재)
                  </label>
                  <input
                    type="text"
                    id="finish_material"
                    name="finish_material"
                    value={formData.finish_material}
                    onChange={handleChange}
                    placeholder="예: 강화마루, 타일, 장판 등"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-stone-700 mb-2">
                    4. 지역
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 서울 강남구, 경기 분당구"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Floor Condition */}
                <div>
                  <label htmlFor="floor_condition" className="block text-sm font-medium text-stone-700 mb-2">
                    5. 현재 바닥 상태
                  </label>
                  <input
                    type="text"
                    id="floor_condition"
                    name="floor_condition"
                    value={formData.floor_condition}
                    onChange={handleChange}
                    placeholder="예: 몰탈바닥, 도끼다시, 타일철거 후 압착남음 등"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Elevator Available */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    6. 자재, 공구 양중시 엘리베이터 사용 가능 여부
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="elevator_available"
                        value="true"
                        checked={formData.elevator_available === true}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">가능</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="elevator_available"
                        value="false"
                        checked={formData.elevator_available === false}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">불가능</span>
                    </label>
                  </div>
                </div>

                {/* Water Available */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    7. 물 사용 가능 여부
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="water_available"
                        value="true"
                        checked={formData.water_available === true}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">가능</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="water_available"
                        value="false"
                        checked={formData.water_available === false}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">불가능</span>
                    </label>
                  </div>
                </div>

                {/* Floor Type */}
                <div>
                  <label htmlFor="floor_type" className="block text-sm font-medium text-stone-700 mb-2">
                    8. 한 바닥인지 여러개인지
                  </label>
                  <input
                    type="text"
                    id="floor_type"
                    name="floor_type"
                    value={formData.floor_type}
                    onChange={handleChange}
                    placeholder="예: 한 바닥 (거실), 여러개 (거실+방2개)"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Sanding Required */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    9. 바닥 샌딩 여부
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sanding_required"
                        value="true"
                        checked={formData.sanding_required === true}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">필요</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sanding_required"
                        value="false"
                        checked={formData.sanding_required === false}
                        onChange={handleChange}
                        className="w-4 h-4 text-stone-600 border-stone-300 focus:ring-stone-600"
                      />
                      <span className="ml-2 text-stone-700">불필요</span>
                    </label>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-stone-700 mb-2">
                    10. 연락처 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="예: 01012345678"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="additional_notes" className="block text-sm font-medium text-stone-700 mb-2">
                    추가 요청사항
                  </label>
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    value={formData.additional_notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="추가로 전달하고 싶은 내용을 자유롭게 작성해주세요"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Password */}
                <div className="border-t border-stone-200 pt-6">
                  <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                    비밀번호 설정 <span className="text-red-600">*</span>
                  </label>
                  <p className="text-sm text-stone-500 mb-3">견적 내용을 조회할 때 사용할 비밀번호를 설정해주세요</p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="4"
                    placeholder="4자 이상의 비밀번호를 입력하세요"
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-300 rounded-md p-4">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-700 text-white py-4 px-6 rounded-md font-medium text-lg hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '제출 중...' : '견적 문의 제출하기'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

        <Footer />

    </>
  )
}