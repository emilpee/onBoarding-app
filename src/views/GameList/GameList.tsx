import React, { useEffect, useState, FunctionComponent } from 'react'
import axios from 'axios'
import { CLIENT_ID } from '../../boardgameatlas.config'
import { GameObject } from '../../interfaces'
import { CardColumns, CardDeck, Container, Spinner } from 'react-bootstrap'
import { GameCard } from '../../components'

const Games: FunctionComponent = () => {
  const [gamesData, setgamesData] = useState<GameObject[]>([])

  useEffect(() => {
    axios
      .get(
        `https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=${CLIENT_ID}`
      )
      .then(({ data }) => {
        setgamesData(data.games)
      })
  }, [])

  return (
    <Container className="container" fluid>
      <h1 className="display-4">Browse Games</h1>
      <CardColumns>
        {gamesData.length > 0 ? (
          gamesData.map((game: GameObject) => {
            return <GameCard game={game} key={game.id} />
          })
        ) : (
          <Spinner animation="border" color="primary" />
        )}
      </CardColumns>
    </Container>
  )
}

export default Games
