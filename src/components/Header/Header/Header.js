import React from 'react';
import styled from './Header.module.scss';
import { themeToggle } from '../../../functions/themeToggle/themeToggle';
import { toggleUploadModal } from '../../../actions';
import { connect } from 'react-redux'

const Header = ({toggleUploadModal}) =>{
return(
    <div className={styled.headerWrapper}>
        <div className={styled.headerInnerWrapper}>
            <h1>IMAGE GEOLOC APP</h1>
            <button type='button' onClick={()=>themeToggle()}>Toggle theme</button>
            <button type='button' onClick={()=>toggleUploadModal('true')}>Upload file</button>
        </div>
    </div>
)
}

const mapDispatchToProps = dispatch =>({
    toggleUploadModal: (trueOrFalse) => dispatch(toggleUploadModal(trueOrFalse))
})



export default connect(null, mapDispatchToProps)(Header);