
import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
    position: relative; 
    width: 100%;
    overflow: hidden;
    height: ${window.innerHeight - 55}px;
    max-height: ${window.innerHeight - 55}px;
    margin: 0;
    padding: 0;

    &::before {
        content: "";
        position: absolute;
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
const Background = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        z-index: -1;

        display: block;
        background-color: black;
        background-size:cover;
        width: 100%;
        height: 100%;
        filter: opacity(${props => props.opacity});
        /* filter: blur(${props => props.blurRate}px); */
    }

    /* Background */
    
` 

function FadedBackground({ className, children, image, blurRate = 2}) {
    return (
        <BackgroundContainer className={className} image={image} blurRate={blurRate}>
            <Background opacity={0.7} >
                {children}
            </Background>
        </BackgroundContainer>
    )
}


export default FadedBackground;