import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  .toastui-editor-defaultUI {
    border: none;
  }

  .toastui-editor-main {
    min-height: 300px;
    height: auto !important;
  }

  .ProseMirror {
    min-height: 300px;
    height: auto !important;
    padding: 20px;
  }

  .toastui-editor-toolbar {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  .toastui-editor-toolbar-icons {
    border: none;
    &:hover {
      background-color: #e9ecef;
    }
  }

  .toastui-editor-contents {
    font-size: 16px;
    margin: 30px 80px 80px 80px;
    padding: 0 0 80px 0;

    p {
      line-height: 1.6;
    }
  }

  .toastui-editor-defaultUI-toolbar {
    position: sticky;
    top: 0;
    background-color: white;
  }
`;

const CustomEditor = ({ onSave }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

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

      // 현재 커서 위치가 viewport 하단에서 버튼 높이(80px)를 뺀 위치보다 아래에 있는지 확인
      const bottomThreshold = window.innerHeight - 80;

      if (rect.bottom > bottomThreshold) {
        // 커서가 버튼에 가려질 경우, 커서 위치가 viewport 중간에 오도록 스크롤
        const scrollBy = rect.bottom - bottomThreshold + 100; // 여유 공간 100px 추가
        window.scrollBy({
          top: scrollBy,
          behavior: "smooth",
        });
      }
    });
  }, []);

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <EditorContainer ref={containerRef}>
      <Editor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        useCommandShortcut={true}
        autofocus={false}
        placeholder="내용을 입력해주세요"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr"],
          ["ul", "ol"],
          ["image"],
        ]}
      />
    </EditorContainer>
  );
};

export default CustomEditor;
