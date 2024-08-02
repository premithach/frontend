import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://your-app-name.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prev => checked ? [...prev, value] : prev.filter(option => option !== value));
  };

  return (
    <div>
      <h1>{'AP21110010051'}</h1>
      <textarea value={jsonData} onChange={(e) => setJsonData(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Response:</h2>
          {selectedOptions.includes('Numbers') && <pre>{JSON.stringify(response.numbers, null, 2)}</pre>}
          {selectedOptions.includes('Alphabets') && <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>}
          {selectedOptions.includes('Highest alphabet') && <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>}
        </div>
      )}

      <div>
        <label>
          <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
          Numbers
        </label>
        <label>
          <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
          Alphabets
        </label>
        <label>
          <input type="checkbox" value="Highest alphabet" onChange={handleOptionChange} />
          Highest alphabet
        </label>
      </div>
    </div>
  );
}

export default App;
