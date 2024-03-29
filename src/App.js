import React,{Component} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';


class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {},
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.consulta !== this.state.consulta) {
      this.consultarApi();
    }
    
  }
  
  componentDidMount() {
    this.setState({
      error: false
    })
  }
  consultarApi = () => {
    const { ciudad, pais } = this.state.consulta;
    if (!ciudad || !pais) return null;

    //leer la url y agregar el api key
    const appId = '96c734e38e7f7896c7af48278d7dcee4'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    

    //query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        this.setState({
          resultado: datos,
        })
      })
      .catch(error => {
        console.log(error);
      })
    


  }
  datosConsulta = respuesta => {
    if (respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({
      error: true
    })
    } else {
      this.setState({
        consulta: respuesta,
        error: false,
    })
    }
  }

  render() {

    const error = this.state.error;
    
    let resultado;
    if (error) {
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    } else {
      resultado = <Clima resultado={this.state.resultado}/>
    }

     return (
       <div className="App">
            <Header
                titulo = "Pronostico Del Clima"
            />
         <Formulario 
          datosConsulta = {this.datosConsulta}
         />
         {resultado}
       </div>
  
     );
  }
}

export default App;
