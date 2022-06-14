import React from 'react'
import styled from './NoExifDataModal.module.scss'
import { connect } from 'react-redux';
import { resetStateValue } from '../../../actions';



const NoExifDataModal = ({noexifdatafilenames,resetStateValueX}) => {
    if(noexifdatafilenames.length === 0 ){
        return null
    }
    else if (noexifdatafilenames.length !== 0 ){
        console.log(noexifdatafilenames)
        return (
        <div className={styled.noExifDataModal__wrapper}>
        <div className={styled.noExifDataModal__innerWrapper}>
        <p className='noGpsDataDesc'>This files not contain any GPS data:</p>
        {noexifdatafilenames.map(item => (
                                <div className='noExifDataName' key={noexifdatafilenames.item}>
                                    {item}
                                </div>
                            ))}
            <div className={styled.noExifDataModal__closeButton} onClick={()=> resetStateValueX('noExifDataFileNames', [])} >Close</div>
        </div>
        </div>
        )
    }
    else {
        return null
    }
}

const mapStateToProps = state =>{
    return {
        noexifdatafilenames: state.noExifDataFileNames,
        fullScreen: state.fullScreen
    }
}

const mapDispatchToProps = dispatch =>({
    resetStateValueX: (stateEntry, value) => dispatch(resetStateValue(stateEntry, value))
})


export default connect(mapStateToProps, mapDispatchToProps)(NoExifDataModal)
