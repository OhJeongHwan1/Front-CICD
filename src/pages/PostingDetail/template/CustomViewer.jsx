import React from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";
import theme from "../../../theme";

const ViewerContainer = styled.div`
  .toastui-editor-contents {
    font-size: 16px;
    margin: 30px 80px 40px 60px;
    padding: 0 0 40px 0;

    p {
      line-height: 1.6;
      color: ${theme.colors.neutral900};
    }

    // 헤딩 스타일
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.colors.neutral900};
      margin: 24px 0 12px 0;
      line-height: 1.4;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
    }
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
    h3 {
      font-size: 20px;
      font-weight: 600;
    }
    h4 {
      font-size: 18px;
      font-weight: 600;
    }

    // 리스트 스타일
    ul,
    ol {
      padding-left: 24px;
      margin: 12px 0;

      li {
        margin: 6px 0;
        line-height: 1.6;
      }
    }

    // 인용구 스타일
    blockquote {
      margin: 16px 0;
      padding: 12px 20px;
      border-left: 4px solid ${theme.colors.neutral300};
      background: ${theme.colors.neutral100};
      color: ${theme.colors.neutral700};
    }

    // 링크 스타일
    a {
      color: ${theme.colors.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    // 이미지 스타일
    img {
      max-width: 100%;
      margin: 16px 0;
      border-radius: 8px;
    }

    // 코드 블록 스타일
    pre {
      margin: 16px 0;
      padding: 16px;
      background: ${theme.colors.neutral100};
      border-radius: 8px;
      overflow-x: auto;

      code {
        font-family: monospace;
        color: ${theme.colors.neutral900};
      }
    }

    // 인라인 코드 스타일
    code {
      background: ${theme.colors.neutral100};
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 14px;
    }

    // 수평선 스타일
    hr {
      border: none;
      border-top: 1px solid ${theme.colors.neutral200};
      margin: 24px 0;
    }

    // 테이블 스타일
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;

      th,
      td {
        border: 1px solid ${theme.colors.neutral200};
        padding: 12px;
        text-align: left;
      }

      th {
        background: ${theme.colors.neutral100};
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: ${theme.colors.neutral50};
      }
    }
  }
`;

const CustomViewer = ({ content }) => {
  return (
    <ViewerContainer>
      <Viewer initialValue={content} useCommandShortcut={false} />
    </ViewerContainer>
  );
};

export default CustomViewer;
