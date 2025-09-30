/**
 * Component quản lý form thêm/sửa sản phẩm
 */
import { Router } from '../utils/router.js';
import { ProductService } from '../services/productService.js';
import { BUTTON_LABELS, URL_ACTIONS } from '../config/constants.js';

export class ProductForm {
    /**
     * Khởi tạo ProductForm component
     * @param {Object} options Các tùy chọn
     * @param {Function} options.onProductSaved Callback khi sản phẩm được lưu thành công
     */
    constructor(options = {}) {
        // DOM Elements
        this.form = document.getElementById('productForm');
        this.nameInput = document.getElementById('productName');
        this.descriptionInput = document.getElementById('productDescription');
        this.priceInput = document.getElementById('productPrice');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        
        // State
        this.editingProductId = null;
        this.onProductSaved = options.onProductSaved;
        
        // Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        
        // Initialize
        this.setupEventListeners();
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit);
        this.cancelBtn.addEventListener('click', this.resetForm);
    }

    /**
     * Xử lý sự kiện submit form
     * @param {Event} e Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        const product = {
            name: this.nameInput.value,
            description: this.descriptionInput.value,
            price: this.priceInput.value
        };

        // Cập nhật URL khi đang thực hiện thao tác
        const action = this.editingProductId ? URL_ACTIONS.UPDATING : URL_ACTIONS.ADDING;
        Router.updateURL(action, this.editingProductId);

        try {
            if (this.editingProductId) {
                await ProductService.update(this.editingProductId, product);
            } else {
                await ProductService.create(product);
            }
            
            this.resetForm();
            
            // Gọi callback nếu có
            if (typeof this.onProductSaved === 'function') {
                this.onProductSaved();
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert(`Lỗi khi lưu sản phẩm: ${error.message}`);
            // Quay về danh sách nếu có lỗi
            Router.updateURL(URL_ACTIONS.LIST);
        }
    }

    /**
     * Điền thông tin sản phẩm vào form để sửa
     * @param {Object} product Sản phẩm cần sửa
     */
    editProduct(product) {
        if (!product) return;
        
        // Cập nhật URL khi bắt đầu edit
        Router.updateURL(URL_ACTIONS.EDIT, product.id);
        
        this.nameInput.value = product.name;
        this.descriptionInput.value = product.description || '';
        this.priceInput.value = product.price;
        this.submitBtn.textContent = BUTTON_LABELS.UPDATE;
        this.cancelBtn.style.display = 'inline';
        this.editingProductId = product.id;
    }

    /**
     * Reset form về trạng thái ban đầu
     */
    resetForm() {
        this.form.reset();
        this.submitBtn.textContent = BUTTON_LABELS.ADD;
        this.cancelBtn.style.display = 'none';
        this.editingProductId = null;
        
        // Cập nhật URL về trạng thái thêm mới
        Router.updateURL(URL_ACTIONS.ADD);
    }
}
