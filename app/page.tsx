'use client';
import { useState, useEffect } from 'react';
import { Globe, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage?: string;
  score: number;
}

const countries = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchNews = async (countryCode: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?country=${countryCode}`);
      const data = await res.json();
      setNews(data.articles || []);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCountry);
  }, [selectedCountry]);

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900\">
      <header className=\"border-b border-purple-800/30 backdrop-blur-lg bg-slate-900/50 sticky top-0 z-50\">
        <div className=\"max-w-7xl mx-auto px-4 py-4\">
          <div className=\"flex items-center justify-between\">
            <div className=\"flex items-center gap-3\">
              <div className=\"w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center\">
                <Globe className=\"w-6 h-6 text-white\" />
              </div>
              <div>
                <h1 className=\"text-2xl font-bold text-white\">Hot News Pulse Pro</h1>
                <p className=\"text-sm text-purple-300\">Real-time Global News Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => fetchNews(selectedCountry)}
              disabled={loading}
              className=\"flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50\"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className=\"max-w-7xl mx-auto px-4 py-8\">
        <div className=\"grid grid-cols-1 lg:grid-cols-4 gap-6\">
          <aside className=\"lg:col-span-1\">
            <div className=\"bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-800/30 p-4\">
              <h2 className=\"text-lg font-semibold text-white mb-4 flex items-center gap-2\">
                <Globe className=\"w-5 h-5\" />
                Select Country
              </h2>
              <div className=\"space-y-2\">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      selectedCountry === country.code
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className=\"text-2xl\">{country.flag}</span>
                    <span className=\"font-medium\">{country.name}</span>
                  </button>
                ))}
              </div>

              {lastUpdate && (
                <div className=\"mt-6 pt-4 border-t border-slate-700\">
                  <p className=\"text-xs text-gray-400\">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          </aside>

          <div className=\"lg:col-span-3\">
            {loading ? (
              <div className=\"flex items-center justify-center h-96\">
                <div className=\"text-center\">
                  <RefreshCw className=\"w-12 h-12 text-purple-500 animate-spin mx-auto mb-4\" />
                  <p className=\"text-gray-400\">Loading news...</p>
                </div>
              </div>
            ) : (
              <div className=\"space-y-4\">
                {news.length === 0 ? (
                  <div className=\"bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-800/30 p-12 text-center\">
                    <AlertCircle className=\"w-12 h-12 text-gray-500 mx-auto mb-4\" />
                    <p className=\"text-gray-400\">No news available</p>
                  </div>
                ) : (
                  news.map((article, idx) => (
                    <article
                      key={idx}
                      className=\"bg-slate-800/50 backdrop-blur-lg rounded-xl border border-purple-800/30 p-6 hover:border-purple-600/50 transition group\">
                      <div className=\"flex gap-4\">
                        {article.urlToImage && (
                          <div className=\"flex-shrink-0\">
                            <img
                              src={article.urlToImage}
                              alt=\"\"
                              className=\"w-32 h-32 object-cover rounded-lg\"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          </div>
                        )}
                        <div className=\"flex-1 min-w-0\">
                          <div className=\"flex items-start justify-between gap-4 mb-2\">
                            <h3 className=\"text-xl font-semibold text-white group-hover:text-purple-400 transition\">
                              <a href={article.url} target=\"_blank\" rel=\"noopener noreferrer\">
                                {article.title}
                              </a>
                            </h3>
                            {article.score > 0 && (
                              <div className=\"flex items-center gap-1 px-3 py-1 bg-purple-600/20 rounded-full flex-shrink-0\">
                                <TrendingUp className=\"w-4 h-4 text-purple-400\" />
                                <span className=\"text-sm font-semibold text-purple-400\">
                                  {article.score}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className=\"text-gray-400 mb-3 line-clamp-2\">{article.description}</p>
                          <div className=\"flex items-center gap-4 text-sm text-gray-500\">
                            <span className=\"font-medium text-purple-400\">{article.source}</span>
                            <span>•</span>
                            <span>{new Date(article.publishedAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
