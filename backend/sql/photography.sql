/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80016 (8.0.16)
 Source Host           : localhost:3306
 Source Schema         : photography

 Target Server Type    : MySQL
 Target Server Version : 80016 (8.0.16)
 File Encoding         : 65001

 Date: 22/02/2025 15:03:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES (1, 'admin', '123456', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');

-- ----------------------------
-- Table structure for carousels
-- ----------------------------
DROP TABLE IF EXISTS `carousels`;
CREATE TABLE `carousels`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carousels
-- ----------------------------
INSERT INTO `carousels` VALUES (13, '/images/1740151422378-è½®æ­å¾1.png', 1, '2025-02-21 23:23:43');
INSERT INTO `carousels` VALUES (14, '/images/1740151434039-è½®æ­å¾2.png', 1, '2025-02-21 23:23:56');
INSERT INTO `carousels` VALUES (15, '/images/1740151441912-è½®æ­å¾3.png', 1, '2025-02-21 23:24:04');
INSERT INTO `carousels` VALUES (16, '/images/1740151452080-è½®æ­å¾4.png', 0, '2025-02-21 23:24:16');
INSERT INTO `carousels` VALUES (17, '/images/1740151463349-è½®æ­å¾5.png', 0, '2025-02-21 23:24:26');
INSERT INTO `carousels` VALUES (18, '/images/1740151477699-è½®æ­å¾6.png', 0, '2025-02-21 23:24:38');
INSERT INTO `carousels` VALUES (19, '/images/1740151489113-è½®æ­å¾7.png', 1, '2025-02-21 23:24:50');
INSERT INTO `carousels` VALUES (20, '/images/1740151499651-è½®æ­å¾8.png', 1, '2025-02-21 23:25:00');

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资讯标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资讯内容',
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否展示，1表示展示，0表示不展示',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '资讯表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES (2, '《春日花海约拍，定格最美瞬间》', '在这个春意盎然的季节，花海成为了绝佳的拍摄背景。<br>专业摄影师团队诚邀您参与春日花海约拍活动。<br>我们会根据您的风格喜好，为您量身打造拍摄方案。<br>无论是清新文艺风，还是甜美可爱风，都能在花海中完美呈现。<br>让我们一起在花的海洋里，定格下您最美的瞬间。', 0, '2025-02-21 05:25:14');
INSERT INTO `information` VALUES (3, '《复古小巷约拍，邂逅旧时光》', '城市中的复古小巷，充满了岁月的痕迹。<br>现在开启复古小巷约拍活动。<br>摄影师擅长捕捉复古氛围，利用光影勾勒出独特的画面。<br>您可以穿上复古服饰，漫步在小巷中，仿佛穿越回了旧时光。<br>这次约拍，将为您留下一段充满故事的影像记忆。', 0, '2025-02-21 05:34:22');
INSERT INTO `information` VALUES (4, '《海边夕阳约拍，浪漫氛围拉满》', '夕阳西下，海边的景色美得令人窒息。<br>我们提供海边夕阳约拍服务。<br>在金色的余晖中，海浪轻轻拍打着沙滩。<br>摄影师会抓住每一个浪漫的瞬间，为您拍摄出极具氛围感的照片。<br>和心爱的人一起，在海边留下浪漫的回忆吧。', 0, '2025-02-21 05:34:38');
INSERT INTO `information` VALUES (5, '《校园青春约拍，留住美好回忆》', '校园是青春的摇篮，充满了无数美好的回忆。<br>现推出校园青春约拍活动。<br>专业摄影师熟悉校园的每一个角落，知道哪里最适合拍摄。<br>无论是教室、操场还是图书馆，都能成为您青春影像的背景。<br>快来约拍，留住这段难忘的校园时光。', 0, '2025-02-21 05:34:54');
INSERT INTO `information` VALUES (6, '《森林童话约拍，开启奇幻之旅》', '神秘的森林，宛如童话世界一般。<br>我们的森林童话约拍服务正式上线。<br>摄影师会运用独特的拍摄技巧，营造出奇幻的氛围。<br>您可以化身童话中的角色，在森林里展开一场奇幻之旅。<br>让这些照片带您走进梦幻的童话世界。', 0, '2025-02-21 05:35:12');
INSERT INTO `information` VALUES (7, '《夜景璀璨约拍，点亮城市之光》', '城市的夜景总是那么璀璨迷人。<br>现在提供夜景璀璨约拍服务。<br>摄影师擅长利用夜景的灯光和建筑，打造出炫酷的照片效果。<br>无论是繁华的商业街，还是宁静的河畔，都能拍出令人惊艳的夜景照片。<br>来一场夜景约拍，点亮属于您的城市之光。', 1, '2025-02-21 05:35:29');
INSERT INTO `information` VALUES (8, '《汉服古风约拍，展现东方韵味》', '汉服之美，美在千年文化的沉淀。<br>我们推出汉服古风约拍活动。<br>专业的造型师会为您打造精美的汉服造型，摄影师会捕捉您的古风神韵。<br>在古色古香的园林或建筑中，展现出独特的东方韵味。<br>穿上汉服，来一场穿越时空的约拍吧。', 1, '2025-02-21 05:35:49');
INSERT INTO `information` VALUES (9, '《亲子温馨约拍，记录家庭温暖》', '亲子时光总是那么温馨而珍贵。<br>现开启亲子温馨约拍服务。<br>摄影师善于捕捉亲子间的互动瞬间，用镜头记录下家庭的温暖。<br>无论是在家里、公园还是游乐场，都能为您拍摄出充满爱的照片。<br>快来约拍，让这份温馨永远留存。', 1, '2025-02-21 05:36:07');
INSERT INTO `information` VALUES (10, '《宠物可爱约拍，萌趣瞬间不容错过》', '可爱的宠物是生活中的小天使。<br>我们提供宠物可爱约拍服务。<br>摄影师会用耐心和技巧，捕捉宠物们的萌趣瞬间。<br>无论是活泼的小狗，还是慵懒的小猫，都能成为镜头下的明星。<br>带着您的宠物来约拍，留下它们可爱的模样。', 1, '2025-02-21 05:36:21');
INSERT INTO `information` VALUES (11, '《工业风约拍，诠释个性魅力》', '工业风的建筑和环境，充满了个性和时尚感。<br>现在推出工业风约拍活动。<br>摄影师会利用工业元素，为您拍摄出具有独特风格的照片。<br>您可以展现出自己的个性魅力，在工业风的背景下，成为最耀眼的存在。<br>快来参与工业风约拍，诠释属于您的个性。', 0, '2025-02-21 05:36:35');

-- ----------------------------
-- Table structure for sample_photos
-- ----------------------------
DROP TABLE IF EXISTS `sample_photos`;
CREATE TABLE `sample_photos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `sample_photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sample_photos
-- ----------------------------
INSERT INTO `sample_photos` VALUES (8, 19, '《都市霓虹时尚魅影》', '1. 模特身着闪亮的银色晚礼服，在都市街头的霓虹灯映照下，散发出迷人的时尚气息。<br>2. 背景是繁华的商业街，五彩斑斓的灯光与模特的身姿相互映衬，营造出独特的视觉效果。<br>3. 模特的表情自信且冷艳，展现出都市女性的独立与魅力。', '[{\"size\":961753,\"type\":\"image\",\"url\":\"/images/1740154169586-YNosu2fGPB3v0ad8cd6918184592aa2f4a56f77be380.png\",\"thumb\":\"http://tmp/YNosu2fGPB3v0ad8cd6918184592aa2f4a56f77be380.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":993660,\"type\":\"image\",\"url\":\"/images/1740154169624-qpbC5w0NEEsT6c4bcb1042478f54fef8d73b9e354424.png\",\"thumb\":\"http://tmp/qpbC5w0NEEsT6c4bcb1042478f54fef8d73b9e354424.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":977237,\"type\":\"image\",\"url\":\"/images/1740154169655-eohIBrV8AjzL9602572486b29310b9a110edbf91a074.png\",\"thumb\":\"http://tmp/eohIBrV8AjzL9602572486b29310b9a110edbf91a074.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 00:09:37');
INSERT INTO `sample_photos` VALUES (9, 19, '《森林精灵的梦幻之约》', '1. 模特化身森林精灵，穿着绿色的纱质裙装，穿梭在郁郁葱葱的森林中。<br>2. 阳光透过树叶的缝隙洒在模特身上，形成斑驳的光影，增添了梦幻的氛围。<br>3. 模特的眼神灵动，仿佛与森林中的万物交流，展现出大自然的和谐之美。', '[{\"size\":906787,\"type\":\"image\",\"url\":\"/images/1740154618390-rtb4r48NUYMGebc5dfb4e3f449d5a8c7ea98f6f67769.png\",\"thumb\":\"http://tmp/rtb4r48NUYMGebc5dfb4e3f449d5a8c7ea98f6f67769.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":907565,\"type\":\"image\",\"url\":\"/images/1740154618460-rhKCt5rtecpb05f3f417f370852ead0cecc06523e461.png\",\"thumb\":\"http://tmp/rhKCt5rtecpb05f3f417f370852ead0cecc06523e461.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":920881,\"type\":\"image\",\"url\":\"/images/1740154618487-V8CqHQ2qr0UDd36dedd4201717bda295b57bf84e34a3.png\",\"thumb\":\"http://tmp/V8CqHQ2qr0UDd36dedd4201717bda295b57bf84e34a3.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 00:17:07');
INSERT INTO `sample_photos` VALUES (10, 19, '《海边落日下的浪漫邂逅》', '1. 模特与伴侣手牵手漫步在金色的沙滩上，背后是橙红色的落日余晖。<br>2. 海浪轻轻拍打着沙滩，泛起白色的浪花，为画面增添了浪漫的元素。<br>3. 模特们的笑容灿烂，彼此深情对望，传递出浓浓的爱意。', '[{\"size\":869133,\"type\":\"image\",\"url\":\"/images/1740157401730-zlEeLD7Y6qWm43dd58b60c9355d3a9a57bfdfaf1adc2.png\",\"thumb\":\"http://tmp/zlEeLD7Y6qWm43dd58b60c9355d3a9a57bfdfaf1adc2.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":853757,\"type\":\"image\",\"url\":\"/images/1740157401766-2zdIlad4Gebc7338f11d73dbc95c097451a3fdc2d5c2.png\",\"thumb\":\"http://tmp/2zdIlad4Gebc7338f11d73dbc95c097451a3fdc2d5c2.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 01:03:31');
INSERT INTO `sample_photos` VALUES (11, 19, '《复古舞会》', '1. 模特穿着华丽的复古舞会长裙，头戴精致的发饰，仿佛穿越回了旧时光。<br>2. 舞会现场的水晶吊灯、华丽的装饰和古典的音乐，营造出优雅的氛围。<br>3. 模特在舞池中翩翩起舞，身姿轻盈，展现出复古时代的贵族气质。', '[{\"size\":889053,\"type\":\"image\",\"url\":\"/images/1740157601133-tKbByldmZaDO35862209b03caed54190a318d52c7916.png\",\"thumb\":\"http://tmp/tKbByldmZaDO35862209b03caed54190a318d52c7916.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":858611,\"type\":\"image\",\"url\":\"/images/1740157601181-AYOW725lYr0O5e73ec8fa673a2e7d02e952292466527.png\",\"thumb\":\"http://tmp/AYOW725lYr0O5e73ec8fa673a2e7d02e952292466527.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 01:06:52');
INSERT INTO `sample_photos` VALUES (12, 19, '《雪山之巅的勇者风采》', '1. 模特身着专业的登山装备，站在雪山之巅，背后是连绵的雪山和湛蓝的天空。<br>2. 狂风呼啸，雪花飞舞，但模特的眼神坚定，展现出无畏的勇气和坚韧的精神。<br>3. 画面中强烈的光影对比，突出了雪山的壮丽和模特的英姿。', '[{\"size\":847578,\"type\":\"image\",\"url\":\"/images/1740158170823-J1Ja3hxsS7j71a8b01cd646501896d1e3393065ffc45.png\",\"thumb\":\"http://tmp/J1Ja3hxsS7j71a8b01cd646501896d1e3393065ffc45.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":896247,\"type\":\"image\",\"url\":\"/images/1740158170864-6DUSe2YCTkwu4f014b4a2a7b2ad335da24f8f68379f1.png\",\"thumb\":\"http://tmp/6DUSe2YCTkwu4f014b4a2a7b2ad335da24f8f68379f1.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":848605,\"type\":\"image\",\"url\":\"/images/1740158170900-MprzDutG2SRId821be67042e42e6595120c16c896047.png\",\"thumb\":\"http://tmp/MprzDutG2SRId821be67042e42e6595120c16c896047.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":852270,\"type\":\"image\",\"url\":\"/images/1740158170931-tEWxMsPDGxjW420fcf3f0bde455e8384d381c4cf7142.png\",\"thumb\":\"http://tmp/tEWxMsPDGxjW420fcf3f0bde455e8384d381c4cf7142.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 01:16:21');
INSERT INTO `sample_photos` VALUES (13, 19, '《花海中的甜美少女》', '1. 模特置身于五彩斑斓的花海中，脸上洋溢着甜美的笑容。<br>2. 各种花卉竞相开放，花香四溢，模特与花朵相互衬托，构成了一幅美丽的画卷。<br>3. 模特的动作自然而俏皮，展现出青春少女的活力与纯真。', '[{\"size\":1155853,\"type\":\"image\",\"url\":\"/images/1740158462689-NA5koBaLSidJ9d9e2110b5cc85d109229884c7b4eac8.png\",\"thumb\":\"http://tmp/NA5koBaLSidJ9d9e2110b5cc85d109229884c7b4eac8.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":999534,\"type\":\"image\",\"url\":\"/images/1740158462796-uxLwGFA5xkkGa674659d59bfcbf8752deaecf1cb19e5.png\",\"thumb\":\"http://tmp/uxLwGFA5xkkGa674659d59bfcbf8752deaecf1cb19e5.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":1178465,\"type\":\"image\",\"url\":\"/images/1740158462828-tqXZrjKMGBMga4a82e424cf25cbee21c3351dbc1f7f9.png\",\"thumb\":\"http://tmp/tqXZrjKMGBMga4a82e424cf25cbee21c3351dbc1f7f9.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 01:21:11');
INSERT INTO `sample_photos` VALUES (14, 19, '《夜市烟火中的生活百态》', '1. 模特在热闹的夜市中穿梭，周围是各种小吃摊、手工艺品店和熙熙攘攘的人群。<br>2. 夜市的灯光和烟火气，构成了一幅充满生活气息的画面。<br>3. 模特时而品尝美食，时而挑选商品，展现出普通人的生活乐趣。', '[{\"size\":928748,\"type\":\"image\",\"url\":\"/images/1740159420980-Iv6NaeRhjc0Ua3027c857145a1140f10ce3eaeb96ce6.png\",\"thumb\":\"http://tmp/Iv6NaeRhjc0Ua3027c857145a1140f10ce3eaeb96ce6.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":897491,\"type\":\"image\",\"url\":\"/images/1740159421039-0oTUJPsUQLkt7ae2e826eb0f1ecdf317c41498201863.png\",\"thumb\":\"http://tmp/0oTUJPsUQLkt7ae2e826eb0f1ecdf317c41498201863.png\",\"status\":\"success\",\"message\":\"\"},{\"size\":956264,\"type\":\"image\",\"url\":\"/images/1740159421171-wX1ITmVVjnUr04c42a680d617cd58cede928c25faeeb.png\",\"thumb\":\"http://tmp/wX1ITmVVjnUr04c42a680d617cd58cede928c25faeeb.png\",\"status\":\"success\",\"message\":\"\"}]', '2025-02-22 01:37:33');

-- ----------------------------
-- Table structure for shooting_demands
-- ----------------------------
DROP TABLE IF EXISTS `shooting_demands`;
CREATE TABLE `shooting_demands`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `target` enum('模特','摄影师') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shooting_time` datetime NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cost` decimal(10, 2) NOT NULL,
  `requirement` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `shooting_demands_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shooting_demands
-- ----------------------------
INSERT INTO `shooting_demands` VALUES (10, 19, '模特', '2025-02-25 11:00:00', '艺术公园内的复古庭院', 2000.00, '1. 拍摄风格为复古文艺风，突出模特与复古庭院的融合。<br>2. 至少拍摄 200 张照片，精修 30 张。<br>3. 拍摄过程中要及时与模特和需求方沟通拍摄角度和表情指导。', '2025-02-21 23:44:17');
INSERT INTO `shooting_demands` VALUES (11, 19, '模特', '2025-03-20 11:50:00', '海边的礁石区', 1500.00, '1. 模特形象甜美、气质佳，能适应海边的拍摄环境。<br>2. 配合摄影师完成不同姿势和表情的拍摄，展现出自然的美感。<br>3. 拍摄一套清新自然风格的照片，重点突出模特与大海的融合。', '2025-02-21 23:53:51');
INSERT INTO `shooting_demands` VALUES (12, 19, '摄影师', '2025-04-01 09:00:00', '繁华商业街的夜景街道', 2500.00, '1. 拍摄风格为时尚夜景风，捕捉模特在夜景中的独特魅力。<br>2. 运用灯光和色彩营造出氛围感，至少拍摄 150 张照片，精修 25 张。<br>3. 能够根据商业街的环境特点，设计出不同的拍摄场景和动作。', '2025-02-21 23:55:01');
INSERT INTO `shooting_demands` VALUES (13, 19, '摄影师', '2025-04-04 16:00:00', '古老的寺庙前', 1800.00, '1. 模特穿着古装，展现出古典气质。<br>2. 在寺庙的环境中，拍摄出宁静、祥和的感觉。<br>3. 配合摄影师的创意，完成不同角度和姿势的拍摄。', '2025-02-21 23:56:54');
INSERT INTO `shooting_demands` VALUES (14, 19, '摄影师', '2025-04-10 13:00:00', '大型游乐园内', 2200.00, '1. 拍摄风格为欢快活泼风，捕捉模特在游乐园的快乐瞬间。<br>2. 拍摄过程中要注意游乐园的设施和氛围的融入，至少拍摄 220 张照片，精修 35 张。<br>3. 能够引导模特展现出不同的表情和动作，使照片更具感染力。', '2025-02-21 23:57:43');
INSERT INTO `shooting_demands` VALUES (15, 19, '模特', '2025-06-11 13:00:00', '森林深处', 1600.00, '1. 模特身体素质较好，能够适应森林的环境。<br>2. 拍摄自然清新风格的照片，突出模特与森林的和谐统一。<br>3. 配合摄影师的要求，在森林中寻找合适的拍摄场景。', '2025-02-21 23:58:54');
INSERT INTO `shooting_demands` VALUES (16, 19, '摄影师', '2025-06-04 07:00:00', '山顶观景台', 2300.00, '1. 拍摄风格为浪漫星空风，利用山顶的夜景和星空进行拍摄。<br>2. 具备夜景拍摄和星空摄影的专业技能，至少拍摄 180 张照片，精修 30 张。<br>3. 能够根据山顶的环境和天气条件，调整拍摄参数和创意。', '2025-02-21 23:59:40');
INSERT INTO `shooting_demands` VALUES (17, 19, '模特', '2025-04-07 13:00:00', '花卉种植园', 1700.00, '1. 模特形象清新，与花卉的氛围相融合。<br>2. 拍摄出花卉与模特的美丽画面，展现出自然的生机和美感。<br>3. 配合摄影师的构图和创意，完成不同角度的拍摄。', '2025-02-22 00:00:47');
INSERT INTO `shooting_demands` VALUES (18, 19, '摄影师', '2025-07-11 19:00:00', '工业废弃工厂', 2100.00, '1. 拍摄风格为工业废墟风，突出工厂的沧桑和模特的个性。<br>2. 利用工厂的废旧设备和建筑结构进行创意拍摄，至少拍摄 160 张照片，精修 25 张。<br>3. 能够引导模特在工业环境中展现出独特的气质和姿态。', '2025-02-22 00:02:02');
INSERT INTO `shooting_demands` VALUES (19, 19, '模特', '2025-06-03 14:00:00', '水上公园', 1800.00, '1. 模特擅长水上活动，能够在水中自然地表现。<br>2. 拍摄出模特在水上公园的欢乐场景，体现出活力和动感。<br>3. 配合摄影师的拍摄节奏，完成不同动作和表情的拍摄。', '2025-02-22 01:33:50');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('模特','摄影师') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (13, '张三', '123456', '模特', '13286495217', 0, '/images/1740151736221-Te2voBZ0broA67cb88df59b7d96e500ca5f5d27923fd.png', '2025-02-21 23:28:58');
INSERT INTO `users` VALUES (14, '李四', '123456', '摄影师', '15864795621', 0, '/images/1740151777715-siCzSMFVXFKM97a1dac5475818ff756f0b7c97a0eaf2.png', '2025-02-21 23:29:40');
INSERT INTO `users` VALUES (15, '王五', '123456', '模特', '13287645873', 0, '/images/1740151811206-PGLaakladuKhccac35093a3d528ade561e1aaa4fea94.png', '2025-02-21 23:30:12');
INSERT INTO `users` VALUES (16, '陈其', '111111', '模特', '15169744689', 0, '/images/1740151874728-ptQ7lh7xCha9565812ea28708d1b11aa8e35dd45224d.png', '2025-02-21 23:31:17');
INSERT INTO `users` VALUES (17, '黄巴', '123456', '摄影师', '13806475214', 0, '/images/1740151930065-gwnwSGg8GLyNa98f19293ca2a9332bc8e76cdbc17ca9.png', '2025-02-21 23:32:12');
INSERT INTO `users` VALUES (18, '蔡旧', '123456', '摄影师', '15816794268', 0, '/images/1740151984062-VzhdOnu6Ubq09bf512adf729c0a91b35b46526bbb61c.png', '2025-02-21 23:33:05');
INSERT INTO `users` VALUES (19, '王常', '123456', '模特', '17795466834', 1, '/images/1740152070181-GML2ykUhgEwQ807d24cff33499e09041ef64dfbefdbe.png', '2025-02-21 23:34:31');
INSERT INTO `users` VALUES (20, '陈成', '123456', '摄影师', '17794566892', 0, '/images/1740152111834-qWBO5BDR6Lldc30b46d6f655f889a8cbccd12c568e53.png', '2025-02-21 23:35:13');
INSERT INTO `users` VALUES (21, '李丽', '111111', '摄影师', '15816479532', 0, '/images/1740152138365-V1fryWLpjcOHba9cb32f4cf7b9497761bafceefbb76b.png', '2025-02-21 23:35:40');
INSERT INTO `users` VALUES (22, '东方', '123456', '模特', '15104577964', 0, '/images/1740159941718-qteDYagEjoh976afb61c8b00df42b79634c6ad29af66.png', '2025-02-22 01:46:17');

SET FOREIGN_KEY_CHECKS = 1;
