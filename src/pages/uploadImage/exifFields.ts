import { parse } from 'exifr';

type ExifData = Awaited<ReturnType<typeof parse>>;

// 카테고리별 필드 정의
export const exifFieldSections: {
  title: string;
  fields: [keyof ExifData, string][];
}[] = [
  {
    title: '기본 카메라 정보',
    fields: [
      ['Make', '제조사'],
      ['Model', '모델'],
      ['Software', '소프트웨어'],
      ['Orientation', '방향(Orientation)'],
    ],
  },
  {
    title: '촬영 정보',
    fields: [
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
    ],
  },
  {
    title: 'GPS 정보',
    fields: [
      ['latitude', 'GPS 위도'],
      ['longitude', 'GPS 경도'],
      ['GPSAltitude', 'GPS 고도'],
      ['GPSImgDirection', '촬영 방향'],
      ['GPSDateStamp', 'GPS 날짜'],
      ['GPSTimeStamp', 'GPS 시간'],
    ],
  },
  {
    title: '기타 정보',
    fields: [
      ['ColorSpace', '색상 공간'],
      ['SceneType', '장면 유형'],
      ['DigitalZoomRatio', '디지털 줌'],
      ['SubjectDistance', '피사체 거리'],
      ['ExifVersion', 'EXIF 버전'],
    ],
  },
];
