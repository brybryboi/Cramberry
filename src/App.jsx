import { Corpus } from "tiny-tfidf";
import Highlighter from "react-highlight-words";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [keywords, setKeywords] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    getKeywords(input);
    setInputs([input]);
  }

  async function searchKeyword(keyword) {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        q: keyword,
        api_key: "a",
        engine: "google",
      },
    });

    return response.data.organic_results.slice(0, 3).map((r) => ({
      title: r.title,
      url: r.link,
      snippet: r.snippet,
    }));
  }

  function getKeywords(text) {
    const corpus = new Corpus(["text"], [text]);
    const topKeywords = corpus.getTopTermsForDocument("text").slice(0, 10);
    setKeywords(topKeywords.map((keyword) => keyword[0]));
    console.log(topKeywords);
  }

  return (
    <main>
      <div className="flexcont">
        <div className="middle">
          <h1 className="title">Cramberry bot</h1>

          <form onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your passage here..."
              value={input}
              type="text"
              id="blacktext"
              cols={60}
              rows={10}
            ></textarea>
            <button type="submit" id="form1" className="submit-button">
              Submit
            </button>
          </form>
          <div id="output">
            <Highlighter
              highlightClassName="highlight"
              searchWords={keywords}
              textToHighlight={input}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
