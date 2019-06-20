import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Navbar,
  ServiceBox,
  Wrapper,
  SectionHeader,
  Toggleable,
  navLinks,
} from "./styles";
import "./style.css";

const data = {
  services: [
    {
      name: "Matemáticas para secundaria",
      price: 200,
      picture: "https://placekitten.com/g/300/301",
      link: "#",
    },
    {
      name: "Matemáticas para prepa",
      price: 200,
      picture: "https://placekitten.com/g/300/300",
      link: "#",
    },
    {
      name: "Matemáticas para prepa",
      price: 200,
      picture: "https://placekitten.com/g/300/302",
      link: "#",
    },
  ],
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  render() {
    const Navbar = styled.nav`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: ${this.state.open ? "100vh" : "auto"};
      font-size: 2rem;
      position: fixed;
      margin: 0;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgb(219, 200, 190);
      > i {
        color: ${this.state.open ? "white" : "black"};
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
      }
    `;
    const NavLinkWrap = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 100%;
    `;

    const Toggleable = styled(Link)`
      display: ${props => (props.visible ? "block" : "none")};
      padding: 2rem 0;
      text-decoration: none;
      :active,
      :visited {
        color: white;
      }
    `;
    return (
      <Navbar className='trans1'>
        <NavLinkWrap>
          <Toggleable
            onClick={() => this.setState({ open: false })}
            visible={this.state.open}
            to='/'
          >
            Inicio
          </Toggleable>
          <Toggleable
            onClick={() => this.setState({ open: false })}
            visible={this.state.open}
            to='/servicios'
          >
            Servicios
          </Toggleable>
        </NavLinkWrap>
        <i
          onClick={() => this.setState({ open: !this.state.open })}
          className='fas fa-bars    '
        />
      </Navbar>
    );
  }
}

class Service extends React.Component {
  render() {
    const allServices = data.services.map(service => {
      return (
        <ServiceBox>
          <img src={service.picture} />
          <div>{service.name}</div>
          <div>{service.price}</div>
          <div>{service.link}</div>
        </ServiceBox>
      );
    });
    return allServices;
  }
}

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageTurn: 0, maxSlides: 5 };
  }
  kittens = i => {
    const SlideShowWrapper = styled.div`
      padding: 3rem 0;
      width: 100%;
    `;
    const Img = styled.img`
      width: 100%;
      max-height: 450px;
      object-fit: cover;
      display: ${props => (props.visible ? "block" : "none")};
      filter: opacity(${props => (props.visible ? 1 : 0)});
    `;
    const TestButton = styled.button`
      position: absolute;
      z-index: 9999;
    `;
    let arr = [];
    for (let index = 0; index < i; index++) {
      arr.push(
        <Img
          id={index}
          visible={this.state.imageTurn === index}
          src={"https://placekitten.com/g/1100/80" + index}
        />
      );
    }
    return (
      <SlideShowWrapper>
        {arr.map(e => {
          return e;
        })}
        <TestButton
          onClick={() =>
            this.setState(
              {
                imageTurn:
                  this.state.maxSlides - 1 === this.state.imageTurn
                    ? 0
                    : this.state.imageTurn + 1,
              },
              console.log(this.state.imageTurn, this.state.maxSlides)
            )
          }
        >
          Click for next image
        </TestButton>
      </SlideShowWrapper>
    );
  };
  render() {
    return this.kittens(this.state.maxSlides + 1);
  }
}

class Home extends React.Component {
  render() {
    const Header = styled(SectionHeader)`
      border-bottom: solid 1px black;
    `;
    return (
      <div>
        <Header>Potter's Math</Header>
        <SlideShow />
      </div>
    );
  }
}

class Services extends React.Component {
  render() {
    return (
      <Wrapper>
        <SectionHeader>Servicios</SectionHeader>
        <Service />
      </Wrapper>
    );
  }
}

const Footer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;

  background: black;
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 1rem;
`;

function FooterElement() {
  return (
    <Footer>
      <div>Tel: 2229887744</div>
      <div>Email</div>
      <div>Social icons</div>
    </Footer>
  );
}

function App() {
  return (
    <Router>
      <Route path='/' exact={false} component={Nav} />
      <Route path='/' exact={true} component={Home} />
      <Route path='/servicios' exact={true} component={Services} />
      <Route path='/' exact={false} component={FooterElement} />
    </Router>
  );
}

export default App;
