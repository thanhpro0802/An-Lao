# 1. Security Group cho máy chủ Frontend (Nằm ở Public Subnet)
resource "aws_security_group" "frontend" {
  name        = "${var.project_name}-fe-sg"
  description = "Allow HTTP and HTTPS inbound traffic"
  vpc_id      = aws_vpc.main.id

  # Cho phép kết nối HTTP từ mọi nơi
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Cho phép kết nối HTTPS từ mọi nơi
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Cho phép tất cả các kết nối ra ngoài Internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-fe-sg"
  }
}

# 2. Security Group cho máy chủ Backend & SIEM (Nằm ở Private Subnet)
resource "aws_security_group" "backend" {
  name        = "${var.project_name}-be-sg"
  description = "Allow inbound traffic from Frontend Security Group only"
  vpc_id      = aws_vpc.main.id

  # Chỉ cho phép Frontend EC2 gọi API Backend ở cổng 8080
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  # Chỉ cho phép Frontend EC2 (hoặc qua Reverse Proxy) truy cập Kibana ở cổng 5601
  ingress {
    from_port       = 5601
    to_port         = 5601
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  # Elasticsearch (9200) chỉ mở kết nối nội bộ trong máy và cụm nội bộ (không Expose ra ngoài)

  # Cho phép tất cả các kết nối ra ngoài (để tải thư viện qua NAT Gateway và gọi Gemini API)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-be-sg"
  }
}
