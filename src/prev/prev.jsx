import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Prev() {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();

    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);
  return (
    <main className="container-fluid bg-light text-center text-dark" >
    <table className="table">
      <thead className="table-light">
        <tr>
          <th>Week of</th>
          <th>Option 1</th>
          <th>Option 2</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-primary">
          <td>10/2</td>
          <td>Dogs</td>
          <td>Cats</td>
          <td>dogs (56%)</td>
        </tr>
        <tr className="table-danger">
            <td>10/9</td>
            <td>Batman</td>
            <td>Superman </td>
            <td>Batman (92%)</td>
        </tr>
        <tr className="table-danger">
            <td>10/16</td>
            <td>Chocolate</td>
            <td>Vanilla</td>
            <td>Vanilla (51%)</td>
        </tr>
      </tbody>
    </table>

    <div className='quote-box bg-light text-dark'>
          <p className='quote'>{quote}</p>
          <p className='author'>{quoteAuthor}</p>
        </div>
  </main>
  );
}