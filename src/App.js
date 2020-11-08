import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: 'Title 2',
      url: 'https://github.com/Rocketseat/title2',
      techs: [
        "Node",
        "Express",
        "TypeScript"
      ]
    });
    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>
                <strong>Repositório:</strong> {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
              </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
