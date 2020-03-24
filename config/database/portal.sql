-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2020 at 06:55 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `campuses`
--

CREATE TABLE `campuses` (
  `id` int(11) NOT NULL,
  `campusname` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `campuses`
--

INSERT INTO `campuses` (`id`, `campusname`, `created_at`) VALUES
(1, 'BatStateU - Main I', '2020-03-21'),
(2, 'BatStateU - Main II', '2020-03-21'),
(3, 'BatStateU JPLPC - Malvar', '2020-03-22'),
(4, 'BatStateU ARASOF - Nasugbu', '2020-03-22'),
(5, 'BatStateU Lipa', '2020-03-22'),
(6, 'BatStateU Rosario', '2020-03-22'),
(7, 'BatStateU San Juan', '2020-03-22'),
(8, 'BatStateU Lemery', '2020-03-22'),
(9, 'BatStateU Balayan', '2020-03-22'),
(10, 'BatStateU Lobo', '2020-03-22');

-- --------------------------------------------------------

--
-- Table structure for table `lostitemsreports`
--

CREATE TABLE `lostitemsreports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `yr` varchar(255) DEFAULT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `seen` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `campus`, `created_at`) VALUES
(1, 'student', '$2a$10$UqdphsPfSUumE.J3J3wCGu4SZtnoYeebHY9TI9/lMbByAJeo98.uK', 'student', '', '2020-03-07 08:43:53'),
(2, 'SOAAdmin', '$2a$10$9EY9eyDENyuuZVR1I9MhWuHpijXXJF88o5iaIcTjSy2IN.dRK8gjS', 'admin', '', '2020-03-07 08:47:31'),
(3, 'SOAHeadMain1', '$2a$10$IBU30o204Imq3KXkdmRjkeF6IIYPuW0C78OYo1bWMVVA5bb6pxlOm', 'head', '', '2020-03-07 08:48:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campuses`
--
ALTER TABLE `campuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lostitemsreports`
--
ALTER TABLE `lostitemsreports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campuses`
--
ALTER TABLE `campuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lostitemsreports`
--
ALTER TABLE `lostitemsreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
