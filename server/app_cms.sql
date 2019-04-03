/*
SQLyog Ultimate v12.08 (32 bit)
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
  `views` int(11) unsigned DEFAULT NULL COMMENT '浏览量',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '创建者ID',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `article` */

insert  into `article`(`id`,`cid`,`title`,`pinyin`,`desc`,`content_id`,`img_path`,`video_url`,`sort`,`views`,`modify_time`,`create_time`,`creator`,`deleted`) values ('a9b7dacb-4952-4b88-a043-104ad8d9e6be','cjfo02td80000w0g7gi0kwth7','商品名称','spmc','','fd257e84-edb8-4612-99ee-efef742cebc4','','',1,10,'2019-04-03 20:14:15','2019-04-03 20:14:15','1','0');

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

insert  into `classify`(`id`,`pid`,`name`,`desc`,`url`,`img_size`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('cjfmgw89k0000akg7ddv3xu0b','0','新闻中心','','/news','',10,'2019-04-03 20:13:14','2018-04-05 07:58:06','1','0'),('cjfmhuxyx000064g7k0s1k043','cjfmgw89k0000akg7ddv3xu0b','资讯','','/news/zx','300*200',12,'2019-04-03 20:08:06','2018-04-05 08:25:05','1','0'),('cjfo02td80000w0g7gi0kwth7','cjfmgw89k0000akg7ddv3xu0b','热点','','/news/hot','300*200',11,'2019-04-03 20:08:02','2018-04-06 09:42:52','1','0'),('cjg1ndg5u0000bwg77p27ldhq','0','产品中心','','/product','',20,'2019-04-03 20:13:21','2018-04-16 10:56:00','1','0'),('cjg1ner990001bwg73bolrm2t','cjg1ndg5u0000bwg77p27ldhq','最新上架','','/product/new','300*200',21,'2019-04-03 20:08:20','2018-04-16 10:57:01','1','0'),('e88cf700-3990-4c54-a409-042a9b6cd325','cjg1ndg5u0000bwg77p27ldhq','优惠商品','','/product/yh','300*200',22,'2019-04-03 20:08:24','2019-04-03 19:10:58','1','0');

/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `content` longtext CHARACTER SET utf8 COMMENT '内容',
  `deleted` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `content` */

insert  into `content`(`id`,`content`,`deleted`) values ('fd257e84-edb8-4612-99ee-efef742cebc4','<p>商品名称</p>','0');

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

insert  into `role`(`id`,`name`,`desc`,`sort`,`modify_time`,`create_time`,`creator`,`deleted`) values ('1','超级管理员','超级管理员',1,'2019-03-26 22:00:56','2019-03-26 15:14:41','1','0'),('24567e6c-dd7c-4021-bd1f-c73fcbe86d27','网站编辑','网站编辑',2,'2019-04-03 18:59:09','2019-03-27 09:56:57','1','0');

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

insert  into `role_menu`(`id`,`menu_id`,`role_id`,`access`,`creator`,`modify_time`,`create_time`) values ('01f1b550-5c1a-4923-ae0d-bb657e9ce14a','d9b04ca0-9e9c-4619-90dd-a49e39e21c87','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('026e4409-c69a-4331-9637-a0b8e8892454','3c087840-9a3a-442a-a315-bed22c78815e','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('04fe8b70-e386-40e5-b65e-43fa4364e260','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('1fe2bf4e-ad45-42d9-ae5a-d4e642320995','e8b1c555-fa66-4ac7-8db6-8d27cb385bd1','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('290a3894-b218-4502-b5a7-b0f8b11e3e7e','44abfa1d-24ca-45cc-b627-f652e3d6e5e8','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','1','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('3042a13b-6be8-4993-ae99-5a551705e402','6f8f7e9d-119d-417b-a2b1-d6a4f5462dd8','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('317d4092-f74c-451f-b86b-1fcec93e51cd','6725294a-c2af-4c06-9a18-045fdc9c6b33','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','1','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('3669a195-90da-4e85-8226-78c62b1adc9f','44abfa1d-24ca-45cc-b627-f652e3d6e5e8','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('3958e910-6a4d-4a86-806c-cc7ac471a1e8','d4d35841-bfdf-4d79-a1fd-019f7597f3e7','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('3ee9c6e6-14d9-44f1-91a8-ab84a4c2c31d','1fd9992b-8a78-4fb2-a1a3-3c01bf135200','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('5e7ff86a-bc22-4fd3-a09a-63d75d6f08dc','4b3f9a42-6425-490e-b7ff-ca42103d3f72','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','1','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('7141ba3c-4104-40fe-b4e2-f135027f9932','d9b04ca0-9e9c-4619-90dd-a49e39e21c87','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('950dcbf2-4d50-4e07-9058-249809b45b9a','3c087840-9a3a-442a-a315-bed22c78815e','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('998c06d4-9318-4c8e-b484-e893535d8378','6725294a-c2af-4c06-9a18-045fdc9c6b33','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('be72d4aa-edfb-4c99-a1d7-6eedf38875dc','4b3f9a42-6425-490e-b7ff-ca42103d3f72','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('d4f43916-763c-4115-b82c-daf6f81a4b42','e8b1c555-fa66-4ac7-8db6-8d27cb385bd1','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('d8e63945-c002-45a5-a909-a926e3be8e40','d4d35841-bfdf-4d79-a1fd-019f7597f3e7','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','1','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('ddf0fe96-93bf-4462-af14-5ae0c72abeaa','6c4c1d96-9ade-4eb7-a4fb-c5a2ec8bf264','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11'),('e69d0ba6-1cce-4ee0-aa87-41590907dae2','6c4c1d96-9ade-4eb7-a4fb-c5a2ec8bf264','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','0','1','2019-04-03 19:05:51','2019-04-03 19:05:51'),('f8b91262-9a5b-468e-9688-8ec42f99913d','6f8f7e9d-119d-417b-a2b1-d6a4f5462dd8','1','1','1','2019-04-03 20:03:11','2019-04-03 20:03:11');

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

insert  into `site_config`(`id`,`domain`,`title`,`keywords`,`description`,`copy`,`address`,`telephone`,`email`,`records`,`modify_time`,`create_time`,`creator`,`deleted`) values ('b719f6ae-2e5f-4ca7-910e-2aae904c14b2','','官网','1','1','1','1','1,2','1','1','2019-04-03 19:07:11','2019-03-28 20:42:51','1','0');

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
  `img_path` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像图片',
  `role_id` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '角色id',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `deleted` char(1) CHARACTER SET utf8 NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`name`,`pinyin`,`sex`,`phone`,`email`,`sort`,`img_path`,`role_id`,`modify_time`,`create_time`,`deleted`) values ('1','qwe','3675ac5c859c806b26e02e6f9fd62192','管理员','gly','0','13012345678','123456@163.com',1,'','1','2019-04-03 19:00:47','2019-03-26 15:11:16','0'),('a5d7db96-ad77-4cc6-9dec-800cfa587590','asd','14e1b600b1fd579f47433b88e8d85291','萌萌','mm','1','13012345678','123456@163.com',2,'','24567e6c-dd7c-4021-bd1f-c73fcbe86d27','2019-04-03 19:02:17','2019-03-28 21:02:00','0');

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
