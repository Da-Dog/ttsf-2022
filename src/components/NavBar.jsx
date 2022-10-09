import React from 'react';
import styled from 'styled-components';
import {NavLink as link} from 'react-router-dom';

const Nav = styled.nav`
    background: #C4A484;
    display: block;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    font-family: ubunto;
    font-size: 18px;
    font-weight: bold;
`

const NavLink = styled(link)`
    color: #FFFFFF;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 15px;
    cursor: pointer;
    &.active {
        color: #000000;
    }
`

const NavButton = styled.div`
    display: flex;
    align-items: center;
`

const NavButtonLink = styled(NavLink)`
    border-radius: 4px;
    margin: 20px;
    background: #FFFFFF;
    color: #654321;
    text-decoration: none;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background: #D3D3D3;
        color: #808080;
    }
    &.active {
        color: #000000;
    }
`

const NavBar = () => {
    return(
        <Nav>
            <NavButton>
                <NavButtonLink>{/*to='(webpage)'*/}
                    How to Prevent Wild Fire
                </NavButtonLink>
                <NavButtonLink> {/*to='(webpage)'*/}
                    What to do Before, During, and After Wild Fire
                </NavButtonLink>
            </NavButton>
            
        </Nav>
    )
}

export default NavBar;