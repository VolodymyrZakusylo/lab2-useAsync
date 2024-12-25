import React from "react";
import { useAsync } from "../../Hooks/useAsync";
import "./TestComp.css"

const fetchBreeds = async () => {
  const response = await fetch("https://api.thedogapi.com/v1/breeds");

  if (!response.ok) {
    throw new Error("Помилка при завантаженні інформації");
  }
  return response.json();
};

const TestComp = () => {
  const { loading, value, error, runAsync } = useAsync(fetchBreeds, []);

  return (
    <div>
      {loading && <div className="loading">Завантаження</div>}
      {error && <div className="error">{error.message}</div>}
      {value && (
        <ul>
          {value.slice(0, 10).map((breed) => (
            <li key={breed.id}>{breed.name}</li>
          ))}
        </ul>
      )}
      <button onClick={runAsync}>Завантажити знову</button>
    </div>
  );
};

export default TestComp;