/**
 * Main entry point của ứng dụng
 * Khởi tạo và kết nối các components
 */
import { ProductService } from './services/productService.js';
import { Router } from './utils/router.js';
import { ProductForm } from './components/productForm.js';
import { ProductTable } from './components/productTable.js';
import { DeleteModal } from './components/modal.js';
import { URL_ACTIONS, UI_MESSAGES } from './config/constants.js';

class App {
    constructor() {
        // State
        this.products = [];
        
        // Initialize components
        this.initComponents();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial load
        this.init();
    }
    
    /**
     * Khởi tạo các components
     */
    initComponents() {
        // Khởi tạo ProductForm
        this.productForm = new ProductForm({
            onProductSaved: () => this.loadProducts()
        });
        
        // Khởi tạo ProductTable
        this.productTable = new ProductTable({
            onEdit: (product) => this.handleEdit(product),
            onDelete: (id) => this.handleDelete(id),
            onRefresh: () => this.loadProducts()
        });
        
        // Khởi tạo DeleteModal
        this.deleteModal = new DeleteModal({
            onDeleteSuccess: () => this.loadProducts()
        });
    }
    
    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Listen cho browser back/forward
        window.addEventListener('popstate', (event) => {
            const { action, id } = Router.handlePopState(event);
            this.handleRouteChange(action, id);
        });
        
        // Demo URL changes function
        window.demonstrateURLChanges = this.demonstrateURLChanges;
    }
    
    /**
     * Khởi tạo ứng dụng
     */
    async init() {
        // Cập nhật URL indicator
        Router.updateURLDisplay();
        
        // Xử lý URL hiện tại khi load trang
        const { action, id } = Router.getCurrentRoute();
        
        // Load products trước
        await this.loadProducts();
        
        // Sau đó xử lý action từ URL
        this.handleRouteChange(action, id);
    }
    
    /**
     * Xử lý thay đổi route
     * @param {string} action Action từ URL
     * @param {number|null} id ID từ URL
     */
    handleRouteChange(action, id) {
        switch(action) {
            case URL_ACTIONS.EDIT:
                if (id && this.products.find(p => p.id === id)) {
                    const product = this.products.find(p => p.id === id);
                    this.productForm.editProduct(product);
                }
                break;
            case URL_ACTIONS.DELETE:
                if (id && this.products.find(p => p.id === id)) {
                    this.deleteModal.show(id);
                }
                break;
            case URL_ACTIONS.ADD:
                this.productForm.resetForm();
                break;
            default:
                // Đã load products rồi, chỉ cần cập nhật URL
                Router.updateURL(URL_ACTIONS.LIST);
                break;
        }
    }
    
    /**
     * Load danh sách sản phẩm từ API
     */
    async loadProducts() {
        this.productTable.setLoading(true);
        Router.updateURL(URL_ACTIONS.LIST); // Cập nhật URL khi load danh sách
        
        try {
            this.products = await ProductService.getAll();
            this.productTable.renderProducts(this.products);
        } catch (error) {
            console.error('Error loading products:', error);
            alert(`${UI_MESSAGES.ERROR_LOADING}${error.message}`);
        } finally {
            this.productTable.setLoading(false);
        }
    }
    
    /**
     * Xử lý sự kiện edit sản phẩm
     * @param {Object} product Sản phẩm cần edit
     */
    handleEdit(product) {
        this.productForm.editProduct(product);
    }
    
    /**
     * Xử lý sự kiện delete sản phẩm
     * @param {number} id ID sản phẩm cần xóa
     */
    handleDelete(id) {
        this.deleteModal.show(id);
    }
    
    /**
     * Demo URL changes
     */
    demonstrateURLChanges() {
        const examples = [
            '?action=list - Danh sách sản phẩm',
            '?action=add - Thêm sản phẩm mới',
            '?action=edit&id=1 - Sửa sản phẩm ID 1',
            '?action=delete&id=2 - Xóa sản phẩm ID 2',
            '?action=adding - Đang thêm sản phẩm',
            '?action=updating&id=3 - Đang cập nhật sản phẩm ID 3'
        ];
        alert('📌 Các URL có thể xuất hiện:\n\n' + examples.join('\n'));
    }
}

// Khởi tạo ứng dụng khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
