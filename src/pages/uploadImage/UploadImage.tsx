import React, { useState } from 'react';
import * as styles from './UploadImage.css';

const UploadImage = () => {
  const [image, setImage] = useState<File>();
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_container}>
          {!image ? (
            <div className={styles.button_container}>
              이미지 업로드하기
              <input
                className={styles.file_input}
                type="file"
                accept=".png, .jpeg, .jpg, .webp, .heic, .heif"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <img
              className={styles.image}
              src={URL.createObjectURL(image)}
              alt="업로드 이미지"
            />
          )}
        </div>

        {image && (
          <div className={styles.metadata}>
            <p><strong>파일 이름:</strong> {image.name}</p>
            <p><strong>파일 타입:</strong> {image.type}</p>
            <p><strong>파일 크기:</strong> {(image.size / 1024).toFixed(2)} KB</p>
            {dimensions && (
              <p><strong>이미지 크기:</strong> {dimensions.width} x {dimensions.height}px</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
