import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../../theme";
import CustomLoading from "../../../components/CustomLoading";

const SliderContainer = styled.div`
  position: relative;
  width: 500px;
  height: 260px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
  background-color: white;
`;

const LoadingArea = styled.div`
  width: 500px;
  height: 260px;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 500ms ease-in-out;
  transform: translateX(-${(props) => props.$currentIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
`;

const Indicator = styled.button`
  width: ${(props) => (props.$active ? "1.5rem" : "0.5rem")};
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.$active ? "white" : "rgba(255, 255, 255, 0.5)"};
  transition: all 300ms ease-in-out;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$direction === "left" ? "left: 1rem;" : "right: 1rem;")}
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 300ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  width: 500px;
  height: 260px;
  border-radius: 30px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CityImageSlider = ({ city = "seoul" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            city
          )}&image_type=photo&per_page=5&lang=ko`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        const imageUrls = data.hits.map((hit) => hit.webformatURL);
        setImages(imageUrls);
        setError(null);
      } catch (err) {
        setError("Failed to load images");
        setImages(Array(5).fill("/api/placeholder/500/260"));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <SliderContainer>
        <LoadingArea>
          <CustomLoading />
        </LoadingArea>
      </SliderContainer>
    );
  }

  if (error) {
    return <LoadingContainer>{error}</LoadingContainer>;
  }

  return (
    <SliderContainer>
      <SliderWrapper $currentIndex={currentIndex}>
        {images.map((image, index) => (
          <Slide key={index}>
            <Image src={image} alt={`${city} ${index + 1}`} />
          </Slide>
        ))}
      </SliderWrapper>

      <IndicatorWrapper>
        {images.map((_, index) => (
          <Indicator
            key={index}
            $active={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </IndicatorWrapper>

      <NavigationButton
        $direction="left"
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
      >
        ←
      </NavigationButton>
      <NavigationButton
        $direction="right"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
      >
        →
      </NavigationButton>
    </SliderContainer>
  );
};

export default CityImageSlider;
