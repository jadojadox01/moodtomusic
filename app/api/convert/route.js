// app/api/convert/route.js
import { NextResponse } from 'next/server';
import { video_info } from 'play-dl';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'videoId is required' }, { status: 400 });
  }

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Get video info
    const info = await video_info(videoUrl);

    // Get best audio-only format
    const audioFormat = info.streams
      .filter((f) => f.container === 'webm' || f.container === 'm4a')
      .sort((a, b) => b.bitrate - a.bitrate)[0];

    if (!audioFormat || !audioFormat.url) {
      return NextResponse.json({ error: 'Audio format not found' }, { status: 500 });
    }

    return NextResponse.json({ audioUrl: audioFormat.url });
  } catch (err) {
    console.error('Conversion failed:', err.stack || err);
    return NextResponse.json(
      { error: 'Conversion failed', details: err.message },
      { status: 500 }
    );
  }
}
