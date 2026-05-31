variable "aws_region" {
  type        = string
  default     = "ap-southeast-1" # Sử dụng vùng Singapore để có kết nối nhanh nhất về Việt Nam
  description = "AWS region to deploy resources"
}

variable "project_name" {
  type        = string
  default     = "anlao"
  description = "Prefix for resource names"
}

variable "vpc_cidr" {
  type        = string
  default     = "10.0.0.0/16"
  description = "CIDR block for VPC"
}

variable "public_subnet_cidr" {
  type        = string
  default     = "10.0.1.0/24"
  description = "CIDR block for public subnet"
}

variable "private_subnet_cidr" {
  type        = string
  default     = "10.0.2.0/24"
  description = "CIDR block for private subnet"
}

variable "fe_instance_type" {
  type        = string
  default     = "t2.micro" # Hoàn toàn miễn phí trong AWS Free Tier
  description = "EC2 instance type for Frontend"
}

variable "be_instance_type" {
  type        = string
  default     = "t3.medium" # Cần tối thiểu t3.medium (4GB RAM) để chạy Elasticsearch ổn định
  description = "EC2 instance type for Backend & SIEM"
}

variable "alert_email" {
  type        = string
  default     = "tuanthanhtayson@gmail.com" # Email nhận cảnh báo chi phí của bạn
  description = "Email address to receive AWS Budget alerts"
}
