import React, { useState, useEffect } from 'react';
import './App.css'; // Adjust the CSS path as needed
import Navbar from './Navbar'; // Import the Navbar component

const PianoLearningPlatform = () => {
  const [output, setOutput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [selectedLessonType, setSelectedLessonType] = useState('scales');

  // Define lesson video URLs and playlist IDs
  const lessonVideos = {
    scales: 'https://www.youtube.com/embed/videoseries?list=PLJOfTzSYW-9oTpYqDNEEKqIPutaanRvFY', // Scales playlist
    arpeggios: 'https://www.youtube.com/embed/videoseries?list=PL8hZtgRyL9WS8VQipoK1RxgWJCaJhhLb5', // Arpeggios playlist
    chords: 'https://www.youtube.com/embed/videoseries?list=PLfM8ivjJ-rKWHALei28Ns_tu28os8MciS', // Chords playlist
  };

  const API_KEY = 'blablabla'; // Your YouTube Data API key
  const PLAYLIST_IDS = {
    scales: 'PLJOfTzSYW-9oTpYqDNEEKqIPutaanRvFY',
    arpeggios: 'PL8hZtgRyL9WS8VQipoK1RxgWJCaJhhLb5', // Arpeggios playlist
    chords: 'PLfM8ivjJ-rKWHALei28Ns_tu28os8MciS', // Chords playlist
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
        <p>Piano Learning</p>
      </section>

      <section style={{ backgroundColor: 'black' }}>
        <h1>Piano Scales and Exercises ↓</h1>
        <div style={{ textAlign: 'center' }}>
          <p>
            Major Scales: Learn all major scales to develop finger agility.<br />
            Minor Scales: Practice harmonic and melodic minor scales.<br />
            Arpeggios: Master chord-based patterns across the keyboard.<br />
            Chords: Get comfortable with major, minor, diminished, and augmented chords.<br />
            Technique: Exercises for finger strength and dexterity.<br />
            Rhythm: Develop a strong sense of timing and rhythm.<br />
          </p>
        </div><br /><br /><br /><br />
      </section>

      <div className="spacer layer2 flip"></div>

      <section className="pink">
        <div className="blob-content" style={{ textAlign: 'center' }}>
          <h1>Start Your Piano Lesson ↓</h1>
          <form id="lessonForm" onSubmit={collectInputData}>
            <div id="formFields">
              <div className="form-group">
                <label htmlFor="lesson_type">Lesson Type:</label>
                <select id="lesson_type" name="lesson_type" required>
                  <option value="scales">Scales</option>
                  <option value="arpeggios">Arpeggios</option>
                  <option value="chords">Chords</option>
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

export default PianoLearningPlatform;
