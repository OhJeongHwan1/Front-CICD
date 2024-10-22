import React, { useState, useRef, useCallback } from "react";

const CustomEditor = ({ onSave }) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  // 텍스트 서식 지정
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    const updatedContent = editorRef.current.innerHTML;
    setContent(updatedContent);
  };

  // 색상 변경
  const handleColorChange = (e) => {
    formatText("foreColor", e.target.value);
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formatText("insertImage", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 실행 취소/다시 실행 처리
  const handleUndo = () => formatText("undo");
  const handleRedo = () => formatText("redo");

  // 이미지 드래그 앤 드롭 처리
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formatText("insertImage", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* 툴바 */}
      <div className="px-6 py-2 border-y">
        <div className="flex gap-2 items-center flex-wrap">
          {/* 기본 서식 버튼 */}
          <div className="flex gap-2 border-r pr-2">
            <button
              onClick={() => formatText("bold")}
              className="p-2 hover:bg-gray-100 rounded font-bold"
              title="굵게"
            >
              B
            </button>
            <button
              onClick={() => formatText("italic")}
              className="p-2 hover:bg-gray-100 rounded italic"
              title="기울임"
            >
              I
            </button>
            <button
              onClick={() => formatText("underline")}
              className="p-2 hover:bg-gray-100 rounded underline"
              title="밑줄"
            >
              U
            </button>
          </div>

          {/* 실행 취소/다시 실행 */}
          <div className="flex gap-2 border-r pr-2">
            <button
              onClick={handleUndo}
              className="p-2 hover:bg-gray-100 rounded"
              title="실행 취소"
            >
              UNDO
            </button>
            <button
              onClick={handleRedo}
              className="p-2 hover:bg-gray-100 rounded"
              title="다시 실행"
            >
              REDO
            </button>
          </div>

          {/* 이미지 업로드 */}
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded flex items-center gap-1"
              title="이미지 삽입"
            >
              IMAGE
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div
        ref={editorRef}
        contentEditable
        className="px-6 py-4 min-h-[calc(100vh-200px)] outline-none"
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        placeholder="글을 입력해주세요."
      />
    </div>
  );
};

export default CustomEditor;
