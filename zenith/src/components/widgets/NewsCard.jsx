import React, { useEffect, useState } from 'react'

function NewsCard() {
  const [news, setNews] = useState([])
  
  // SECURE: Pulls from Vercel Environment Variables instead of a local file
  const apiKey = import.meta.env.VITE_NEWS_API;
  const news_url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&limit=2`

  useEffect(() => {
    // Only fetch if the API key exists to prevent errors
    if (!apiKey) {
        console.error("API Key is missing! Add VITE_NEWS_API to your Vercel Environment Variables.");
        return;
    }

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
  }, [news_url, apiKey])

  return (
    <div className='bg-[#0d1117] mt-10 p-6 rounded-2xl'>
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-white text-xl font-semibold tracking-tight">Daily Insights</h2>
            <button className="text-[#4dabf7] text-sm font-medium hover:text-blue-300 transition-colors">
                View all news
            </button>
        </div>

        {/* 2-Column Grid to match your image */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {news.map((article, index) => (
                <div key={article.uuid || index} className="bg-[#161b22] rounded-2xl overflow-hidden border border-gray-800/50 flex flex-col">
                    
                    {/* Image Area */}
                    <div className="aspect-video w-full">
                        <img 
                            src={article.image_url || 'https://via.placeholder.com/400x225'} 
                            alt="news"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-[#1c2431] text-[#4dabf7] text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider">
                                {article.categories?.[0] || 'GENERAL'}
                            </span>
                            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                                5 MIN READ
                            </span>
                        </div>
                        
                        <h3 className='text-white text-lg font-bold leading-snug mb-2 line-clamp-2'>
                            {article.title}
                        </h3>
                        
                        <p className='text-gray-400 text-sm line-clamp-2 mb-4'>
                            {article.description}
                        </p>
                        
                        {/* Link to actual story */}
                        <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="mt-auto text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-xs font-bold uppercase tracking-widest hover:brightness-125"
                        >
                            Read Full Story →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NewsCard