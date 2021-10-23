
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Chat from './component/Chat';

import Header from './component/Header';
import Loader from './component/Loader';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // add 1s timeout
    setTimeout(() => {
      setLoading(false)
    }, 800)

    console.log("sent")
  }, [])

  return (
    <StyledApp>
      {
        loading ?
        <Loader />:
        <div className="wrapper">
          <Header />
          <Chat />
        </div>
      }
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.section`
  background-color: #fafafa;
  height: 100vh;
  width: 100%;
  max-width: 100vw;

  .wrapper {
    width: 100%;
    max-width: 500px;
    background: #fff;
    margin: 0 auto;
    height: 100vh;
  }
`;