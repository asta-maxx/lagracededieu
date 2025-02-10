import React, { useState, useEffect } from 'react';
import './App.css'; // Adjust the CSS path as needed
import Navbar from './Navbar'; // Import the Navbar component

const GuitarLearningPlatform = () => {
  const [output, setOutput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [selectedLessonType, setSelectedLessonType] = useState('chords');

  // Define lesson video URLs and playlist IDs for guitar
  const lessonVideos = {
    chords: 'https://www.youtube.com/embed/videoseries?list=PLho65cYn4nF1FXo8IWbKUb9_k0pMhgbtr', // Chords playlist
    scales: 'https://www.youtube.com/embed/videoseries?list=PLAEBBD885ECD8B675', // Scales playlist
    techniques: 'https://www.youtube.com/embed/videoseries?list=PLFcgHQh5q7E5Xk-jahQcgPgPMNEBiXgCT', // Techniques playlist
  };

  const API_KEY = 'blablabla'; // Your YouTube Data API key
  const PLAYLIST_IDS = {
    chords: 'PLho65cYn4nF1FXo8IWbKUb9_k0pMhgbtr',
    scales: 'PLAEBBD885ECD8B675', // Scales playlist
    techniques: 'PLFcgHQh5q7E5Xk-jahQcgPgPMNEBiXgCT', // Techniques playlist
  };

  useEffect(() => {
    fetchPlaylistVideos(selectedLessonType);
    setVideoUrl(lessonVideos[selectedLessonType]);
  }, [selectedLessonType]);

  const fetchPlaylistVideos = async (lessonType) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_IDS[lessonType]}&key=${API_KEY}&maxResults=50`
      );
      const data = await response.json();
      const videos = data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId,
        thumbnail: item.snippet.thumbnails.medium.url, // Get thumbnail URL
      }));
      setPlaylistVideos(videos);
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
    }
  };

  const collectInputData = (e) => {
    e.preventDefault();
    const lessonType = e.target.lesson_type.value;
    setSelectedLessonType(lessonType); // Update the selected lesson type
    setOutput('Output: Learning mode set!');
  };

  const handleVideoSelect = (videoId) => {
    setVideoUrl(`https://www.youtube.com/embed/${videoId}`); // Set the selected video URL
  };

  // Sign out function
  const handleSignOut = () => {
    console.log('Sign Out button clicked');

    // Clear user session data (adjust this as needed)
    localStorage.removeItem('userToken'); // Example for local storage

    // Redirect to the sign-in page
    window.location.href = '/signin'; // Change to your actual sign-in path
  };

  return (
    <div>
      <Navbar onSignOut={handleSignOut} /> {/* Include Navbar */}
      
      <section className="blue">
        <p>Guitar Learning</p>
      </section>

      <section style={{ backgroundColor: 'black' }}>
        <h1>Guitar Chords and Exercises ↓</h1>
        <div style={{ textAlign: 'center' }}>
          <p>
            Chords: Learn major, minor, and seventh chords to play songs.<br />
            Scales: Practice major and minor scales for better finger dexterity.<br />
            Techniques: Explore strumming patterns and fingerpicking techniques.<br />
            Songs: Learn to play popular songs using chords and tabs.<br />
            Improvisation: Develop skills to improvise over backing tracks.<br />
            Rhythm: Build a strong sense of timing and groove.<br />
          </p>
        </div><br /><br /><br /><br />
      </section>

      <div className="spacer layer2 flip"></div>

      <section className="pink">
        <div className="blob-content" style={{ textAlign: 'center' }}>
          <h1>Start Your Guitar Lesson ↓</h1>
          <form id="lessonForm" onSubmit={collectInputData}>
            <div id="formFields">
              <div className="form-group">
                <label htmlFor="lesson_type">Lesson Type:</label>
                <select id="lesson_type" name="lesson_type" required>
                  <option value="chords">Chords</option>
                  <option value="scales">Scales</option>
                  <option value="techniques">Techniques</option>
                </select>
              </div>
              <button type="submit">Start Lesson</button>
            </div>

            {/* Output */}
            {output && <div id="output" className="output">{output}</div>}
          </form>
        </div>

        {/* Display the YouTube video */}
        {videoUrl && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Lesson Video:</h2>
            <iframe
              width="560"
              height="315"
              src={videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Display the playlist videos */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2>Available Lesson Videos:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {playlistVideos.map(video => (
              <li key={video.videoId} style={{ display: 'inline-block', margin: '10px' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: '120px', height: '90px', cursor: 'pointer' }}
                  onClick={() => handleVideoSelect(video.videoId)} // Handle video selection
                />
                <br />
                <strong>{video.title}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="spacer layer2"></div>

      <section className="blobs">
        <h1>Team Vultr!x</h1>
      </section>
    </div>
  );
};

export default GuitarLearningPlatform;
