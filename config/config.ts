const apiConfig = {
  API_PORT: 4004,
  campeonatos: {
    CopaDoBrasil: {
      url: "https://futebol.homolog.groundsportech.com/samples/campeonatos/670.json",
      partidas: "https://futebol.homolog.groundsportech.com/samples/campeonatos/670/partidas.json",
      equipes: "https://futebol.homolog.groundsportech.com/samples/campeonatos/670/equipes.json"
    },
    Brasileiro: {
      url: "https://futebol.homolog.groundsportech.com/samples/campeonatos/673.json",
      partidas: "https://futebol.homolog.groundsportech.com/samples/campeonatos/673/partidas.json",
      equipes: "https://futebol.homolog.groundsportech.com/samples/campeonatos/673/equipes.json"
    }
  },
  urlEstadios: "https://futebol.homolog.groundsportech.com/samples/estadios.json",
}

const appConfig = {
  dev: {
    url: 'http://localhost',
    port: '8000'
  },
  prod: {
    url: '',
    port: ''
  }
}

export { apiConfig, appConfig }