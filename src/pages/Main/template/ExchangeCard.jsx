import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, YAxis, XAxis, Area } from "recharts";
import theme from "../../../theme";
import { convertToKoreanFormat } from "../../../utils/convertTime";

const Container = styled.div`
  width: 420px;
  height: 260px;
  padding: 20px;
  background: white;
  border-radius: ${theme.borderRadius.md};
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  font-size: ${theme.fontSizes.h4};
  color: ${theme.colors.neutral700};
  font-weight: ${theme.fontWeight.header};
  margin-bottom: 4px;
`;

const DateText = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.neutral400};
  font-weight: ${theme.fontWeight.light};
`;

const Label = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.neutral700};
  font-weight: ${theme.fontWeight.light};
`;

const Rate = styled.div`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.neutral700};
  font-weight: ${theme.fontWeight.light};
  margin-bottom: 16px;
`;

const ChartWrapper = styled.div`
  height: 60px;
  margin-top: 8px;
`;

const LoadingState = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const ErrorState = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 20px;
`;

const nationToCurrency = {
  kr: "KRW",
  jp: "JPY",
  th: "THB",
  vn: "VND",
  ph: "PHP",
  my: "MYR",
  uk: "GBP",
  ch: "CHF",
  es: "EUR",
  cz: "CZK",
  fr: "EUR",
  hu: "HUF",
  pt: "EUR",
  at: "EUR",
  us: "USD",
  ca: "CAD",
  au: "AUD",
  nz: "NZD",
};

const getCurrencyName = (currency) => {
  const currencyNames = {
    KRW: "대한민국 원",
    JPY: "일본 엔",
    THB: "태국 바트",
    VND: "베트남 동",
    PHP: "필리핀 페소",
    MYR: "말레이시아 링깃",
    GBP: "영국 파운드",
    CHF: "스위스 프랑",
    EUR: "유로",
    CZK: "체코 코루나",
    HUF: "헝가리 포린트",
    USD: "미국 달러",
    CAD: "캐나다 달러",
    AUD: "호주 달러",
    NZD: "뉴질랜드 달러",
  };
  return currencyNames[currency] || currency;
};

const ExchangeRate = ({ nationCode = "us" }) => {
  const [exchangeData, setExchangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currency =
    nationCode === "kr" ? "USD" : nationToCurrency[nationCode] || "USD";
  const isKorea = nationCode === "kr";

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 13);

  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  useEffect(() => {
    const fetchExchangeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fromCurrency = isKorea ? "KRW" : currency;
        const toCurrency = isKorea ? "USD" : "KRW";

        const response = await fetch(
          `https://api.frankfurter.app/${formattedStartDate}..${formattedEndDate}?from=${fromCurrency}&to=${toCurrency}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate data");
        }

        const data = await response.json();

        if (data && data.rates) {
          const ratesArray = Object.entries(data.rates).map(
            ([date, rates]) => ({
              date: date.slice(5),
              rate: isKorea ? rates.USD : rates.KRW,
            })
          );

          // 첫날 값을 기준으로 상대적 변화율 계산
          const baseRate = ratesArray[0].rate;
          const formattedData = ratesArray.map((item) => ({
            date: item.date,
            rate: item.rate,
            relativeChange: ((item.rate - baseRate) / baseRate) * 100, // 변화율
          }));

          setExchangeData(formattedData);
        } else {
          setExchangeData([]);
        }
      } catch (err) {
        setError("환율 정보를 가져오는데 실패했습니다.");
        console.error("Error fetching exchange data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeData();
  }, [currency, isKorea]);

  const CustomizedDot = (props) => {
    const { cx, cy, index, data } = props;
    if (!data || !Array.isArray(data)) return null;
    if (index === data.length - 1) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill={theme.colors.primary}
          stroke="white"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Container>
        <LoadingState>환율 정보를 불러오는 중...</LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState>{error}</ErrorState>
      </Container>
    );
  }

  const currentRate = exchangeData[exchangeData.length - 1]?.rate;
  const currentChange = exchangeData[exchangeData.length - 1]?.relativeChange;

  return (
    <Container>
      <HeaderArea>
        <Header>환율</Header>
        <DateText> {convertToKoreanFormat(formattedEndDate)} 기준</DateText>
      </HeaderArea>
      <Label>
        {isKorea ? "1,000 대한민국 원 =" : `1 ${getCurrencyName(currency)} =`}
      </Label>
      <Rate>
        {isKorea
          ? `${(currentRate * 1000)?.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })} USD`
          : `${currentRate?.toLocaleString()} 원`}
        <span
          style={{
            fontSize: "14px",
            color: currentChange > 0 ? theme.colors.error : theme.colors.info,
            marginLeft: "8px",
          }}
        >
          {currentChange > 0 ? "▲" : "▼"} {Math.abs(currentChange).toFixed(2)}%
        </span>
      </Rate>
      <ChartWrapper>
        {exchangeData && exchangeData.length > 0 && (
          <LineChart width={380} height={60} data={exchangeData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="relativeChange"
              stroke="none"
              fill="url(#colorGradient)"
            />
            <Line
              type="monotone"
              dataKey="relativeChange"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="relativeChange"
              stroke="none"
              dot={<CustomizedDot />}
            />
            <YAxis
              hide={true}
              domain={[
                (dataMin) => Math.floor(Math.min(0, dataMin)),
                (dataMax) => Math.ceil(Math.max(0, dataMax)),
              ]}
            />
            <XAxis hide={true} />
          </LineChart>
        )}
      </ChartWrapper>
    </Container>
  );
};

export default ExchangeRate;
