-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-09-2025 a las 09:14:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pruebatecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `situation` tinyint(1) DEFAULT 0,
  `priority` int(11) DEFAULT 1,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `situation`, `priority`, `creation_date`, `end_date`, `user_id`) VALUES
(9, 'PRUEBA #1 ', 'ESTA ES UNA DE LAS PRIMERAS PRUEBAS', 0, 2, '2025-09-05 06:46:53', '2025-09-06', 1),
(22, 'Comprar víveres', 'Comprar leche, pan y huevos para la semana', 0, 2, '2025-09-05 07:00:50', '2025-09-07', 1),
(23, 'Estudiar para examen', 'Repasar matemáticas y física', 0, 3, '2025-09-05 07:00:50', '2025-09-05', 1),
(24, 'Enviar informe', 'Enviar el informe de ventas al jefe', 0, 2, '2025-09-05 07:00:50', '2025-09-06', 1),
(25, 'Hacer ejercicio', 'Correr 5 km y estiramientos', 1, 1, '2025-09-05 07:00:50', '2025-09-03', 3),
(26, 'Leer libro', 'Terminar capítulo 4 de \"Cien años de soledad\"', 0, 1, '2025-09-05 07:00:50', '2025-09-08', 3),
(27, 'Preparar presentación', 'Diseñar diapositivas para la reunión', 0, 3, '2025-09-05 07:00:50', '2025-09-09', 3),
(28, 'Comprar regalo', 'Comprar regalo de cumpleaños para un amigo', 0, 2, '2025-09-05 07:00:50', '2025-09-10', 1),
(29, 'Pagar facturas', 'Pagar electricidad y agua', 1, 1, '2025-09-05 07:00:50', '2025-09-04', 3),
(30, 'Limpiar la casa', 'Barrer, trapear y organizar habitaciones', 0, 1, '2025-09-05 07:00:50', '2025-09-06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pswd` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `pswd`) VALUES
(1, 'Yaset Meza Valenzuela', 'alex_mz@outlook.com', 'Abcd1234'),
(3, 'Juan Pérez', 'juan.perez@example.com', '123456');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
