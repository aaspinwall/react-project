import styled from "styled-components";
import { Link } from "react-router-dom";
const palette = { background: "black", color: "white" };

const SectionHeader = styled.h3`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 1rem 0;
`;

const SectionSubtitle = styled(SectionHeader)`
  padding: 0;
  margin: 0;
`;

const ServiceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  padding: 3rem 2rem;
  border-top: 1px solid black;

  > div {
    display: flex;
    align-items: center;
  }
  img {
    display: flex;
    height: 10vh;
  }

  :last-child {
    border-bottom: 1px solid black;
  }
`;

const Wrapper = styled.div`
  margin: 0 2rem;
  > input {
    width: 100%;
    height: 2rem;
    border: 2px solid black;
  }
`;

export { ServiceBox, Wrapper, SectionHeader, SectionSubtitle };
