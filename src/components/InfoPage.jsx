import React from 'react';
import styled from 'styled-components';


const Section = styled.div`
    position: relative;
    width: 80%;
    overflow: hidden;
    margin: 3rem auto;
    padding: 0;
    text-align:center;
`

const Title = styled.h1`
    text-align: left;
    margin-bottom: 0.225em;
`
const StyledP = styled.p`
    font-size: 1.1em;
    margin-bottom: 1em;
    text-align: left;
`

function Info() {
    return (
        <div style={{paddingBottom: '3em'}}>
            <Section>
                <Title>Prevention when camping</Title>
                <StyledP>To prevent wildfires while camping, always remember
                    to check the weather and drought conditions. When building a
                    campfire, do so in an open area and away from flammables. Keep
                    sparks away from dry vegetation, such as leaves, branches and
                    grass, and the fire should be at least 10 feet in diameter away
                    from them. Campfires should be doused until they become cold.
                    Burn debris carefully, never in windy or restricted conditions.
                </StyledP>
            </Section>
            <Section>
                <Title>Stay Caucious</Title>
                <StyledP>In addition to the need for caution when camping in the
                    mountains, we also need to be vigilant in our daily lives. Obey
                    local laws regarding open fires. Try to keep any combustible
                    materials outside of a 10-foot diameter range from the fire. Have
                    firefighting tools nearby when lighting a fire, do not leave the
                    fire unattended, and be really careful when handling hot charcoal.
                </StyledP>
            </Section>
            <Section>
                <Title>Who is causing wildfire?</Title>
                <StyledP>According to the National Interagent Fire Center, most fires are caused by human, 
                    which are preventable. When we are using equipment and camp fire, be sure to follow 
                    local rules and read the equipment instruction throughly before using it.
                </StyledP>
                <a href="/data1.png"><img style={{maxWidth:'95%', height:'auto'}} src="data1.png" alt="barchart" /></a>
            </Section>
            <Section>
                <Title>What is causing wildfire?</Title>
                <StyledP>Image below are historical data of what humans are using that caused wildfire. Take a look at the image and find out if things you are doing will potentially cause a wildfire! (Data from National Interagent Fire Center)<br/> <span style={{fontStyle:'italic'}}> Click on the image to zoom in.</span></StyledP>
                <a href="/data2.png"><img style={{maxWidth:'95%', height:'auto'}} src="data2.png" alt="barchart" /></a>
            </Section>
            <Section>
                <Title>What is the air quality in your area?</Title>
                <StyledP>Do you know if the air you are breathing is healthy? How is wildfire effecting the air quality in your area? Go to <a href="https://fire.airnow.gov/">Fire and Smoke Map</a> to find out.</StyledP>
            </Section>
        </div>
    )

}


export default Info