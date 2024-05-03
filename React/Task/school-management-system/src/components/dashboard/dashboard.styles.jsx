import styled from "styled-components";

export const DashBoardTab = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
//   justify-content: space-between; /* Adjust justify-content */
`;

export const FieldBox = styled.div`
//   width: calc(25% - 10px); /* Calculate width with margin */
  width: fit-content;
  height: fit-content;
  background-color: rgb(222, 187, 243);
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 0px 0px 5px;
`;

export const FieldHeader = styled.div`
  font-weight: 500;
`;

export const FieldMessage = styled.div``;


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
