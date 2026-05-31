# 1. Tạo IAM Role cho phép EC2 giao tiếp với AWS Systems Manager (SSM)
resource "aws_iam_role" "ssm_role" {
  name = "${var.project_name}-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-ssm-role"
  }
}

# 2. Đính kèm Policy mẫu của AWS cho SSM vào Role
resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# 3. Tạo IAM Instance Profile để gắn trực tiếp vào máy ảo EC2
resource "aws_iam_instance_profile" "ssm_instance_profile" {
  name = "${var.project_name}-ec2-ssm-profile"
  role = aws_iam_role.ssm_role.name
}
