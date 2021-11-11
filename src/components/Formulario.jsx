import React , {useEffect,useState} from 'react'
import styled from '@emotion/styled';
import useCripto from '../hooks/useCripto';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: red;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #9c0e0e;
        cursor:pointer;
    }
`

const Formulario = ({setMoneda , setCripto}) => {

    const [listaCripto, setLista] = useState ([]);
    const [error,setError]= useState(false);
    const MONEDAS = [
        {codigo:'USD',nombre: "Dolar" },
        {codigo:'EUR',nombre: "Euro" },
        {codigo:'ARG',nombre: "Peso Argentino" }
    ]

    const [moneda, Seleccionar] = useCripto('Elige tu moneda','', MONEDAS);
    const [cripto,SeleccionarCripto]= useCriptomoneda ('Elige la Criptomoneda','', listaCripto)

    useEffect(()=>{
        const consultarAPI= async()=> {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url)

            setLista (resultado.data.Data);
        }
        consultarAPI();
    },[])


    const cotizarMoneda = e => {
        e.preventDefault();

        if (moneda ==="" || cripto === "") {
            setError (true);
            return;
        }

        setError (false);
        setMoneda (moneda);
        setCripto (cripto);
    }
    return (  
        <form
            onSubmit = {cotizarMoneda}
        >
            {error ? <Error></Error>: null}
            <Seleccionar/>
            <SeleccionarCripto/>
            <Boton 
                type = "submit"
                value = "Calcular"
            />
        </form>

    );
}
 
export default Formulario;