import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  h2 {
    margin: 10px 0;
  }
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #dc3545;
  margin: 10px 0px;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;