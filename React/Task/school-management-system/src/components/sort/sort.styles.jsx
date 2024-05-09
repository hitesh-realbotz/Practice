import styled from "styled-components";


export const SortComponent = styled.div`
display: flex;
justify-content: center;
margin-bottom: 10px;
`;
export const RowContainer = styled.div`
display: flex;
justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end
`;

export const Button = styled.button.attrs(() => ({
    className: 'btn btn-info'
  }))`
  min-width: 100px;
  width: max-content;
  color: black;
  background-color: #31d2f2 ;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  margin: 0px 5px;
  border: none;
  border-radius: 5px;

  &:hover {
    color: white;
    border: 1px solid black;
    background-color: #07b3d5 ;
  }
`;
export const ResetButton = styled(Button).attrs(() => ({
    className: 'btn btn-secondary'
  }))`
  background-color:  #b8b4b4 ;
 
  &:hover {
    background-color:  grey ;
  }
`;