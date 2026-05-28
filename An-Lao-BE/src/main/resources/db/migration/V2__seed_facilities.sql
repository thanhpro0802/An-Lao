-- Mật khẩu mặc định cho admin là 'password', đã được mã hoá BCrypt
INSERT INTO users (email, password, full_name, phone, role) 
VALUES 
('admin@anlao.vn', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUawB230zKGa', 'Quản trị viên An Lão', '0987654321', 'ADMIN'),
('user@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUawB230zKGa', 'Khách hàng', '0912345678', 'USER');

-- Thêm dữ liệu mẫu cơ sở dưỡng lão
INSERT INTO facilities (name, address, district, description, price_min, price_max, price_unit, price_includes, price_excludes, image_url, images, is_verified, is_warning, rating, review_count, tags)
VALUES 
('Trung tâm chăm sóc người cao tuổi Hà Nội', '55 Ng. 29 P. Khương Hạ, Khương Đình, Hà Nội', 'Thanh Xuân', 'Liên hệ: duonglaohanoi.com
Điểm cộng: Giá hợp lý. Nhân viên được khen nhiều về thái độ (nhiệt tình, chu đáo). 
Khuôn viên rộng rãi, có chỗ tập thể dục. Thủ tục vào đơn giản.
Google Maps: https://maps.app.goo.gl/QnYj9aDKHYpXR1QA6', 6.0, 11.0, 'triệu/tháng', 'Phòng đông nhất (8 người): 6tr/tháng.

Phòng riêng tư nhất (2 người): 10tr - 11tr/tháng.

Phụ phí chăm sóc (Surcharge): +1.000.000đ/tháng nếu cần trợ giúp sinh hoạt.', '', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop']::TEXT[], TRUE, FALSE, 4.5, 42, ARRAY['Nội trú', 'Nhận tai biến']::TEXT[]),
('Viện Dưỡng Lão Thanh Xuân', '2R47+PP9, Thanh Xuân, Hà Nội', 'Thanh Xuân', 'Liên hệ: 0989 751 582 
duonglaothanhxuan.com
Điểm cộng: Minh bạch đến từng chi tiết (thậm chí có phí massage chân 30k/lần). Phân chia dịch vụ rất rõ ràng, chuyên nghiệp. Có công cụ tính giá tự động cho khách hàng.
Google Maps: https://maps.app.goo.gl/54kXseXoyLRi3t5Y8', 8.0, 15.0, 'triệu/tháng', '- Phòng đơn: 15tr; Phòng đôi: 10tr; Phòng 3-4: 9tr; Phòng 7-8: 8tr.


- Có gói Bán trú (400-600k/ngày) và Ngắn ngày.


- Phụ phí Lễ/Tết: 200.000đ/ngày.


- Không bao gồm: Thuốc, bỉm, vật tư tiêu hao.', 'Review quá ít (dưới 10), điểm 5.0 chưa đủ tin cậy', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, TRUE, 5.0, 6, ARRAY['Hỗn hợp', 'Bán trú']::TEXT[]),
('Chăm sóc người cao tuổi Hà Nội', 'Số B10 lô 4 khu đô thị mới Định Công, Định Công, Hà Nội', 'Hoàng Mai', 'Liên hệ: 0342 205 568
chamsocnguoicaotuoihanoi.com
Điểm cộng: Vị trí trung tâm dễ thăm nom. Phòng nhỏ (chỉ từ 2-4 người) mang tính riêng tư cao. Thực phẩm an toàn từ siêu thị. Cơ sở vật chất được khen là hiện đại, đầy đủ.
Google Maps: https://maps.app.goo.gl/bdaeN5RSBnJSmSeS7', 8.0, 13.0, 'triệu/tháng', '- Người khỏe mạnh: 8tr (Phòng 4); 9tr (Phòng 3); 12tr (Phòng 2).


- Cần trợ giúp: 9-10tr (Phòng 4); 10-11tr (Phòng 3); 13tr (Phòng 2).


- Không bao gồm: Xoa bóp, ngâm chân, thuốc theo đơn, vật tư tiêu hao (bỉm, sonde...).', '', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 4.6, 8, ARRAY['Nội trú', 'Nhận tai biến']::TEXT[]),
('Dưỡng Lão OriHome (Cơ sở 1)', '5N7, TT5 P. Đặng Xuân Bảng, KĐT Bắc Linh Đàm, Định Công, Hà Nội', 'Hoàng Mai', 'Liên hệ: Hotline: 0968 850 101 - Website: orihome.com.vn
Điểm cộng: Có trang thiết bị y tế chuyên sâu (máy thở, monitor, oxy). Camera theo dõi 24/24. Chuyên môn hóa cao về quản lý bệnh mãn tính (Parkinson, tiểu đường, vết loét tỳ đè). Đội ngũ điều dưỡng chuyên nghiệp, thái độ tốt.
Google Maps: https://maps.app.goo.gl/fj33g9eaju9gSHdp7', 8.5, 15.0, 'triệu/tháng', '- Khỏe mạnh: 8.5tr (Phòng 5-7); 11tr (Phòng 2); 12tr (Phòng 1).


- Yếu/Liệt: 12tr (Phòng 5-7); 13tr (Phòng 2); 15tr (Phòng 1).


- Bán trú: 500k/ngày.


- Phụ phí Lễ, Tết: Có tính phí.', '', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 4.8, 8, ARRAY['Hỗn hợp', 'Bán trú', 'Camera', 'Nhận tai biến', 'Nhận sa sút trí tuệ']::TEXT[]),
('Dưỡng Lão Tâm Đức', '219 Ngọc Hồi, Văn Điển, Thanh Trì, Hà Nội', 'Thanh Trì', 'Liên hệ: Hotline: 0977 862 899 - Website: vienduonglaotamduc.com
Điểm cộng: Có quy trình thủ tục, hợp đồng rõ ràng. Có vị trí ngay mặt đường Ngọc Hồi, dễ tìm. Một số review (có thể là seeding hoặc khách cũ) khen nhân viên nhiệt tình.
Google Maps: https://maps.app.goo.gl/vBa8iaAWWVwKQYuo9', NULL, NULL, 'triệu/tháng', 'Tiền ký quỹ bắt buộc: 10.000.000 VNĐ (Đóng ngay sau khi ký hợp đồng). Chi phí hàng tháng phụ thuộc vào tình trạng sức khỏe.', 'Vệ sinh nghiêm trọng: tái sử dụng vật tư y tế một lần, lây nhiễm chéo giữa các cụ', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, TRUE, 3.3, 12, ARRAY['Nội trú']::TEXT[]),
('DC CARE - Dưỡng Lão Tại Gia', '26 Ng. 4 P. Phương Mai, Kim Liên, Đống Đa, Hà Nội', 'Đống Đa', 'Liên hệ: Hotline: 0336 539 995 - Website: antamtainha.com
Điểm cộng: Giải quyết tâm lý "không muốn xa nhà" của người già. Linh hoạt theo giờ/lượt. Phân loại công việc cực kỳ chi tiết (chăm sóc thân thể vs hỗ trợ sinh hoạt). Nhân viên y tế được khen là nhanh nhẹn, chuyên nghiệp.
Google Maps: https://maps.app.goo.gl/BYekVGe4z7XHVCPZA', 3.25, 16.59, 'triệu/tháng', '- Báo giá chưa bao gồm 8% VAT.


- Gói tháng 22 ngày (nghỉ T7, CN): 3.2tr (2h/ngày) đến 12tr (8h/ngày).


- Gói tháng 30 ngày: 4.4tr (2h/ngày) đến 16.5tr (8h/ngày).


- Gói thăm theo lượt/ngày: 6tr (Khỏe), 10tr (Yếu), 12tr (Liệt).', 'Review quá ít (dưới 10), điểm 5.0 chưa đủ tin cậy', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, TRUE, 5.0, 7, ARRAY['Tại gia', 'Nhận tai biến']::TEXT[]),
('Viện dưỡng lão Diên Hồng cơ sở 4', 'Xã Ngũ Hiệp, Thanh Trì, Hà Nội (Mã bản đồ: WRJX+PG)', 'Thanh Trì', 'Liên hệ: Hotline: 0968 660 115 - Website: duonglaodienhong.vn
Điểm cộng: Bên trong được đánh giá rộng rãi, khang trang, không có mùi. Tổ chức nhiều hoạt động văn nghệ, thể chất cho các cụ. Có gói chăm sóc ngắn ngày/bán trú linh hoạt.
Google Maps: https://maps.app.goo.gl/GLKnjEjqiMphePkb8', 7.0, 15.0, 'triệu/tháng', '- Phòng tập thể (5-8 giường): 7tr - 8.5tr/tháng.


- Phòng đơn: 13tr - 15tr/tháng.


- Ở ngắn ngày: 250k - 600k/ngày.


- Phí chăm sóc hỗ trợ (tính riêng): Hỗ trợ vệ sinh (1tr-3tr), chăm sóc ổ loét (1tr-2tr), đặt nội khí quản (2tr)...', 'Marketing không khớp thực tế (quảng cáo all-inclusive nhưng có phụ phí)', 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200&auto=format&fit=crop']::TEXT[], TRUE, TRUE, 4.5, 41, ARRAY['Hỗn hợp', 'Bán trú']::TEXT[]),
('Trung Tâm Dưỡng Lão An Dưỡng Việt', 'XP7W+H6G, Dương Kinh, Dương Nội, Hà Đông, Hà Nội', 'Hà Đông', 'Liên hệ: Hotline: 0866 267 699 - Website: anduongviethn.vn
Điểm cộng: Cơ sở vật chất mới, tiện nghi. Chương trình hoạt động cực kỳ phong phú (Yoga, vẽ, thư pháp, giảng pháp). Có bác sĩ viện 103 khám hàng tuần. Mô hình Daycare có xe đưa đón tận nhà. Phân loại gói chăm sóc (Cơ bản, Nâng cao, Đặc biệt) rất rõ ràng.
Google Maps: https://maps.app.goo.gl/MKzgtsY3YYRyJZXv5', 11.0, 18.0, 'triệu/tháng', '- Giá giảm sâu theo kỳ hạn: Ký 1 tháng giá cao, ký 12 tháng giảm tới 3 triệu/tháng.


- Daycare (Ban ngày): 300k - 600k/ngày (tùy số ngày mua trước).


- Chưa bao gồm thuốc, bỉm và các gói trị liệu chuyên sâu.', '', 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 5.0, 16, ARRAY['Hỗn hợp', 'Bán trú', 'Xe đưa đón']::TEXT[]),
('Trung tâm chăm sóc người cao tuổi OriHome (Cơ sở Đại Kim)', 'TT5 Bắc Linh Đàm, Đại Kim, Hoàng Mai, Hà Nội', 'Hoàng Mai', 'Liên hệ: Hotline: 0968 850 101 - Website: orihome.com.vn
Điểm cộng: Cơ sở vật chất tốt, không gian thoáng mát. Nhân viên chăm sóc chu đáo, thân thiện (được xác nhận qua review mới nhất). Quản lý tốt các bệnh mãn tính, có camera 24/24.
Google Maps: https://maps.app.goo.gl/dWhAQ8AB8KNYNcmy9', 8.5, 15.0, 'triệu/tháng', '- Bảng giá đồng bộ với CS1.


- Quy định phụ phí: Tính phụ thu 4 dịp Lễ Tết lớn (Giỗ tổ, 30/4-1/5, 2/9, Tết Dương). Phụ thu Tết Âm lịch báo sau tùy thực tế.', '', 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 4.7, 3, ARRAY['Nội trú', 'Camera']::TEXT[]),
('Viện dưỡng lão Diên Hồng cơ sở 2', 'Khu A2.3 Khu đô thị Thanh Hà Cienco 5, Bình Minh, Hà Nội', 'Thanh Oai ', 'Liên hệ: Hotline: 0981 126 507 - Website: duonglaodienhong.vn
Điểm cộng: Vị trí đắc địa trong KĐT Thanh Hà, không gian xung quanh cực kỳ rộng và thoáng (view bãi đất trống). Có sảnh sinh hoạt vui chơi lớn. Nhân viên điều dưỡng trẻ, năng nổ và nhiệt tình.
Google Maps: https://maps.app.goo.gl/aPT19zzdLkGMGnE7A', 7.0, 15.0, 'triệu/tháng', '(Giống hệ thống Diên Hồng CS4):


- Phòng tập thể: 7tr - 8.5tr.


- Có danh sách Phụ phí y tế/chăm sóc dài dằng dặc (1tr - 3tr/mục).', 'Marketing không khớp thực tế (quảng cáo all-inclusive nhưng có phụ phí)', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop']::TEXT[], TRUE, TRUE, 4.6, 76, ARRAY['Nội trú']::TEXT[]),
('Viện Dưỡng Lão Diên Hồng cơ sở 3', '9 Ngõ 649 Đường Lĩnh Nam, Vĩnh Hưng, Hoàng Mai, Hà Nội', 'Hoàng Mai', 'Liên hệ: Hotline: 0378 450 699 - Website: duonglaodienhong.vn
Điểm cộng: Khuôn viên có nhiều cây xanh cổ thụ (cây thị), không gian sạch đẹp và thoáng mát. Nhân viên điều dưỡng được khen ngợi nhiều về sự vui vẻ, dễ gần và tận tâm.
Google Maps: https://maps.app.goo.gl/gK7JYPHzXPdsJtUUA', 7.0, 15.0, 'triệu/tháng', 'Hệ thống đồng bộ giá với CS2 và CS4.', 'Marketing không khớp thực tế (quảng cáo all-inclusive nhưng có phụ phí)', 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, TRUE, 4.4, 18, ARRAY['Nội trú', 'Xe đưa đón']::TEXT[]),
('Viện dưỡng lão Diên Hồng cơ sở 1', 'U07-L16, KĐT Đô Nghĩa, Yên Nghĩa, Hà Đông, Hà Nội', 'Hà Đông', 'Liên hệ: Hotline: 0338 342 288 - Website: duonglaodienhong.vn
Điểm cộng: Vị trí trong KĐT Đô Nghĩa rất yên tĩnh, thanh bình. Nhân viên trẻ, năng động, nhiệt tình. Có đầy đủ dịch vụ hỗ trợ như xe cấp cứu và điều dưỡng đi kèm khi cần. Các cụ có nhiều hoạt động giao lưu cuối tuần.
Google Maps: https://maps.app.goo.gl/XL4WrrEMhy6veQsBA', 7.0, 15.0, 'triệu/tháng', 'Hệ thống đồng bộ giá toàn chuỗi. Lưu ý: Có review nhắc đến việc "không phụ thu", nhưng cần kiểm chứng lại vì bảng giá chung của hệ thống vẫn có phí hỗ trợ y tế riêng.', '', 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop']::TEXT[], TRUE, FALSE, 4.3, 147, ARRAY['Nội trú']::TEXT[]),
('Dưỡng lão Quốc tế An Bình', 'L13-14 Q01 Khu B, KĐT Dương Nội, Hà Đông, Hà Nội', 'Hà Đông', 'Liên hệ: Hotline: 0398 745 555 - Website: duonglaoanbinh.vn
Điểm cộng: Cơ sở vật chất chuẩn 4 sao. Không gian xanh, sạch sẽ, rộng rãi. Phân loại dịch vụ y tế cực kỳ chuyên nghiệp và rõ ràng. Thích hợp làm nơi "nghỉ dưỡng" cho người già khi con cái đi công tác.
Google Maps: https://maps.app.goo.gl/iv6wHdgG5dniMkFa8', 11.7, 18.0, 'triệu/tháng', '- Chính sách kỳ hạn: Giảm giá mạnh nếu ký 6-12 tháng.


- Chăm sóc giảm nhẹ (Stacking Fee): Tính phí phòng (13.5tr-18tr) CỘNG THÊM phụ phí theo ngày (Giường y tế: 550k/ngày, Monitor: 300k/ngày, Điều dưỡng riêng: 500k/ngày).', '', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 4.7, 20, ARRAY['Nội trú']::TEXT[]),
('Phương Đông Asahi - Phức Hợp Nghỉ Dưỡng Dưỡng Lão', '9 P. Viên, Cổ Nhuế, Đông Ngạc, Bắc Từ Liêm, Hà Nội', 'Bắc Từ Liêm', 'Liên hệ: Hotline: 1900 5288 - Website: phuongdongasahi.vn
Điểm cộng: Cơ sở vật chất đẳng cấp 5 sao. Không gian tĩnh lặng, sạch sẽ, có bể bơi 4 mùa, khu xông tuyết, Jjimjilbang và Onsen chuẩn Nhật. Rất phù hợp để con cái mua gói trải nghiệm cuối tuần cho bố mẹ hoặc chăm sóc sau sinh.
Google Maps: https://maps.app.goo.gl/PKVj4WdHaFj1ZR4S8', 39.0, 54.0, 'triệu/tháng', 'Giá theo tháng: Phòng 4 giường (39tr); Phòng 2 giường (43tr); Phòng 1 giường (54tr).


Giá theo ngày (Short-term/Trải nghiệm): Phòng 4 giường (1.4tr/ngày); Phòng 2 giường (1.6tr/ngày); Phòng 1 giường (2tr/ngày).', '', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', ARRAY['https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1200&auto=format&fit=crop']::TEXT[], FALSE, FALSE, 4.1, 19, ARRAY['Nội trú']::TEXT[]);
