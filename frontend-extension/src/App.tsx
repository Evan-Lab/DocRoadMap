function App() {
  return (
    <div className="App">
      <div className="login-container">
        <h1>Bienvenue sur DocRoadMap</h1>
        <h2>Connexion</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
