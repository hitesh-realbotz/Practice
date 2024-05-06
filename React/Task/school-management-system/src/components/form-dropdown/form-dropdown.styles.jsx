import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

export const FormDropdownInputLabel = styled.label`
  color: ${mainColor};
  font-size: 16px;
  font-weight: 500;
  pointer-events: none;
`;

export const Group = styled.div`
  position: relative;
  width: 100%;
  margin: 0px 5px;
`;

export const Select = styled.select.attrs(() => ({
  className: 'form-select'
}))`
  background-color: rgb(225 230 246);
  position: relative;
  width: 100%;
  border: 1px solid ${subColor};
`;

export const ErrorMessage = styled.span`
  color: red
`;


// const shrinkLabelStyles = css`
//   top: -20px;
//   font-size: 12px;
//   color: ${mainColor};
// `;

// export const FormDropdownInputLabel = styled.label`
//   color: ${subColor};
//   font-size: 16px;
//   font-weight: normal;
//   position: absolute;
//   pointer-events: none;
//   top: -20px;
//   transition: 300ms ease all;
//   ${({ shrink }) => shrink && shrinkLabelStyles};
// `;

// export const Group = styled.div`
//   position: relative;
//   width: 100%;
//     padding-right: 10px;
//     input[type='password'] {
//     letter-spacing: 0.3em;
//   }
// `;
// export const Select = styled.select.attrs(() => ({
//   className: 'form-select'
// }))`
//   background-color: rgb(194 203 233);
//   position: relative;
//   width: 100%;
//   border: 1px solid ${subColor};
// `;

// export const ErrorMessage = styled.span`
//   color: red
// `;
