import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ServiceBox, Wrapper, SectionHeader, SectionSubtitle } from "./styles";
import "./style.css";
import data from "./data";
import GameManager from "./GameManager";
import CardMaker from "./CardMaker";
import { save, load } from "./localStorage";

if (load() === null) {
  save(data);
  console.log("No local storage found, initial data saved");
}
var storedData = load();

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
            Home
          </Toggleable>
          <Toggleable
            onClick={() => this.setState({ open: false })}
            visible={this.state.open}
            to='/'
          >
            Search
          </Toggleable>
          <Toggleable
            onClick={() => this.setState({ open: false })}
            visible={this.state.open}
            to='/maker'
          >
            Create deck
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

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const game = Object.keys(storedData);
    const Header = styled(SectionHeader)`
      border-bottom: solid 1px black;
      color: rgb(219, 200, 190);
      font-size: 2rem;
    `;
    return (
      <Wrapper>
        {game.map(game => {
          let name = storedData[game].name;
          return (
            <div>
              <h4>{name}</h4>
              <Link to={"/game/" + game}>Play</Link>
            </div>
          );
        })}
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
function Config() {
  return (
    <div>
      <button
        onClick={() => {
          save(data);
          load();
          console.log(storedData);
        }}
      >
        Reset local storage
      </button>
    </div>
  );
}

function RouteGameById(props) {
  console.log(props);
  return storedData[props.id] ? (
    <GameManager routerProps={props} data={storedData[props.id]} />
  ) : (
    <div>No matching game</div>
  );
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
        <Route path='/' exact={false} component={FooterElement} />
        <Route path='/maker' exact={true} component={CardMaker} />
        <Route path='/config' exact={true} render={Config} />
        <Route
          path='/game/:id'
          exact={true}
          render={routeProps => (
            <RouteGameById id={routeProps.match.params.id} />
          )}
        />
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

export { App, storedData };
