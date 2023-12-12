function login() {
    const nameEl = document.querySelector("#name");
    const passEl = document.querySelector("#pass");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", passEl.value);
    window.location.href = "play.html";
  }


  function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }

  displayQuote();