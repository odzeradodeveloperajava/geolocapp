import React from 'react';
import styled from './Header.module.scss';
import UploadHandler from '../UploadHandler/UploadHandler'

const Header = () =>{
return(
    <div className={styled.headerWrapper}>
        <div className={styled.headerInnerWrapper}>
            <h1>IMAGE GEOLOC APP</h1>
            <UploadHandler/>
        </div>
    </div>
)
}

export default Header;