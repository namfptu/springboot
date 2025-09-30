/**
 * Các hàm tiện ích để format dữ liệu
 */

export class Formatter {
    /**
     * Format giá tiền theo định dạng Việt Nam
     * @param {number} price Giá tiền cần format
     * @returns {string} Giá tiền đã được format
     */
    static formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);
    }

    /**
     * Format ngày tháng theo định dạng Việt Nam
     * @param {string|Date} date Ngày tháng cần format
     * @returns {string} Ngày tháng đã được format
     */
    static formatDate(date) {
        if (!date) return '';
        
        const dateObj = date instanceof Date ? date : new Date(date);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(dateObj);
    }

    /**
     * Cắt ngắn text nếu quá dài
     * @param {string} text Text cần cắt ngắn
     * @param {number} maxLength Độ dài tối đa
     * @returns {string} Text đã cắt ngắn
     */
    static truncateText(text, maxLength = 50) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        
        return text.substring(0, maxLength) + '...';
    }
}
