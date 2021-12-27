import React from 'react';
import styled from 'styled-components';
import UploadHandler from '../../atoms/UploadHandler/UploadHandler'

const HeaderWrapper = styled.div`
    width: 100%;
    background-color: cornflowerblue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

const HeaderInnerWrapper = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;


const Header = (props) =>{
return(
    <HeaderWrapper>
        <HeaderInnerWrapper>
            <h1>IMAGE GEOLOC APP</h1>
            <UploadHandler submitFn={props.submitFn} />
        </HeaderInnerWrapper>
    </HeaderWrapper>
)
}

export default Header;