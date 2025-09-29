# 🛍️ Product Management System - Frontend

Frontend cho hệ thống quản lý sản phẩm kết nối với API Demo2.

## 🚀 Cách chạy project

### 1. Chạy API Backend (Demo2)
```bash
# Mở terminal trong thư mục G:\IdeaProjects\demo2
cd G:\IdeaProjects\demo2
mvn spring-boot:run
```
API sẽ chạy trên: `http://localhost:8080`

### 2. Chạy Frontend
Có 2 cách để chạy frontend:

#### Cách 1: Sử dụng Webpack (Khuyến nghị)
```bash
# Mở terminal trong thư mục G:\IdeaProjects\demo-frontend
cd G:\IdeaProjects\demo-frontend
npm install
npm start
```
Frontend sẽ chạy trên: `http://localhost:8080` (hoặc port khác nếu 8080 bị chiếm)

#### Cách 2: Chạy tự động với script
- **Windows Batch:** Double-click `start-frontend.bat`
- **PowerShell:** Chạy `.\start-frontend.ps1`
- **Tự động mở browser** và chạy trên port 3000

#### Cách 3: Mở trực tiếp file HTML
- Mở file `index.html` trong trình duyệt
- Hoặc sử dụng Live Server extension trong VS Code/IntelliJ

#### Cách 4: Sử dụng IntelliJ IDEA
1. Mở project `demo-frontend` trong IntelliJ
2. Click chuột phải vào `index.html`
3. Chọn "Open in Browser" hoặc "Preview"
4. URL sẽ là: `http://localhost:63342/index.html`

## 🔧 Cấu hình

### API Configuration
- **Base URL**: `http://localhost:8080/api`
- **Products Endpoint**: `http://localhost:8080/api/products`
- **Test Endpoint**: `http://localhost:8080/api/test`

### CORS Configuration
API đã được cấu hình CORS để cho phép kết nối từ:
- `http://localhost:3000`
- `http://localhost:8080`
- `http://localhost:8081`
- `file://` (cho file HTML tĩnh)

## 📋 Chức năng

### ✅ Đã hoàn thành
- ✅ **Thêm sản phẩm mới**
- ✅ **Xem danh sách sản phẩm**
- ✅ **Sửa thông tin sản phẩm**
- ✅ **Xóa sản phẩm**
- ✅ **Giao diện responsive**
- ✅ **Validation dữ liệu**
- ✅ **Loading states**
- ✅ **Error handling**

### 🎨 Giao diện
- **Modern UI** với gradient background
- **Responsive design** cho mobile/tablet
- **Smooth animations** và transitions
- **Modal confirmations** cho các thao tác quan trọng
- **Loading indicators** khi gọi API

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc trang
- **CSS3** - Styling với Flexbox/Grid
- **Vanilla JavaScript** - Logic xử lý
- **Fetch API** - Gọi REST API
- **Webpack** - Build tool (tùy chọn)

## 🔍 Troubleshooting

### Lỗi CORS
Nếu gặp lỗi CORS, kiểm tra:
1. API có đang chạy không?
2. Port frontend có trong danh sách allowed origins không?
3. CORS configuration trong `DemoApplication.java`

### Lỗi kết nối API
1. Kiểm tra API có chạy trên port 8080 không
2. Kiểm tra database connection
3. Xem console log để debug

### Lỗi build Webpack
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

## 📱 Responsive Design

- **Desktop**: 2 cột (form + danh sách)
- **Tablet**: 2 cột với điều chỉnh spacing
- **Mobile**: 1 cột, form trên danh sách

## 🎯 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy danh sách sản phẩm |
| GET | `/api/products/{id}` | Lấy sản phẩm theo ID |
| POST | `/api/products` | Tạo sản phẩm mới |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm |
| DELETE | `/api/products/{id}` | Xóa sản phẩm |

## 🚀 Next Steps

Có thể mở rộng thêm:
- **Pagination** cho danh sách sản phẩm
- **Search/Filter** sản phẩm
- **Image upload** cho sản phẩm
- **Authentication** và authorization
- **Real-time updates** với WebSocket
