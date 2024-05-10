import styled, { css } from "styled-components";

export const DashBoardTab = styled.div.attrs(() => ({
  className: 'col-11 col-lg-11 col-xl-11 col-xxl-11 col-md-10 col-sm-9 col-xs-9'
}))`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%

`;

export const Title = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12  col-xxl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: 600;
  font-size: x-large;
  color: red;
`;

export const Fields = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12  col-xxl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 85vh;
`;


export const FieldBox = styled.div.attrs(() => ({
  className: 'col-3 col-lg-3 col-xl-3  col-xxl-3 col-md-5 col-sm-5 col-xs-6'
}))`
  height: auto;
  background-color: rgb(225 230 246);
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0px 0px 5px;

  
`;

export const FieldHeader = styled.div`
  font-weight: 600;
  font-size: x-large;
`;

export const FieldMessage = styled.div`
    color: red;
    font-size: x-large;
`;


// @media (max-width: 768px) {
//     /* Adjust the width of FieldBox for smaller screens */
//     export const FieldBox = styled.div`
//       display: flex;
//       flex-direction: column;
//       height: fit-content;
//       background-color: rgb(222, 187, 243);
//       border: 1px solid black;
//       border-radius: 5px;
//       align-items: center;
//       justify-content: center;
//       margin: 5px;
//       width: 100%; /* Set width to 100% for smaller screens */
//       max-width: none; /* Remove max-width for smaller screens */
//     `;
//   }




// import styled from "styled-components";

// export const DashBoardTab = styled.div`
//   display: flex;
//   flex-direction: row; 
//   justify-content: space-around;
// `;
// export const FieldBox = styled.div`
// display: flex;
// flex-direction: column; 
// height: fit-content;
// background-color: rgb(222, 187, 243);
// border: 1px solid black;
// border-radius: 5px; 
// align-items: center;
// justify-content: center;
// margin: 5px 0px 0px 5px;
// `;
// export const FieldHeader = styled.div`
// display: flex;
// font-weight: 500; 
// `;
// export const FieldMessage = styled.div`
// display: flex;

// `;
