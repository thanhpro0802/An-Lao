# 1. In ra IP công khai của máy chủ Frontend
output "frontend_public_ip" {
  value       = aws_instance.frontend.public_ip
  description = "Public IP address of the Frontend EC2 instance (Next.js & Nginx)"
}

# 2. In ra IP nội bộ của máy chủ Backend & SIEM
output "backend_private_ip" {
  value       = aws_instance.backend.private_ip
  description = "Private IP address of the Backend EC2 instance (Spring Boot, DB, ELK)"
}

# 3. Hướng dẫn lệnh kết nối SSM Session Manager để quản lý máy EC2 Private
output "ssm_connect_instructions" {
  value = <<EOF
Hạ tầng đã được thiết lập bảo mật tuyệt đối, không mở cổng SSH (22).
Để truy cập vào dòng lệnh (Terminal) của máy chủ Backend nằm ở Private Subnet:

1. Đảm bảo đã cài đặt AWS CLI và Session Manager plugin trên máy của bạn.
2. Chạy lệnh sau để kết nối:
   aws ssm start-session --target ${aws_instance.backend.id} --region ${var.aws_region}
EOF
  description = "Instructions to connect securely via AWS Systems Manager Session Manager"
}
