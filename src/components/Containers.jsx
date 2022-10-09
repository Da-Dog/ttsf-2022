import React from "react";
import styled from "styled-components";

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

function CenteredContainer({ className, children }) {
    return (
        <FlexContainer className={className}>
            <Spacer></Spacer>
            <FullWidthContainer>
                <FlexContainer>
                    {children}
                </FlexContainer>
            </FullWidthContainer>
            <Spacer></Spacer>
        </FlexContainer>
    )
}



function PageSection({className, sections, children}) {

    const InnerDiv = styled.div`
        position: relative;
        width: 100%;
        overflow: hidden;
        height: ${window.innerHeight}px;
        max-height: ${window.innerHeight}px;
        margin: 0%;
        padding: 0%;
        display: flex;
        flex-direction: row;


        &:first-child {

        }

        &:last-child {

        }
    `
    children = React.Children.toArray(children)
    const left = sections?.left || children[0]; 
    const right = sections?.right || children[1];

    return(
        <InnerDiv>
            {left}
            {right}
        </InnerDiv>
    )
}

const CenterAlginedFlexContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
`

export {
    Spacer, 
    FullParentContainer as FullParent, 
    FullWidthContainer as FullWidth, 
    FlexContainer as Flex, 
    CenteredContainer as Centered, 
    CenterAlginedFlexContainer as CenterAlginedFlex,
    PageSection,
}