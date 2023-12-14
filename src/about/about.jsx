import React, { useEffect } from 'react';
import './about.css';
import { animateText } from '../animateText.js'

export function About() {
  const sentence = `Xormbalfu is an experiment with using Chat-GPT to generate random
text adventures. On the start screen, you will be prompted for a few words or a phrase.
Chat-GPT will then use that to seed a playable text adventure. It takes in previous commands and
responses so it has can keep a static adventure going, but only for 3000 words or so.
OpenAI's API is still in development, so please be patient with load times. It might take up to 15
seconds for a response.`;

const handleLoadAbout = (event) => {
  animateText(sentence, 'outputDiv');
};

useEffect(() => {
  handleLoadAbout()
})

  return (

    <main>
      <div id="wordContainer">
        <div id="outputDiv"></div>
        <img style={{ height: '3.5em', marginTop: '20%' }} src="./xorm1.png" alt="" />
      </div>
    </main>
  );
}