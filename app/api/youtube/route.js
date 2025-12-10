import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query'); // unified param for mood/search

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const maxResults = Number(searchParams.get('maxResults')) || 10;

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    query + ' music'
  )}&key=${YOUTUBE_API_KEY}&maxResults=${maxResults}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    const videos = (data.items || []).map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
