//Hướng dẫn code 
module.exports.config = {
  name: "lich", // Tên lệnh, được sử dụng trong việc gọi lệnh
  version: "1.0.0", // phiên bản của module này
  hasPermssion: 0/1/2, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
  credits: "Hưng", // Công nhận module sở hữu là ai
  description: "check", // Thông tin chi tiết về lệnh
  commandCategory: "group", // Thuộc vào nhóm lệnh nào
  usages: "lich", // Cách sử dụng lệnh
  cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
  dependencies: {
    "amlich":"",
    "node-fetch":""
    } //Liệt kê các package module ở ngoài tại đây để khi load lệnh nó sẽ tự động cài!
  // Info là phần chi tiết thêm của cách sử dụng lệnh
  // Key: Từ khoá thuộc trong usages
  // prompt: Chi tiết dữ liệu đầu vào của key
  // type: Định dạng dữ liệu đầu vào của key
  // example: Ví dụ ¯\_(ツ)_/¯ 
};

