/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.61 : Database - app_cms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`app_cms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `app_cms`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `cid` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '分类ID',
  `title` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '文章标题',
  `pinyin` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章标题拼音头',
  `desc` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '文章描述',
  `content_id` varchar(64) CHARACTER SET utf8 DEFAULT NULL COMMENT '内容ID',
  `img_path` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图片路径',
  `video_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '视频地址',
  `sort` int(11) unsigned DEFAULT NULL COMMENT '排序值',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `article` */

insert  into `article`(`id`,`cid`,`title`,`pinyin`,`desc`,`content_id`,`img_path`,`video_url`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('cjftl08l2000148g7rap089nh','cjfmhuxyx000064g7k0s1k043','商品名称1',NULL,'商品名称1商品名称1','cjftl08l0000048g780hz8nwh','/uploads/article/20180410072725_2834.jpg',NULL,11,'2018-04-11 00:00:00','2018-04-10 07:27:35','1','0'),('cjg27ytjd0001fog781azs663','cjg1ner990001bwg73bolrm2t','asdasd',NULL,'asd','cjg27ytjb0000fog7ur457gf6','/uploads/article/20180416083222_6951.png',NULL,11,'2018-04-16 08:32:29','2018-04-16 08:32:29','1','0'),('cjgbouy7u000160g7ixhniynm','cjfmhuxyx000064g7k0s1k043','qwe',NULL,'qwe','cjgbouy7u000060g7ydn5vwua','',NULL,11,'2018-04-23 11:35:18','2018-04-23 11:35:17','1','0'),('cjgbovg40000360g7qnnjkz0n','cjfmhuxyx000064g7k0s1k043','qweqwe',NULL,'qweqwe','cjgbovg3x000260g78pxi0aau','/uploads/article/20180423113535_7415.jpg',NULL,22,'2018-04-19 00:00:00','2018-04-23 11:35:41','1','0'),('cjiny0msy0001okg76zsthy9g','cjfmhuxyx000064g7k0s1k043','qwe',NULL,'qwe','cjiny0msy0000okg7c0dkbb76','',NULL,NULL,'2018-06-21 10:44:18','2018-06-21 10:44:18','1','0'),('cjiny1y3b0001u4g70qvyv6zf','cjfmhuxyx000064g7k0s1k043','qwe',NULL,'qwe','cjiny1y3b0000u4g7d10l1usl','',NULL,NULL,'2018-06-21 10:45:19','2018-06-21 10:45:19','1','0'),('cjinycitd0001b0g7z9c3zplr','cjfo02td80000w0g7gi0kwth7','asd',NULL,'asd','cjinycitd0000b0g77d55qzya','',NULL,10,'2018-06-21 10:53:33','2018-06-21 10:53:33','1','0'),('cjinzkq2g0001z4g7813g4r22','cjg1ner990001bwg73bolrm2t','eee',NULL,'eee','cjinzkq2e0000z4g7n6czeouy','',NULL,32,'2018-06-21 11:27:55','2018-06-21 11:27:55','1','0');

/*Table structure for table `classify` */

DROP TABLE IF EXISTS `classify`;

CREATE TABLE `classify` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `pid` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '父级ID',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '分类名称',
  `desc` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '分类描述',
  `url` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '分类url',
  `img_size` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '封面图尺寸',
  `sort` int(11) unsigned DEFAULT NULL COMMENT '排序',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `classify` */

insert  into `classify`(`id`,`pid`,`name`,`desc`,`url`,`img_size`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('cjfmgw89k0000akg7ddv3xu0b','0','新闻中心','','/news','',10,'2018-04-14 03:31:46','2018-04-05 07:58:06','1','0'),('cjfmhuxyx000064g7k0s1k043','cjfmgw89k0000akg7ddv3xu0b','新闻11','','/news/one','400*300',12,'2018-06-21 12:15:06','2018-04-05 08:25:05','1','0'),('cjfo02td80000w0g7gi0kwth7','cjfmgw89k0000akg7ddv3xu0b','新闻2','qwe','/news/two','300*160',11,'2018-04-06 09:46:19','2018-04-06 09:42:52','1','0'),('cjg1ndg5u0000bwg77p27ldhq','0','产品中心','','/product','',20,'2018-04-16 10:56:19','2018-04-16 10:56:00','1','0'),('cjg1ner990001bwg73bolrm2t','cjg1ndg5u0000bwg77p27ldhq','产品分类1','','/product/pro1','500*360',21,'2018-04-16 10:57:01','2018-04-16 10:57:01','1','0');

/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `content` longtext CHARACTER SET utf8 COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `content` */

insert  into `content`(`id`,`content`) values ('2','aaa'),('5','aaa'),('6','aaa'),('7','aaa'),('cjftl08l0000048g780hz8nwh','<p class=\"ql-align-center\">商品名称1<img src=\"data:image/png;base64,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\" width=\"339\" style=\"display: block; margin: auto; cursor: nwse-resize;\"></p>'),('cjg27ytjb0000fog7ur457gf6','<p>asd</p>'),('cjgbouy7u000060g7ydn5vwua','<p>qwe</p>'),('cjgbovg3x000260g78pxi0aau','<p>qweqwe</p>'),('cjiny0msy0000okg7c0dkbb76','<p>qwe</p>'),('cjiny1y3b0000u4g7d10l1usl','<p>qwe</p>'),('cjinycitd0000b0g77d55qzya','<p>asd</p>'),('cjinzkq2e0000z4g7n6czeouy','<p>eee</p>');

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `pid` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '父级ID',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '菜单名称',
  `desc` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '菜单描述',
  `url` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT 'hash值',
  `icon` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '图标名',
  `sort` int(11) unsigned DEFAULT NULL COMMENT '排序',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `menu` */

insert  into `menu`(`id`,`pid`,`name`,`desc`,`url`,`icon`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('1fd9992b-8a78-4fb2-a1a3-3c01bf135200','0','系统信息','','/system','appstore',10,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('3c087840-9a3a-442a-a315-bed22c78815e','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','角色管理','','/system/role','',11,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('44abfa1d-24ca-45cc-b627-f652e3d6e5e8','0','首页','','/home','home',1,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('4b3f9a42-6425-490e-b7ff-ca42103d3f72','0','网站信息','','/site','setting',20,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('6725294a-c2af-4c06-9a18-045fdc9c6b33','4b3f9a42-6425-490e-b7ff-ca42103d3f72','分类管理','','/site/classify','',22,'2019-03-26 15:22:12','2018-04-02 07:35:25','1','0'),('6c4c1d96-9ade-4eb7-a4fb-c5a2ec8bf264','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','权限管理','','/system/permission','',14,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('6f8f7e9d-119d-417b-a2b1-d6a4f5462dd8','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','用户管理','','/system/user','',12,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0'),('d4d35841-bfdf-4d79-a1fd-019f7597f3e7','4b3f9a42-6425-490e-b7ff-ca42103d3f72','文章管理','','/site/article','',23,'2019-03-26 15:22:14','2018-04-02 07:35:25','1','0'),('d9b04ca0-9e9c-4619-90dd-a49e39e21c87','4b3f9a42-6425-490e-b7ff-ca42103d3f72','站点管理','','/site/web','',21,'2019-03-26 15:22:09','2018-04-02 07:35:25','1','0'),('e8b1c555-fa66-4ac7-8db6-8d27cb385bd1','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','菜单管理','','/system/menu','',13,'2018-04-03 10:44:38','2018-04-02 07:35:25','1','0');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名',
  `desc` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色描述',
  `sort` int(11) unsigned DEFAULT NULL COMMENT '排序',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`desc`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('1','超级管理员','超级管理员',1,'2019-03-26 22:00:56','2019-03-26 15:14:41','1','0'),('24567e6c-dd7c-4021-bd1f-c73fcbe86d27','1','1',11,'2019-03-27 09:57:24','2019-03-27 09:56:57','1','0');

/*Table structure for table `role_menu` */

DROP TABLE IF EXISTS `role_menu`;

CREATE TABLE `role_menu` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `menu_id` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '菜单ID',
  `role_id` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '角色ID',
  `access` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT '权限，0无，1有',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者，user id',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `role_menu` */

insert  into `role_menu`(`id`,`menu_id`,`role_id`,`access`,`creator`,`modify_time`,`create_time`) values ('013d52c2-acb5-4550-97b5-dd448d009b06','d9b04ca0-9e9c-4619-90dd-a49e39e21c87','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('33858def-eb05-4757-a782-9305729a4817','d4d35841-bfdf-4d79-a1fd-019f7597f3e7','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('54e27ded-0576-4a59-be77-60649319b5f1','6c4c1d96-9ade-4eb7-a4fb-c5a2ec8bf264','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('5f1b7ecb-c039-483d-8ed4-098e44704e65','e8b1c555-fa66-4ac7-8db6-8d27cb385bd1','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('7f4d3e2b-aef4-43cb-9863-1b15bcbdc6f0','3c087840-9a3a-442a-a315-bed22c78815e','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('92e83149-4b4d-45f3-a757-4a964180859e','6725294a-c2af-4c06-9a18-045fdc9c6b33','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('97b6c2fb-a5c5-4a6a-898e-45acda3b14cb','44abfa1d-24ca-45cc-b627-f652e3d6e5e8','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('d2325994-6b7d-42db-adef-1cf68ac1b3fc','6f8f7e9d-119d-417b-a2b1-d6a4f5462dd8','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('ec31eed7-0134-4f99-b4e8-8e35a1b80cf8','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28'),('f0d4b552-8a4d-45ea-8950-519db9d0b48b','4b3f9a42-6425-490e-b7ff-ca42103d3f72','1','1','1','2018-07-18 11:56:28','2018-07-18 11:56:28');

/*Table structure for table `site_config` */

DROP TABLE IF EXISTS `site_config`;

CREATE TABLE `site_config` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `domain` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站域名',
  `title` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站标题',
  `keywords` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站关键字',
  `description` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站描述',
  `copy` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '版权所有',
  `address` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '公司地址',
  `telephone` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '电子邮箱',
  `records` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '备案信息',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `site_config` */

insert  into `site_config`(`id`,`domain`,`title`,`keywords`,`description`,`copy`,`address`,`telephone`,`email`,`records`,`modify_time`,`create_time`,`creator`,`deleted`) values ('cjfqd71770000kkg79e8q97w4','http://127.0.0.1:2080','qwe','qwe','qwe','qwe','qwe','1,24','qwe@163.com','qwe','2018-04-08 01:25:36','2018-04-08 01:25:36','1','0');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '登录名',
  `password` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '登录密码',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '用户姓名',
  `pinyin` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '拼音头',
  `sex` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '性别',
  `phone` varchar(11) CHARACTER SET utf8 DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '邮箱',
  `sort` int(11) unsigned DEFAULT NULL COMMENT '排序',
  `role_id` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '角色id',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`name`,`pinyin`,`sex`,`phone`,`email`,`sort`,`role_id`,`modify_time`,`create_time`,`deleted`) values ('1','qwe','3675ac5c859c806b26e02e6f9fd62192','大海','dh','0','13012345678','123456@163.com',NULL,'1','2018-03-31 02:08:37','2019-03-26 15:11:16','0');

/* Procedure structure for procedure `ii` */

/*!50003 DROP PROCEDURE IF EXISTS  `ii` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `ii`()
BEGIN
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
