import React from 'react'

import styled from 'styled-components'
import { FaUserSecret } from 'react-icons/fa';


const Header = () => {
    return (
        <StyledHeader>
            <FaUserSecret className="icon" />
            Anonimust
            <div />
        </StyledHeader>
    )
}

export default Header


const StyledHeader = styled.header`
    width: 100%;
    height: 3rem;
    background: #26A69A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;

    .icon {
        font-size: 1.5rem;
        color: #ffffff;
        margin-right: 1.1rem;
    }
`