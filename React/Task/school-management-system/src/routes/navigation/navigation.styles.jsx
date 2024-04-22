import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(193 116 237);
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 10px 15px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 500;
`;


export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
export const SideBarContainer = styled.div`
  width: 10vw;
  display: flex;
`;