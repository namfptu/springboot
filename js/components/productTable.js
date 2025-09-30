/**
 * Component quản lý và hiển thị danh sách sản phẩm
 */
import { Formatter } from '../utils/formatter.js';
import { UI_MESSAGES } from '../config/constants.js';

export class ProductTable {
    /**
     * Khởi tạo ProductTable component
     * @param {Object} options Các tùy chọn
     * @param {Function} options.onEdit Callback khi click nút edit
     * @param {Function} options.onDelete Callback khi click nút delete
     */
    constructor(options = {}) {
        // DOM Elements
        this.tableBody = document.getElementById('productTableBody');
        this.loadingElement = document.getElementById('loading');
        this.noProductsElement = document.getElementById('noProducts');
        this.refreshBtn = document.getElementById('refreshBtn');
        
        // Callbacks
        this.onEdit = options.onEdit;
        this.onDelete = options.onDelete;
        this.onRefresh = options.onRefresh;
        
        // Bind methods
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
        
        // Initialize
        this.setupEventListeners();
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', this.handleRefreshClick);
    }

    /**
     * Xử lý sự kiện click nút refresh
     */
    handleRefreshClick() {
        if (typeof this.onRefresh === 'function') {
            this.onRefresh();
        }
    }

    /**
     * Hiển thị trạng thái loading
     * @param {boolean} isLoading Có đang loading hay không
     */
    setLoading(isLoading) {
        this.loadingElement.style.display = isLoading ? 'block' : 'none';
    }

    /**
     * Render danh sách sản phẩm
     * @param {Array} products Danh sách sản phẩm
     */
    renderProducts(products) {
        this.tableBody.innerHTML = '';
        
        // Hiển thị thông báo nếu không có sản phẩm
        this.noProductsElement.style.display = products.length === 0 ? 'block' : 'none';
        
        // Render từng sản phẩm
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description || ''}</td>
                <td>${Formatter.formatPrice(product.price)}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">✏️</button>
                    <button class="delete-btn" data-id="${product.id}">🗑️</button>
                </td>
            `;
            
            // Thêm event listeners cho các nút
            const editBtn = row.querySelector('.edit-btn');
            const deleteBtn = row.querySelector('.delete-btn');
            
            editBtn.addEventListener('click', () => {
                if (typeof this.onEdit === 'function') {
                    this.onEdit(product);
                }
            });
            
            deleteBtn.addEventListener('click', () => {
                if (typeof this.onDelete === 'function') {
                    this.onDelete(product.id);
                }
            });
            
            this.tableBody.appendChild(row);
        });
    }
}
