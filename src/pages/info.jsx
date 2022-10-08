import React from "react";
import { ChevronDown } from "react-bootstrap-icons"
import styled from "styled-components"; 
import FadedBackground from "../components/Background"
import NavBar from "../components/NavBar";

function Header({className, children}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const StyledHeader = styled(Header)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0%;
    margin: 0%;
`

function Testing({ className, children, image }) {
    return (
        <></>
    )
}

const Spacer = styled.div`
    flex-grow: 1;
`

const FullWidthContainer = styled.div`
    width: 100%;
`

const FlexContainer = styled(FullWidthContainer)`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: ${props => props?.direction ? props.direction : 'column'};
    align-items: center;
`

function CenteredContainer({className, children}) {
    return (
        <FlexContainer className={className}>
            <Spacer></Spacer>
            <FullWidthContainer>
                {children}
            </FullWidthContainer>
            <Spacer></Spacer>
        </FlexContainer>
    )    
}

const HorizontallyCenteredContainer = styled.div`
    width: fit-content; 
    margin-left: auto;
    margin-right: auto;
`

const StyledTitle = styled.h1`
    color: white;
    font-size: 4rem;
    margin: 0%;
    padding: 0%;
`

const StyledSubtitle = styled.p`
    color: white;
    margin: 1px;
    padding: 0%;
`

const StyledScrollIndactor = styled(ChevronDown)`
    color: white;
    width: 4rem;
    height: 4rem;

    &:hover {
        color: yellow;
    }
`

const NavigationButton = styled.button`
    height: 3rem;
    background: transparent;
    border-radius: 3px;
    border: 2px solid white;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
`

function Info() {

    return(
        <div>
            <FadedBackground 
                image="https://www.fresnobee.com/latest-news/oewnev/picture253495194/alternates/LANDSCAPE_1140/CaliforniaWildfires.JPG"
                blurRate={2}
            >
                <CenteredContainer>
                    <FlexContainer>
                        <StyledTitle>Wild Fires</StyledTitle>
                        <StyledSubtitle>As a result of climate change. Wildfires sprang up in many areas of the world. </StyledSubtitle>
                        <StyledSubtitle>Destroying 18,000 structures and causing 28 billion in capital losts in California alone. </StyledSubtitle>
                    </FlexContainer>
                    <HorizontallyCenteredContainer>
                        <NavigationButton>
                            Learn more
                        </NavigationButton>
                        <NavigationButton>
                            
                        </NavigationButton>
                    </HorizontallyCenteredContainer>
                </CenteredContainer>
            </FadedBackground>
            <NavBar></NavBar>
            <Testing></Testing>
        </div>
    )
}



export default Info; 