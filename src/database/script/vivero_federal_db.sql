-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2023 at 07:04 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vivero_federal_db`
--
DROP DATABASE IF EXISTS `vivero_federal_db`;
CREATE DATABASE IF NOT EXISTS `vivero_federal_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vivero_federal_db`;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `disabled`, `created_at`, `updated_at`) VALUES
(1, 'De interior', 'deinterior.jpg', 0, NULL, NULL),
(2, 'De exterior', 'deexterior.jpg', 0, NULL, NULL),
(3, 'Suculentas y cactus', 'sucycac.jpg', 0, NULL, NULL),
(4, 'Macetas', 'macetas.jpg', 0, NULL, NULL),
(5, 'Accesorios', 'accesorios.jpg', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `disabled`, `created_at`, `updated_at`) VALUES
(1, 'Naranja', 0, NULL, NULL),
(2, 'Marrón', 0, NULL, NULL),
(3, 'Rosa', 0, NULL, NULL),
(4, 'Blanco', 0, NULL, NULL),
(5, 'Rojo', 0, NULL, NULL),
(6, 'Azul', 0, NULL, NULL),
(7, 'Verde', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `color_id` int(10) UNSIGNED DEFAULT NULL,
  `size_id` int(10) UNSIGNED DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `image`, `category_id`, `color_id`, `size_id`, `disabled`, `created_at`, `updated_at`) VALUES
(1, 'Begonia', 'El género Begonia comprende alrededor de 1500 especies, de las que alrededor de 150, además de casi 10 000 variedades e híbridos, se comercializan para su uso en jardinería. Son oriundas de las regiones tropicales y subtropicales de América, África y Asia. El único otro miembro de la familia Begoniaceae es Hillebrandia, un género con una sola especie en las islas Hawái, y el género Symbegonia que recientemente se incluyó en Begonia.', '800.00', '15.00', 'begonia.jpg', 1, NULL, NULL, 0, NULL, NULL),
(2, 'Hipocirta', 'Las plantas conocidas como hipocirta son estupendas para tener en el interior de la vivienda o en un jardín cálido. Sus flores son muy llamativas, pese a su reducido tamaño, por lo que si necesitas darle algo de color a la estancia, sin duda con ellas tendrás el problema resuelto.', '900.00', '10.00', 'hipocirta.jpg', 1, NULL, NULL, 0, NULL, NULL),
(3, 'Cortadum', 'El Cordatum es una planta trepadora de interior. Sus hojas son color verde oscuro en forma de corazón (de ahí su nombre “Cordatum”, en latín: Corazón”. Es muy buscada para decorar interiores, se destaca para su uso en estanterías.', '1000.00', '15.00', 'img-cortadum-1675259023844.jpg', 1, NULL, NULL, 0, NULL, NULL),
(4, 'Jazmín del Paraguay', 'El jazmín del Paraguay (Brunfelsia Pauciflora), jazmín paraguayo o azuzena de paraguay; es una especie de arbusto perteneciente de la familia Solanaceae, del género Brunfelsia. Esta planta crece en distintos lugares del continente americano, principalmente en América del sur. Tiene la singularidad de una vez finalizado su proceso de florecimiento, cambiar de tonalidades las flores, estas pasan de colores violetas oscuros en degrade hasta verse en tonalidades blancas.', '1100.00', '20.00', 'jazmin-del-paraguay.jpg', 2, NULL, NULL, 0, NULL, NULL),
(5, 'Farolito Japonés', 'El farolito japonés o abutilón es un gran grupo de plantas cuyo nombre común remite a la forma de sus flores. Vamos a ver cómo cuidar esta planta.', '1200.00', '5.00', 'farolito-japones.jpg', 2, NULL, NULL, 0, NULL, NULL),
(6, 'Rosal', 'Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.', '1200.00', '12.00', 'img-rosal-1675279397752.jpg', 2, 3, NULL, 0, NULL, NULL),
(7, 'Rosal', 'Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.', '1200.00', '12.00', 'img-rosal-1675279397752.jpg', 2, 4, NULL, 0, NULL, NULL),
(8, 'Rosal', 'Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.', '1200.00', '12.00', 'img-rosal-1675279397752.jpg', 2, 5, NULL, 0, NULL, NULL),
(9, 'Suculenta', 'Las plantas suculentas (del latín succulentus, que significa jugoso o sustancioso) o crasas son aquellas en las que algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación. Estos órganos de reserva tienen una alta proporción de tejido parenquimático. El almacenamiento de agua en los órganos de algunas suculentas es de 90-95 %. Su adaptación les permite mantener reservas de agua durante períodos prolongados, y sobreviven a los largos períodos de sequía en climas áridos. Uno de los ejemplos más conocidos de suculencia es el de los tallos de los cactus del Nuevo Mundo, similar al de varias euforbiáceas y apocináceas africanas. Ejemplos de hojas suculentas se encuentran en Aloe, Agave, y en las crasuláceas.s Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o price.', '550.00', '5.00', 'suculenta.jpg', 3, NULL, NULL, 0, NULL, NULL),
(10, 'Cactus', 'Cactaceae, las cactáceas, conocidas como cactus o cactos, es una familia de plantas originarias de América. Sin embargo, hay una excepción, Rhipsalis baccifera, que está extendida en África tropical, Madagascar y Ceilán. Se cree que la colonización de Europa por esta especie es relativamente reciente (unos cuantos cientos de años), probablemente transportada en el aparato digestivo de pájaros migratorios en forma de semillas, bien directamente desde América o a partir de poblaciones surgidas en África como consecuencia del transporte de esclavos. Muchas plantas suculentas, tanto en Europa como en América, tienen una notable semejanza con los cactus y, a menudo, son así llamadas en lenguaje corriente. Sin embargo, esto se debe a la evolución paralela o convergente (similares presiones selectivas resultan en morfologías parecidas), ya que ninguna de ellas está estrechamente emparentada con las cactáceas. La característica identificativa más clara de la familia de los cactus es la areola, una estructura especializada de donde surgen las espinas, los vástagos nuevos y, en muchas ocasiones, las flores.', '500.00', '0.00', 'cactus.jpg', 3, NULL, NULL, 0, NULL, NULL),
(11, 'Blum Agustiniana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '5.00', 'blum-agustiniana.jpg', 4, 1, 2, 0, NULL, NULL),
(12, 'Blum Agustiniana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '5.00', 'blum-agustiniana.jpg', 4, 1, 3, 0, NULL, NULL),
(13, 'Blum Agustiniana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '5.00', 'blum-agustiniana.jpg', 4, 1, 4, 0, NULL, NULL),
(14, 'Blum Americana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-americana.jpg', 4, 1, 2, 0, NULL, NULL),
(15, 'Blum Americana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-americana.jpg', 4, 1, 3, 0, NULL, NULL),
(16, 'Blum Americana', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-americana.jpg', 4, 1, 4, 0, NULL, NULL),
(17, 'Blum Cilindro', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-cilindro.jpg', 4, 2, 3, 0, NULL, NULL),
(18, 'Blum Cilindro', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-cilindro.jpg', 4, 2, 4, 0, NULL, NULL),
(19, 'Blum Cilindro', 'Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.', '1500.00', '0.00', 'blum-cilindro.jpg', 4, 2, 5, 0, NULL, NULL),
(20, 'Palita', 'Palita para jardín.', '1500.00', '0.00', 'palita.jpg', 5, NULL, NULL, 0, NULL, NULL),
(21, 'Guantes', 'Guantes de jardín verdes.', '2200.00', '10.00', 'guantes.jpg', 5, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `disabled`, `created_at`, `updated_at`) VALUES
(1, 'XS', 0, NULL, NULL),
(2, 'S', 0, NULL, NULL),
(3, 'M', 0, NULL, NULL),
(4, 'L', 0, NULL, NULL),
(5, 'XL', 0, NULL, NULL),
(6, 'XXL', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_category_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `user_category_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Sebastián', 'Braga', 'sebabraga01@gmail.com', '$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq', 2, NULL, NULL, NULL),
(2, 'Camila Luz', 'Quispe', 'quispeluzcami@gmail.com', '$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq', 2, NULL, NULL, NULL),
(3, 'Gustavo', 'Buscalia', 'buscaliag@gmail.com', '$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq', 2, NULL, NULL, NULL),
(4, 'Valentino', 'Becerine', 'valentinobecerine@gmail.com', '$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq', 2, NULL, NULL, NULL),
(5, 'Admin', 'del Sitio', 'admin@gmail.com', '$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq', 1, 'img-admin-1676500048292.jpg', NULL, NULL),
(6, 'Andrés', 'Iniesta', 'ainiesta@gmail.com', '$2a$10$LDUj6c7jfP5UulL7fZMkxedsEHSXz5AEc0MOp8TEZk5kYcuRlp54K', 2, 'img-iniesta-1676042688859.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_categories`
--

CREATE TABLE `user_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_categories`
--

INSERT INTO `user_categories` (`id`, `name`, `disabled`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 0, NULL, NULL),
(2, 'Cliente', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_user_id_foreign` (`user_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_product_id_foreign` (`product_id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_color_id_foreign` (`color_id`),
  ADD KEY `products_size_id_foreign` (`size_id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `users_user_category_id_foreign` (`user_category_id`);

--
-- Indexes for table `user_categories`
--
ALTER TABLE `user_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `products_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `products_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_user_category_id_foreign` FOREIGN KEY (`user_category_id`) REFERENCES `user_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
