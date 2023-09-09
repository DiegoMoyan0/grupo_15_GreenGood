-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2023 a las 01:25:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `greengood_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_addresses`
--

CREATE TABLE `user_addresses` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `street` varchar(45) NOT NULL,
  `number` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user_addresses`
--

INSERT INTO `user_addresses` (`id`, `user_id`, `street`, `number`, `city`, `province`, `country`) VALUES
(5, '9aa55d11-1c5f-4785-8c21-b8195610867f', '07235 Claremont Point', '08', 'Medellín', 'Antioquia', 'Colombia'),
(6, '64263d5a-8b3b-46a8-96b6-9d6dad5e7d80', 'calle', '123', 'ciudad', 'provincia', 'pais'),
(7, '01c20ab5-0e8f-49a3-94ee-a6178611c05d', 'Aviador Mira', '1234', 'ciudad', 'provincia', 'pais'),
(8, '0f01a56e-f8ce-44b8-adf6-97cfa13ccee3', 'Aviador Mira', '3053', 'Córdoba', 'Córdoba', 'Argentina'),
(9, '69d11747-f007-4622-bd14-e9268dc46935', 'calle', '1234', 'Ciudad', 'Provincia', 'Pais'),
(10, 'eebe1508-6e25-4639-ab38-01a1c3088e6b', 'Aviador Mira', '3053', 'Córdoba', 'Córdoba', 'Argentina'),
(11, 'fa696f5a-9027-4016-bde6-bcce2d2f45e4', 'calle', '123', 'ciudad', 'Buenos Aires', 'Argentina'),
(12, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70', 'calle 10', '123', 'Río de Janeiro', 'Estado de Río de Janeiro', 'Brasil'),
(13, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042', 'calle 10', '123', 'Medellín', 'Antioquia', 'Colombia'),
(14, '4efea15a-fa9a-4ae1-a1c9-b316f02b4706', 'calle 10', '123', 'Córdoba', 'Córdoba', 'Argentina'),
(15, 'ff43d5c8-1d65-4436-b7f5-997da4fc9697', 'calle 22', '55', 'Ciudad de Lima', 'Lima', 'Perú'),
(16, '7e95d5ac-e682-4092-ab91-e1170acbd3b2', 'calle 66', '77', 'Asunción', 'Distrito Capital', 'Paraguay'),
(17, '82a91196-b5e7-4fef-9650-30e52f3ab0a2', 'calle 12', '99', 'Santiago de Chile', 'Metropolitana de Santiago', 'Chile'),
(18, '1266442a-b3bd-4be9-b39a-839fb1860bc9', 'calle 55', '22', 'Armenia', 'Quindío', 'Colombia'),
(19, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3', 'calle 55', '22', 'Buenos Aires', 'Provincia de Buenos Aires', 'Argentina');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
