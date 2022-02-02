import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";



const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: bold;
  padding: 20px 0;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  padding-top: 30px;
  display: block;
  text-align: center;
`;


const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: #2f3640;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 20px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    a {
      color: white;
    }
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}



function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>
         Coins
        </title>
      </Helmet>
      <Header>
        <Title>COINS</Title>

      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} 👉
              </Link>
            </Coin>
          ))}
          ;
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
