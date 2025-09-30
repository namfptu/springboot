/**
 * Component quản lý modal xác nhận xóa
 */
import { Router } from '../utils/router.js';
import { ProductService } from '../services/productService.js';
import { URL_ACTIONS, UI_MESSAGES } from '../config/constants.js';

export class DeleteModal {
    /**
     * Khởi tạo DeleteModal component
     * @param {Object} options Các tùy chọn
     * @param {Function} options.onDeleteSuccess Callback khi xóa thành công
     */
    constructor(options = {}) {
        // DOM Elements
        this.modal = document.getElementById('deleteModal');
        this.confirmBtn = document.getElementById('confirmDeleteBtn');
        this.cancelBtn = document.getElementById('cancelDeleteBtn');
        
        // State
        this.deletingProductId = null;
        this.onDeleteSuccess = options.onDeleteSuccess;
        
        // Bind methods
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        
        // Initialize
        this.setupEventListeners();
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        this.confirmBtn.addEventListener('click', this.handleConfirm);
        this.cancelBtn.addEventListener('click', this.handleCancel);
    }

    /**
     * Hiển thị modal xác nhận xóa
     * @param {number} id ID của sản phẩm cần xóa
     */
    show(id) {
        this.deletingProductId = id;
        this.modal.style.display = 'flex';
        this.modal.classList.add('show');
        
        // Cập nhật URL khi hiển thị modal xóa
        Router.updateURL(URL_ACTIONS.DELETE, id);
    }

    /**
     * Ẩn modal xác nhận xóa
     */
    hide() {
        this.modal.style.display = 'none';
        this.modal.classList.remove('show');
        this.deletingProductId = null;
    }

    /**
     * Xử lý sự kiện click nút cancel
     */
    handleCancel() {
        this.hide();
        
        // Quay về danh sách khi cancel xóa
        Router.updateURL(URL_ACTIONS.LIST);
    }

    /**
     * Xử lý sự kiện click nút confirm
     */
    async handleConfirm() {
        if (!this.deletingProductId) return;
        
        // Cập nhật URL khi đang xóa
        Router.updateURL(URL_ACTIONS.DELETING, this.deletingProductId);
        
        try {
            await ProductService.delete(this.deletingProductId);
            
            this.hide();
            
            // Gọi callback nếu có
            if (typeof this.onDeleteSuccess === 'function') {
                this.onDeleteSuccess();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`${UI_MESSAGES.ERROR_DELETING}${error.message}`);
            
            // Quay về danh sách nếu có lỗi
            this.hide();
            Router.updateURL(URL_ACTIONS.LIST);
        }
    }
}
