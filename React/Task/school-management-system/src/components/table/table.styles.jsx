import styled from "styled-components";

export const Actions = styled.div`
display: flex;
justify-content: space-between;
  
`;

export const Table = styled.table`
border-collapse: collapse;
    width: 100%;

    th {
        background-color: #fff3cd;
    }

    td, th { 
        padding: 8px;       
        border-bottom: 1px solid #ddd; 
        text-align: center;
    }

    tr:hover { 
        background-color: rgba(0, 0, 0, 0.075);
    }
`;
