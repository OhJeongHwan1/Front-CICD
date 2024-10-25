import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";
import theme from "../../../theme";
import axios from "axios";

const EditorContainer = styled.div`
  .toastui-editor-defaultUI {
    border: none;
  }

  // 탭 메뉴 스타일링
  .toastui-editor-md-tab-container {
    border-top: 0px solid black;
    border-bottom: 0px solid black;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    margin: 0;
    height: 40px;
    gap: 8px;

    .toastui-editor-tabs {
      position: relative;
      display: flex;
      align-items: center;
      background: ${theme.colors.neutral200};
      padding: 4px;
      margin: 0;
      border-radius: 20px;
      width: 160px;

      .sliding-background {
        position: absolute;
        width: calc(50% - 4px);
        height: calc(100% - 8px);
        background: ${theme.colors.neutral700};
        border-radius: 16px;
        transition: transform 0.3s ease;
        top: 4px;
        left: 4px;
      }

      // Preview 탭이 선택되었을 때 (두번째 탭)
      .tab-item:nth-child(2)[aria-selected="true"] ~ .sliding-background {
        transform: translateX(100%);
      }

      .tab-item {
        position: relative;
        z-index: 1;
        width: calc(50%);
        height: 30px;
        padding: 0;
        margin: 0;
        font-size: 14px;
        color: ${theme.colors.neutral700};
        border: none;
        background: transparent;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &[aria-selected="true"] {
          color: ${theme.colors.white};
          font-weight: 600;
        }
      }
    }
  }

  // 편집 영역 스타일링
  .toastui-editor-md-container {
    padding: 0;
    .toastui-editor {
      background-color: white;
      padding: 30px 60px;
      font-size: 16px;
      color: ${theme.colors.neutral900};
    }
  }

  .toastui-editor-main {
    min-height: 260px;
    height: auto !important;
  }

  .ProseMirror {
    min-height: 260px;
    height: auto !important;
    padding: 20px;
  }

  .toastui-editor-tooltip {
    display: none !important;
  }

  // 툴바 기본 스타일
  .toastui-editor-toolbar {
    height: 64px;
    border-top: 1px solid ${theme.colors.neutral200};
    border-bottom: 1px solid ${theme.colors.neutral200};
    padding: 0px 80px;
    display: flex;
    align-items: center;
  }

  .toastui-editor-toolbar-group {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px; // 아이콘 간 간격
    margin: 0;
    border: none !important;

    // 구분선이 있는 그룹
    & + .toastui-editor-toolbar-group {
      border-left: 0px solid ${theme.colors.neutral200};
      margin-left: 8px;
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 6px;
      width: 40px;
      height: 32px;
      background: ${theme.colors.neutral200};
      border-radius: 10px;
    }

    &:nth-child(2)::after {
      width: 92px;
    }

    .toastui-editor-toolbar-divider {
      margin: 0;
      padding: 0;
      width: 0;
    }
  }

  // hover 효과 제거 및 커스텀 아이콘 스타일링
  .toastui-editor-toolbar-icons {
    border: none;
    width: 40px !important;
    height: 32px !important;
    margin: 0;
    background-image: none !important;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    // 커스텀 hover 효과
    &:hover {
      background-color: ${theme.colors.neutral300} !important;
      border-radius: 10px;
    }

    &.te-toolbar-state-active {
      background-color: ${theme.colors.neutral700} !important;
      border-radius: 10px;

      &::before {
        opacity: 1;
        filter: brightness(0.8);
      }
    }
  }

  // 각 툴바 아이콘 커스터마이징
  .toastui-editor-toolbar-icons.heading {
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("/smallcaps.svg") no-repeat center;
      background-size: contain;
    }
  }

  .toastui-editor-toolbar-icons.hrline {
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("/minus.svg") no-repeat center;
      background-size: contain;
    }
  }

  .toastui-editor-toolbar-icons.bold {
    &.active {
      background-color: ${theme.colors.neutral700} !important;
      border-radius: 10px;

      &::before {
        opacity: 1;
        filter: brightness(0.8);
        background: url("/text-bold-white.svg") no-repeat center;
      }
    }

    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("/text-bold.svg") no-repeat center;
      background-size: contain;
    }
  }

  .toastui-editor-toolbar-icons.italic {
    &.active {
      background-color: ${theme.colors.neutral700} !important;
      border-radius: 10px;

      &::before {
        opacity: 1;
        filter: brightness(0.8);
        background: url("/text-italic-white.svg") no-repeat center;
      }
    }

    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("/text-italic.svg") no-repeat center;
      background-size: contain;
    }
  }

  .toastui-editor-toolbar-icons.image {
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: url("/image.svg") no-repeat center;
      background-size: contain;
    }
  }

  .toastui-editor-contents {
    font-size: 16px;
    margin: 30px 80px 80px 60px;
    padding: 0 0 80px 0;

    p {
      line-height: 1.6;
    }
  }

  .toastui-editor-defaultUI-toolbar {
    position: sticky;
    top: 0;
    background-color: white;
    padding: 0;
    border: none;
  }

  /* 이미지 업로드 팝업 스타일링 */
  .toastui-editor-popup {
    background: white;
    border: 1px solid ${theme.colors.neutral200};
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

    // 팝업 헤더
    .toastui-editor-popup-header {
      padding: 16px;
      border-bottom: 1px solid ${theme.colors.neutral200};
    }

    // 팝업 내용
    .toastui-editor-popup-body {
      padding: 16px;
    }

    // 탭 스타일링
    .toastui-editor-tabs {
      margin-bottom: 16px;

      .tab-item {
        padding: 8px 16px;
        color: ${theme.colors.neutral600};

        &.active {
          color: ${theme.colors.primary};
          border-bottom: 2px solid ${theme.colors.primary};
        }
      }
    }

    // 입력 필드
    .toastui-editor-input-wrapper {
      margin-bottom: 16px;

      input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid ${theme.colors.neutral300};
        border-radius: 4px;

        &:focus {
          outline: none;
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 2px ${theme.colors.primary}20;
        }
      }
    }

    // 버튼
    button {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;

      &.close {
        background: ${theme.colors.neutral100};
        color: ${theme.colors.neutral700};
      }

      &.ok {
        background: ${theme.colors.primary};
        color: white;
        margin-left: 8px;
      }
    }
  }
`;

const CustomEditor = ({ setContent }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 탭 컨테이너에 슬라이딩 배경 요소 추가
    const tabsContainer = document.querySelector(".toastui-editor-tabs");
    if (tabsContainer && !tabsContainer.querySelector(".sliding-background")) {
      const slidingBackground = document.createElement("div");
      slidingBackground.className = "sliding-background";
      tabsContainer.appendChild(slidingBackground);
    }
  }, []);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();

    // 에디터 변경 이벤트 감지
    editorInstance.on("change", () => {
      const editorEl = containerRef.current.querySelector(".ProseMirror");
      if (!editorEl) return;

      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const bottomThreshold = window.innerHeight - 90;

      if (rect.bottom > bottomThreshold) {
        const scrollBy = rect.bottom - bottomThreshold + 100;
        window.scrollBy({
          top: scrollBy,
          behavior: "smooth",
        });
      }
    });
  }, []);

  // 에디터 변경 이벤트
  useEffect(() => {
    editorRef.current?.getInstance().on("change", () => {
      const markdown = editorRef.current?.getInstance().getMarkdown();
      setContent(markdown);
    });
  }, [setContent]);

  // 이미지 업로드
  const uploadImage = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("images", blob);

      const response = await axios.post(
        "http://haneol-test.kro.kr/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // 서버에서 반환하는 URL 구조에 맞게 수정
    } catch (error) {
      console.error("업로드 실패:", error);
      return null;
    }
  };

  return (
    <EditorContainer ref={containerRef}>
      <Editor
        ref={editorRef}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const imageUrl = await uploadImage(blob);
            if (imageUrl) {
              callback(imageUrl, "이미지");
            }
          },
        }}
        initialValue=""
        previewStyle="tab"
        initialEditType="markdown"
        hideModeSwitch={true}
        useCommandShortcut={true}
        autofocus={false}
        placeholder="내용을 입력하세요"
        toolbarItems={[["heading"], ["bold", "italic"], ["hr"], ["image"]]}
      />
    </EditorContainer>
  );
};

export default CustomEditor;
