'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const moods = [
  'Happy', 'Sad', 'Relaxed', 'Energetic', 'Romantic', 'Workout',
  'Chill', 'Motivated', 'Focus', 'Party', 'Melancholy', 'Sleepy',
  'Excited', 'Adventurous', 'Nostalgic', 'Calm', 'Angry', 'Joyful', 'Study'
];

export default function GeneratePage() {
  const { data: session } = useSession();
  const [selectedMood, setSelectedMood] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [numSongs, setNumSongs] = useState(10);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [playlist, setPlaylist] = useState([]);

  // Load playlist
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userPlaylist') || '[]');
    setPlaylist(saved);
  }, []);

  // Save playlist
  useEffect(() => {
    localStorage.setItem('userPlaylist', JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = (item) => {
    setPlaylist(prev => {
      if (prev.find(v => v.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const fetchVideos = async (query) => {
    if (!query) return;
    setLoading(true);
    setCurrentVideoId('');
    try {
      const res = await fetch(`/api/youtube?query=${encodeURIComponent(query)}&maxResults=${numSongs}`);
      if (!res.ok) throw new Error('Bad response from server');
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    const query = searchQuery || selectedMood;
    if (!query) {
      alert('Please select a mood or type a search term!');
      return;
    }
    fetchVideos(query);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">You must be signed in to generate a playlist</h2>
        <button
          onClick={() => signIn('google', { callbackUrl: '/generate' })}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left">Generate Playlist</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="/playlist">
            <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors">My Playlist</button>
          </Link>
          <Link href="/">
            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Home</button>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 hidden sm:inline">Hi, {session.user.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search + Number of Songs */}
      <div className="w-full max-w-4xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSelectedMood(''); }}
          className="flex-1 px-4 py-2 rounded-lg border-2 border-purple-600 bg-gray-800 text-white focus:outline-none focus:border-purple-400"
        />
        <select
          value={numSongs}
          onChange={(e) => setNumSongs(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border-2 border-purple-600 bg-gray-800 text-white focus:outline-none focus:border-purple-400"
        >
          {[6, 10, 15, 20, 30].map(n => (
            <option key={n} value={n}>{n} songs</option>
          ))}
        </select>
      </div>

      {/* Mood Selector */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-xl mb-4 text-center md:text-left">Or Select Your Mood</h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => { setSelectedMood(mood); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-full border-2 border-purple-600 ${selectedMood === mood ? 'bg-purple-600 text-white' : 'text-purple-400'} hover:bg-purple-700 hover:text-white transition-colors`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-full text-lg font-bold hover:bg-purple-700 transition-colors"
      >
        {loading ? 'Generating...' : 'Generate Playlist'}
      </button>

      {/* Loading Message */}
      {loading && <p className="mt-6 text-gray-300">Loading videos...</p>}

      {/* Video Player */}
      {currentVideoId && (
        <div className="mt-10 w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            key={currentVideoId}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Grid */}
      <div className="mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg line-clamp-2">{video.title}</h3>
              <p className="text-gray-400 text-sm">{video.channelTitle}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setCurrentVideoId(video.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Play
                </button>
                <button
                  onClick={() => {
                    addToPlaylist({
                      id: video.id,
                      title: video.title,
                      thumbnail: video.thumbnail,
                      mood: selectedMood || searchQuery,
                      addedAt: new Date().toISOString(),
                    });
                    alert(`Added "${video.title}" to playlist!`);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No videos message */}
      {!loading && videos.length === 0 && (
        <p className="text-gray-400 mt-10 text-center">Type a search or select a mood to see results!</p>
      )}
    </div>
  );
}
