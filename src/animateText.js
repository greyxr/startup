function animateText(sentence, outputElement, delay = 0.04) {
    const words = sentence.split(' ');
    
    const outputDiv = document.getElementById(outputElement);
    words.forEach((word, index) => {
      const wordDiv = document.createElement('span');
      wordDiv.textContent = word + ' ';
      wordDiv.classList.add('word');
      wordDiv.style.animationDelay = `${delay* (index + 1)}s`;
      outputDiv.appendChild(wordDiv);
    })
    outputDiv.appendChild(document.createElement('br'))
    outputDiv.appendChild(document.createElement('br'))
    }

export { animateText }