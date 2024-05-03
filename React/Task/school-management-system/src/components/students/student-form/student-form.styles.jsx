import styled from 'styled-components';

export const StudentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin: 10px 0;
  }
`;


export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const FormFieldContainer = styled.div`
  // display: flex;
  // justify-content: space-evenly;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const FormField = styled.div`
  display: flex;
  width: 50%;
  padding-right: 15px;
 
`;  

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;



export const FormInputContainer = styled.div`
  flex: 1;
  margin-right: 10px;
`;
export const CustButton = styled.button.attrs(() => ({
  className: 'btn btn-secondary'
}))`

`;
export const CustSelect = styled.select.attrs(() => ({
  className: 'form-select'
}))`
background-color: rgb(222, 187, 243);

`;
export const CustDrop = styled.div.attrs(() => ({
  className: 'input-group mb-3'
}))`
`;
