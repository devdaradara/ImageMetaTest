import { parse } from 'exifr';
import React, { useState } from 'react';
import * as styles from './UploadImage.css';

type ExifData = Awaited<ReturnType<typeof parse>>;

const UploadImage = () => {
  const [image, setImage] = useState<File>();
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);

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
    } catch (err) {
      console.error('EXIF 파싱 오류:', err);
      setExifData(null);
    }
  };

  const renderFields = (title: string, fields: [keyof ExifData, string][]) => {
    if (!exifData) return null;

    const filtered = fields.filter(([key]) => exifData[key] !== undefined);

    if (filtered.length === 0) return null;

    return (
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>{title}</h4>
        <ul className={styles.ul}>
          {filtered.map(([key, label]) => (
            <li className={styles.li} key={String(key)}>
              <strong>{label}:</strong> {exifData[key]?.toString() ?? '없음'}
            </li>
          ))}
        </ul>
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
              className={styles.file_input}
              type="file"
              accept=".jpg, .jpeg, .heic, .tiff, .png, .webp"
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

          {exifData && (
            <>
              <hr />
              {renderFields('기본 카메라 정보', [
                ['Make', '제조사'],
                ['Model', '모델'],
                ['Software', '소프트웨어'],
                ['Orientation', '방향(Orientation)'],
              ])}

              {renderFields('촬영 정보', [
                ['DateTimeOriginal', '촬영일'],
                ['CreateDate', '파일 생성일'],
                ['ModifyDate', '수정일'],
                ['ExposureTime', '노출 시간'],
                ['FNumber', '조리개(F값)'],
                ['ISOSpeedRatings', 'ISO 감도'],
                ['ShutterSpeedValue', '셔터속도(EV)'],
                ['ApertureValue', '조리개(EV)'],
                ['ExposureBiasValue', '노출 보정'],
                ['MeteringMode', '측광 모드'],
                ['WhiteBalance', '화이트 밸런스'],
                ['Flash', '플래시'],
                ['FocalLength', '초점 거리(mm)'],
                ['FocalLengthIn35mmFormat', '35mm 환산 초점거리'],
                ['LensMake', '렌즈 제조사'],
                ['LensModel', '렌즈 모델명'],
              ])}

              {renderFields('GPS 정보', [
                ['latitude', 'GPS 위도'],
                ['longitude', 'GPS 경도'],
                ['GPSAltitude', 'GPS 고도'],
                ['GPSImgDirection', '촬영 방향'],
                ['GPSDateStamp', 'GPS 날짜'],
                ['GPSTimeStamp', 'GPS 시간'],
              ])}

              {renderFields('기타 정보', [
                ['ColorSpace', '색상 공간'],
                ['SceneType', '장면 유형'],
                ['DigitalZoomRatio', '디지털 줌'],
                ['SubjectDistance', '피사체 거리'],
                ['ExifVersion', 'EXIF 버전'],
              ])}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;