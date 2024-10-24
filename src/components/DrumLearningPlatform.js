import React, { useState, useEffect } from 'react';
import './App.css'; // Adjust the CSS path as needed
import Navbar from './Navbar'; // Import the Navbar component

const DrumLearningPlatform = () => {
  const [output, setOutput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [selectedLessonType, setSelectedLessonType] = useState('drumBasics');

  // Define lesson video URLs and playlist IDs for drums
  const lessonVideos = {
    drumBasics: 'https://www.youtube.com/embed/videoseries?list=PL45A6530592779AD4', // Drum Basics playlist
    drumTechniques: 'https://www.youtube.com/embed/videoseries?list=PLLOJc4hJB_hK3JpE6B6N3Lj7-foARntiA', // Drum Techniques playlist
    drumExercises: 'https://www.youtube.com/embed/videoseries?list=PLThYwnIoLwyV_4OVK8Oj3idnHqX3qnTNR', // Drum Exercises playlist
  };

  const API_KEY = 'AIzaSyCy81GScOZfeTOTZYURijeVDz-bDmxVxNU'; // Your YouTube Data API key
  const PLAYLIST_IDS = {
    drumBasics: 'PL45A6530592779AD4', // Drum Basics playlist
    drumTechniques: 'PLLOJc4hJB_hK3JpE6B6N3Lj7-foARntiA', // Drum Techniques playlist
    drumExercises: 'PLThYwnIoLwyV_4OVK8Oj3idnHqX3qnTNR', // Drum Exercises playlist
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
        <p>Drum Learning</p>
      </section>

      <section style={{ backgroundColor: 'black' }}>
        <h1>Drum Basics and Exercises ↓</h1>
        <div style={{ textAlign: 'center' }}>
          <p>
            Basics: Learn the fundamental beats and rhythms for drumming.<br />
            Techniques: Explore various drumming techniques and styles.<br />
            Exercises: Practice exercises to build speed and coordination.<br />
            Songs: Learn to play along with your favorite songs.<br />
            Improvisation: Develop skills to improvise and jam.<br />
            Rhythm: Build a strong sense of timing and groove.<br />
          </p>
        </div><br /><br /><br /><br />
      </section>

      <div className="spacer layer2 flip"></div>

      <section className="pink">
        <div className="blob-content" style={{ textAlign: 'center' }}>
          <h1>Start Your Drum Lesson ↓</h1>
          <form id="lessonForm" onSubmit={collectInputData}>
            <div id="formFields">
              <div className="form-group">
                <label htmlFor="lesson_type">Lesson Type:</label>
                <select id="lesson_type" name="lesson_type" required>
                  <option value="drumBasics">Drum Basics</option>
                  <option value="drumTechniques">Drum Techniques</option>
                  <option value="drumExercises">Drum Exercises</option>
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

        {/* Container for all available lesson videos */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2>Available Lesson Videos:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {playlistVideos.map(video => (
              <div key={video.videoId} style={{ margin: '10px', textAlign: 'center' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: '120px', height: '90px', cursor: 'pointer' }}
                  onClick={() => handleVideoSelect(video.videoId)} // Handle video selection
                />
                <br />
                <strong>{video.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer layer2"></div>

      <section className="blobs">
        <h1>Team Vultr!x</h1>
        <div className="mt-4">
        </div>
      </section>
    </div>
  );
};

export default DrumLearningPlatform;
