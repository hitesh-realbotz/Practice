import styled from "styled-components";
import { Link } from 'react-router-dom';

export const SideBarContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #adb5bd;
`;
export const SideBarLink = styled.div`
  width: 100%;
  text-decoration: none;
  color: black;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    background-color: #dee2e6;
  }
`;

export const NavLink = styled(Link)`
  padding: 0px 5px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 500;


  
`;