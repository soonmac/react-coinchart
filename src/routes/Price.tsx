import { useState } from "react";
import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const TodayPrice = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  background-color: ${(props) => props.theme.bgColor2};
  border-radius: 10px;
  padding: 20px;
`;
const Text = styled.span<{ isPositive: boolean }>`
  color: ${(props) => (props.isPositive ? `#00b894` : `#ff7675`)};
`;

function plusMinus(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <Container>
          <TodayPrice>
            <Text
              isPositive={
                plusMinus(data?.quotes.USD.market_cap_change_24h) === true
              }
            >
              {plusMinus(data?.quotes.USD.market_cap_change_24h) === true
                ? "▲ "
                : "▼ "}
              {data?.quotes.USD.price}
            </Text>
          </TodayPrice>
          <span>
            전일대비:
            <Text
              isPositive={
                plusMinus(data?.quotes.USD.market_cap_change_24h) === true
              }
            >
              {plusMinus(data?.quotes.USD.market_cap_change_24h) === true
                ? "▲ "
                : "▼ "}
              {data?.quotes.USD.market_cap_change_24h}%
            </Text>
          </span>
          <div>
            기준:
            {data?.quotes.USD.ath_date}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Price;
