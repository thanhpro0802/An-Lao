# 1. Tự động truy vấn AMI Amazon Linux 2023 mới nhất từ AWS
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# 2. Khai báo mã khởi động (User Data) cài đặt Docker & Docker Compose
locals {
  user_data_script = <<-EOF
    #!/bin/bash
    # Cập nhật danh sách gói phần mềm
    dnf update -y

    # Cài đặt và kích hoạt dịch vụ Docker
    dnf install -y docker
    systemctl enable docker
    systemctl start docker

    # Thêm user mặc định ec2-user vào nhóm docker để chạy lệnh không cần sudo
    usermod -aG docker ec2-user

    # Cài đặt Docker Compose v2 làm CLI plugin
    mkdir -p /usr/local/lib/docker/cli-plugins
    curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
  EOF
}

# 3. Tạo máy chủ EC2 cho Frontend (Nằm ở Public Subnet)
resource "aws_instance" "frontend" {
  ami                  = data.aws_ami.amazon_linux_2023.id
  instance_type        = var.fe_instance_type
  subnet_id            = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.frontend.id]
  iam_instance_profile = aws_iam_instance_profile.ssm_instance_profile.name

  user_data = local.user_data_script

  tags = {
    Name = "${var.project_name}-fe-server"
  }
}

# 4. Tạo máy chủ EC2 cho Backend & SIEM (Nằm ở Private Subnet)
resource "aws_instance" "backend" {
  ami                  = data.aws_ami.amazon_linux_2023.id
  instance_type        = var.be_instance_type
  subnet_id            = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.backend.id]
  iam_instance_profile = aws_iam_instance_profile.ssm_instance_profile.name

  user_data = local.user_data_script

  tags = {
    Name = "${var.project_name}-be-siem-server"
  }
}
