export default function Footer() {
  return (
    <footer className="bg-stone-800 border-t border-stone-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">셀프레벨링의 모든 것</h3>
            <a href="/portfolio" className="text-stone-300 text-sm hover:text-amber-400 transition-colors">시공 서비스로</a>
            

            <p className="text-stone-300 text-sm">
              <br></br>
              전문적인 셀프레벨링 콘크리트 시공 서비스로 완벽한 바닥 마감을 제공합니다.
            </p>
          </div>
          
          <div>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><a href="/quotes" className="hover:text-amber-400 transition-colors">견적 문의</a></li>
            <li><a href="/portfolio" className="hover:text-amber-400 transition-colors">시공 사례</a></li>

            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-stone-300">
              <p>전화: 010-4372-9390</p>
              <p>이메일: allselfleveling@gmail.com</p>
              <p>주소: 경기도 광주시 오포읍 능평로 46-43</p>
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
  )
}