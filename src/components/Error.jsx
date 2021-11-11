import React from 'react'
import styled from '@emotion/styled';

const ErrorM = styled.p`

color: red;
font-family: "Bebas Neue", cursive;

`

const Error = () => {
    return (

        <ErrorM>*Ambos campos son obligatorios</ErrorM>
      );
}
 
export default Error;