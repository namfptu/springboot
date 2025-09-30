/**
 * Các hằng số và cấu hình cho ứng dụng
 */

// API configuration
export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api',
    ENDPOINTS: {
        PRODUCTS: '/products'
    }
};

// URL actions
export const URL_ACTIONS = {
    LIST: 'list',
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    ADDING: 'adding',
    UPDATING: 'updating',
    DELETING: 'deleting'
};

// UI messages
export const UI_MESSAGES = {
    LOADING: 'Đang tải...',
    NO_PRODUCTS: 'Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!',
    CONFIRM_DELETE: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
    ERROR_LOADING: 'Lỗi khi tải danh sách sản phẩm: ',
    ERROR_SAVING: 'Lỗi khi lưu sản phẩm: ',
    ERROR_DELETING: 'Lỗi khi xóa sản phẩm: '
};

// Button labels
export const BUTTON_LABELS = {
    ADD: 'Thêm Sản Phẩm',
    UPDATE: 'Cập Nhật Sản Phẩm',
    CANCEL: 'Hủy',
    DELETE: 'Xóa',
    REFRESH: 'Làm mới'
};
