import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 100px;
  width: fit-content;
  height: fit-content;
  letter-spacing: 0.5px;
  // line-height: 50px;
  padding: 5px;
  font-size: 15px;
  background-color: Green;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
  border-radius: 5px;

  &:hover {
    background-color: #04b004;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: grey;
  color: white;
  border: 1px solid black;

  &:hover {
    background-color: #b8b4b4;
    color: black;
  }
`;
export const DeleteButton = styled(BaseButton)`
  background-color: #e40c0c;
  color: white;

  &:hover {
    background-color: #f41616;
    color: black;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
