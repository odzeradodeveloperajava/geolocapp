import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.75);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WhiteImageBackground = styled.div`
    position: absolute;
    width: 85%;
    height: 85%;
    background-color: white;
    z-index: 1100;
    display: flex;
    justify-content: flex-end;
    border-radius: 2px;
`;

const ImageWrapper = styled.div`
    width: 80%;
    height: 80%;
    background-image: ${state => `url(${state.url})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1200;
`;

const CloseButton = styled.a`
    position: relative;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    font-weight: 600;
    cursor: pointer;
`;

const FullSizeImageShadowBox = ({state, closeHandler}) => {
    function clickHandler(e){
        closeHandler('fullScreenCloseHandler')
    }
    if(state.fullScreen === true){
        window.onscroll = function () { window.scrollTo(0, 0); };
        return(
        <Wrapper>
            {state.children}
            <WhiteImageBackground>
                <CloseButton onClick={clickHandler}>X</CloseButton>
            </WhiteImageBackground>
            <ImageWrapper url={state.items[state.activeCard].fullImageUrl.fullImageUrl}/>
        </Wrapper>
        )}
    else {
        window.onscroll=function(){};
        return null;
    }
}

export default FullSizeImageShadowBox
