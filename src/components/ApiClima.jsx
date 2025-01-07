import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";

const ApiClima = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const obtenerClima = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_CLIMA_API_KEY
    }&units=metric`;

    try {
      const result = await axios.get(url);
      setWeather(result.data);
      setError(null);
    } catch (error) {
      setError("Error al obtener el clima. Verifica la ciudad o la API Key.");
      setWeather(null);
    }
  };

  return (
    <>
      <Container>
        <div>
          {!weather && (
            <input
              type="text"
              placeholder="Ingresa una ciudad"
              onKeyDown={(e) => {
                if (e.key === "Enter") obtenerClima(e.target.value);
              }}
            />
          )}

          {weather && (
            <div>
              <h3>{weather.name}</h3>
              <p>Temperatura: {weather.main.temp}°C</p>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </Container>
    </>
  );
};

export default ApiClima;
