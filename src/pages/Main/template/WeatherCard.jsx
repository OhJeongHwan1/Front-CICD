import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../../theme";

export const getWeatherInKorean = (weatherDescription) => {
  const weatherMap = {
    // Thunderstorm group
    "thunderstorm with light rain": "약한 비를 동반한 천둥번개",
    "thunderstorm with rain": "비를 동반한 천둥번개",
    "thunderstorm with heavy rain": "강한 비를 동반한 천둥번개",
    "light thunderstorm": "약한 천둥번개",
    thunderstorm: "천둥번개",
    "heavy thunderstorm": "강한 천둥번개",
    "ragged thunderstorm": "불규칙한 천둥번개",

    // Drizzle group
    "light intensity drizzle": "약한 이슬비",
    drizzle: "이슬비",
    "heavy intensity drizzle": "강한 이슬비",
    "light intensity drizzle rain": "약한 이슬비",
    "drizzle rain": "이슬비",
    "heavy intensity drizzle rain": "강한 이슬비",

    // Rain group
    "light rain": "약한 비",
    "moderate rain": "비",
    "heavy intensity rain": "강한 비",
    "very heavy rain": "매우 강한 비",
    "extreme rain": "극심한 비",
    "freezing rain": "얼어붙는 비",

    // Snow group
    "light snow": "약한 눈",
    snow: "눈",
    "heavy snow": "강한 눈",
    sleet: "진눈깨비",
    "light shower sleet": "약한 진눈깨비",
    "shower sleet": "진눈깨비",

    // Atmosphere group
    mist: "옅은 안개",
    smoke: "연기",
    haze: "실안개",
    fog: "안개",
    dust: "먼지",
    sand: "모래",
    "volcanic ash": "화산재",
    squalls: "돌풍",
    tornado: "토네이도",

    // Clear and Clouds
    "clear sky": "맑음",
    "few clouds": "구름 조금",
    "scattered clouds": "구름 낌",
    "broken clouds": "구름 많음",
    "overcast clouds": "흐림",
  };

  return weatherMap[weatherDescription] || weatherDescription;
};

export const getWeatherIcon = (weatherDescription) => {
  const iconMap = {
    thunderstorm: "thunder",

    drizzle: "rain",
    "light rain": "rain",
    "moderate rain": "rain",
    "heavy intensity rain": "rain",

    snow: "snow",
    sleet: "snow",

    mist: "fog",
    fog: "fog",
    haze: "fog",

    "clear sky": "sun",
    "few clouds": "cloud-sunny",
    "scattered clouds": "cloud",
    "broken clouds": "cloud",
    "overcast clouds": "cloud",
  };

  const iconName = iconMap[weatherDescription] || "default";
  return `/${iconName}.svg`;
};

const Container = styled.div`
  width: 320px;
  padding: 20px;
  background: white;
  border-radius: ${theme.borderRadius.md};
`;

const Label = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const Temperature = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const WeatherInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const ForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const DayForecast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 40px;
`;

const Day = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const DayTemp = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const WeatherDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  word-break: keep-all;
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

const WeatherCard = ({ city = "seoul" }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        // 현재 날씨 설정
        setCurrentWeather({
          temp: Math.round(data.list[0].main.temp),
          humidity: data.list[0].main.humidity,
          description: data.list[0].weather[0].description,
          feelsLike: Math.round(data.list[0].main.feels_like),
        });

        // 3시간 단위의 데이터를 하루 단위로 변환
        const dailyData = data.list
          .filter((item, index) => index % 8 === 0) // 24시간을 3시간으로 나누면 8
          .slice(0, 7) // 7일치 데이터
          .map((item) => {
            const date = new Date(item.dt * 1000);
            const today = new Date();
            let dayLabel;

            if (date.toDateString() === today.toDateString()) {
              dayLabel = "오늘";
            } else {
              const diff = Math.round((date - today) / (1000 * 60 * 60 * 24));
              dayLabel = diff > 0 ? `${diff}일후` : `${Math.abs(diff)}일전`;
            }

            return {
              day: dayLabel,
              temp: Math.round(item.main.temp),
              weather: item.weather[0].description,
            };
          });

        setWeatherData(dailyData);
      } catch (err) {
        setError("날씨 정보를 가져오는데 실패했습니다.");
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return (
      <Container>
        <LoadingState>날씨 정보를 불러오는 중...</LoadingState>
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

  return (
    <Container>
      <Label>날씨</Label>
      <Temperature>
        {currentWeather?.temp}°C
        <span
          style={{
            fontSize: "14px",
            color: "#666",
            marginLeft: "8px",
          }}
        >
          체감 {currentWeather?.feelsLike}°C
        </span>
      </Temperature>
      <WeatherInfo>
        습도: {currentWeather?.humidity}% | {currentWeather?.description}
      </WeatherInfo>
      <ForecastContainer>
        {weatherData.map((day, index) => (
          <DayForecast key={index}>
            <Day>{day.day}</Day>
            <DayTemp>{day.temp}°</DayTemp>
            <WeatherDescription>{day.weather}</WeatherDescription>
          </DayForecast>
        ))}
      </ForecastContainer>
    </Container>
  );
};

export default WeatherCard;
