import React, {Fragment,useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`


const useCripto = (label,stateInicial,opciones)=>{



    const [state,setState] = useState (stateInicial);
    const Selecionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange = {e => setState (e.target.value)}
                value={state}
            >
                <option  value= "">-Seleccione-</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value= {opcion.codigo}>{opcion.nombre}</option>
                ))}
                
            </Select>

        </Fragment>

    );


    return [state,Selecionar,setState];
}

export default useCripto;