import React from 'react'

import styled, {keyframes} from 'styled-components'
import { FaUserSecret } from 'react-icons/fa';

const Loader = () => {
    return (
        <StyledLoader>
            <FaUserSecret className="icon" />
            Anonimust
        </StyledLoader>
    )
}

export default Loader

const spin = keyframes`
    0% {
        transform: scale(.9);
    }

    100% {
        transform: scale(1);
    }
`

const StyledLoader = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #26A69A;
    color: #fff;
    font-size: 2rem;
    text-transform: uppercase;

    .icon {
        font-size: 6rem;
        color: #fff;
        margin-bottom: 1rem;
        animation: ${spin} .6s linear infinite;
    }
`