-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 19, 2020 at 11:37 AM
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
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `dateDate` varchar(255) NOT NULL,
  `dateTime` varchar(255) NOT NULL,
  `backgroundColor` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `poster` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `setBy` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `activityRequirements` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdBy` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'School Number 1', '2020-03-21'),
(2, 'School Number 2', '2020-03-21'),
(3, 'School Number 3', '2020-03-22'),
(4, 'School Number 4', '2020-03-22'),
(5, 'School Number 5', '2020-03-22'),
(6, 'School Number 6', '2020-03-22'),
(7, 'School Number 7', '2020-03-22'),
(8, 'School Number 8', '2020-03-22'),
(9, 'School Number 9', '2020-03-22'),
(10, 'School Number 10', '2020-03-22');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department`, `created_at`) VALUES
(1, 'GE', '2020-03-25'),
(2, 'CECS', '2020-03-25'),
(3, 'CABEIHM', '2020-03-25'),
(4, 'CAS', '2020-03-25'),
(5, 'CTE', '2020-03-25'),
(6, 'CL', '2020-03-25'),
(7, 'CIT', '2020-03-25'),
(8, 'CNAHS', '2020-03-25'),
(9, 'CEAFA', '2020-03-25'),
(10, 'CICS', '2020-03-25');

-- --------------------------------------------------------

--
-- Table structure for table `fileSharings`
--

CREATE TABLE `fileSharings` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `stud` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `foundreports`
--

CREATE TABLE `foundreports` (
  `id` int(11) NOT NULL,
  `findername` varchar(255) NOT NULL,
  `founditem` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `idreplacements`
--

CREATE TABLE `idreplacements` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `idreason` varchar(255) NOT NULL,
  `count` varchar(255) NOT NULL,
  `otherinfo` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `notification` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orgaccnts`
--

CREATE TABLE `orgaccnts` (
  `id` int(11) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orgdescs`
--

CREATE TABLE `orgdescs` (
  `id` int(11) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `orgpresname` varchar(255) NOT NULL,
  `orgadvisername` varchar(255) NOT NULL,
  `quantitymembers` varchar(255) NOT NULL,
  `quantityofficers` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `org_feeds`
--

CREATE TABLE `org_feeds` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registeredStudents`
--

CREATE TABLE `registeredStudents` (
  `id` int(11) NOT NULL,
  `activityId` int(11) NOT NULL,
  `activityTitle` varchar(255) NOT NULL,
  `studentName` varchar(255) NOT NULL,
  `srCode` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `yr` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `contactNumber` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `reportTitle` varchar(255) NOT NULL,
  `reportDesc` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request_activities`
--

CREATE TABLE `request_activities` (
  `id` int(11) NOT NULL,
  `activity_title` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `orgname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `notif` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passwordTxt` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `passwordTxt`, `type`, `campus`, `created_at`) VALUES
(1, 'student', '$2a$10$UqdphsPfSUumE.J3J3wCGu4SZtnoYeebHY9TI9/lMbByAJeo98.uK', 'P@ssword123', 'student', '', '2020-03-07 08:43:53'),
(2, 'SOAAdmin', '$2a$10$9EY9eyDENyuuZVR1I9MhWuHpijXXJF88o5iaIcTjSy2IN.dRK8gjS', 'admin', 'admin', '', '2020-03-07 08:47:31'),
(22, 'SN_01', '$2a$10$W0DOQFcrvgB7KBmsOn8YMuewljFQhfa4gTHEqSS122GaBYGwEVsKi', 'schoolNumberOne', 'head', 'School Number 1', '2020-09-19 09:30:40'),
(23, 'SN_02', '$2a$10$TJta6NrD81YHng2YVIMd4uPqDHk61lD5coPQi0cTmPKiHanLspvOO', 'schoolNumberTwo', 'head', 'School Number 2', '2020-09-19 09:30:59'),
(24, 'SN_03', '$2a$10$X4v6mP8MTd2Oye0LFQ9H.epRjRe4UlEJZYfAgVXeCHe5Rn9Ki.ZiW', 'schoolNumberThree', 'head', 'School Number 3', '2020-09-19 09:31:13'),
(25, 'SN_04', '$2a$10$86ljOFIFGRonfO34UafQNuNPbjxUugX8Y7aWZi5M/rBH2Ssy20yS.', 'schoolNumberFour', 'head', 'School Number 4', '2020-09-19 09:32:07'),
(26, 'SN_05', '$2a$10$M03uwPyXqdYDWnv.Oe78Kuu6hEYy.mF4A3zf2psKTfUd8INxtU0Pe', 'schoolNumberFive', 'head', 'School Number 5', '2020-09-19 09:32:17'),
(27, 'SN_06', '$2a$10$J6RH6QWR0z1Vcj.9kOghGeZWbvYCBNyLSltOBf/93s1gGdRJ71wny', 'schoolNumberSix', 'head', 'School Number 6', '2020-09-19 09:32:40'),
(28, 'SN_07', '$2a$10$LN2DH4KhjiNs.AhY/.5dcuyo1Bn121BIkxq9Gli0MbzsGqCWF4Uou', 'schoolNumberSeven', 'head', 'School Number 7', '2020-09-19 09:32:51'),
(29, 'SN_08', '$2a$10$kZlENy6E1.3jokkMqypTy.2xhbhc4NAsv3pMvHn.TlrcFxwr6.vx2', 'schoolNumberEight', 'head', 'School Number 8', '2020-09-19 09:33:08'),
(30, 'SN_09', '$2a$10$9aE7N15Nu6TvZdenvLNoZu.k6Z4AS6Z2Epxfrd/307H/QLHZl7AsS', 'schoolNumberNine', 'head', 'School Number 9', '2020-09-19 09:33:21'),
(31, 'SN_10', '$2a$10$pVCaLXIKtnaRWABf4u4nhOoTUS.D8EBRZ0997NR8r9PBBbjKzpf8a', 'schoolNumberTen', 'head', 'School Number 10', '2020-09-19 09:33:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `campuses`
--
ALTER TABLE `campuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fileSharings`
--
ALTER TABLE `fileSharings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foundreports`
--
ALTER TABLE `foundreports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `idreplacements`
--
ALTER TABLE `idreplacements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lostitemsreports`
--
ALTER TABLE `lostitemsreports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orgaccnts`
--
ALTER TABLE `orgaccnts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orgdescs`
--
ALTER TABLE `orgdescs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `org_feeds`
--
ALTER TABLE `org_feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registeredStudents`
--
ALTER TABLE `registeredStudents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_activities`
--
ALTER TABLE `request_activities`
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
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `campuses`
--
ALTER TABLE `campuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `fileSharings`
--
ALTER TABLE `fileSharings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `foundreports`
--
ALTER TABLE `foundreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `idreplacements`
--
ALTER TABLE `idreplacements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lostitemsreports`
--
ALTER TABLE `lostitemsreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `orgaccnts`
--
ALTER TABLE `orgaccnts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orgdescs`
--
ALTER TABLE `orgdescs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `org_feeds`
--
ALTER TABLE `org_feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `registeredStudents`
--
ALTER TABLE `registeredStudents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `request_activities`
--
ALTER TABLE `request_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
