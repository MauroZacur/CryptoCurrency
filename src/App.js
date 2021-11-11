import React, {useState,useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';


const Contenedor = styled.div `
max-width: 900px;
margin: 0 auto;
@media (min-width:992px) {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  column-gap: 2rem;

}
`

const Imagen = styled.img `
  max-width:100% ;
  margin-top: 5rem;

`
const Header = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: red;
    display:block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState ('');
  const [cripto,setCripto]= useState ('');
  const [resultado,setResultado] = useState({});
  const [cargando, setCargando] = useState(false);


  useEffect (()=>{
    const cotizarCripto = async () => {
      
      if (moneda ==='') return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      setCargando(true);

       
      setTimeout(() => {

         setCargando(false);
         setResultado(resultado.data.DISPLAY[cripto][moneda] );

       }, 3000);
    }
    cotizarCripto();
  },[moneda,cripto])


  const componente = (cargando) ? <Spinner /> :  <Cotizacion  resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen
          src= {imagen}
          alt="criptos"
        />
      </div>
      <div>
        <Header>Cotizador de Criptomonedas</Header>
        <Formulario
          setMoneda = {setMoneda}
          setCripto = {setCripto}
        
        ></Formulario>

          {componente}
      </div>
    </Contenedor>
  );
}

export default App;
