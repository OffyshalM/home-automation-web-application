-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2026 at 05:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_automation`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `full_name`, `email`, `password_hash`, `created_at`) VALUES
(1, 'futurica automations', 'futuricaautomations@gmail.com', '$2y$10$B/o8PXOt4ZnH7fdvQ0uZEuotfGaRo2FobRjY8COy2HAFHYtEQANge', '2026-08-25 13:25:17');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `body`, `created_at`) VALUES
(3, 'Unboxing Modern Smart Devices: Amazon Echo Show & Built-in Alexa Integration', 'Take a look inside our latest unboxing of top-tier smart home hardware! In this showcase, we unpack and set up the Amazon Echo Show featuring built-in Alexa voice control.\r\n\r\nWatch how this central smart display integrates seamlessly into home automation workflows—enabling hands-free voice commands, instant live camera feeds, custom routine triggers, and complete control over lighting and security systems.\r\n\r\nExplore our full range of smart automation hardware, or request a custom quote for your space today.', '2026-08-28 22:35:19'),
(4, 'Full Smart Home Cabinet Showcase: Every Device We Offer in One Place', 'Take a look inside our primary display cabinet! Just like walking through a tech showroom, this video gives you a full look at our complete lineup of smart home devices all staged in one setup.\r\n\r\nWe are showcasing everything from smart door locks, security cameras, and intelligent touch switches to central control hubs and ambient smart lighting systems. You get to see the actual build quality, sleek finishes, and modern designs of the exact hardware we install to automate your home or office.\r\n\r\nBrowse our full catalog or contact us today to get a custom quote for your space.', '2026-08-28 22:41:15'),
(5, 'Complete Smart Home Automation Setup: Modern Living Brought to Life', 'Step inside a fully automated property and see how true smart living works in real time. This video takes you on a tour through a complete smart home installation where every system works together seamlessly.\r\n\r\nWatch how custom lighting scenes, motorized controls, central touch panels, smart access locks, and integrated security systems are effortlessly managed from one unified interface. Whether it is setting the mood for the evening or securing the entire building at the tap of a button, experience the comfort, convenience, and safety of a professionally engineered smart space.\r\n\r\nExplore our full catalog or get in touch with us to receive a custom quote tailored to your property.', '2026-08-28 22:43:44');

-- --------------------------------------------------------

--
-- Table structure for table `project_media`
--

CREATE TABLE `project_media` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` enum('video','audio','image') NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_media`
--

INSERT INTO `project_media` (`id`, `project_id`, `file_path`, `file_type`, `uploaded_at`) VALUES
(3, 3, 'uploads/projects/1787956519_0_automation-video.mp4', 'video', '2026-08-28 22:35:19'),
(4, 4, 'uploads/projects/1787956875_0_showcasing-all-devices.mp4', 'video', '2026-08-28 22:41:15'),
(5, 5, 'uploads/projects/1787957024_0_complete-home-automation-setup.mp4', 'video', '2026-08-28 22:43:44');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `product` varchar(150) NOT NULL,
  `whatsapp_number` varchar(30) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('new','contacted','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `full_name`, `email`, `product`, `whatsapp_number`, `message`, `status`, `created_at`) VALUES
(18, 'Test Test', 'test@test.com', 'CCTV Cameras', '08046677789', 'Just Testing the Website, Bye!', 'new', '2026-08-26 01:06:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_media`
--
ALTER TABLE `project_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project_media`
--
ALTER TABLE `project_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_media`
--
ALTER TABLE `project_media`
  ADD CONSTRAINT `project_media_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
