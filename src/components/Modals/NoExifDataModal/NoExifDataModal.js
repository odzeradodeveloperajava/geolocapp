import React from 'react'
import styled from 'styled-components'
import './NoExifDataModal.css'

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



const NoExifDataModal = ({state, deleteHandler}) => {
    function onClickHandler(){
        deleteHandler('modalCloseHandler')
    }

    if(state.noexifdatafilenames.length === 0 ){
        return null
    }
    else if (state.noexifdatafilenames.length !== 0 && state.loader ==='hidden'){
        return (
        <Blackout>
        <ModalWrapper>
        <p className='noGpsDataDesc'>This files not contain any GPS data:</p>
        {state.noexifdatafilenames.map(item => (
                                <div className='noExifDataName' key={state.noexifdatafilenames.item}>
                                    {item}
                                </div>
                            ))}
            <CloseButton onClick={onClickHandler} >Close</CloseButton>
        </ModalWrapper>
        
        </Blackout>
        )
    }
    else {
        return null
    }
}

export default NoExifDataModal
