import React from 'react'
import Header from './template/Header'
// import TeamSelect from './TeamSelect'

function Home() {
    return (
        <div className="App">
            <Header />
        </div>
    )
}

export default Home

/*
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