import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -20px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormDropdownInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  top: -20px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  
  

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormDropdownInputLabel} {
    ${shrinkLabelStyles};
  }
`;

export const Group = styled.div`
  position: relative;
  width: 100%;
 
    padding-right: 10px;
    input[type='password'] {
    letter-spacing: 0.3em;
  }
`;
export const Select = styled.select.attrs(() => ({
  className: 'form-select'
}))`
  background-color: rgb(194 203 233);
  position: relative;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  color: red
`;
