/**
 * Quản lý URL routing cho ứng dụng
 */
import { URL_ACTIONS } from '../config/constants.js';

export class Router {
    /**
     * Cập nhật URL theo action và ID
     * @param {string} action Hành động hiện tại (list, add, edit, delete, etc)
     * @param {number|null} id ID của sản phẩm (nếu có)
     */
    static updateURL(action, id = null) {
        let newURL = window.location.origin + window.location.pathname;
        let params = new URLSearchParams();

        if (action && action !== URL_ACTIONS.LIST) {
            params.set('action', action);
        }
        
        if (id) {
            params.set('id', id);
        }

        const queryString = params.toString();
        if (queryString) {
            newURL += '?' + queryString;
        }

        // Cập nhật URL mà không reload trang
        window.history.pushState({ action, id }, '', newURL);

        // Cập nhật hiển thị URL
        this.updateURLDisplay(newURL);
    }

    /**
     * Cập nhật hiển thị URL trên giao diện
     * @param {string} url URL hiện tại
     */
    static updateURLDisplay(url) {
        const currentURL = document.getElementById('currentURL');
        if (currentURL) {
            currentURL.textContent = url || window.location.href;
        }
    }

    /**
     * Xử lý sự kiện popstate (khi user click back/forward browser)
     * @param {Event} event PopState event
     * @returns {Object} Action và ID từ URL
     */
    static handlePopState(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action') || URL_ACTIONS.LIST;
        const id = urlParams.get('id');
        
        return { action, id: id ? parseInt(id) : null };
    }

    /**
     * Lấy action và ID từ URL hiện tại
     * @returns {Object} Action và ID từ URL
     */
    static getCurrentRoute() {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action') || URL_ACTIONS.LIST;
        const id = urlParams.get('id');
        
        return { action, id: id ? parseInt(id) : null };
    }
}
