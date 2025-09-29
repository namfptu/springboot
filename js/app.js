// Base URL cho API (backend chạy trên localhost:8080 với prefix /api)
const API_URL = 'http://localhost:8080/api/products';

// Các yếu tố DOM
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const productTableBody = document.getElementById('productTableBody');
const loading = document.getElementById('loading');
const noProducts = document.getElementById('noProducts');
const refreshBtn = document.getElementById('refreshBtn');

// Biến trạng tháiiiiiiiiii
let editingProductId = null;
let allProducts = [];

// Hàm quản lý URL routing
function updateURL(action, id = null) {
    let newURL = window.location.origin + window.location.pathname;
    let params = new URLSearchParams();

    if (action && action !== 'list') {
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
    const currentURL = document.getElementById('currentURL');
    if (currentURL) {
        currentURL.textContent = newURL;
    }
}

// Hàm xử lý khi user click back/forward browser
function handlePopState(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || 'list';
    const id = urlParams.get('id');

    // Xử lý theo action
    switch(action) {
        case 'add':
            resetForm();
            break;
        case 'edit':
            if (id) {
                editProduct(parseInt(id));
            }
            break;
        case 'delete':
            if (id) {
                showDeleteModal(parseInt(id));
            }
            break;
        default:
            resetForm();
            break;
    }
}

// Hàm format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm load sản phẩm từ API
async function loadProducts() {
    loading.style.display = 'block';
    updateURL('list'); // Cập nhật URL khi load danh sách

    try {
        console.log('Đang gọi API:', API_URL); // Debug log
        const response = await fetch(API_URL);
        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        allProducts = await response.json();
        console.log('Loaded products:', allProducts); // Debug log
        renderProducts(allProducts);
        noProducts.style.display = allProducts.length === 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading products:', error);
        alert(`Lỗi khi tải danh sách sản phẩm: ${error.message}`);
    } finally {
        loading.style.display = 'none';
    }
}

// Hàm render danh sách sản phẩm
function renderProducts(products) {
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description || ''}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${product.id})">✏️</button>
                <button class="delete-btn" onclick="showDeleteModal(${product.id})">🗑️</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

// Hàm submit form (thêm hoặc sửa)
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const product = {
        name: productNameInput.value,
        description: productDescriptionInput.value,
        price: productPriceInput.value // Gửi string để tương thích BigDecimal
    };

    // Cập nhật URL khi đang thực hiện thao tác
    const action = editingProductId ? 'updating' : 'adding';
    updateURL(action, editingProductId);

    try {
        let url = API_URL;
        let method = 'POST';
        if (editingProductId) {
            url += `/${editingProductId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save product: ${response.status} - ${errorText}`);
        }

        resetForm();
        await loadProducts(); // Sẽ cập nhật URL về 'list'
    } catch (error) {
        console.error('Error saving product:', error);
        alert(`Lỗi khi lưu sản phẩm: ${error.message}`);
        // Quay về danh sách nếu có lỗi
        updateURL('list');
    }
});

// Hàm edit sản phẩm
function editProduct(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    // Cập nhật URL khi bắt đầu edit
    updateURL('edit', id);

    productNameInput.value = product.name;
    productDescriptionInput.value = product.description || '';
    productPriceInput.value = product.price;
    submitBtn.textContent = 'Cập Nhật Sản Phẩm';
    cancelBtn.style.display = 'inline';
    editingProductId = id;
}

// Hàm reset form
function resetForm() {
    productForm.reset();
    submitBtn.textContent = 'Thêm Sản Phẩm';
    cancelBtn.style.display = 'none';
    editingProductId = null;

    // Cập nhật URL về trạng thái thêm mới
    updateURL('add');
}

cancelBtn.addEventListener('click', resetForm);

// Modal xóa
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deletingProductId = null;

function showDeleteModal(id) {
    deletingProductId = id;
    deleteModal.style.display = 'flex';
    deleteModal.classList.add('show');

    // Cập nhật URL khi hiển thị modal xóa
    updateURL('delete', id);
}

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    deleteModal.classList.remove('show');
    deletingProductId = null;

    // Quay về danh sách khi cancel xóa
    updateURL('list');
});

confirmDeleteBtn.addEventListener('click', async () => {
    if (!deletingProductId) return;

    // Cập nhật URL khi đang xóa
    updateURL('deleting', deletingProductId);

    try {
        const response = await fetch(`${API_URL}/${deletingProductId}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete product: ${response.status} - ${errorText}`);
        }
        deleteModal.style.display = 'none';
        deleteModal.classList.remove('show');
        deletingProductId = null;
        await loadProducts(); // Sẽ cập nhật URL về 'list'
    } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Lỗi khi xóa sản phẩm: ${error.message}`);
        // Quay về danh sách nếu có lỗi
        deleteModal.style.display = 'none';
        deleteModal.classList.remove('show');
        updateURL('list');
    }
});

// Event listener cho nút refresh
refreshBtn.addEventListener('click', loadProducts);

// Load ban đầu khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý URL hiện tại khi load trang
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || 'list';
    const id = urlParams.get('id');

    // Load products trước
    loadProducts().then(() => {
        // Sau đó xử lý action từ URL
        switch(action) {
            case 'edit':
                if (id && allProducts.find(p => p.id == id)) {
                    editProduct(parseInt(id));
                }
                break;
            case 'delete':
                if (id && allProducts.find(p => p.id == id)) {
                    showDeleteModal(parseInt(id));
                }
                break;
            case 'add':
                resetForm();
                break;
            default:
                // Đã load products rồi, chỉ cần cập nhật URL
                updateURL('list');
                break;
        }
    });

    // Listen cho browser back/forward
    window.addEventListener('popstate', handlePopState);
});

// Cập nhật URL indicator và demo function
document.addEventListener('DOMContentLoaded', () => {
    const currentURL = document.getElementById('currentURL');
    if (currentURL) {
        currentURL.textContent = window.location.href;
    }

    // Demo URL changes function - hiển thị các URL example
    window.demonstrateURLChanges = function() {
        const examples = [
            '?action=list - Danh sách sản phẩm',
            '?action=add - Thêm sản phẩm mới',
            '?action=edit&id=1 - Sửa sản phẩm ID 1',
            '?action=delete&id=2 - Xóa sản phẩm ID 2',
            '?action=adding - Đang thêm sản phẩm',
            '?action=updating&id=3 - Đang cập nhật sản phẩm ID 3'
        ];
        alert('📌 Các URL có thể xuất hiện:\n\n' + examples.join('\n'));
    };
});
