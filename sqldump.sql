-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 05, 2020 at 08:29 PM
-- Server version: 10.4.12-MariaDB-1:10.4.12+maria~eoan-log
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=0;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tdw`
--

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE `entity` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `deathdate` datetime DEFAULT NULL,
  `image_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wiki_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `entity`
--

INSERT INTO `entity` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'World Wide Web Consortium', '1994-10-01 00:00:00', NULL, 'https://d2908q01vomqb2.cloudfront.net/ca3512f4dfa95a03169c5a670a4c91a19b3077b4/2018/10/18/w3c_logo-800x400.jpg', 'https://en.wikipedia.org/wiki/World_Wide_Web_Consortium'),
(2, 'Organización Europea para la investigación Nuclear', '1954-01-01 00:00:00', NULL, 'https://www.eso.org/public/archives/logos/screen/cern.jpg', 'https://en.wikipedia.org/wiki/CERN'),
(3, 'Free Software Fundation', '1985-10-04 00:00:00', NULL, 'https://pbs.twimg.com/profile_images/471735621946314752/imENUbEK_400x400.png', 'https://en.wikipedia.org/wiki/Free_Software_Foundation'),
(4, 'Netscape', '1994-04-04 00:00:00', NULL, 'https://findicons.com/files/icons/1765/windows_icons_v2/256/netscape.png', 'https://en.wikipedia.org/wiki/Netscape'),
(5, 'Unicode Consortium', '1991-01-03 00:00:00', NULL, 'https://home.unicode.org/wp-content/uploads/2019/12/Unicode-Logo-Final-Blue-95x112.jpg', 'https://en.wikipedia.org/wiki/Unicode_Consortium');

-- --------------------------------------------------------

--
-- Table structure for table `entity_contributes_product`
--

CREATE TABLE `entity_contributes_product` (
  `product_id` int(11) NOT NULL,
  `entity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `entity_contributes_product`
--

INSERT INTO `entity_contributes_product` (`product_id`, `entity_id`) VALUES
(1, 3),
(2, 1),
(2, 5),
(3, 1),
(3, 2),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `deathdate` datetime DEFAULT NULL,
  `image_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wiki_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'Brendan Eich', '1961-06-04 00:00:00', NULL, 'https://unchainedpodcast.com/wp-content/uploads/2020/01/Brendan-Eich.jpg', 'https://en.wikipedia.org/wiki/Brendan_Eich'),
(2, 'Linus Torvalds', '1969-12-28 00:00:00', NULL, 'https://www.channelfutures.com/files/2015/11/linus-torvalds-400x298_0-595x432.jpg', 'https://en.wikipedia.org/wiki/Linus_Torvalds'),
(3, 'Mark Davis', '1952-09-13 00:00:00', NULL, 'https://api.time.com/wp-content/uploads/2016/03/mark-davis-unicode-img_27061-page-001.jpg', 'https://en.wikipedia.org/wiki/Mark_Davis_(Unicode)'),
(4, 'Tim Berners-Lee', '1955-06-08 00:00:00', NULL, 'https://s2.latercera.com/wp-content/uploads/2018/12/Tim.jpg', 'https://en.wikipedia.org/wiki/Tim_Berners-Lee'),
(5, 'Richard Stallman', '1953-03-16 00:00:00', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7x0V2_5oVEfi3gW6P8PhAxkdXZMJKK-Qo-xRoKuB6Xb_K5fuE', 'https://en.wikipedia.org/wiki/Richard_Stallman');

-- --------------------------------------------------------

--
-- Table structure for table `person_contributes_product`
--

CREATE TABLE `person_contributes_product` (
  `product_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `person_contributes_product`
--

INSERT INTO `person_contributes_product` (`product_id`, `person_id`) VALUES
(1, 2),
(1, 5),
(2, 4),
(3, 4),
(4, 3),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `person_participates_entity`
--

CREATE TABLE `person_participates_entity` (
  `entity_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `person_participates_entity`
--

INSERT INTO `person_participates_entity` (`entity_id`, `person_id`) VALUES
(1, 4),
(2, 4),
(3, 2),
(3, 5),
(4, 3),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `deathdate` datetime DEFAULT NULL,
  `image_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wiki_url` varchar(2047) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'GNU / Linux', '1991-09-17 00:00:00', NULL, 'https://www.wallpaperflare.com/static/893/596/940/tux-linux-foxyriot-logo-wallpaper.jpg', 'https://en.wikipedia.org/wiki/Linux'),
(2, 'DOM', '1998-10-01 00:00:00', NULL, 'https://www-archive.mozilla.org/docs/dom/technote/whitespace/whitespace_tree.png', 'https://en.wikipedia.org/wiki/Document_Object_Model'),
(3, 'HTML', '1993-01-01 00:00:00', NULL, 'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png', 'https://en.wikipedia.org/wiki/HTML'),
(4, 'JavaScript', '1995-12-04 00:00:00', NULL, 'https://logodix.com/logo/374740.png', 'https://en.wikipedia.org/wiki/Javascript'),
(5, 'Extensible Markup Language', '1998-01-01 00:00:00', NULL, 'https://png.pngtree.com/png-vector/20190302/ourlarge/pngtree-vector-xml-icon-png-image_719914.jpg', 'https://en.wikipedia.org/wiki/XML');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `role` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:object)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'adminUser', 'adminUser@example.com', '$2y$10$OMjdvwidN/D2QoDSo0JIv.Jz8t3MIDZt.JehZgxBA8ZcBrBn3o2EC', 'O:24:\"TDW\\ACiencia\\Entity\\Role\":1:{s:30:\"\0TDW\\ACiencia\\Entity\\Role\0role\";i:1;}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Entity_name_uindex` (`name`);

--
-- Indexes for table `entity_contributes_product`
--
ALTER TABLE `entity_contributes_product`
  ADD PRIMARY KEY (`product_id`,`entity_id`),
  ADD KEY `IDX_772C40B24584665A` (`product_id`),
  ADD KEY `IDX_772C40B281257D5D` (`entity_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Person_name_uindex` (`name`);

--
-- Indexes for table `person_contributes_product`
--
ALTER TABLE `person_contributes_product`
  ADD PRIMARY KEY (`product_id`,`person_id`),
  ADD KEY `IDX_5EBE1F014584665A` (`product_id`),
  ADD KEY `IDX_5EBE1F01217BBB47` (`person_id`);

--
-- Indexes for table `person_participates_entity`
--
ALTER TABLE `person_participates_entity`
  ADD PRIMARY KEY (`entity_id`,`person_id`),
  ADD KEY `IDX_9A036581257D5D` (`entity_id`),
  ADD KEY `IDX_9A0365217BBB47` (`person_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_name_uindex` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_UNIQ_USERNAME` (`username`),
  ADD UNIQUE KEY `IDX_UNIQ_EMAIL` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entity_contributes_product`
--
ALTER TABLE `entity_contributes_product`
  ADD CONSTRAINT `FK_772C40B24584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_772C40B281257D5D` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`);

--
-- Constraints for table `person_contributes_product`
--
ALTER TABLE `person_contributes_product`
  ADD CONSTRAINT `FK_5EBE1F01217BBB47` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  ADD CONSTRAINT `FK_5EBE1F014584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `person_participates_entity`
--
ALTER TABLE `person_participates_entity`
  ADD CONSTRAINT `FK_9A0365217BBB47` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  ADD CONSTRAINT `FK_9A036581257D5D` FOREIGN KEY (`entity_id`) REFERENCES `entity` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
