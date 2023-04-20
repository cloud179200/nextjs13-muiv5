export const HTTP_RESPONSE_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  MISSING_AUTHORIZED: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const FORM_VALIDATE_ERROR_MESSAGE = {
  INVALID: "trường không hợp lệ",
  INVALID_LENGTH: "trường không đủ độ dài",
  REQUIRED: "trường không được để trống",
};

export const API_MESSAGE = {
  SERVER_ERROR: "Lỗi Máy Chủ",
  SUCCESS: "Thành Công",
  FAIL: "Thất Bại",
  UPDATE_SUCCESS: "Cập Nhật Thành Công",
  UPDATE_FAIL: "Cập Nhật Thất Bại",
};

export const USER_ROLE = {
  1: "Admin",
  2: "Student",
  3: "Teacher",
};

export const NAME_TRANS_VN = {
  SIGN_IN: "Đăng Nhập",
  SIGN_IN_WITH_FACEBOOK: "Đăng Nhập Bằng Facebook",
  SIGN_UP: "Đăng Ký",
  SIGN_OUT: "Đăng Xuất",
  SETTINGS: "Cài Đặt",
  FIRST_NAME: "Họ",
  LAST_NAME: "Tên",
  PHONE_NUMBER: "Số Điện Thoại",
  ADDRESS: "Địa Chỉ",
  EMAIL: "Email",
  PASSWORD: "Mật Khẩu",
  NEW_PASSWORD: "Mật Khẩu Mới",
  SEND_EMAIL: "Gửi Email",
  SEND: "Gửi",
  CONFIRM_PASSWORD: "Xác Nhận Mật Khẩu",
  ALREADY_HAVE_ACCOUNT: "Đã Có Tài Khoản",
  DONT_HAVE_ACCOUNT: "Không Có Tài Khoản",
  FORGOT_PASSWORD: "Quên Mật Khẩu",
  CHECK_EMAIL_FOR_VERIFY: "Kiểm Tra Email Để Xác Minh Tài Khoản!",
  VERIFY_EMAIL_SUCCESS: "Xác Minh Thành Công",
  VERIFY_EMAIL_FAILED: "Xác Minh Thất Bại",
  SIGN_IN_TITLE: "Đăng Nhập Với Email",
  SIGN_UP_TITLE: "Đăng Ký Với Email",
  TEACHER: "Giảng Viên",
  TEACHER_NAME: "Tên Giảng Viên",
  TEACHER_DELETE: "Xóa Giảng Viên",
  TEACHER_INFO: "Thông Tin Giảng Viên",
  STUDENT: "Học Viên",
  STUDENT_NAME: "Tên Học Viên",
  STUDENT_DELETE: "Xóa Học Viên",
  STUDENT_INFO: "Thông Tin Học Viên",
  ADMIN: "Quản Trị Viên",
  HOME: "Trang Chủ",
  NEW: "Mới",
  ID: "Id",
  CLASS: "Lớp",
  CLASS_NAME: "Tên Lớp",
  CLASS_FEE: "Phí",
  CLASS_NEW: "Lớp Mới",
  CLASS_EDIT: "Sửa Lớp",
  CLASS_DELETE: "Xóa Lớp",
  CLASS_ADD: "Thêm Lớp",
  APPLY_FILTER: "Áp Dụng Bộ Lọc",
  CLEAR_FILTER: "Xóa Bộ Lọc",
  TRANSACTION_HISTORY: "Lịch Sử Giao Dịch",
  CHANGE_PASSWORD: "Đổi Mật Khẩu",
  INFORMATION: "Thông Tin",
  DESCRIPTION: "Ghi Chú",
  PAYMENT: "Nộp Tiền",
  STAGE_ADD: "Thêm Buổi Học",
  STAGE_EDIT: "Sửa Buổi Học",
  STAGE_NAME: "Tên Buổi Học",
  STAGE_DELETE: "Xóa Buổi Học",
  SAVE: "Lưu",
  ADD: "Thêm",
  EDIT: "Sửa",
  NAME: "Tên",
  LANDING_PAGE: "Trang Quảng Cảo",
  MALE: "Nam",
  FEMALE: "Nữ",
  GENDER: "Giới Tính",
  PAYROLL_NEW: "Bậc Lương Mới",
  PAYROLL_ADD: "Thêm Bậc Lương",
  PAYROLL_EDIT: "Sửa Bậc Lương",
  PAYROLL_DELETE: "Xóa Bậc Lương",
  PAYROLL: "Bậc Lương",
  PAYROLL_NAME: "Tên Bậc Lương",
  PAYROLL_VALUE: "Giá Trị Bậc Lương",
};

export const STATUS_VERIFY_EMAIL = {
  SENT: "SENT",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const DEFAULT_BACKGROUND_IMAGE = "linear-gradient(120deg, rgba(200,31,255,1) 0%, rgba(124,77,255,1) 60%, rgba(33,150,243,1) 100%)"