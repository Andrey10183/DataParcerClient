import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Abel, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  
  #content {
    color: ${({theme}) => theme.table};
    transition: all 0.50s linear;
  }

  #filter {
    color: ${({theme}) => theme.filter};
    background: ${({theme}) => theme.filterBg};
    transition: all 0.50s linear;
  }

  .modal .modal-dialog .modal-content{  
    background-color: ${({ theme }) => theme.modalBg};
    color: ${({ theme }) => theme.modal}; 
    transition: all 0.50s linear;
  }
  `
