import React from 'react';
import styled from './Header.module.scss';
import UploadHandler from '../UploadHandler/UploadHandler'
import { themeToggle } from '../../../functions/themeToggle/themeToggle';

const Header = () =>{
return(
    <div className={styled.headerWrapper}>
        <div className={styled.headerInnerWrapper}>
            <h1>IMAGE GEOLOC APP</h1>
            <button type='button' onClick={()=>themeToggle()}>Toggle theme</button> 
            <UploadHandler/>
        </div>
    </div>
)
}

export default Header;