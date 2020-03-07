import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Header from './template/Header'
import FavoriteTeam from './FavoriteTeam'

const client = new ApolloClient({
    uri: 'https://localhost:4004/'
})

function Home() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Header />
                <FavoriteTeam />
            </div>
        </ApolloProvider>
    )
}

export default Home

/*
    react graphql usage examples: https://www.youtube.com/watch?v=-XwkFm5a9lw

    A aplicação deve atender as seguintes histórias:
    Como torcedor do [time selecionado] quero visualizar as partidas e resultados do time na
    temporada de 2019 na Copa do Brasil e Campeonato Brasileiro.
    Como torcedor do [time selecionado] quero clicar em um campeonato e visualizar todas as
    partidas na temporada de 2019.
    Como torcedor do [time selecionado] quero clicar em um time e ver as partidas contra o [time
    selecionado] ao longo do ano, nos dois campeonatos, caso existam.
    Como torcedor do [time selecionado] quero visualizar a página em meu celular e em meu PC sem
    qualquer impacto na experiência e/ou desempenho.
*/