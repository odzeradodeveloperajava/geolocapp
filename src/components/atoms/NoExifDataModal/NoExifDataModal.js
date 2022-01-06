import React from 'react'
import styled from 'styled-components'

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
`;

const CloseButton = styled.button`
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    z-index: 99;
    margin-top: 200px;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: lightgray;
    }
`;



const NoExifDataModal = ({files, deleteHandler}) => {
    function onClickHandler(){
        deleteHandler('modalCloseHandler')
    }

    if(files.length === 0){
        return null
    }
    else{
        return (
        <Blackout>
        <ModalWrapper>
            <div>
            This files do not contain latitude & longitude data: {files} .
            </div>
        </ModalWrapper>
        <CloseButton onClick={onClickHandler} >Close</CloseButton>
        </Blackout>
        )
    }
}

export default NoExifDataModal
