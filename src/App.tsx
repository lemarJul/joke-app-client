import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRandomJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://joke-app-api.onrender.com/api/v1/jokes/random"
      );
      const { data } = await response.json();
      setSetup(data.setup);
      setPunchline(data.punchline);
    } catch (error) {
      console.error("Error fetching joke:", error);
    } finally {
      setTimeout(() => {
        // Simulate a slight delay for better UX
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Carambar & Co - Blagues</h1>
      </header>
      <main className="app-main">
        <button className="joke-button" onClick={fetchRandomJoke}>
          Obtenir une blague !
        </button>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          (setup || punchline) && (
            <div className="joke-container">
              {setup && <p className="joke-setup">{setup}</p>}
              {punchline && <p className="joke-punchline">{punchline}</p>}
            </div>
          )
        )}
      </main>
      <footer className="app-footer">
        <p className="disclaimer">
          Projet d'exercice technique sans affiliation avec la marque Carambar
        </p>
        <p>© Julien Lemarchand 2025</p>
      </footer>
    </div>
  );
}

export default App;
