/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50623
Source Host           : 127.0.0.1:22306
Source Database       : caiji

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2016-04-30 20:32:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `c_resource`
-- ----------------------------
DROP TABLE IF EXISTS `c_resource`;
CREATE TABLE `c_resource` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `URI` varchar(512) DEFAULT NULL,
  `CHARSET` varchar(32) DEFAULT NULL,
  `TITLE` varchar(128) DEFAULT NULL,
  `RETRY_COUNT` int(2) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `FINISHED` int(2) DEFAULT NULL,
  `TASK_ID` varchar(32) DEFAULT NULL,
  `DEPTH` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_resource
-- ----------------------------
INSERT INTO `c_resource` VALUES ('16b083c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/', 'gb2312', null, '0', '2016-04-29 10:43:01', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('16c432d00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/', 'gb2312', null, '0', '2016-04-29 10:43:01', '2', '7', '1');
INSERT INTO `c_resource` VALUES ('19ba68600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_2.html', 'gb2312', null, '0', '2016-04-29 10:43:06', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('19bab6800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40998.html', 'gb2312', '午夜逃亡', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19badd900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40868.html', 'gb2312', '星球大战7：原力觉醒', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bb04a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40849.html', 'gb2312', '超胆侠 第二季', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bb2bb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40848.html', 'gb2312', '进击的巨人真人版：后篇·世界终结', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bb2bb10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40806.html', 'gb2312', '机器人病毒危机', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bb52c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40737.html', 'gb2312', '冰美人', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bb79d00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40736.html', 'gb2312', '蒸发太平洋', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bba0e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40703.html', 'gb2312', '进击的巨人真人版：前篇', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bbef000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40607.html', 'gb2312', '终点站', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bc64300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40433.html', 'gb2312', '火星救援', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bc64310db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40383.html', 'gb2312', '八爪狂鲨大战梭鱼翼龙', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bc8b400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38872.html', 'gb2312', '明日世界', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bc8b410db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38850.html', 'gb2312', '神奇四侠2015', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bcb2500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38506.html', 'gb2312', '疯狂的麦克斯4：狂暴之路', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bcd9600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38708.html', 'gb2312', '天魔异种', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bcd9610db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38586.html', 'gb2312', '分歧者2:绝地反击', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bd00700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38418.html', 'gb2312', '时光穿梭', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bd27800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38387.html', 'gb2312', '怪兽：黑暗大陆', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bd4e900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38371.html', 'gb2312', '机械姬', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('19bd9cb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38370.html', 'gb2312', '年鉴计划', '0', '2016-04-29 10:43:06', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6cac400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_3.html', 'gb2312', null, '0', '2016-04-29 10:43:09', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('1b6cfa600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38368.html', 'gb2312', '蛮荒故事', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6cfa610db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38367.html', 'gb2312', '超能查派', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6d48800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38292.html', 'gb2312', '木星上行', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6d6f900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38177.html', 'gb2312', '星际穿越', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6dbdb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38160.html', 'gb2312', '光环：夜幕', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6dbdb10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/38026.html', 'gb2312', '末日浩劫', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6de4c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37832.html', 'gb2312', '前目的地', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6e0bd00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37812.html', 'gb2312', '银河护卫队', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6e32e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37753.html', 'gb2312', '猩球崛起2：黎明之战', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6e59f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37650.html', 'gb2312', '超体', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6e59f10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37700.html', 'gb2312', '机器纪元', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6e81000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37701.html', 'gb2312', '地球回音', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6ea8100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37686.html', 'gb2312', '彗星来的那一夜', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6ecf200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37391.html', 'gb2312', '变形金刚4：绝迹重生', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6ecf210db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37360.html', 'gb2312', '明日边缘', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6ef6300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37566.html', 'gb2312', '信号', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6f6b600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36588.html', 'gb2312', '美国队长2：冬日战士', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6f92700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37282.html', 'gb2312', '超凡蜘蛛侠2', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b6fb9800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37347.html', 'gb2312', '新哥斯拉 2014', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1b7007a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37408.html', 'gb2312', '分歧者：异类觉醒', '0', '2016-04-29 10:43:09', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3bc6f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_4.html', 'gb2312', null, '0', '2016-04-29 10:43:12', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('1d3c15100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37378.html', 'gb2312', '零点定理', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3c3c200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37323.html', 'gb2312', '超验骇客', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3c63300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36755.html', 'gb2312', '机械危情', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3c8a400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36943.html', 'gb2312', '她', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3cb1500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36283.html', 'gb2312', '我,弗兰肯斯坦', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3cd8600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37166.html', 'gb2312', '极北之战', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3d4d900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/37082.html', 'gb2312', '搁浅', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3d74a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35780.html', 'gb2312', '末日之战', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3d9bb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36926.html', 'gb2312', '独立日', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3dc2c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35283.html', 'gb2312', '饥饿游戏', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3de9d00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36816.html', 'gb2312', '云图', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3e10e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36815.html', 'gb2312', '透明人魔', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3e37f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36329.html', 'gb2312', '末日哲学家', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3e5f000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36735.html', 'gb2312', '圣杯神器：骸骨之城', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3e86100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36732.html', 'gb2312', '魔戒3王者归来', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3ed4300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34656.html', 'gb2312', '美国队长', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3efb400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36616.html', 'gb2312', '复仇者联盟2', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3f22500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36270.html', 'gb2312', '船长哈洛克', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3f22510db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36253.html', 'gb2312', '灵异牧场', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('1d3f49600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36085.html', 'gb2312', '地心引力', '0', '2016-04-29 10:43:12', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('20304ed00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_5.html', 'gb2312', null, '0', '2016-04-29 10:43:17', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('20309cf00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36026.html', 'gb2312', '来历不明', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2030c4000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/36001.html', 'gb2312', '心战', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2030eb100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35945.html', 'gb2312', '异形起源', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203112200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35901.html', 'gb2312', '极乐空间', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203139300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35864.html', 'gb2312', '星际迷航：暗黑无界', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203160400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35857.html', 'gb2312', '金刚狼2', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203187500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35802.html', 'gb2312', '环太平洋', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2031ae600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35801.html', 'gb2312', '重返地球', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2031d5700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35786.html', 'gb2312', '地球大冲撞', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2031d5710db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35776.html', 'gb2312', '木卫二报告', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2031fc800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35752.html', 'gb2312', '超人：钢铁之躯', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203223900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35657.html', 'gb2312', '钢铁侠3', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('20324aa00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35489.html', 'gb2312', '莫斯科2017', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203271b00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35477.html', 'gb2312', '十二生肖', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203298c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35436.html', 'gb2312', '记忆提取', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2032bfd00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35298.html', 'gb2312', '沼泽狂鲨', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('20330df00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35138.html', 'gb2312', '复仇者联盟', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('20335c100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35088.html', 'gb2312', '异星战场', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203383200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35077.html', 'gb2312', '隔绝', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('203383210db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/35043.html', 'gb2312', '外星人比基尼', '0', '2016-04-29 10:43:17', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b408a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_6.html', 'gb2312', null, '0', '2016-04-29 10:43:19', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('21b42fb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34883.html', 'gb2312', '时间规划局', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b42fb10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34774.html', 'gb2312', '忧郁症', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b456c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34668.html', 'gb2312', '超级8', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b456c10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34577.html', 'gb2312', '宇宙战舰大和号', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b47dd00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34560.html', 'gb2312', '变形金刚3', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b47dd10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34526.html', 'gb2312', 'X战警：第一战', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b4a4e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34410.html', 'gb2312', '源代码', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b4f3000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34377.html', 'gb2312', '恐鳄大战超级食人鳄', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b541200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/34278.html', 'gb2312', '关键第四号', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b568300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33800.html', 'gb2312', '噬人鲨大战食人鳄', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b58f400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33622.html', 'gb2312', '天际', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b5b6500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33597.html', 'gb2312', '突变异种', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b5dd600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33438.html', 'gb2312', 'G型神探', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b604700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33406.html', 'gb2312', '人世下游', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b679a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33227.html', 'gb2312', '人兽杂交', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b6a0b00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33206.html', 'gb2312', '流星的启示', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b6c7c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33189.html', 'gb2312', '实质', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b6c7c10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/33182.html', 'gb2312', '生长', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b6eed00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/32909.html', 'gb2312', '新铁血战士', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('21b715e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/32869.html', 'gb2312', '20世纪少年最终章', '0', '2016-04-29 10:43:19', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('233355a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/type,genre/movie,sci-fi/index_7.html', 'gb2312', null, '0', '2016-04-29 10:43:22', '2', '5', '1');
INSERT INTO `c_resource` VALUES ('23337cb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/32125.html', 'gb2312', '诸神之战', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235c88800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/31920.html', 'gb2312', '变形金刚2:卷土重来', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235caf900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/31648.html', 'gb2312', '真人游戏', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235cd6a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/31471.html', 'gb2312', '斗牛', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235cfdb00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/31368.html', 'gb2312', '女神陷阱', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235cfdb10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/30748.html', 'gb2312', '精灵鼠小弟', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235d24c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/28463.html', 'gb2312', '入侵脑细胞2', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235d4bd00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/27028.html', 'gb2312', '月球', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235d72e00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/26953.html', 'gb2312', '星球大战前传1魅影危机', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235d72e10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/25820.html', 'gb2312', '超奥特曼八兄弟', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235d99f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/24946.html', 'gb2312', '异能', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235dc1000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/24940.html', 'gb2312', '星际迷航', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235e0f200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/24766.html', 'gb2312', '最后一个人', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235e36300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/24337.html', 'gb2312', '但丁01', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235e5d400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/24331.html', 'gb2312', '血战沙漠', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235e84500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/21753.html', 'gb2312', '变形金刚2', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235eab600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/19792.html', 'gb2312', '机器人劫难', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235ed2700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/18862.html', 'gb2312', '太阳浩劫', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235ef9800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/18214.html', 'gb2312', '怪物', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('235f20900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/17547.html', 'gb2312', '兽性', '0', '2016-04-29 10:43:22', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('250333a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/16899.html', 'gb2312', '强殖入侵', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25035ab00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/16547.html', 'gb2312', '精灵鼠小弟3', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25035ab10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/16150.html', 'gb2312', '彗星撞地球', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('250381c00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/14854.html', 'gb2312', '新恶魔岛', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2503a8d00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/14647.html', 'gb2312', '杀出虫围 扫图', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2503cfe00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/14604.html', 'gb2312', '最终剪接', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2503f6f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/14229.html', 'gb2312', '怪物史莱克 2', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25041e000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/13600.html', 'gb2312', '尖端大风暴', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('250445100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/13091.html', 'gb2312', '丁丁历险记-向月球飞去', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25046c200db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/12566.html', 'gb2312', '黑洞表面', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25046c210db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/12361.html', 'gb2312', '数字漩涡', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('250493300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/12295.html', 'gb2312', '生生长流', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2504ba400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/12207.html', 'gb2312', '未来世界续集', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('2504e1500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/12203.html', 'gb2312', '深海圆疑', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25052f700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/11731.html', 'gb2312', '美色杀人狂2', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25052f710db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/11627.html', 'gb2312', '对她说', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('250556800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/11052.html', 'gb2312', '怪物猎人历险记之Easter Funny', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25057d900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/10960.html', 'gb2312', '哥斯拉', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('25057d910db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/10136.html', 'gb2312', '诸神混乱之女神陷阱', '0', '2016-04-29 10:43:25', '2', '5', '2');
INSERT INTO `c_resource` VALUES ('29434e500db411e6b0cb7173adb790a5', 'http://www.poxiao.comhttp://rhyv.code.17tanwan.com/htmlcode/599.html', 'gb2312', '全新传奇1.85,英雄合击爽过私服,10倍爆率仅限今日新区！', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('29434e510db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41021.html', 'gb2312', '2015香港7.8分剧情悬疑片《踏血寻梅》BD高清国粤双语中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294375600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41018.html', 'gb2312', '2016美国犯罪惊悚片《信任》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('29439c700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41015.html', 'gb2312', '2016美国7.6分喜剧动作片《死侍》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('29439c710db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41014.html', 'gb2312', '2015美国剧情片《夜莺/变奏心灵》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2943c3800db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41013.html', 'gb2312', '2016美国动作片《病毒入侵》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2943ea900db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41007.html', 'gb2312', '2016年美国6.3分剧情爱情片《爱情的选择》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294411a00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41006.html', 'gb2312', '2015年日本6.3分爱情奇幻片《岸边之旅》BD日语中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294438b00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41005.html', 'gb2312', '2016美国动作片《珍宝大战》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('29445fc00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40187.html', 'gb2312', '2015动作惊悚冒险电影《九层妖塔/陆川版鬼吹灯》BD国语中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2944ade00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41004.html', 'gb2312', '2015德国8.1分喜剧片《希特勒回来了》BD高清中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2944d4f00db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41003.html', 'gb2312', '2016美国喜剧片《老板/甜心大姐头》HD高清中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2944d4f10db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41002.html', 'gb2312', '2016美国喜剧恐怖片《恐怖假日》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2944fc000db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/41000.html', 'gb2312', '2015法国恐怖喜剧片《丧尸足球》BD法语中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294523100db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40999.html', 'gb2312', '2015美国8.2分动画片《奇特的故事》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294571300db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40998.html', 'gb2312', '2016剧情科幻《午夜逃亡/通天眼》HD高清中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294598400db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40996.html', 'gb2312', '2015美国6.6分剧情喜剧片《奋斗的乔伊》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('294598410db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40995.html', 'gb2312', '2016年美国7.2分惊悚爱情片《尊严殖民地/殖民地》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2945bf500db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40994.html', 'gb2312', '2015日本喜剧片《食梦者/爆漫》BD日语中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2945e6600db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40992.html', 'gb2312', '2016周星驰喜剧奇幻片《美人鱼》HD高清国语中字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('2945e6610db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40991.html', 'gb2312', '2016美国剧情动作片《我怒了》BD中英双字', '0', '2016-04-29 10:43:32', '1', '7', '2');
INSERT INTO `c_resource` VALUES ('29460d700db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40990.html', 'gb2312', '2015美国喜剧爱情片《临时工》BD中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');
INSERT INTO `c_resource` VALUES ('29460d710db411e6b0cb7173adb790a5', 'http://www.poxiao.com/movie/40989.html', 'gb2312', '2016国产喜剧爱情片《同城邂逅》HD国语中英双字', '0', '2016-04-29 10:43:32', '2', '7', '2');

-- ----------------------------
-- Table structure for `c_task`
-- ----------------------------
DROP TABLE IF EXISTS `c_task`;
CREATE TABLE `c_task` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `TASK_NAME` varchar(32) DEFAULT NULL,
  `PORTAL_URI` varchar(256) DEFAULT NULL COMMENT '入口地址',
  `CHARSET` varchar(32) DEFAULT NULL,
  `STARTUP` int(2) DEFAULT NULL,
  `SCHEDULE_TIME` int(11) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `USER_ID` varchar(32) DEFAULT NULL,
  `TASK_GROUP_ID` varchar(32) DEFAULT NULL,
  `COMMENT` varchar(128) DEFAULT NULL,
  `RETRY_COUNT` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_task
-- ----------------------------
INSERT INTO `c_task` VALUES ('1', '百度--批量', 'http://tieba.baidu.com/f?kw=%E9%AD%94%E5%A4%A9%E8%AE%B0&ie=utf-8&pn=50', null, '0', '0', '2016-04-02 15:15:55', 'da18d614d247419eb908556c8765fabf', '2', null, '3');
INSERT INTO `c_task` VALUES ('2', '谷歌', 'https://www.google.com', null, '0', '0', '2016-04-05 13:45:09', 'da18d614d247419eb908556c8765fabf', '3', null, '3');
INSERT INTO `c_task` VALUES ('5', '破晓--科幻--分页', 'http://www.poxiao.com/type,genre/movie,sci-fi/', 'gb2312', '0', '0', '2016-04-05 15:43:24', 'da18d614d247419eb908556c8765fabf', '7', null, '3');
INSERT INTO `c_task` VALUES ('7', '破晓--首页--最新电影', 'http://www.poxiao.com/', 'gb2312', '2', '1', '2016-04-13 19:25:32', 'da18d614d247419eb908556c8765fabf', '7', null, '3');

-- ----------------------------
-- Table structure for `c_task_group`
-- ----------------------------
DROP TABLE IF EXISTS `c_task_group`;
CREATE TABLE `c_task_group` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `GROUP_NAME` varchar(32) DEFAULT NULL,
  `COMMENT` varchar(128) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c_task_group
-- ----------------------------
INSERT INTO `c_task_group` VALUES ('2', '百度', null, '2016-04-02 15:15:55');
INSERT INTO `c_task_group` VALUES ('3', '谷歌', null, '2016-04-05 13:45:09');
INSERT INTO `c_task_group` VALUES ('6', '飘花', null, '2016-04-09 23:44:17');
INSERT INTO `c_task_group` VALUES ('7', '破晓', null, '2016-04-10 10:43:50');

-- ----------------------------
-- Table structure for `s_settings`
-- ----------------------------
DROP TABLE IF EXISTS `s_settings`;
CREATE TABLE `s_settings` (
  `_key` varchar(32) DEFAULT NULL,
  `_value` varchar(32) DEFAULT NULL,
  `COMMENT` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_settings
-- ----------------------------
INSERT INTO `s_settings` VALUES ('SENDREQ_RETRY_COUNT', '3', '获取URL重试最大次数');

-- ----------------------------
-- Table structure for `s_user`
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `id` varchar(32) NOT NULL,
  `USER_NAME` varchar(32) DEFAULT NULL,
  `USER_PASS` varchar(32) DEFAULT NULL,
  `EMAIL` varchar(64) DEFAULT NULL,
  `MOBILE` varchar(32) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `STATUS` int(2) DEFAULT NULL,
  `APIKEY` varchar(128) DEFAULT NULL,
  `SECKEY` varchar(128) DEFAULT NULL,
  `REAL_NAME` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('ab1d4bb17409403e829b98aaff40f69a', '18530053050', 'e10adc3949ba59abbe56e057f20f883e', '3203317@qq.com', '18530053050', '2016-03-08 12:43:00', '1', 'Y9D3HcKJYniPGryouhkB221IRY+iI0pDEYOx9KXh0xI=', 'isLgD3wYZsH/SyfV7c57n2KcJOH5EIO6me7To7Xp1Ig=', '黄鑫');
INSERT INTO `s_user` VALUES ('da18d614d247419eb908556c8765fabf', 'bushuo', 'c4ca4238a0b923820dcc509a6f75849b', 'huangxin@foreworld.net', '18530053050', '2016-02-14 14:50:13', '1', 'fBr+H+HuHuC+p0wtKBFTvd2GehKAWjN1ljTue4sVS7I=', 'U1lrd4WOgsKQaymXjAiGerHi8CMvnDmXAtbHgrTl7xs=', '超级管理员');
