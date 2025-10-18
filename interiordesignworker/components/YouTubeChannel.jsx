import { useState, useEffect } from 'react'

export default function YouTubeChannel({ 
  channelUrl = '', 
  maxResults = 6,
  title = "최신 영상",
  description = "우리의 시공 과정과 노하우를 영상으로 확인해보세요"
}) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const fetchVideos = async () => {
      if (!channelUrl) {
        setLoading(false)
        setError('유튜브 채널 URL이 필요합니다')
        return
      }

      try {
        // Extract channel identifier from URL
        let feedUrl = ''
        
        if (channelUrl.includes('/channel/')) {
          const channelId = channelUrl.split('/channel/')[1].split('/')[0].split('?')[0]
          feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        } else if (channelUrl.includes('/@')) {
          const handle = channelUrl.split('/@')[1].split('/')[0].split('?')[0]
          // For handles, we need to use the handle format
          feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${handle}`
        } else if (channelUrl.includes('/user/')) {
          const username = channelUrl.split('/user/')[1].split('/')[0].split('?')[0]
          feedUrl = `https://www.youtube.com/feeds/videos.xml?user=${username}`
        } else if (channelUrl.includes('/c/')) {
          const customUrl = channelUrl.split('/c/')[1].split('/')[0].split('?')[0]
          feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${customUrl}`
        } else {
          throw new Error('올바른 유튜브 채널 URL 형식이 아닙니다')
        }

        // Try fetching with a CORS proxy
        const corsProxies = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(feedUrl)}`
        ]

        let xmlText = null
        let lastError = null

        for (const proxyUrl of corsProxies) {
          try {
            const response = await fetch(proxyUrl)
            if (response.ok) {
              xmlText = await response.text()
              break
            }
          } catch (err) {
            lastError = err
            continue
          }
        }

        if (!xmlText) {
          throw new Error('채널을 찾을 수 없습니다')
        }

        // Parse XML
        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlText, 'text/xml')
        
        // Check for errors in XML
        const parseError = xml.querySelector('parsererror')
        if (parseError) {
          throw new Error('채널 정보를 가져올 수 없습니다')
        }

        // Extract video entries
        const entries = xml.querySelectorAll('entry')
        const videoList = Array.from(entries).slice(0, maxResults).map(entry => {
          // Try different methods to get video ID
          const videoIdElement = entry.querySelector('videoId') || 
                                 entry.querySelector('yt\\:videoId') ||
                                 entry.querySelector('[nodeName="yt:videoId"]')
          
          let videoId = videoIdElement?.textContent || ''
          
          // If videoId not found, try extracting from link
          if (!videoId) {
            const link = entry.querySelector('link')?.getAttribute('href') || ''
            const match = link.match(/watch\?v=([^&]+)/)
            if (match) videoId = match[1]
          }

          const title = entry.querySelector('title')?.textContent || ''
          const published = entry.querySelector('published')?.textContent || ''
          
          // Use multiple thumbnail qualities as fallbacks
          const thumbnails = [
            `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
          ]
          
          return {
            videoId,
            title,
            published,
            thumbnail: thumbnails[0],
            fallbackThumbnails: thumbnails
          }
        })

        setVideos(videoList)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchVideos()
  }, [channelUrl, maxResults])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleImageError = (videoId, currentThumbnail, fallbackThumbnails) => {
    const currentIndex = fallbackThumbnails.indexOf(currentThumbnail)
    if (currentIndex < fallbackThumbnails.length - 1) {
      // Try next fallback
      setImageErrors(prev => ({
        ...prev,
        [videoId]: fallbackThumbnails[currentIndex + 1]
      }))
    } else {
      // All thumbnails failed, mark as error
      setImageErrors(prev => ({
        ...prev,
        [videoId]: 'failed'
      }))
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-stone-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-stone-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-stone-600">영상을 불러오는 중 오류가 발생했습니다: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-stone-800 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const currentThumbnail = imageErrors[video.videoId] && imageErrors[video.videoId] !== 'failed'
              ? imageErrors[video.videoId]
              : video.thumbnail
            
            const showPlaceholder = imageErrors[video.videoId] === 'failed'

            return (
              <a
                key={video.videoId}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md border border-stone-200 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative w-full h-64 bg-stone-200">
                    {!showPlaceholder ? (
                      <>
                        <img
                          src={currentThumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(video.videoId, currentThumbnail, video.fallbackThumbnails)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-16 h-16 text-stone-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          <p className="text-stone-500 text-sm">YouTube Video</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-stone-800 font-semibold text-base line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-stone-500 text-sm">
                      {formatDate(video.published)}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-stone-700 text-base font-medium rounded-md text-stone-700 bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            유튜브 채널 방문하기
          </a>
        </div>
      </div>
    </section>
  )
}