import React from "react";
import styled from "styled-components";
import FadedBackground from "../components/Background"
import {Link} from "react-router-dom";

const Spacer = styled.div`
    flex-grow: 1;
    /* margin-top: 25vh; */
`

const FullWidthContainer = styled.div`
    width: 100%;
`
const FullParentContainer = styled(FullWidthContainer)`
    height: 100%
`

const FlexContainer = styled(FullParentContainer)`
    display: flex;
    flex-direction: ${props => props?.direction ? props.direction : 'column'};
    gap: ${props => props?.gap || 0}px;
    align-items: center;
    ${props => props?.width && ('width: ' + props.width + ';')}
    ${props => props?.height && ('height: ' + props.height + ';')}
`

function CenteredContainer({className, children}) {
    return (
        <FlexContainer className={className}>
            <Spacer></Spacer>
            <FullWidthContainer>
                <FlexContainer gap={1}>
                    {children}
                </FlexContainer>
            </FullWidthContainer>
            <Spacer></Spacer>
        </FlexContainer>
    )
}

const StyledTitle = styled.h1`
    color: white;
    font-size: 4rem;
    margin: 0;
    padding: 0;
`

const StyledSubtitle = styled.p`
    color: white;
    margin: 1px;
    padding: 0;
`

const CenterAlginedFlexContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
`

function NavigationButtonContainer({className, children}) {
    return (
        <FullWidthContainer className={className}>
            <CenterAlginedFlexContainer direction='row' gap={1}>
                {children}
            </CenterAlginedFlexContainer>
        </FullWidthContainer>
    )
}

const StyledNavigationButtonContainer = styled(NavigationButtonContainer)`
    margin-top: 5%;
`
const NavigationButton = styled.button`
    height: 4rem;
    width: 20%;
    background: transparent;
    border-radius: 3px;
    border: 2px solid white;
    color: white;
    margin: 0 2rem;
    padding: 0.25em 1em;
    font-size: large;
    font-weight: bold;

    &:hover {
        transform: scale(1.1)
    }
`

function HomePage() {

    return(
        <div>
            <FadedBackground
                image="https://www.fresnobee.com/latest-news/oewnev/picture253495194/alternates/LANDSCAPE_1140/CaliforniaWildfires.JPG"
                blurRate={2}
            >
                <CenteredContainer>
                    <FlexContainer height="fit-content" gap={1}>
                        <StyledTitle>Wild Fires</StyledTitle>
                        <StyledSubtitle>As a result of climate change.</StyledSubtitle>
                        <StyledSubtitle>Wildfires sprang up in many areas of the world.</StyledSubtitle>
                        <StyledSubtitle>Destroying 18,000 structures and causing 28 billion in capital losts in California alone. </StyledSubtitle>
                    </FlexContainer>
                    <StyledNavigationButtonContainer>
                        <Link to="/info" style={{color: "white", textDecoration: "none"}}>
                            <NavigationButton>
                                Learn More
                            </NavigationButton>
                        </Link>
                        <Link to="/game" style={{color: "white", textDecoration: "none"}}>
                            <NavigationButton>
                                Interactive Game
                            </NavigationButton>
                        </Link>
                    </StyledNavigationButtonContainer>
                </CenteredContainer>
            </FadedBackground>
        </div>
    )
}



export default HomePage;