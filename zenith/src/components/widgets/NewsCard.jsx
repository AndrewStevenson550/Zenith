import React, { useEffect, useState } from 'react'
import { NEWS_API } from '../../api_keys/news'

function NewsCard() {
  const [news, setNews] = useState([])
  
  // Use the "top" endpoint for the latest/hottest stories
  // Added locale=us and limit=2 to match your screenshot layout
  const news_url = `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API}&locale=us&limit=2`

  useEffect(() => {
    async function FetchNews() {
        try {
            const response = await fetch(news_url);
            const json = await response.json();
            if (json.data) {
                setNews(json.data); 
            }
        } catch(err) {
            console.error("Error fetching news:", err);
        }
    }
    FetchNews();
  }, [])

  return (
    <div className='bg-[#0d1117] p-8'>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-bold">Daily Insights</h2>
            <button className="text-blue-400 text-sm font-semibold hover:underline">View all news</button>
        </div>

        {/* News Grid (2 Columns) */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {news.map((article, index) => (
                <div key={index} className="bg-[#161b22] rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-[1.02]">
                    {/* Image Section */}
                    <div className="h-48 w-full overflow-hidden">
                        <img 
                            src={article.image_url || 'https://via.placeholder.com/400x200'} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                        <div className="flex gap-3 mb-3">
                            {/* Category Tag */}
                            <span className="bg-[#1f2937] text-blue-400 text-[10px] uppercase font-bold px-2 py-1 rounded">
                                {article.categories?.[0] || 'General'}
                            </span>
                            {/* Static "Read Time" to match the UI design */}
                            <span className="text-gray-500 text-[10px] uppercase font-bold py-1">
                                5 MIN READ
                            </span>
                        </div>
                        
                        <h3 className='text-white text-lg font-bold leading-tight mb-3 line-clamp-2'>
                            {article.title}
                        </h3>
                        
                        <p className='text-gray-400 text-sm line-clamp-2 leading-relaxed'>
                            {article.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NewsCard