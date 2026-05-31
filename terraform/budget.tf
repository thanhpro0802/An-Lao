resource "aws_budgets_budget" "cost_alert" {
  name              = "${var.project_name}-monthly-budget"
  budget_type       = "COST"
  limit_amount      = "5"
  limit_unit        = "USD"
  time_unit         = "MONTHLY"
  time_period_start = "2026-01-01_00:00" # Đặt ngày bắt đầu trong quá khứ để kích hoạt ngân sách hoạt động ngay lập tức

  # Cảnh báo 1: Chi phí thực tế vượt quá 100% ngân sách ($5)
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  # Cảnh báo 2: Dự báo chi phí vượt quá 80% ngân sách ($4)
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.alert_email]
  }
}
