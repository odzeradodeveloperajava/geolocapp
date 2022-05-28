import React from 'react';
import styled from './Header.module.scss';
import { themeToggle } from '../../../functions/themeToggle/themeToggle';
import { toggleUploadModal } from '../../../actions';
import { connect } from 'react-redux'



const Header = ({toggleUploadModal}) =>{
return(
    <div className={styled.header__wrapper}>
        <div className={styled.header__innerWrapper}>
            <h1 className={styled.header__title} onClick={()=>window.location.reload()}>IMAGE GEOLOC APP</h1>
            <label className={styled.header__toggleButton}>
                <input type='checkbox' onClick={()=>themeToggle()} />
                <span className={styled.header__slider}>
                </span>
            </label>
            <button className={styled.header__uploadButton} type='button' onClick={()=>toggleUploadModal('true')}>Upload file</button>
        </div>
    </div>
)
}

const mapDispatchToProps = dispatch =>({
    toggleUploadModal: (trueOrFalse) => dispatch(toggleUploadModal(trueOrFalse))
})



export default connect(null, mapDispatchToProps)(Header);