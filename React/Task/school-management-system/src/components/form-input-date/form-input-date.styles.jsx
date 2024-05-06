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

export const Input = styled.input.attrs(() => ({
  className: 'form-control'
}))`
  font-size: 14px;
  display: block;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${subColor};
  background-color: rgb(225 230 246);
`;

export const ErrorMessage = styled.span`
  color: red
`;


// const shrinkLabelStyles = css`
//   top: ${({ isDate }) => (isDate ? '-20px' : '-20px')};
//   font-size: 16px;
//   font-weight: 500;
//   color: ${mainColor};
// `;

// export const FormInputLabel = styled.label`
//   color: ${subColor};
//   font-size: 16px;
//   font-weight: normal;
//   position: absolute;
//   pointer-events: none;
//   // left: 5px;
//   top: ${({ isDate }) => (isDate ? '-15px' : '3px')};

//   transition: 300ms ease all;
//   ${({ shrink }) => shrink && shrinkLabelStyles};
// `;

// export const Input = styled.input`
//   background: none;
//   background-color: white;
//   color: ${subColor};
//   font-size: 16px;
//   // padding: 10px 10px 10px 5px;
//   display: block;
//   width: 100%;
//   border: none;
//   border-radius: 0;
//   border: 1px solid ${subColor};
 

//   &:focus {
//     outline: none;
//   }

//   &:focus ~ ${FormInputLabel} {
//     ${shrinkLabelStyles};
//   }
// `;

// export const Group = styled.div`
//   position: relative;
//   margin: 0px 5px;
//   width: 100%;
//   input[type='password'] {
//     letter-spacing: 0.3em;
//   }
// `;
// export const ErrorMessage = styled.span`
//   color: red
// `;
