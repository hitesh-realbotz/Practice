import styled from "styled-components";
import { CONSTANTS } from "../../constants/constants";

export const Actions = styled.div`
display: flex;
justify-content: center;
margin: 0px -50px;
`;

export const Table = styled.table.attrs(() => ({
    className: 'col-12 col-lg-12 col-xl-12 col-xxl-12 col-md-12 col-sm-12 col-xs-12'
  }))`
    border-collapse: collapse;
    width: 100%;
    
    th {
        background-color: greenyellow;
    }

    td, th { 
        padding: 8px;       
        border: 1px solid black; 
        text-align: center;

    }

    tr:hover { 
        background-color: #acd0e8;
    }
`;
