import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
    width: 1100px;
    height: 15px;
    background-color: cornflowerblue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 20px;
`;


const Footer = () => {
    return (
        <FooterWrapper>©2021 Slawomir T </FooterWrapper>
    )
}

export default Footer
