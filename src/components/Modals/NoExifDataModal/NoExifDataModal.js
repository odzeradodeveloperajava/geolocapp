import React from 'react'
import styled from 'styled-components'
import './NoExifDataModal.css'
import { connect } from 'react-redux';
import { resetStateValue } from '../../../actions';


const Blackout = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.75);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ModalWrapper = styled.div`
    position: absolute;
    width: 800px;
    height: 600px;
    z-index: 99;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    opacity: 1;
    flex-direction: column;
`;

const CloseButton = styled.button`
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    z-index: 99;
    margin-top: 30px;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: lightgray;
        border: none;
    }
`;



const NoExifDataModal = ({noexifdatafilenames,resetStateValueX}) => {
    if(noexifdatafilenames.length === 0 ){
        return null
    }
    else if (noexifdatafilenames.length !== 0 ){
        console.log(noexifdatafilenames)
        return (
        <Blackout>
        <ModalWrapper>
        <p className='noGpsDataDesc'>This files not contain any GPS data:</p>
        {noexifdatafilenames.map(item => (
                                <div className='noExifDataName' key={noexifdatafilenames.item}>
                                    {item}
                                </div>
                            ))}
            <CloseButton onClick={()=> resetStateValueX('noExifDataFileNames', [])} >Close</CloseButton>
        </ModalWrapper>
        </Blackout>
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
