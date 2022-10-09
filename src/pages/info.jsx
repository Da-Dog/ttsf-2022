import React from "react";
import { ChevronDown } from "react-bootstrap-icons";
import styled from "styled-components"; 
import FadedBackground from "../components/Background";
import NavBar from "../components/NavBar";
import Doc1 from "../components/Doc";
import * as Containers from "../components/Containers";

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



function NavigationButtonContainer({className, children}) {
    return (
        <Containers.FullWidth className={className}>
            <Containers.CenterAlginedFlex direction='row' gap={1}>
                {children}
            </Containers.CenterAlginedFlex>
        </Containers.FullWidth>
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

const PreventionTitle = styled.h1`
    color: black;

`

function Info() {

    return(
        <div>
            <FadedBackground 
                image="https://www.fresnobee.com/latest-news/oewnev/picture253495194/alternates/LANDSCAPE_1140/CaliforniaWildfires.JPG"
                blurRate={2}
            >
                <Containers.Centered>
                    <Containers.Flex height="fit-content" gap={1}>
                        <StyledTitle>Wild Fires</StyledTitle>
                        <StyledSubtitle>As a result of climate change.</StyledSubtitle>
                        <StyledSubtitle>Wildfires sprang up in many areas of the world.</StyledSubtitle>
                        <StyledSubtitle>Destroying 18,000 structures and causing 28 billion in capital losts in California alone. </StyledSubtitle>
                    </Containers.Flex>
                    <StyledNavigationButtonContainer>
                        <NavigationButton>
                            Learn more
                        </NavigationButton>
                        <NavigationButton>
                            Interactive Game
                        </NavigationButton>
                    </StyledNavigationButtonContainer>
                </Containers.Centered>
            </FadedBackground>
            <Containers.PageSection>
                <div>
                    <PreventionTitle>
                        Prevention when camping
                    </PreventionTitle>
                </div>
                <div>
                    World
                </div>
            </Containers.PageSection>
            {/* <NavBar></NavBar> */}
            <Doc1></Doc1>
        </div>
    )
}



export default Info; 