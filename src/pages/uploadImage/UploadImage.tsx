import React, { useState } from 'react';
import * as styles from './UploadImage.css';

const UploadImage = () => {
  const [image, setImage] = useState<File>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return; // file 없으면 early return
    setImage(file[0]);
  };

  return (
    <>
      <div className={styles.image_container}>
        {!image ? (
          <div className={styles.button_container}>
            이미지 업로드하기
            <input
              className={styles.file_input}
              type="file"
              accept=".png, .jpeg, .jpg, .webp, .heic, .heif"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <img className={styles.image} src={URL.createObjectURL(image)} alt="추억 이미지" />
        )}
      </div>
    </>
  );
};

export default UploadImage;
