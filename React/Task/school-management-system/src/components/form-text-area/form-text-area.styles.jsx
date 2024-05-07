import styled, { css } from 'styled-components';


const subColor = 'grey';
const mainColor = 'black';

export const Group = styled.div`
  position: relative;
  margin: 0px 5px;
  width: 100%;
`;

export const FormInputLabel = styled.label`
  color: ${mainColor};
  font-size: 16px;
  font-weight: 500;
  pointer-events: none;
`;

export const Input = styled.textarea.attrs(() => ({
  className: 'form-control'
}))`
  font-size: 14px;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${subColor};
`;

export const ErrorMessage = styled.span`
  color: red
`;

