-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hcmut_ssps
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('student','lecturer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `last_used` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1234567,'Trần Trương Tuấn Phát','123456789','lecturer','phat.tran@hcmut.edu.vn',100,'2024-11-29 18:49:21'),(2210420,'Đồng Mạnh Cường','123456789','student','cuong.dong@hcmut.edu.vn',100,'2024-12-02 10:39:52'),(2210969,'Phan Lê Hậu','123456789','student','hau.phan@hcmut.edu.vn',100,'2024-11-29 18:49:21'),(2211878,'Hồ Quang Long','123456789','student','long.ho@hcmut.edu.vn',200,'2024-12-02 10:20:03'),(2212019,'Chắng Quang Minh','123456789','student','minh.chang@hcmut.edu.vn',100,'2024-11-19 10:23:40'),(2212416,'Bùi Phạm Tuyết Nhi','123456789','student','nhi.bui@hcmut.edu.vn',100,'2024-11-29 18:49:21'),(2212645,'Phạm Minh Phúc','123456789','student','phuc.pham@hcmut.edu.vn',100,'2024-11-29 17:55:00'),(2213467,'Trần Đức Thắng','123456789','student','thang.tran@hcmut.edu.vn',100,'2024-11-19 10:23:40'),(2213540,'Trần Quốc Toàn','123456789','student','toan.tran@hcmut.edu.vn',100,'2024-11-29 18:49:21');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_of_pages` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `printer_id` int DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `fk_prter_print_doc` (`printer_id`),
  KEY `fk_user_own_doc` (`user_id`),
  CONSTRAINT `fk_prter_print_doc` FOREIGN KEY (`printer_id`) REFERENCES `printer` (`printer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_user_own_doc` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `print_order`
--

DROP TABLE IF EXISTS `print_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `print_order` (
  `print_id` int NOT NULL AUTO_INCREMENT,
  `side` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `page_size` enum('A4','A3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'A4',
  `orientation` enum('portrait','landscape') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'portrait',
  `pages_per_sheet` int NOT NULL DEFAULT '1',
  `scale` decimal(3,2) NOT NULL DEFAULT '1.00',
  `time_start` datetime DEFAULT CURRENT_TIMESTAMP,
  `time_end` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('success','progress','failed','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `pages_to_be_printed` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_pages_printed` int DEFAULT NULL,
  `document_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`print_id`),
  KEY `fk_doc_printed` (`document_id`),
  KEY `fk_user_print` (`user_id`),
  CONSTRAINT `fk_doc_printed` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_user_print` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `print_order`
--

LOCK TABLES `print_order` WRITE;
/*!40000 ALTER TABLE `print_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `print_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printer`
--

DROP TABLE IF EXISTS `printer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printer` (
  `printer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(4096) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loc_campus` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `loc_building` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loc_room` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('running','disabled','deleted') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'running',
  PRIMARY KEY (`printer_id`),
  UNIQUE KEY `printer_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer`
--

LOCK TABLES `printer` WRITE;
/*!40000 ALTER TABLE `printer` DISABLE KEYS */;
INSERT INTO `printer` VALUES (1,'Máy in 1','Canon','Canon laser LBP6030','Máy in Canon LBP6030 là máy in laser đen trắng với thiết kế nhỏ gọn và hiệu suất hoạt động cao với khả năng in tới 18 trang A4 trên phút. Chất lượng in sắc nét, hoạt động ổn định, bền bỉ và tiết kiệm năng lượng sẽ giúp công việc văn phòng của bạn hiệu quả hơn.','2','B3','101','running'),(2,'Máy in 2','HP','HP Neverstop Laser 1000w (4RY23A)','Máy in HP Neverstop Laser 1000w (4RY23A) là máy in dành cho doanh nghiệp với khoảng 5 người dùng, khối lượng hàng tháng từ 250 – 2500 trang, in nhiều hơn, tiết kiệm hơn, chất lượng đẳng cấp HP.','1','B1','105','running'),(3,'Máy in 3','Canon','Canon PIXMA G1020','Được thiết kế nhằm phục vụ mục đích in ấn số lượng lớn, máy in phun màu đơn năng Canon PIXMA G1020 đem đến sự hỗ trợ đắc lực cho giới văn phòng khi ghi nhận tốc độ in A4 lên đến 9.1 trang mỗi phút. Sản phẩm tương thích với cổng kết nối USB 2.0 và có thể đáp ứng nhu cầu in màu, in ảnh.','1','B2','111','running'),(4,'Máy in 4','Brother','Brother DCP-T720DW Wifi','Máy in phun màu đa năng In-Scan-Copy Brother DCP-T720DW được cài đặt các chức năng in 2 mặt, in wifi, copy và scan. Hơn nữa, là máy in phun màu, ngoài khả năng in đen trắng, máy còn có thể tạo nên những bản in màu tươi tắn. Phục vụ tốt cho nhu cầu in ấn trong gia đình, công ty quy mô nhỏ với tốc độ in ảnh 17 ảnh/phút (đen trắng), 16.5 ảnh/phút (màu), in trang 30 trang/phút (đen trắng), 26 trang/phút (màu). Công suất in đến 2.500 trang/tháng, in màu xuất trang đầu tiên trong 9.5 giây, in đen trắng chỉ trong 6 giây, giúp rút ngắn thời gian xử lý công việc.','1','A2','102','running'),(5,'Máy in 5','RICOH','RICOH AFICIO MP 3352','Máy photocopy Ricoh Aficio  MP 3352 là dòng máy sao chép đã qua sử dụng từ các nước tiên tiến trên thế giới. Khi nhập về Suncorp thay thế những vật tư hao mòn và đã được kiểm tra theo tiêu chuẩn của hãng. Máy có chất lượng và bảo hành được áp dụng tương đương máy mới.','1','A5','105','running');
/*!40000 ALTER TABLE `printer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `status` enum('unpaid','paid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `fk_user_prchse` (`user_id`),
  CONSTRAINT `fk_user_prchse` FOREIGN KEY (`user_id`) REFERENCES `customer` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spso`
--

DROP TABLE IF EXISTS `spso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spso` (
  `spso_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` date NOT NULL DEFAULT (curdate()),
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_used` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`spso_id`),
  UNIQUE KEY `spso_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spso`
--

LOCK TABLES `spso` WRITE;
/*!40000 ALTER TABLE `spso` DISABLE KEYS */;
INSERT INTO `spso` VALUES (1,'Đồng Mạnh Cường','admin1','123456789','2004-01-01','cuong.dong@hcmut.edu.vn','123456789','2024-12-02 10:55:57'),(2,'Phan Lê Hậu','admin2','123456789','2004-01-01','hau.phan@hcmut.edu.vn','123456789','2024-11-29 18:47:31'),(3,'Hồ Quang Long','admin3','123456789','2004-01-01','long.ho@hcmut.edu.vn','123456789','2024-11-29 18:47:31'),(4,'Phạm Minh Phúc','admin4','123456789','2004-01-01','phuc.pham@hcmut.edu.vn','123456789','2024-12-02 01:53:52'),(5,'Trần Đức Thắng','admin5','123456789','2004-01-01','thang.tran@hcmut.edu.vn','123456789','2023-11-29 14:27:45');
/*!40000 ALTER TABLE `spso` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02 11:14:01
