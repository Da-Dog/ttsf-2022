
import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: ${window.innerHeight}px;
    margin: 0%;
    padding: 0%;
    
    /* Background */
    &::before {
        content: "";
        position: fixed;
        left: 0;
        right: 0;
        z-index: -1;

        display: block;
        background-image: url("${props => props.image}");
        background-size:cover;
        width: 100%;
        height: 100%;
        filter: blur(${props => props.blurRate}px);
    }
`
function FadedBackground({ className, children, image, blurRate = 2}) {
    return (
        <BackgroundContainer className={ className } image={image} blurRate={blurRate}>
            {children}
        </BackgroundContainer>
    )
}


export default FadedBackground;