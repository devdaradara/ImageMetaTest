import { parse } from 'exifr';
import React, { useRef, useState } from 'react';
import { exifFieldSections } from './exifFields';
import * as styles from './UploadImage.css';

type ExifData = Awaited<ReturnType<typeof parse>>;

const UploadImage = () => {
  const [image, setImage] = useState<File>();
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      const data = await parse(file);
      setExifData(data);

      // 초기에는 모든 섹션 닫힘
      const initialOpen: Record<string, boolean> = {};
      exifFieldSections.forEach((section) => {
        initialOpen[section.title] = false;
      });
      setOpenSections(initialOpen);
    } catch (err) {
      console.error('EXIF 파싱 오류:', err);
      setExifData(null);
    }
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const renderFieldsWithToggle = (
    title: string,
    fields: [keyof ExifData, string][]
  ) => {
    if (!exifData) return null;

    const filtered = fields.filter(([key]) => exifData[key] !== undefined);
    if (filtered.length === 0) return null;

    const isOpen = openSections[title];

    return (
      <div className={styles.section}>
        <button
          onClick={() => toggleSection(title)}
          className={styles.sectionTitle}
        >
          {isOpen ? '▼' : '▶'} {title}
        </button>
        {isOpen && (
          <ul className={styles.ul}>
            {filtered.map(([key, label]) => (
              <li className={styles.li} key={String(key)}>
                <strong>{label}:</strong> {exifData[key]?.toString() ?? '없음'}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        {!image ? (
          <div className={styles.button_container}>
            이미지 업로드하기
            <input
              ref={fileInputRef}
              className={styles.file_input}
              type="file"
              accept=".jpg, .jpeg, .heic, .tiff, .png, .webp"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <>
            <img
              className={styles.image}
              src={URL.createObjectURL(image)}
              alt="업로드 이미지"
              onClick={() => fileInputRef.current?.click()}
              title="이미지를 클릭하면 다시 업로드할 수 있어요"
              style={{ cursor: 'pointer' }}
            />
            <input
              ref={fileInputRef}
              className={styles.file_input}
              type="file"
              accept=".jpg, .jpeg, .heic, .tiff, .png, .webp"
              onChange={handleImageUpload}
            />
          </>
        )}
      </div>

      {image && (
        <div className={styles.metadata}>
          <div className={styles.section}>
            <p><strong>파일 이름:</strong> {image.name}</p>
            <p><strong>파일 타입:</strong> {image.type}</p>
            <p><strong>파일 크기:</strong> {(image.size / 1024).toFixed(2)} KB</p>
            {dimensions && (
              <p><strong>이미지 크기:</strong> {dimensions.width} x {dimensions.height}px</p>
            )}
          </div>

          {exifData &&
            exifFieldSections.map((section) =>
              renderFieldsWithToggle(section.title, section.fields)
            )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
