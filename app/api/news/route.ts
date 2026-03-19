import { NextRequest, NextResponse } from 'next/server';

// Mock news data with scoring
const mockNewsData: Record<string, any[]> = {
  us: [
    {
      title: 'Major Tech Company Announces AI Breakthrough',
      description: 'Leading technology firm reveals revolutionary artificial intelligence system that outperforms human experts in complex tasks.',
      url: 'https://example.com/news/1',
      source: 'Tech News Daily',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      score: 95,
    },
    {
      title: 'New Climate Policy Sparks National Debate',
      description: 'Government unveils ambitious plan to reduce carbon emissions by 50% over the next decade, drawing both praise and criticism.',
      url: 'https://example.com/news/2',
      source: 'National Post',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400',
      score: 87,
    },
    {
      title: 'Stock Market Hits Record High Amid Economic Recovery',
      description: 'Major indices surge to unprecedented levels as investors show confidence in economic outlook and corporate earnings.',
      url: 'https://example.com/news/3',
      source: 'Financial Times',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      score: 82,
    },
  ],
  vn: [
    {
      title: 'Vietnam Tech Sector Attracts Record Foreign Investment',
      description: 'International investors pour billions into Vietnamese technology companies, signaling confidence in the nation\'s digital economy.',
      url: 'https://example.com/news/4',
      source: 'Vietnam Business News',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=400',
      score: 91,
    },
    {
      title: 'Hanoi Unveils Smart City Infrastructure Plan',
      description: 'Capital city announces comprehensive initiative to implement IoT sensors and AI-powered services across urban areas.',
      url: 'https://example.com/news/5',
      source: 'VN Express',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1578925518904-a1f3e6ce4ba7?w=400',
      score: 85,
    },
  ],
  gb: [
    {
      title: 'UK Universities Lead in Quantum Computing Research',
      description: 'British institutions make significant breakthroughs in quantum technology, positioning the nation as a global leader in the field.',
      url: 'https://example.com/news/6',
      source: 'The Guardian',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      score: 88,
    },
  ],
  jp: [
    {
      title: 'Japan Launches Advanced Robotics Initiative',
      description: 'Government and private sector collaborate on next-generation robotics program aimed at addressing labor shortages and elderly care.',
      url: 'https://example.com/news/7',
      source: 'Nikkei Asia',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400',
      score: 93,
    },
  ],
  kr: [
    {
      title: 'South Korea Sets New 5G Speed Record',
      description: 'Telecom companies achieve unprecedented data transfer rates, advancing the nation\'s position in mobile technology leadership.',
      url: 'https://example.com/news/8',
      source: 'Korea Herald',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400',
      score: 89,
    },
  ],
  cn: [
    {
      title: 'China Achieves Breakthrough in Renewable Energy Storage',
      description: 'Scientists develop innovative battery technology capable of storing massive amounts of clean energy at lower costs.',
      url: 'https://example.com/news/9',
      source: 'China Daily',
      publishedAt: new Date().toISOString(),
      urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      score: 90,
    },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || 'us';

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const articles = mockNewsData[country] || mockNewsData['us'];

  return NextResponse.json({
    status: 'ok',
    totalResults: articles.length,
    articles: articles,
  });
}
