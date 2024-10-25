import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Liste Des Films</h1>
        </header>
        <main className="main">
          <MovieList />
        </main>
      </div>
    </>
  );
}

export default App;
