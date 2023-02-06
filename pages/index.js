import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [input, setInput] = useState("");
  const [img, setImg] = useState(''); 

  const onChange = (event)=>{
    setInput (event.target.value);
  }

  const generateAction = async () => {
    console.log('Generating...');	

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
      });
  
      const data = await response.json();

      if (response.status === 503) {
        console.log('Model is loading still :(.')
        return;
      }
    
      // If another error, drop error
      if (!response.ok) {
        console.log(`Error: ${data.error}`);
        return;
      }

      setImg(data.image);
  };

  return (
    <div className="root">
      <Head>
        <title>My AI Avatar Generator | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>My AI generator</h1>
          </div>

          <div className="header-subtitle">
            <h2>Turn me into anyone you want! Make sure you refer to me as "keqi" in the prompt</h2>
          </div>

          <div className="prompt-container">
            <input className="prompt-box" value={input} onChange={onChange}/>
            <div className="prompt-buttons">
              <a className="generate-button" onClick={generateAction}>
              <div className="generate">
              <p>Generate</p>
            </div>
    </a>
  </div>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-avatar"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
