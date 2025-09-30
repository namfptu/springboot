/**
 * Service xử lý các tương tác với API Products
 */
import { API_CONFIG, UI_MESSAGES } from '../config/constants.js';

export class ProductService {
    /**
     * Lấy tất cả sản phẩm từ API
     * @returns {Promise<Array>} Danh sách sản phẩm
     */
    static async getAll() {
        try {
            console.log('Đang gọi API:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            throw error;
        }
    }

    /**
     * Tạo sản phẩm mới
     * @param {Object} product Thông tin sản phẩm
     * @returns {Promise<Object>} Sản phẩm đã tạo
     */
    static async create(product) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to save product: ${response.status} - ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    /**
     * Cập nhật sản phẩm
     * @param {number} id ID của sản phẩm
     * @param {Object} product Thông tin sản phẩm cập nhật
     * @returns {Promise<Object>} Sản phẩm đã cập nhật
     */
    static async update(id, product) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update product: ${response.status} - ${errorText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    /**
     * Xóa sản phẩm
     * @param {number} id ID của sản phẩm cần xóa
     * @returns {Promise<void>}
     */
    static async delete(id) {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, { 
                method: 'DELETE' 
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete product: ${response.status} - ${errorText}`);
            }
            
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}
