import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const ADMIN_PASSWORD = 'admin123' // Change this to your preferred password

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  const [quotes, setQuotes] = useState([])
  const [filteredQuotes, setFilteredQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('created_at')
  const [sortDirection, setSortDirection] = useState('desc')
  const [expandedRow, setExpandedRow] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  
  // Editing states
  const [editingStatus, setEditingStatus] = useState({})
  const [editingNotes, setEditingNotes] = useState({})

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch quotes when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes()
    }
  }, [isAuthenticated])

  // Filter and sort quotes
  useEffect(() => {
    let result = [...quotes]

    // Search filter
    if (searchTerm) {
      result = result.filter(quote =>
        quote.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.area_size?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(quote => quote.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      
      if (sortField === 'created_at') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    setFilteredQuotes(result)
    setCurrentPage(1)
  }, [quotes, searchTerm, sortField, sortDirection, statusFilter])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setLoginError('')
    } else {
      setLoginError('비밀번호가 올바르지 않습니다')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
  }

  const fetchQuotes = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuotes(data || [])
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const updateQuoteStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      
      setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('상태 업데이트 중 오류가 발생했습니다')
    }
  }

  const updateQuoteNotes = async (id, newNotes) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ admin_notes: newNotes })
        .eq('id', id)

      if (error) throw error
      
      setQuotes(quotes.map(q => q.id === id ? { ...q, admin_notes: newNotes } : q))
      setEditingNotes({ ...editingNotes, [id]: false })
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('메모 업데이트 중 오류가 발생했습니다')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatBoolean = (value) => {
    if (value === null) return '미입력'
    return value ? '예' : '아니오'
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage)

  // Login page
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>관리자 로그인</title>
        </Head>
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold text-stone-800 mb-6 text-center">
                관리자 로그인
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-600 text-sm">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-stone-700 text-white py-3 px-6 rounded-md font-medium hover:bg-stone-800 transition-colors"
                >
                  로그인
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Admin dashboard
  return (
    <>
      <Head>
        <title>견적 관리 - 관리자</title>
      </Head>
      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="bg-stone-900 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">견적 관리 시스템</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded-md transition-colors text-sm"
          >
            로그아웃
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-stone-600 text-sm">전체 견적</p>
              <p className="text-2xl font-bold text-stone-800">{quotes.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-stone-600 text-sm">연락 완료</p>
              <p className="text-2xl font-bold text-green-600">
                {quotes.filter(q => q.status === 'contacted').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-stone-600 text-sm">작업 완료</p>
              <p className="text-2xl font-bold text-blue-600">
                {quotes.filter(q => q.status === 'completed').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">검색</label>
                <input
                  type="text"
                  placeholder="연락처, 지역, 평수로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">상태</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                >
                  <option value="all">전체</option>
                  <option value="pending">대기중</option>
                  <option value="contacted">연락완료</option>
                  <option value="completed">작업완료</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-stone-600">로딩 중...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider cursor-pointer hover:bg-stone-100" onClick={() => handleSort('created_at')}>
                          제출일시 {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider cursor-pointer hover:bg-stone-100" onClick={() => handleSort('contact')}>
                          연락처 {sortField === 'contact' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider cursor-pointer hover:bg-stone-100" onClick={() => handleSort('location')}>
                          지역 {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider cursor-pointer hover:bg-stone-100" onClick={() => handleSort('area_size')}>
                          평수 {sortField === 'area_size' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                          상세
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                      {currentItems.map((quote) => (
                        <>
                          <tr key={quote.id} className="hover:bg-stone-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-900">
                              {formatDate(quote.created_at)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-900">
                              {quote.contact}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-900">
                              {quote.location || '-'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-stone-900">
                              {quote.area_size || '-'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <select
                                value={quote.status || 'pending'}
                                onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                                className="px-2 py-1 border border-stone-300 rounded text-xs"
                              >
                                <option value="pending">대기중</option>
                                <option value="contacted">연락완료</option>
                                <option value="completed">작업완료</option>
                              </select>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => setExpandedRow(expandedRow === quote.id ? null : quote.id)}
                                className="text-stone-400 hover:text-stone-900"
                              >
                                {expandedRow === quote.id ? '숨기기' : '상세 보기'}
                              </button>
                            </td>
                          </tr>
                          {expandedRow === quote.id && (
                            <tr>
                              <td colSpan="6" className="px-4 py-4 bg-stone-50">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">셀프레벨링 두께</p>
                                      <p className="text-sm text-stone-900">{quote.thickness || '-'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">마감재</p>
                                      <p className="text-sm text-stone-900">{quote.finish_material || '-'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">바닥 상태</p>
                                      <p className="text-sm text-stone-900">{quote.floor_condition || '-'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">바닥 형태</p>
                                      <p className="text-sm text-stone-900">{quote.floor_type || '-'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">엘리베이터</p>
                                      <p className="text-sm text-stone-900">{formatBoolean(quote.elevator_available)}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">물 사용</p>
                                      <p className="text-sm text-stone-900">{formatBoolean(quote.water_available)}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">샌딩</p>
                                      <p className="text-sm text-stone-900">{formatBoolean(quote.sanding_required)}</p>
                                    </div>
                                  </div>
                                  {quote.additional_notes && (
                                    <div>
                                      <p className="text-xs text-stone-600 mb-1">추가 요청사항</p>
                                      <p className="text-sm text-stone-900 whitespace-pre-wrap">{quote.additional_notes}</p>
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-xs text-stone-600 mb-2">관리자 메모</p>
                                    {editingNotes[quote.id] ? (
                                      <div className="flex gap-2">
                                        <textarea
                                          defaultValue={quote.admin_notes || ''}
                                          className="flex-1 px-3 py-2 border border-stone-300 rounded text-sm"
                                          rows="3"
                                          id={`notes-${quote.id}`}
                                        />
                                        <div className="flex flex-col gap-2">
                                          <button
                                            onClick={() => {
                                              const newNotes = document.getElementById(`notes-${quote.id}`).value
                                              updateQuoteNotes(quote.id, newNotes)
                                            }}
                                            className="px-3 py-1 bg-stone-700 text-white rounded text-xs hover:bg-stone-800"
                                          >
                                            저장
                                          </button>
                                          <button
                                            onClick={() => setEditingNotes({ ...editingNotes, [quote.id]: false })}
                                            className="px-3 py-1 bg-stone-300 text-stone-700 rounded text-xs hover:bg-stone-400"
                                          >
                                            취소
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex gap-2 items-start">
                                        <p className="flex-1 text-sm text-stone-900 whitespace-pre-wrap">
                                          {quote.admin_notes || '메모 없음'}
                                        </p>
                                        <button
                                          onClick={() => setEditingNotes({ ...editingNotes, [quote.id]: true })}
                                          className="px-3 py-1 bg-stone-700 text-white rounded text-xs hover:bg-stone-800"
                                        >
                                          편집
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                    <div className="text-sm text-stone-700">
                      {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredQuotes.length)} / {filteredQuotes.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-stone-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100"
                      >
                        이전
                      </button>
                      <span className="px-3 py-1 text-sm text-stone-700">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-stone-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100"
                      >
                        다음
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}