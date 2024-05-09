import styled from 'styled-components';
import { Link } from 'react-router-dom';

{/* <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Fixed navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav> */}


export const NavigationContainer = styled.nav.attrs(() => ({
    className: 'navbar navbar-expand-md navbar-dark fixed-top bg-dark'
  }))`
  height: 70px;
`;

// export const NavigationContainer = styled.div.attrs(() => ({
//   className: 'col-12 col-lg-12 col-xl-12 col-xxl-12 col-md-12 col-sm-12'
// }))`
//   height: 70px;
//   display: flex;
//   justify-content: space-between;
//   background-color: rgb(193 116 237);
// `;

export const LogoContainer = styled(Link)`
  display: flex;  
  height: 100%;
  // width: 70px;
  padding: 10px 15px;
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const Title = styled.div`
  // // width: 50%;
  // height: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: x-large;
  cursor: pointer;
  color: white;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  font-weight: 500;
`;


export const HomeContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  margin: 70px 0px;
  height: 100vh;
  display: flex;

  @media (max-width: 576px) { /* Extra small screens */
    .col-xs-2 {
      flex-basis: 16.66666667%; /* Override default behavior */
    }
    .col-xs-3 {
      flex-basis: 25%; /* Override default behavior */
    }
    .col-xs-4 {
      flex-basis: 33.33%; /* Override default behavior */
    }
    .col-sm-5 {
      flex-basis: 41.66666667%; /* Adjust to fit 11 columns */
    }
    .col-xs-6 {
      flex-basis: 50%; /* Override default behavior */
    }
    .col-xs-7 {
      flex-basis: 58.31%; /* Override default behavior */
    }
    .col-sm-8 {
      flex-basis: 66.66666667%; /* Adjust to fit 11 columns */
    }
    .col-xs-9 {
      flex-basis: 75%; /* Override default behavior */
    }
    .col-sm-11 {
      flex-basis: 91.66666667%; /* Adjust to fit 11 columns */
    }
    .col-sm-12 {
      flex-basis: 100%; /* Adjust to fit 11 columns */
    }
  }
 
`;
export const SideBarContainer = styled.div.attrs(() => ({
  className: 'col-1 col-lg-1 col-xl-1  col-xxl-1 col-md-2 col-sm-3 col-xs-3'
}))`
  display: flex;

`;