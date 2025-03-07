const errorMessages = {
  400: {
    DEFAULT: '잘못된 요청입니다.',
    INVALID_INPUT: '입력값이 올바르지 않습니다.', // 회원 가입 (사용자 잘못 입력)
  },
  401: {
    DEFAULT: '인증이 필요합니다. 로그인하세요.',
    AUTH_FAILED: '인증에 실패했습니다.',
    TOKEN_EXPIRED: '토큰이 만료되었습니다. 다시 로그인하세요.',
    ERR_BAD_REQUEST: '아이디나 비밀번호를 찾을 수 없습니다.', // 로그인 (잘못된 비밀번호 입력)
  },
  403: {
    DEFAULT: '접근 권한이 없습니다.',
    PERMISSION_DENIED: '이 작업을 수행할 권한이 없습니다.',
    ERR_BAD_REQUEST: '접근 권한이 없습니다.',
  },
  413: {
    PAYLOAD_TOO_LARGE: '이미지를 업로드할 수 없습니다.', // 버킷 (이미지 크기 및 확장자 맞지 않을 경우)
  },
  404: {
    DEFAULT: '요청하신 페이지를 찾을 수 없습니다.',
    NOT_FOUND: '요청하신 항목을 찾을 수 없습니다.',
    ERR_BAD_REQUEST: '아이디나 비밀번호를 찾을 수 없습니다.',
  },
  500: {
    DEFAULT: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    DATABASE_ERROR: '데이터베이스 처리 중 오류가 발생했습니다.',
    SERVER_CRASH: '서버에서 문제가 발생했습니다. 관리자에게 문의하세요.',
  },
};

export default errorMessages;
