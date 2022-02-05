import styled from 'styled-components';
import { connect } from 'react-redux';
import { fullScreenToggle } from '../../../actions';

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

const FullSizeImageShadowBox = ({activeItems, activeCardNr, fullScreenState, fullScreenToggle}) => {
    if(fullScreenState === true){
        window.onscroll = function () { window.scrollTo(0, 0); };
        return(
        <Wrapper>
            <WhiteImageBackground>
                <CloseButton onClick={()=>fullScreenToggle('fullScreen',false)}>X</CloseButton>
            </WhiteImageBackground>
            <ImageWrapper url={activeItems[activeCardNr].fullImageUrl}/>
        </Wrapper>
        )}
    else {
        window.onscroll=function(){};
        return null;
    }
}
const mapStateToProps = state =>{
    return {
        fullScreenState: state.fullScreen,
        activeItems: state.activeItems,
        activeCardNr: state.activeCardNr
    }
}

const mapDispatchToProps = dispatch =>({
    fullScreenToggle: (screenType, trueOrFalse) => dispatch(fullScreenToggle(screenType, trueOrFalse))
})
export default connect(mapStateToProps, mapDispatchToProps)(FullSizeImageShadowBox);

