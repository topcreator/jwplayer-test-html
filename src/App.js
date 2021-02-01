import React from 'react';
import './App.css';

const playlist = [
  {
    default: true,
    endtime: 0,
    file: "https://www.youtube.com/watch?v=PLXEuATXFrI",
    starttime: 0,
    status: true,
    title: " Purple Movie",
  },
  {
  default: false,
  endtime: 0,
  file: "https://www.youtube.com/watch?v=PLXEuATXFrI",
  type: "mp4",
  starttime: 0,
  status: true,
  title: " Red Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.youtube.com/watch?v=EsFFDqCj1aQ",
  type: "mp4",
  starttime: 0,
  status: true,
  title: " Blue Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.youtube.com/watch?v=yFTDKbAomh0",
  type: "mp4",
  starttime: 0,
  status: true,
  title: " Green Movie",
},
{
  default: false,
  endtime: 0,
  file: "https://www.youtube.com/watch?v=Q1p3jFJk778",
  type: "mp4",
  starttime: 0,
  status: true,
  title: " Yellow Movie",
}
];

let player;

function App() {
  const [title, setTitle] = React.useState('');
  const [index, setIndex] = React.useState(-1);
  const onNext = () => {
    player.next();
  }

  const onPrev = () => {
    player.playlistItem(index - 1);
  }

  const onPlay = i => {
    player.playlistItem(i);
  }

  React.useEffect(() => {
    player = window.jwplayer("jw-player").setup({
      width: "100%",
      aspectratio: "16:9",
      autostart: "viewable",
      playbackRateControls: true,
      //preload: "none",
      //autostart: true,
      playlist,
      youtube: {
        //this is not required
      }
    });
    player.on("time", function(event) {
      const playlistCurrentIndex = player.getPlaylistIndex();
      const video = player.getPlaylistItem(playlistCurrentIndex);
      console.log('onTime==>', playlistCurrentIndex, video);

      setTitle(video.title);
      setIndex(playlistCurrentIndex);
      if (event.duration - event.position <= 5) {
        player.playlistNext();
      }
    });
  }, []);
  return (
    <div className="App" style={{width: '100%', textAlign: 'center', padding: 30}}>
      <h2>Test with YouTube Videos in Playlist(Non - React Component):</h2>
      <div style={{width: 1000}} id="jw-player">
        
      </div>
      <div style={{marginTop: 30, textAlign: "left"}}>
        <button onClick={onPrev} style={{marginRight: 30}} disabled={index <= 0}>
          Prev
        </button>
        <button onClick={onNext} style={{marginRight: 30}} disabled={index >= playlist.length - 1}>
          Next
        </button>
      </div>
      <div style={{marginTop: 30, textAlign: "left"}}>
        <strong>Title of the playing video: </strong>
        <span>{title}</span>
      </div>
      <div style={{marginTop: 30}}>
        <ul>
          {playlist.map((item, i) => <li key={item.title} className={i === index ? 'is-playing' : ''} onClick={() => onPlay(i)}>
            {`${i + 1}: ${item.title}`}
          </li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
