import React, { useEffect, useState, FunctionComponent } from "react";
import axios from "axios";
import { CLIENT_ID } from "../../boardgameatlas.config";
import { GameObject } from "../../interfaces";
// import { UserContext } from "../../context/userContext";
import { Container, Spinner } from "react-bootstrap";
import UserContext from "context/userContext";

const Games: FunctionComponent = () => {
  const [gamesData, setgamesData] = useState<GameObject[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(({ data }) => {
        setgamesData(data.games);
      });
  }, []);

  return (
    <UserContext.Provider value={null}>
      <Container className="container" fluid>
        <h1 className="display-4">Browse Games</h1>
        <ul>
          {gamesData.length > 0 ? (
            gamesData.map((game: GameObject) => {
              return <li key={game.id}>{game.name}</li>;
            })
          ) : (
            <Spinner animation="border" color="primary" />
          )}
        </ul>
      </Container>
    </UserContext.Provider>
  );
};

export default Games;