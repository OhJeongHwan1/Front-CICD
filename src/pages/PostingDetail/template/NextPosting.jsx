import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { useNavigate } from "react-router";

const NextPostingContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 100px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${({ $isdisabled }) =>
    $isdisabled ? theme.colors.neutral50 : theme.colors.neutral100};
  cursor: ${({ $isdisabled }) => ($isdisabled ? "" : "pointer")};
  transition: 200ms;

  &:hover {
    background-color: ${({ $isdisabled }) =>
      $isdisabled ? theme.colors.neutral50 : theme.colors.neutral200};
  }
`;

const Hint = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
  color: ${({ $isdisabled }) =>
    $isdisabled ? theme.colors.neutral400 : theme.colors.neutral700};
  width: 110px;
  display: flex;
  justify-content: ${({ $isdisabled }) => ($isdisabled ? "center" : "start")};
`;

const Title = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $isdisabled }) =>
    $isdisabled ? theme.colors.neutral400 : theme.colors.neutral700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 110px;
`;

const IconLeft = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  left: 4px;
`;

const IconRight = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 4px;
`;

const NextPosting = ({ isDisabled, isNext, postingId, postingTitle }) => {
  const navigate = useNavigate();

  const goToPrevPage = () => {
    navigate(`/posting/detail/${parseInt(postingId) + 1}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const goToNextPage = () => {
    navigate(`/posting/detail/${parseInt(postingId) - 1}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const onClick = () => {
    if (!isDisabled) {
      if (isNext) goToPrevPage();
      else goToNextPage();
    }
  };

  return (
    <NextPostingContainer $isdisabled={isDisabled} onClick={onClick}>
      <Hint $isdisabled={isDisabled}>
        {isDisabled === true
          ? isNext === true
            ? "마지막 포스팅"
            : "첫 포스팅"
          : isNext === true
          ? "다음 포스팅"
          : "이전 포스팅"}
      </Hint>
      <Title $isdisabled={isDisabled}>
        {isDisabled === true ? "" : postingTitle}
      </Title>
      {!isDisabled &&
        (isNext ? (
          <IconRight>
            <DynamicSVG
              svgUrl="/arrow-right.svg"
              color={theme.colors.neutral400}
              width={20}
              height={20}
            />
          </IconRight>
        ) : (
          <IconLeft>
            <DynamicSVG
              svgUrl="/arrow-left.svg"
              color={theme.colors.neutral400}
              width={20}
              height={20}
            />
          </IconLeft>
        ))}
    </NextPostingContainer>
  );
};

export default NextPosting;
