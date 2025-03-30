// src/components/Header.js

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import mergeImages from 'merge-images-v2';
import gifshot from 'gifshot';
import styles from './Header.module.css';

function Header({ onInputSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // 엔터키 감지
  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
      onInputSubmit(inputValue);
      console.log("inputValue:", inputValue);
    }
  };

  const handleSave = () => {
    const targetElement = document.querySelector(".user-container"); // 캡처 대상 요소

    if (!targetElement) {
      console.error("user-container 클래스를 찾을 수 없습니다.");
      return;
    }

    // Step 1: HTML -> Canvas로 변환
    html2canvas(targetElement, { useCORS: true })
        .then((canvas) => {
          const canvasImage = canvas.toDataURL("image/png");

          // Step 2: merge-images로 이미지 병합 (여기서는 단순히 한 이미지를 사용)
          // 필요한 경우 여러 이미지를 병합하도록 확장 가능
          return mergeImages([canvasImage]); // 병합된 이미지를 반환
        })
        .then((mergedImage) => {
          // Step 3: gifshot을 이용해 GIF로 변환
          gifshot.createGIF(
              {
                images: [mergedImage, mergedImage], // 병합된 이미지를 GIF의 각 프레임으로 사용
                gifWidth: 500,
                gifHeight: 500,
                numFrames: 2, // GIF 프레임 수
                frameDuration: 1, // 프레임 간 시간 간격 (초 단위)
              },
              (obj) => {
                if (!obj.error) {
                  // Step 4: GIF 다운로드
                  const gifUrl = obj.image;
                  const link = document.createElement("a");
                  link.href = gifUrl;
                  link.download = "output.gif";
                  link.click();
                } else {
                  console.error("GIF 생성 에러:", obj.error);
                }
              }
          );
        })
        .catch((error) => {
          console.error("캔버스 변환 실패:", error);
        });
  };


  return (
      <header className={styles.headerContainer}>
        <div className={styles.headerTop}>
          <h1 className={styles.headerTitle}>나의 멋진 웹사이트???</h1>
          <input
            type="text"
            className={styles.headerInput}
            placeholder="검색어를 입력하세요..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.saveButton} onClick={handleSave}> 저장</button>
        </div>
      </header>
  );
}

export default Header;
