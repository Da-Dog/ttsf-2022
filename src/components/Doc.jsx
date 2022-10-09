import React from 'react';
import styled from 'styled-components';



const StyledText  = styled.div`
    font-family: ubunto;
    text-align: center;
`



function Doc1() {

    return (
        <div>
            <StyledText>
                <h1>Prevention when camping</h1>
                <h3>To prevent wildfires while camping, always remember 
                    to check the weather and drought conditions. When building a 
                   campfire, do so in an open area and away from flammables. Keep 
                   sparks away from dry vegetation, such as leaves, branches and 
                   grass, and the fire should be at least 10 feet in diameter away 
                   from them. Campfires should be doused until they become cold. 
                   Burn debris carefully, never in windy or restricted conditions.</h3>
                <h1>Stay Caucious</h1>
                <h3>In addition to the need for caution when camping in the 
                    mountains, we also need to be vigilant in our daily lives. Obey 
                    local laws regarding open fires. Try to keep any combustible 
                    materials outside of a 10-foot diameter range from the fire. Have 
                    firefighting tools nearby when lighting a fire, do not leave the 
                    fire unattended, and be really careful when handling hot charcoal.</h3>
            </StyledText>
        </div>
    )

}


export default Doc1