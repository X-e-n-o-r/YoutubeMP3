import axios from "axios"
import React from "react"
import { youtube_parser } from "./utils";


function App() {
  const inputUrl: any = React.useRef()
  const [URLres, setURLres] = React.useState()

  function send(event: { preventDefault: () => void }) {
    event.preventDefault()
    console.log(inputUrl.current.value)

    const youtubeID = youtube_parser(inputUrl.current.value)

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }

    axios(options)
      .then(res => setURLres(res.data.link))
      .catch(err => console.log(err))

    inputUrl.current.value = '';
  }
  return (
    <>
      <div className='content'>
        <h1 className='title'>Youtube to MP3 converter</h1>
        <p>Transform YouTube videos into mp3</p>

        <form 
        onSubmit={send}
        className='form'>
          <input
          ref={inputUrl}
          className="form_input"
          placeholder='Paste a YouTube video URL link...'
          type='text' />
          <button
          type='submit'
          className='form_button'>Search</button>
        </form>
        {URLres ? <a target='_blank' rel="noreferrer" href={URLres} className="download">Download MP3</a> : ''}
      </div>
    </>
  )
}

export default App
