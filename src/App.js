import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ServiceBox, Wrapper, SectionHeader, SectionSubtitle } from "./styles";
import "./style.css";
import ConnectedCard from "./ConnectedCard";
import GameManager from "./GameManager";
import CardMaker from "./CardMaker";

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
      color: white;
      :active,
      :visited,
      :hover {
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
          <Toggleable
            onClick={() => this.setState({ open: false })}
            visible={this.state.open}
            to='/game'
          >
            Game
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

  nextSlide = () =>
    this.setState({
      imageTurn:
        this.state.maxSlides - 1 === this.state.imageTurn
          ? 0
          : this.state.imageTurn + 1,
    });

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
          src={"img/stock" + (index + 1) + ".jpg"}
        />
      );
    }
    return (
      <SlideShowWrapper>
        {arr.map(e => {
          return e;
        })}
      </SlideShowWrapper>
    );
  };
  componentDidMount() {
    const slideLoop = setInterval(() => {
      this.nextSlide();
    }, 1500);
  }
  render() {
    return this.kittens(this.state.maxSlides + 1);
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Header = styled(SectionHeader)`
      border-bottom: solid 1px black;
      color: rgb(219, 200, 190);
      font-size: 2rem;
    `;
    return (
      <div>
        <Wrapper>
          <Header>Potter's Math</Header>
          <SectionHeader>Potter's Math</SectionHeader>
          <SectionSubtitle>Subtitle</SectionSubtitle>
          <SlideShow />
        </Wrapper>
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

class FooterElement extends React.Component {
  render() {
    const FooterLinks = styled.div`
      > a,
      a:visited {
        color: white;
      }
      i {
        padding: 0 1rem;
      }
    `;
    return (
      <Footer>
        <FooterLinks>
          <a href='mailto:javierjevf@gmail.com'>
            <i class='fa fa-envelope' aria-hidden='true' />
            javierjevf@gmail.com
          </a>
        </FooterLinks>

        <FooterLinks>
          <i class='fas fa-phone    ' />
          55 1007 1736
        </FooterLinks>
        <FooterLinks>
          <a
            href='https://wa.me/5215510071736/?text=Im%20inquiring%20about%20the%20apartment%20listing'
            target='_blank'
          >
            <i class='fab fa-whatsapp' />
          </a>
        </FooterLinks>
      </Footer>
    );
  }
}

class WrappedApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Route path='/' exact={false} component={Nav} />
        <Route path='/' exact={true} component={Home} />
        <Route path='/servicios' exact={true} component={Services} />
        <Route path='/' exact={false} component={FooterElement} />
        <Route path='/card' exact={true} component={ConnectedCard} />
        <Route path='/game' exact={true} component={GameManager} />
        <Route path='/maker' exact={true} component={CardMaker} />
      </Router>
    );
  }
}

let mapStateToProps = st => {
  return {
    counter: st.counter,
  };
};

const mapDispatchToProps = dispatch => ({
  handlePriceChange: evt =>
    dispatch({ type: "SET_PRICE", price: evt.target.value }),
});

let Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedApp);

class App extends React.Component {
  render() {
    return <Main />;
  }
}

export default App;
