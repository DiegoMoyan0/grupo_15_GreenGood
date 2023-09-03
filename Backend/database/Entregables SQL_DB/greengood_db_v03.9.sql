-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2023 a las 19:12:09
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
-- Estructura de tabla para la tabla `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `shopping_session_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `cart_items`
--

INSERT INTO `cart_items` (`id`, `quantity`, `product_id`, `shopping_session_id`) VALUES
(75, 1, 161, 13),
(79, 1, 167, 12),
(80, 1, 161, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Cultivo'),
(2, 'Medicinal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liked_products`
--

CREATE TABLE `liked_products` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `name`, `phone`, `website`) VALUES
(1, 'Green Good', '0412635211', 'wwww.greengood.com.ar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `detail_total` decimal(10,2) NOT NULL,
  `user_payment_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `order_details`
--

INSERT INTO `order_details` (`id`, `order_date`, `detail_total`, `user_payment_id`, `user_id`) VALUES
(1, '2023-08-24', 1828.68, 1, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(2, '2023-08-24', 4928.26, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(3, '2023-09-02', 4516.20, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(4, '2023-07-04', 15400.00, 1, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(5, '2023-05-17', 1850.00, 1, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(6, '2023-04-25', 800.00, 1, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(7, '2023-05-09', 3899.00, 1, 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(8, '2023-05-16', 1850.00, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(9, '2023-06-30', 15400.00, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(10, '2023-03-15', 8550.00, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(11, '2023-02-16', 2540.00, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(12, '2023-05-02', 1250.00, 2, 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(13, '2023-07-21', 5780.00, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(14, '2023-09-01', 3666.00, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(15, '2023-04-02', 4150.00, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(16, '2023-01-26', 7890.00, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(17, '2023-06-01', 2300.00, 3, '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(18, '2023-08-22', 6320.00, 4, 'eebe1508-6e25-4639-ab38-01a1c3088e6b'),
(19, '2023-07-17', 3150.00, 4, 'eebe1508-6e25-4639-ab38-01a1c3088e6b'),
(20, '2023-03-20', 10500.00, 4, 'eebe1508-6e25-4639-ab38-01a1c3088e6b');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `order_detail_id` int(11) NOT NULL,
  `cart_item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `amount`, `order_detail_id`, `cart_item_id`) VALUES
(1, 4, 457.17, 1, 10),
(2, 12, 376.35, 1, 12),
(3, 2, 2464.13, 2, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `image` varchar(150) NOT NULL,
  `info` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `sales_amount` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `image`, `info`, `price`, `discount`, `stock`, `sales_amount`, `category_id`, `subcategory_id`, `manufacturer_id`, `type_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(155, 'Air Pot Medium', 'Maceta Moderna Air Pot - Cultivo in-door - Ca', 'img-1690415689893-airpot-10L.png', 'La maceta Airpottunning mejora el tamaño y rendimiento de tus proyectos, es una Maceta con sistema automático de podado de raíz que permite un crecimiento radicular homogéneo y constante, permite ademas un drenaje hídrico de forma autónoma. Una maceta re-utilizable y de fácil guardado.       \r\nTu maceta Airpottunning consta de 3 piezas, la base, el cuerpo y los tonillos, para armarlo debes poner el cuerpo al rededor de la base, el cuerpo debe tener los orificios tapados hacia arriba, una vez esto ubicado, lo afirmas con los tornillos en el extremo inferior y superior del armado y listo!! es muy firme y la puedes volver a desarmar y armar cuando tu lo necesites, su guardado es compacto.', 3970.00, 30, 344, 0, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-26 23:54:49', NULL),
(156, 'Air Pot Large', 'Maceta Moderna Air Pot Large - Cultivo in-doo', 'airpot-30L.png', 'La maceta Airpottunning mejora el tamaño y rendimiento de tus proyectos, es una Maceta con sistema automático de podado de raíz que permite un crecimiento radicular homogéneo y constante, permite ademas un drenaje hídrico de forma autónoma. Una maceta re-utilizable y de fácil guardado.        Tu maceta Airpottunning consta de 3 piezas, la base, el cuerpo y los tonillos, para armarlo debes poner el cuerpo al rededor de la base, el cuerpo debe tener los orificios tapados hacia arriba, una vez esto ubicado, lo afirmas con los tornillos en el extremo inferior y superior del armado y listo!! es muy firme y la puedes volver a desarmar y armar cuando tu lo necesites, su guardado es compacto.', 4970.00, 10, 120, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(157, 'Bandeja Cuadrada In-Grow Small', 'Plato/Bandeja chica - Cultivo Indoor: Maceta ', 'img-undefined-1686573019430-bandeja-cuadrada.png', 'Modelo: Plastico. Color: Negro. Altura x Ancho x Largo: 5 cm x 25 cm x 25 cm. Unidades por envase: 1.', 2532.00, 1, 657, 15, 1, 1, 1, 2, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(158, 'Bandeja Cultivo Large', 'Bandeja Cultivo 50 Alveolos Germinar Esquejes', 'bandeja-semillera.png', 'Capacidad 50 alveolos (plantines). Ideal para germinar gran cantidad de plantas, o para esquejes. // Perforaciones de buen tamaño que determina auto poda radicular aérea y buen drenaje. Fácilmente extraíble el plantin una vez enraizado. Medidas: 54.5 cm. x 28 cm. Diámetro del alveolo: 5cm. Profundidad 6 cm.', 2464.13, 7, 564, 8, 1, 1, 1, 2, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(159, 'Bidón para Sustrato', 'Bidón plástico 10 litros de capacidad para su', 'bidon-sustrato.png', 'Bidón plástico 10L sin contenido', 376.35, 15, 162, 15, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-27 11:18:27', NULL),
(160, 'Inflada / Bolsa Cultivo', 'Maceta de bolsa plástica - Capacidad: 10 litr', 'bolsa-10L.png', '*PLÁSTICO DE PRIMERA LíNEA. *10 perforaciones para el drenaje *tratada para los rayos U. V. *degradables *de 160 micrones *fuelle de 24cm *indicadas para el cultivo intensivo económicas y rendidoras.', 457.17, 6, 960, 11, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(161, 'Geotextil Grow Small', 'Maceta Moderna Geotextil Gris - 1capidad: 12,', 'geotextil-12,5l.png', '• Material: Tela geotextil. • Capacidad: 12,5 litros • Medidas: Alto 27 cm x Diámetro 26 cm. • Durabilidad: Entre 5 a 10 años. • Reutilizable y ecológico. • Ideal para utilizarla tanto en cultivos interiores como exteriores. • Favorece una mayor absorción de agua y nutrientes. • Tela con porosidad que potencia el desarrollo de los cultivos. • Permite un drenaje natural y uniforme, evitando el exceso de humedad. • La tela geotextil debe lavarse a baja temperatura y es reutilizable. • Evitá el excesivo peso de las macetas de cemento en tu balcón o terraza. • No se quiebran como las de cemento • No se pudren como las de madera. • No se degradan como las de plástico • Permite la aireación del sustrato, esto genera un ambiente saludable para desarrollar raíces sanas y bien distribuidas, favoreciendo una mayor absorción de agua y nutrientes, desarrollando todo el potencial de sus cultivos.', 2738.69, 34, 737, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(162, 'Geotextil Grow Large', 'Maceta Moderna Geotextil Negra  - Circular de', 'geotextil-circular-20L.png', '• Material: Tela geotextil. • Capacidad: 20 litros • Medidas: Alto 37 cm x Diámetro 36 cm. • Durabilidad: Entre 5 a 10 años. • Reutilizable y ecológico. • Ideal para utilizarla tanto en cultivos interiores como exteriores. • Favorece una mayor absorción de agua y nutrientes. • Tela con porosidad que potencia el desarrollo de los cultivos. • Permite un drenaje natural y uniforme, evitando el exceso de humedad. • La tela geotextil debe lavarse a baja temperatura y es reutilizable. • Evitá el excesivo peso de las macetas de cemento en tu balcón o terraza. • No se quiebran como las de cemento • No se pudren como las de madera. • No se degradan como las de plástico • Permite la aireación del sustrato, esto genera un ambiente saludable para desarrollar raíces sanas y bien distribuidas, favoreciendo una mayor absorción de agua y nutrientes, desarrollando todo el potencial de sus cultivos.', 3738.69, 0, 251, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(163, 'Geotextil Grow XLarge', 'Maceta Moderna Geotextil Negra  - Circular de', 'geotextil-circular-25L.png', '• Material: Tela geotextil. • Capacidad: 25 litros • Medidas: Alto 47 cm x Diámetro 37 cm. • Durabilidad: Entre 5 a 10 años. • Reutilizable y ecológico. • Ideal para utilizarla tanto en cultivos interiores como exteriores. • Favorece una mayor absorción de agua y nutrientes. • Tela con porosidad que potencia el desarrollo de los cultivos. • Permite un drenaje natural y uniforme, evitando el exceso de humedad. • La tela geotextil debe lavarse a baja temperatura y es reutilizable. • Evitá el excesivo peso de las macetas de cemento en tu balcón o terraza. • No se quiebran como las de cemento • No se pudren como las de madera. • No se degradan como las de plástico • Permite la aireación del sustrato, esto genera un ambiente saludable para desarrollar raíces sanas y bien distribuidas, favoreciendo una mayor absorción de agua y nutrientes, desarrollando todo el potencial de sus cultivos.', 5499.99, 15, 129, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(164, 'Geotextil Grow Cuadrada', 'Maceta Moderna Geotextil Negra  - Cuadrada de', 'geotextil-cuadrada-25L.png', '• Material: Tela geotextil Negra. • Capacidad: 25 litros • Medidas: 42 x 42 x 32 cm. • Durabilidad: Entre 5 a 10 años. • Reutilizable y ecológico. • Ideal para utilizarla tanto en cultivos interiores como exteriores. • Favorece una mayor absorción de agua y nutrientes. • Tela con porosidad que potencia el desarrollo de los cultivos. • Permite un drenaje natural y uniforme, evitando el exceso de humedad. • La tela geotextil debe lavarse a baja temperatura y es reutilizable. • Evitá el excesivo peso de las macetas de cemento en tu balcón o terraza. • No se quiebran como las de cemento • No se pudren como las de madera. • No se degradan como las de plástico • Permite la aireación del sustrato, esto genera un ambiente saludable para desarrollar raíces sanas y bien distribuidas, favoreciendo una mayor absorción de agua y nutrientes, desarrollando todo el potencial de sus cultivos.', 4999.99, 0, 55, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(165, 'Combo Geotextiles Cultivo', 'Combo Macetas Geotextiles Negras Circulares 2', 'geotextiles-varias.png', '• Material: Tela geotextil • Circulares 25L (cant 2): -Capacidad: 25 litros y Medidas: Alto 47 cm x Diámetro 37 cm. • Circulares (cant x 3): -Capacidad: 20 litros y Medidas: Alto 37 cm x Diámetro 36 cm. • Durabilidad: Entre 5 a 10 años. • Reutilizable y ecológico. • Ideal para utilizarla tanto en cultivos interiores como exteriores. • Favorece una mayor absorción de agua y nutrientes. • Tela con porosidad que potencia el desarrollo de los cultivos. • Permite un drenaje natural y uniforme, evitando el exceso de humedad. • La tela geotextil debe lavarse a baja temperatura y es reutilizable. • Evitá el excesivo peso de las macetas de cemento en tu balcón o terraza. • No se quiebran como las de cemento • No se pudren como las de madera. • No se degradan como las de plástico • Permite la aireación del sustrato, esto genera un ambiente saludable para desarrollar raíces sanas y bien distribuidas, favoreciendo una mayor absorción de agua y nutrientes, desarrollando todo el potencial de sus cultivos.', 21500.00, 5, 55, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(166, 'Maceta Geotextil Grow Small', 'Maceta \'Mad Rocket\' - Capacidad: 16 Litros Or', 'guia-16L.png', 'La particularidad que tienen estas macetas es que cuenta con guiadores de raíces y ventanas con auto poda radicular aérea. Esto hace que las raíces se estén reproduciendo continuamente y maximicen el espacio tanto en maceta como en tierra, haciendo que la planta pueda copar todo el sustrato. Especificaciones: • Medidas: diámetro:20cm, altura:40cm • Plástico reciclado rígido. • Auto poda radicular.', 1755.00, 0, 20, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(167, 'Germinadores Jiffy', 'Germinador de Turba Prensada Jiffy J7 Circula', 'jiffy-circular.png', 'Germinador de Turba de 30 x 40 mm Marca Jiffy. // Los Jiffys son tacos de turba prensada (en este caso de 41 milímetros) que resultan ideales para la germinación de semillas y el enraizamiento de los esquejes. Se expanden y se hinchan con el agua y brindan una enorme porosidad y estabilidad. Están elaborados con sustratos de gran calidad y mantienen un magnífico nivel de humedad. Su uso hace que el proceso del transplante se lleve a cabo de manera mucho más sencilla. // Sus principales características son: - Jiffys de turba prensada. - 41 milímetros. - Se utilizan para germinar semillas y realizar esquejes. - Gran porosidad y estabilidad', 786.00, 0, 33, NULL, 1, 1, 1, 2, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(168, 'Germinadores Growblock', 'Growblock 5x5 cm, Jiffy Cuadrado de Coco por ', 'jiffys-cuadrado.png', 'Jiffy cuadrados de Coco: Recubiertos en malla biodegradable, lo que permite, una vez enraizado, colocarlo directamente en la maceta final evitando así que tu Planta sufra el estrés del transplante, no perderás ni un día de crecimiento. // Es perfecto para el enraizamiento de esquejes, así como para germinar las semillas. // Este jiffy contiene trichodermas naturales, que facilitan el desarrollo de las raíces de la planta.. // Son cuadrados medianos de turba compactada de alta calidad, forrados con una redecilla. Cuando se humedecen aumentan de tamaño, haciéndose más profundo el pequeño agujero de su parte superior. Son súper fáciles de usar, sólo has de introducir en ellos las semillas o esquejes y mantenerlos húmedos; a poder ser dentro de un clonador hasta que aparezcan las pequeñas plantas. Luego basta con traspasarlos a la maceta compactando un poco la tierra de su alrededor con las manos. No es necesario sacar las plantas de los jiffys, sus raíces atravesarán la redecilla sin ningún esfuerzo.', 950.00, 5, 10, NULL, 1, 1, 1, 2, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(169, 'Maceta Koi 10L', 'Maceta Moderna \'Koi\' - Blanca o Negra - Capac', 'KOI-10L.png', '++ La forma de la maceta KOI permite un excelente drenaje inferior y mejorar la estructura y organización del cultivo. ++ El resultado es: Plantas saludables, bonitas y fértiles. + Medidas: Superior: 22x22 cm - Altura: 28 Cm. - Base: 17 x 17 Cm.', 1299.99, 10, 15, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(170, 'Circular Grow - 20L', 'Maceta Circular Plástica Indoor - Capacidad: ', 'plastica-circular-20L.png', 'Las macetas circulares de plástico son las más utilizadas por los cultivadores, son económicas hechas de plástico resistente, ligeras y se pueden utilizar tanto en cultivo exterior como en indoor de cultivo interior. // Su forma aprovecha mejor el espacio y maximizando el mismo. // El material del cual están echo, te garantizan la reutilización de las misma durante varios cultivos. En este caso tienes una maceta negra circular con capacidad de 10 litros que cuenta con un drenaje muy bien definido para brindar las mejores condiciones a tus plantas. Además de las ranuras para el drenaje tiene una base elevada que le permite un mejore drenaje y aireación. Su color negro la hace muy atractiva para usar en interiores, dentro o fuera de los armarios de cultivo indoor.', 1260.00, 1, 5, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(171, 'Circular Grow - 25L', 'Maceta Circular Plástica Autocultivo - Capaci', 'plastica-circular-25L.png', 'Las macetas circulares de plástico son las más utilizadas por los cultivadores, son económicas hechas de plástico resistente, ligeras y se pueden utilizar tanto en cultivo exterior como en indoor de cultivo interior. // Su forma aprovecha mejor el espacio y maximizando el mismo. // El material del cual están echo, te garantizan la reutilización de las misma durante varios cultivos. En este caso tienes una maceta negra circular con capacidad de 10 litros que cuenta con un drenaje muy bien definido para brindar las mejores condiciones a tus plantas. Además de las ranuras para el drenaje tiene una base elevada que le permite un mejore drenaje y aireación. Su color negro la hace muy atractiva para usar en interiores, dentro o fuera de los armarios de cultivo indoor.', 1260.00, 1, 5, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(172, 'Root House Medium', 'Maceta Moderna \'Roots House\' Indoor - Capacid', 'roosthouse-10L.png', 'Medidas: - Ancho: 23 cm - Largo 23 cm - Altura: 33 cm. // La Maceta Roots House 10 Litros inteligente está especialmente diseñada para cultivos especializados y su enfoque se centra en obtener sistemas de raíces óptimos para que tus plantas crezcan sin pausa. Sus múltiples drenajes garantizan la eliminación de excesos de humedad para obtener raíces fuertes. Cuenta con guias internas que evitan la estrangulacion y genera una autopoda aerea de tus raices. Logrando muy buenos resulados.', 1699.99, 25, 121, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(173, 'Root House Small', 'Maceta Moderna \'Roots House\' Indoor - Capacid', 'rootshouse-10L.png', 'Medidas: - Ancho: 23 cm - Largo 23 cm - Altura: 23 cm. // La Maceta Roots House 8 Litros inteligente está especialmente diseñada para cultivos especializados y su enfoque se centra en obtener sistemas de raíces óptimos para que tus plantas crezcan sin pausa. Sus múltiples drenajes garantizan la eliminación de excesos de humedad para obtener raíces fuertes. Cuenta con guias internas que evitan la estrangulacion y genera una autopoda aerea de tus raices. Logrando muy buenos resulados.', 1340.00, 1, 12, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(174, 'Sopladas Small Cultivo x10u', 'Maceta Soplada de plástico economicas - Capac', 'soplada-5L.png', 'Maceta soplada de 5 litros x 10 unidades ideal para cultivos de exterior e interior. // CARACTERÍSTICAS: Excelente material, muy resistente, con agujeros en la parte inferior para la filtración del agua.', 1999.99, 0, 98, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(175, 'Sopladas Medium Cultivo x5u', 'Maceta Soplada de plástico economicas - Capac', 'soplada-12L.png', 'Maceta soplada de 12 litros x 5 unidades ideal para cultivos de exterior e interior. // CARACTERÍSTICAS: Excelente material, muy resistente, con agujeros en la parte inferior para la filtración del agua.', 2500.00, 17, 85, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(176, 'Sopladas Large Cultivo x5u', 'Maceta Soplada de plástico economicas - Capac', 'soplada-20L.png', 'Maceta soplada de 20 litros x 5 unidades ideal para cultivos de exterior e interior. // CARACTERÍSTICAS: Excelente material, muy resistente, con agujeros en la parte inferior para la filtración del agua.', 4955.50, 5, 22, NULL, 1, 1, 1, 1, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(177, 'Grower Soil Small', 'Abono Orgánico Growers Base De Humos Y Harina', 'abono-growers-5L.png', 'Abono orgánico a base de humus y harina de pescado Growers de 5 litros. // Aporta gran cantidad de microorganismos al suelo mejorando la calidad y cantidad de nutrientes disponibles para las plantas. La harina de pescado es un fertilizante natural de liberación lenta por lo que el Abono Orgánico Growers permanece en el suelo liberando nutrientes durante mucho mas tiempo que otros abonos naturales. // Modo de uso: Se puede utilizar para renovar sustratos usados y/o como comp´lemento para la floracion. Como complemento: Colocar en la superficie de la maceta, por debajo del mulching. Calcular hasta un 10% del volumen total de la maceta y en canteros una capa del al menos 2cm de alto. Como mejorador: Incorporar al sustrato usado aprox un 15% respecto de los litros del sustrato a mejorar.', 700.00, 0, 12, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(178, 'Cultivate Soil Coco', 'Sustrato De Autor Coco Premium 25 L Cultivate', 'cultivateCoco-25L.png', 'El Coco Premium es un Sustrato de autor con el agregado óptimo de fibra de coco, que ofrece a las raíces un mejor acceso al aire y los nutrientes, para que crezcan más sanas y fuertes. // Alta porosidad, retención equilibrada de líquidos y alta carga nutricional. // INGREDIENTES: - Fibra de Coco. - Humus puro de lombriz. - Mix de turbas. - Perlitas. - Trichodermas. // PH 6% // Bolsa de 25dm3 - Rinde 25 litros', 3499.99, 0, 21, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(179, 'Cultivate Soil Completo', 'Sustrato Autofloreciente Interior/Exterior Cu', 'cultivateCompleto-25L.png', 'Sustrato Cultivate para plantas autoflorecientes en interior o exterior de 25 litros cada una. 100% orgánico. Mayor porosidad y drenaje para que tus plantas tengan en suelo perfecto. // Contiene: - Mix de turbas, - Humus de lombriz, - Perlita, - Vermiculita, - Fibra de coco seleccionada y cuidadosamente hidratada, - Tricodermas. // PH del sustrato: 6.0 // El Sustrato Automáticas a diferencia que el Sustrato Indoor Cutivate tiene un mayor porcentaje de humus que le proporciona más nutrientes para esta etapa inicial del crecimiento.', 4200.00, 5, 35, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(180, 'Cultivate Soil Liviano', 'Sustrato Interior/Exterior Cultivate Liviano ', 'cultivateLiviano-25L.png', 'El Sustrato Liviano de Cultivate es un sustrato más aireado. Con más cantidad de turba (PH estabilizado con dolomita), perlita y vermiculita. // IDEAL PARA ESQUEJES Y LOS PRIMEROS PASOS.// FUNCIONES: - Favorece los primeros pasos de crecimiento y brinda alimento, ya que, está enriquecido con humus de primera calidad y microorganismos benéficos para el desarrollo de las raíces. - Contribuye con el buen desarrollo de nuestras plantas. - Es aireado y tiene una gran capacidad de retención de líquidos. - Contiene los nutrientes que la planta consumirá en los primeros meses de vida. // COMPOSICIÓN: - Humus de lombriz de alta calidad. - Mix de turbas sphagnum fueguinas. - Perlita. - Dolomita. - Vermiculita. - Trichodermas. - Micorrizas. // PH: 5,5', 2700.00, 0, 8, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(181, 'Cultivate Soil Premium', 'Sustrato Orgánico Premium De Cultivo Cultivat', 'cultivatePremium-25L.png', 'SUSTRATO DE CULTIVO INDOOR Y EXTERIOR CULTIVATE PREMIUM 100% ORGÁNICO X 25 LITROS. // Es un sustrato completo con un plus de compost de hojas y el doble de trichodermas y micorrizas. Favorece los primeros pasos de crecimiento y brinda alimento de calidad durante toda esta etapa. // Es un sustrato de alta porosidad 100% ORGÁNICO. Nivel de PH 6.0, el rango recomendado para la mejor absorción de nutrientes. Recomendado para uso en exterior. // INGREDIENTES: - Compost de hojas. - Humus de lombriz. - Mix de turbas. - Perlitas. - Trichodermas. - Micorrizas. // Bolsa de 25dm3 Rinde 25 litros', 2900.00, 25, 42, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(182, 'Growers Soil Medium', 'Sustrato Growers Original abonado, indoor/out', 'growers-20L.png', 'Sustrato Growers Original 20 litros Indoor Exterior Abonado Completo. // Este sustrato esta especificamente desarrollado para cultivos intensivos en contenedores ya que brinda la aireacion, retencion y humedad necesaria, ademas de una nutricion organica completa. Sirve tanto para el crecimiento como para la floracion. // Compuesto por: - Tierra negra. - Compost. - Turba rubia. - Humus de Lombriz. - Perlita. - Vermiculita. - Harina de Pescado. - Micorriza. - Trichoderma. - pH 6 – 7 EC 1 – 1,5 mcm. LISTO PARA USAR!', 1899.99, 0, 36, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(183, 'Growers Soil Large', 'Sustrato Growers Original de 50 litros, Indoo', 'growers-50L.png', 'Sustrato Growers Original 50 litros Indoor Exterior Abonado Completo. // Este sustrato esta especificamente desarrollado para cultivos intensivos en contenedores ya que brinda la aireacion, retencion y humedad necesaria, ademas de una nutricion organica completa. Sirve tanto para el crecimiento como para la floracion. // Compuesto por: - Tierra negra. - Compost. - Turba rubia. - Humus de Lombriz. - Perlita. - Vermiculita. - Harina de Pescado. - Micorriza. - Trichoderma. - pH 6 – 7 EC 1 – 1,5 mcm. LISTO PARA USAR!', 3500.00, 5, 22, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(184, 'Growers \'Super-Soil\' Medium', 'Sustrato Growers SUPER SOIL organico alto ren', 'growers-supersoil-20L.png', '*Características: - Sustrato orgánico de alto rendimiento específicamente desarrollado para cultivos intensivos en contenedores. Brinda la aireación, retención y humedad necesaria, además de protección y nutrición orgánica para un cultivo saludable. // - Apto Para: - *CULTIVO INTERIOR *CRECIMIENTO.  - *CULTIVO EXTERIOR *FLORACION. - *VARIEDADES AUTOFLORECIENTES. - // - Compuesto por: Tierra Negra, Turba Rubia, Compost, Humus de Lombriz, Perlita, Vermiculita, Harina de Pescado, Trichodermas, Micorrizas. // pH: 6,5 – 7,5 EC:1,5 – 2,0 mcm', 2999.99, 0, 15, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(185, 'Growers \'Super-Soil\' Large', 'Sustrato Growers SUPER SOIL organico alto ren', 'growers-supersoil-50L.png', '*Características: - Sustrato orgánico de alto rendimiento específicamente desarrollado para cultivos intensivos en contenedores. Brinda la aireación, retención y humedad necesaria, además de protección y nutrición orgánica para un cultivo saludable. // - Apto Para: - *CULTIVO INTERIOR *CRECIMIENTO.  - *CULTIVO EXTERIOR *FLORACION. - *VARIEDADES AUTOFLORECIENTES. - // - Compuesto por: Tierra Negra, Turba Rubia, Compost, Humus de Lombriz, Perlita, Vermiculita, Harina de Pescado, Trichodermas, Micorrizas. // pH: 6,5 – 7,5 EC:1,5 – 2,0 mcm', 4855.50, 0, 6, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(186, 'Tierra negra - 20L', 'Tierra de Jardin de 20 litros, Tierra Negra C', 'terrafertil-20L.png', 'Tierra Negra enriquecida con Compost organico. Especialmente desarrollado para ser utilizado como soporte de otras enmiendas organicas en la formacion de parques, jardines y canteros. Como relleno en las zonas bajas de jardines. // Composicion quimica: - Cada 100 g. (con su humedad natural). - Humedad 35 40%. - Ceniza tal cual 40 45%. - pH 6.2 4 M.O. tal cual 15 20 % C/N 7.7 CE 1.1 mmhos /cm. // Componentes: Compost Organico. Tierra Negra.', 1950.30, 17, 15, NULL, 1, 2, 1, 5, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(187, 'Aceite CBD Premium Small', 'Aceite Sublingual Premium 35,6% CBD de 25ml e', 'aceite-25ml.png', 'Uno de los aceites con más porcentaje de CBD del mercado (39,9%). // La naturaleza no se equivoca, cada elemento natural tiene increíbles beneficios. Por ejemplo, la planta cannabinoide CBD te ofrece estos: - Antidepresivo. - Trastornos de bipolaridad. - Regula dolores crónicos. - Estimula el crecimiento óseo. - Suprime Nauseas y vómitos. -  Ayuda a controlar la epilepsia. - Reducir el riesgo de obstrucción de arterias. - Alivia las migrañas. - CBD para dejar de fumar ya que ayuda a dejar el habito y puede alterar el sistema de recompensa del cerebro que juega un papel clave en el control de adicciones. Liberándote así de la ansiedad. - Efectivo para el alivio de dolores crónicos de todo tipo ya que el CBD es un analgésico natural. Si sufres de dolor crónico el CBD es una buena opción. - Ayuda a controlar el insomnio y problemas para dormir devolviéndote tu ciclo natural de sueño. - Controla el estrés postraumático. - Calma la ansiedad social. - Reducir la ansiedad. - Calma tu mente. - El CBD es usado como ansiolítico, calmante, para combatir el cáncer y controlar el dolor. - Ayuda a aliviar y aminorar los síntomas de la esclerosis múltiple (reducción de dolor neuropático, reducción de espasmos, reducción de dolor muscular). - Gracias a su efecto analgésico y antinflamatorio produce una sensación de mayor bienestar en condiciones de dolor lumbares y ciático. // La gran cuestión sobre el #CBD como medicina es que es totalmente natural, y no hay preocupación sobre potenciales efectos secundarios algo que se obtiene con otros medicamentos. // * RICO EN CBD Y NIVELES NULOS DE THC LO QUE LO HACE APTO PARA TODO TIPO DE EDADES H / 100 años.', 9299.99, 25, 23, NULL, 2, 3, 1, 6, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(188, 'Aceite CBD Premium Medium', 'Aceite Sublingual Premium 30,9% CBD, en Goter', 'aceite-50ml.png', 'Aceite con un importante porcentaje de CBD (30,9%). // La naturaleza no se equivoca, cada elemento natural tiene increíbles beneficios. Por ejemplo, la planta cannabinoide CBD te ofrece estos: - Antidepresivo. - Trastornos de bipolaridad. - Regula dolores crónicos. - Estimula el crecimiento óseo. - Suprime Nauseas y vómitos. -  Ayuda a controlar la epilepsia. - Reducir el riesgo de obstrucción de arterias. - Alivia las migrañas. - CBD para dejar de fumar ya que ayuda a dejar el habito y puede alterar el sistema de recompensa del cerebro que juega un papel clave en el control de adicciones. Liberándote así de la ansiedad. - Efectivo para el alivio de dolores crónicos de todo tipo ya que el CBD es un analgésico natural. Si sufres de dolor crónico el CBD es una buena opción. - Ayuda a controlar el insomnio y problemas para dormir devolviéndote tu ciclo natural de sueño. - Controla el estrés postraumático. - Calma la ansiedad social. - Reducir la ansiedad. - Calma tu mente. - El CBD es usado como ansiolítico, calmante, para combatir el cáncer y controlar el dolor. - Ayuda a aliviar y aminorar los síntomas de la esclerosis múltiple (reducción de dolor neuropático, reducción de espasmos, reducción de dolor muscular). - Gracias a su efecto analgésico y antinflamatorio produce una sensación de mayor bienestar en condiciones de dolor lumbares y ciático. // La gran cuestión sobre el #CBD como medicina es que es totalmente natural, y no hay preocupación sobre potenciales efectos secundarios algo que se obtiene con otros medicamentos. // * RICO EN CBD Y NIVELES NULOS DE THC LO QUE LO HACE APTO PARA TODO TIPO DE EDADES H / 100 años.', 18499.99, 0, 9, NULL, 2, 3, 1, 6, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(189, 'Aceite CBD Premium Large', 'Aceite Premium Sublingual con 28,9% CBD en Go', 'aceite-150ml.png', 'Aceite con un importante porcentaje de CBD (28,9%) dentro de gotero Large. // La naturaleza no se equivoca, cada elemento natural tiene increíbles beneficios. Por ejemplo, la planta cannabinoide CBD te ofrece estos: - Antidepresivo. - Trastornos de bipolaridad. - Regula dolores crónicos. - Estimula el crecimiento óseo. - Suprime Nauseas y vómitos. -  Ayuda a controlar la epilepsia. - Reducir el riesgo de obstrucción de arterias. - Alivia las migrañas. - CBD para dejar de fumar ya que ayuda a dejar el habito y puede alterar el sistema de recompensa del cerebro que juega un papel clave en el control de adicciones. Liberándote así de la ansiedad. - Efectivo para el alivio de dolores crónicos de todo tipo ya que el CBD es un analgésico natural. Si sufres de dolor crónico el CBD es una buena opción. - Ayuda a controlar el insomnio y problemas para dormir devolviéndote tu ciclo natural de sueño. - Controla el estrés postraumático. - Calma la ansiedad social. - Reducir la ansiedad. - Calma tu mente. - El CBD es usado como ansiolítico, calmante, para combatir el cáncer y controlar el dolor. - Ayuda a aliviar y aminorar los síntomas de la esclerosis múltiple (reducción de dolor neuropático, reducción de espasmos, reducción de dolor muscular). - Gracias a su efecto analgésico y antinflamatorio produce una sensación de mayor bienestar en condiciones de dolor lumbares y ciático. // La gran cuestión sobre el #CBD como medicina es que es totalmente natural, y no hay preocupación sobre potenciales efectos secundarios algo que se obtiene con otros medicamentos. // * RICO EN CBD Y NIVELES NULOS DE THC LO QUE LO HACE APTO PARA TODO TIPO DE EDADES H / 100 años.', 24325.00, 0, 5, NULL, 2, 3, 1, 6, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(190, 'Aceite CBD Premium Extra Large', 'Aceite Premium Sublingual con 28,9% CBD, en G', 'aceite-250ml.png', 'Aceite con un importante porcentaje de CBD (28,9%) en nuestra mayor presentación de contenido total. // La naturaleza no se equivoca, cada elemento natural tiene increíbles beneficios. Por ejemplo, la planta cannabinoide CBD te ofrece estos: - Antidepresivo. - Trastornos de bipolaridad. - Regula dolores crónicos. - Estimula el crecimiento óseo. - Suprime Nauseas y vómitos. -  Ayuda a controlar la epilepsia. - Reducir el riesgo de obstrucción de arterias. - Alivia las migrañas. - CBD para dejar de fumar ya que ayuda a dejar el habito y puede alterar el sistema de recompensa del cerebro que juega un papel clave en el control de adicciones. Liberándote así de la ansiedad. - Efectivo para el alivio de dolores crónicos de todo tipo ya que el CBD es un analgésico natural. Si sufres de dolor crónico el CBD es una buena opción. - Ayuda a controlar el insomnio y problemas para dormir devolviéndote tu ciclo natural de sueño. - Controla el estrés postraumático. - Calma la ansiedad social. - Reducir la ansiedad. - Calma tu mente. - El CBD es usado como ansiolítico, calmante, para combatir el cáncer y controlar el dolor. - Ayuda a aliviar y aminorar los síntomas de la esclerosis múltiple (reducción de dolor neuropático, reducción de espasmos, reducción de dolor muscular). - Gracias a su efecto analgésico y antinflamatorio produce una sensación de mayor bienestar en condiciones de dolor lumbares y ciático. // La gran cuestión sobre el #CBD como medicina es que es totalmente natural, y no hay preocupación sobre potenciales efectos secundarios algo que se obtiene con otros medicamentos. // * RICO EN CBD Y NIVELES NULOS DE THC LO QUE LO HACE APTO PARA TODO TIPO DE EDADES H / 100 años.', 31499.99, 0, 23, NULL, 2, 3, 1, 6, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(191, 'Crema Face-care Premium', 'Crema Facial Premium de 30 ml a Base de CBD a', 'crema-facial-30ml.png', 'Es un tratamiento a base de cbd reafirmante de la piel con efecto rejuvenecedor capaz de combatir las arrugas, manchas cutáneas, líneas de expresión y signos de paso del tiempo como la flacidez y pérdida de luminosidad. El CBD tiene alto contenido en antioxidantes, es antialérgico (libera histamina) y aporta energía a nuestras células.', 5500.00, 0, 33, NULL, 2, 3, 1, 7, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(192, 'Crema Tópica Health Forte', 'Crema Corporal de 60 ml Para Dolores Muscular', 'crema-hidratante-Xml.png', 'Crema Corporal Green Gooda a base de CBD es muy efectiva en los dolores de origen muscular o reumático, y en cuadros dermatológicos como urticarias, dermatitis o psoriasis. Tiene propiedades relajantes, antiinflamatorias y antioxidantes. // Beneficios de la Crema Corporal Green Good CBD: - El CBD es el cannabinoide obtenido de la planta del cáñamo con mayores propiedades terapéuticas conocidas hasta el momento, de las cuales, las más destacadas son sus efectos antiinflamatorios y analgésicos. - El uso por vía tópica de la crema se dirige a deportistas (maratonianos, triatletas, tenistas ...), personas con dolor crónico y agudo o con enfermedades como artrosis y artritis. - También se utiliza para masajes descontracturantes y relajantes, ayudando a mantener la función y la flexibilidad, a aliviar molestias. - A nivel estético, ayuda a mantener la apariencia de una piel sana y tonificada. - Sirve también para curar problemas cutáneos con proceso inflamatorio y componente autoinmune, como la dermatitis, el eczema, la psoriasis y la rosácea. - Dolores musculares localizados, post entrenamiento, lesiones, inflamaciones. - Patologías dérmicas, alergia. // LIBRE DE THC LO QUE LO HACE APTO PARA TODO TIPO DE EDADES. POSEE UNA CONCENTRACION DE 39,9%', 3450.30, 16, 42, 6, 2, 3, 1, 7, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(193, 'Crema Detox Facial', 'Crema Detox Facial de 30 ml a base de CBD y a', 'detox-facial-30ml.png', 'DETOX FACIAL GG: Continte de cannabis 40gr. Incluye espátula. Proporción: 20: 1. // Crema para uso cutáneo con acción reconstructiva cutánea y antioxidante, con aceite de cannabis sativa. // Ideal para rejuvenecimiento y revitalización facial. // Información importadiario. - Detox antimperfecciones con carbón activado que elimina el exceso de grasa en la piel. - Loción que limpia el exceso de grasa de la piel, dejándola libre de impurezas. - Especialmente formulado para piel grasosa. - Sin sensación grasosa. // Fórmula con carbón activado que ayuda a eliminara el esxceso de grasa en la piel, adicionacros naturales que ayuda a la regeneracion de la piel, adicionado con CBD.', 2900.50, 25, 31, NULL, 2, 4, 1, 7, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(194, 'Ungüento Endotérmico CBD', 'Pomada caliente 100% natural con cúrcuma y je', 'endotica-90gr.png', '¡Descubre nuestro increíble unguento caliente con CBD, la experiencia reconfortante que estabas buscando! Nuestro unguento combina el poder relajante del CBD con una agradable sensación de calor, brindándote un alivio reconfortante. Disfruta de una aplicación suave y una fragancia deliciosa que te envolverá en una sensación de bienestar. Ideal para relajar los músculos después de una intensa jornada, nuestro unguento caliente con CBD te ofrece un momento de tranquilidad y confort.// Composición: Theobroma Cacao Seed Butter, Stearyl Alcohol, Beeswax, Butyrospermum Parkii Butter, Triticum Vulgare Germ Oil, Lanolin, Menthol, Camphor, Eucalyptus Globulus Leaf Extrac, Cannabidiol Derived From Extract Cannabis, Curcuma Longa Root Extract, Zingiber Officinale Root Extract, Pinus Sylvestris Leaf Oil, Eucalyptus Globulus Leaf Oil, Rosmarinus Officinalis Leaf Oil. // Como Actúa: Los receptores CB1 y CB2 se encuentran principalmente en las células nerviosas del sistema nervioso central. En la piel, también se expresan en las terminaciones nerviosas sensoriales. Su activación puede tener un efecto analgésico al modular la transmisión de señales de dolor. Estos receptores pueden regular la liberación de neurotransmisores, que están involucrados en la transmisión de señales dolorosas. Al activar los receptores CB1 en la piel, se puede reducir la sensación de dolor asociada con el dolor articular y muscular. La aplicación tópica de un ungüento caliente con CBD puede estimular tanto los receptores CB1 como los receptores CB2 en la piel. El CBD, al interactuar con estos receptores, puede modular la percepción del dolor y la respuesta inflamatoria en las áreas donde se aplica el ungüento.', 7230.50, 0, 5, 13, 2, 4, 1, 7, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(195, 'Spray Endofrost CBD', 'Tónico frío a base oleaosa natural de CBD - S', 'esencia-150ml.png', '¡Presentamos nuestro linimento frío para deportistas con CBD, Extracto de ají, Extracto de eucalipto y el poder refrescante de la crioterapia! Diseñado especialmente para los amantes del deporte y la actividad física, nuestro linimento es el aliado perfecto para recuperarte más rápido y alcanzar tus metas deportivas. La crioterapia proporciona una sensación de frescura intensa, aliviando dolores y molestias musculares.// Composición: // Carbomer, Glycerin, Menthol, Disodium EDTA, DMDM Hydantoin, Water, Capsicum Annuum Fruit Extract, Eucalyptus Globulus Leaf Extract , Cannabidiol Derived From Extract of Cannabis, Eucalyptus Globulus Leaf Oi, Polysorbate 80, BHT, Triethanolamine, Mentha Viridis Leaf Oil. //   Como Actúa: // La crioterapia es una técnica de recuperación muscular donde se busca enfriar la zona reduciendo el flujo sanguíneo local, la tasa metabólica de los tejidos y la velocidad de conducción nerviosa; estos efectos tisulares son los responsables de los resultados terapéuticos atribuidos a la crioterapia. // Cuando se aplica el linimento frío en la piel, la sensación de frío provoca una respuesta de vasoconstricción, lo que significa que los vasos sanguíneos se contraen. Esta vasoconstricción puede ayudar a reducir la inflamación y el edema en los tejidos musculares y articulares afectados. Además, el frío puede disminuir la velocidad de transmisión de las señales nerviosas, lo que puede resultar en una reducción de la sensación de dolor. // El CBD presente en el linimento frío también tiene propiedades analgésicas y antiinflamatorias. El CBD interactúa con el sistema endocannabinoide del cuerpo, que juega un papel crucial en la regulación del dolor y la inflamación. Se cree que el CBD ayuda a reducir la sensación de dolor al interactuar con los receptores cannabinoides presentes en el sistema nervioso central y periférico. //   La combinación de crioterapia y CBD en un linimento frío para deportistas puede proporcionar un alivio efectivo del dolor y la inflamación asociados con lesiones musculares y articulares. El frío ayuda a reducir la inflamación y promover la relajación muscular, mientras que el CBD potencia estos efectos al interactuar con los receptores cannabinoides y modular la respuesta inflamatoria.', 4720.00, 0, 13, NULL, 2, 3, 1, 8, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(196, 'Spray Masajes Relajantes CBD', 'Esencia para masajes relajantes de ólea CBD a', 'esencia-250ml.png', '¡Descubre nuestro aceite para masajes increíblemente relajante y revitalizante, mezcla el CBD, con extractos vegetales y aceites esenciales, especialmente diseñada para liberar la tension del cuerpo con un delicioso masaje, creando una experiencia única de bienestar para el cuerpo y la mente. Experimenta la sinergia de los ingredientes naturales y disfruta de unmasaje como nunca antes! ¡Compra ahora y regálate momentos de pura armonía y bienestar!. // Composición: //   Prunus amygdalus dulcis oil, Triticum vulgare germ oil, Cannabidiol / derived from extract of cannabis, Zingiber officinale root extract, Eucalyptus globulus leaf extract, Calendula officinalis flower extract, Rosmarinus officinalis leaf oil, Pelargonium graveolens oil, Santalum album oil. // Cómo Actúa: // Esta mezcla de extractos vegetales, aceites esenciales vehiculizados en aceite de almendras dulces proporcionan una base suave y lubricante para el masaje. Estos aceites ayudan a que las manos se deslicen fácilmente sobre la piel, facilitando la aplicación del masaje y reduciendo la fricción. Cuando se aplica el aceite de masajes sobre la piel y se realiza el masaje, se producen varios efectos beneficiosos. En primer lugar, el masaje en sí mismo ayuda a mejorar la circulación sanguínea en la zona tratada, lo cual puede contribuir a la relajación muscular y aliviar la tensión, Además, el calor generado durante el masaje puede aumentar la temperatura local en los tejidos musculares, lo que puede mejorar la flexibilidad y reducir la rigidez muscular', 11720.00, 5, 4, NULL, 2, 3, 1, 8, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(197, 'Labial Balm con CBD', 'Bálsamo labial \"Lip-Balm\" a base de orgánicos', 'lipbalm-5gr.png', 'El bálsamo labial de Green Good CBD es un ungüento con 50 mg de CBD (Cannabidiol) en un cómodo e higiénico formato en stick con todos los beneficios del Cannabidiol en aplicación cosmética. Un bálsamo formulado a base de ingredientes naturales como aceite de semillas de cáñamo, mantequilla de semillas de cacao, aceite de ricino y cera de abejas, indicado para el cuidado diario de tus labios en cualquier época del año. Su aplicación regular protege tus labios de los agentes externos más comunes como temperaturas extremas de frío o calor, sequedad o alteraciones típicas como calenturas o boqueras. Sin parabenos ni colorantes artificiales, libre de toxinas y metales pesados, que protege tus labios de forma natural. Su uso regular mantiene tus labios suaves, sanos y brillantes. // El Lip Balm con CBD también es perfecto para combatir el sol, el frío y la contaminación con su acción hidratante, calmante, anti irritaciones y antiinflamatoria para labios o zonas sensibles e irritados. Ideal para utilizar día y noche. // Beneficios del Lip Balm con CBD // - Repara áreas secas: Aporta luminosidad, nutrición y ayuda a calmar y reparar los labios dañados. - Reduce el dolor e inflamación: Gracias a los beneficios del cannabidiol, ayudará a calmar el dolor e inflamación de los labios. - Protege tus labios: Ayuda a reducir los daños ocasionados por el frío o la piel seca de tus labios. Hidratándolos y protegiéndolos de la contaminación y del envejecimiento. - Nutre y tiene una alta absorción: El CBD (cannabidiol), junto con el aceite de ricino y la cera de abeja, te aportará una profunda hidratación y una alta absorción.', 820.00, 10, 21, NULL, 2, 4, 1, 9, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(198, 'Shampoo y Acondicionador CBD', 'Combo cuidado Capilar natural, Shampoo + Acon', 'shampoo-acondicionador-Xml.png', 'Nuestro shampoo y acondicionador de CBD ?. Todos los beneficios del cannabis para tu cabello, este dúo es ideal si presentas caída, resequedad de medios a puntas y raíz grasa o seca. Además, gracias a la alta penetración de los ácidos grasos del cannabis, después de usarlo tu cabello se verá mucho más brillante y sedoso. Reconstruye y fortalece tu cabello. Hidratación profunda. Proporciona fuerza y elasticidad. Detiene la caída.', 1999.99, 0, 52, NULL, 2, 4, 1, 10, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(199, 'Aceite GG PRUEBA CRUD', 'Aceite GG PRUEBA CRUD SOLO  CREATE FORM 18/7 ', 'img-undefined-1689700378009-aceite-greengood.png', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"', 5000.00, 10, 10, 0, 2, 3, 1, 6, NULL, '2023-07-18 19:35:18', '2023-07-18 19:35:18', NULL),
(200, 'Air Pot Large', 'Maceta Moderna Air Pot Large - Cultivo in-doo', 'airpot-30L.png', 'La maceta Airpottunning mejora el tamaño y rendimiento de tus proyectos, es una Maceta con sistema automático de podado de raíz que permite un crecimiento radicular homogéneo y constante, permite ademas un drenaje hídrico de forma autónoma. Una maceta re-utilizable y de fácil guardado.        Tu maceta Airpottunning consta de 3 piezas, la base, el cuerpo y los tonillos, para armarlo debes poner el cuerpo al rededor de la base, el cuerpo debe tener los orificios tapados hacia arriba, una vez esto ubicado, lo afirmas con los tornillos en el extremo inferior y superior del armado y listo!! es muy firme y la puedes volver a desarmar y armar cuando tu lo necesites, su guardado es compacto.', 4970.00, 10, 120, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-25 18:06:25', '2023-07-25 18:06:25', NULL),
(201, 'Bandeja Cultivo Large', 'Bandeja Cultivo 50 Alveolos Germinar Esquejes', 'bandeja-semillera.png', 'Capacidad 50 alveolos (plantines). Ideal para germinar gran cantidad de plantas, o para esquejes. // Perforaciones de buen tamaño que determina auto poda radicular aérea y buen drenaje. Fácilmente extraíble el plantin una vez enraizado. Medidas: 54.5 cm. x 28 cm. Diámetro del alveolo: 5cm. Profundidad 6 cm.', 2464.13, 7, 564, NULL, NULL, NULL, NULL, NULL, NULL, '2023-07-25 18:06:25', '2023-07-25 18:06:25', NULL),
(202, 'SUSTRATO PRUEBA EDIT', 'MACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PR', 'img-1691884533568-Sustratos.png', 'MACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDIT', 500.00, 50, 13, 0, 2, 2, 1, 5, '64263d5a-8b3b-46a8-96b6-9d6dad5e7d80', '2023-08-10 13:40:01', '2023-08-13 19:28:03', NULL),
(203, 'MACETA PRUEBA EDIT', 'MACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PR', 'img-1691884504343-Macetas.png', 'MACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDITMACETA PRUEBA EDIT', 3500.00, 10, 20, 0, 1, 1, 1, 3, '64263d5a-8b3b-46a8-96b6-9d6dad5e7d80', '2023-08-12 23:55:04', '2023-08-12 23:55:04', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shopping_session`
--

CREATE TABLE `shopping_session` (
  `id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `init_date` date NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `finish_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `shopping_session`
--

INSERT INTO `shopping_session` (`id`, `total`, `init_date`, `user_id`, `finish_date`) VALUES
(12, 0.00, '2023-08-29', 'fa696f5a-9027-4016-bde6-bcce2d2f45e4', NULL),
(13, 0.00, '2023-08-29', 'fa696f5a-9027-4016-bde6-bcce2d2f45e4', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`) VALUES
(1, 'Recipientes'),
(2, 'Material Orgánico'),
(3, 'Salud'),
(4, 'Cosmética');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Maceta'),
(2, 'Bandeja'),
(3, 'Recipientes'),
(4, 'Bidón'),
(5, 'Sustrato'),
(6, 'Aceite'),
(7, 'Crema'),
(8, 'Spray'),
(9, 'Labial'),
(10, 'Loción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `birth_date` date NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `birth_date`, `image`, `phone`, `type`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
('01c20ab5-0e8f-49a3-94ee-a6178611c05d', 'Mati', 'Liendo', 'liendom', 'matiliendodev@gmail.com', '2004-12-09', 'default-user-photo.png', '3512341032', 'Vendedor', '$2a$10$bbuBjhZTo3lEmr3CqmMDuesNOO10kQcQ7k3km32MKUD0yUPknQ6M2', '2023-09-02 14:35:18', '2023-09-02 14:35:18', NULL),
('1266442a-b3bd-4be9-b39a-839fb1860bc9', 'Carlos', 'Vásquez', 'CarlosVendedor', 'Carlos@colombia.com', '1980-06-23', 'img-user-1693756307915-bandera_Colombia.JPG', '12345678', 'Comprador', '$2a$10$S7aIuuh7y0ylk7qTnS5iT.70eQKNhWzlu3VtgKT8OJtqF3caEu9Ni', '2023-09-03 10:35:18', '2023-09-03 10:35:18', NULL),
('21d6ee06-3653-46a7-aaa2-5e7988b8a3d3', 'Santiago', 'López', 'SantiagoComprador', 'santiago@argentina.com', '1980-06-23', 'img-user-1693756579759-bandera_Argentina.JPG', '12345678', 'Comprador', '$2a$10$j5a.NtAO7p8ZxguQAZcqGuRqxD3wOv2XzLqNJbQPRrdd77MdBWxbK', '2023-09-03 10:35:18', '2023-09-03 10:35:18', NULL),
('4efea15a-fa9a-4ae1-a1c9-b316f02b4706', 'Lautaro', 'Pérez', 'Lautaro', 'Lautaro@argentina', '1980-06-23', 'img-user-1693752607122-bandera_Argentina.JPG', '1234567', 'Comprador', '$2a$10$UVchSdU2cd0m8.Y7n2Fdv.npPuPcWSNGOGNKqWQcpRNAuiYr625z.', '2023-06-18 14:35:18', '2023-06-18 14:35:18', NULL),
('64263d5a-8b3b-46a8-96b6-9d6dad5e7d80', 'Prueba123', 'Prueba123456', 'prueba123User', 'Prueba123@Prueba123.com', '2005-01-01', 'img-user-1691954978550-linkedinperfil2.png', '3512341032', 'Vendedor', '$2a$12$PHB48z3V9KAwiKKiDI7.c.tti5Tj2TglzMA1HlybB5fO7FV7SaHq6', '2023-08-18 14:35:18', '2023-08-18 14:35:18', NULL),
('69d11747-f007-4622-bd14-e9268dc46935', 'carrito', 'test', 'carritotest', 'carrito@test.com', '2005-01-01', 'img-user-1691969354989-Canva perfil1.png', '1651653156', 'Vendedor', '$2a$10$oxCcA4CaPv5QDnCi9I51EO/DQEzvwuLuU4Ql5j1/4ky8Sov.fvspK', '2023-05-18 14:35:18', '2023-05-18 14:35:18', NULL),
('7e95d5ac-e682-4092-ab91-e1170acbd3b2', 'Laura', 'Alzate', 'LauraCompradora', 'Laura@paraguay.com', '1990-06-23', 'img-user-1693751773832-bandera_Paraguay.JPG', '1234567', 'Comprador', '$2a$10$.Db/HSQIbYxLqQ26ENqiXu8YGyXoDjxFbvpMfpqATlsytfPSm738W', '2023-09-02 14:35:18', '2023-09-02 14:35:18', NULL),
('82a91196-b5e7-4fef-9650-30e52f3ab0a2', 'Camila', 'Benítez', 'CamilaCompradora', 'camila@chile.com', '2003-06-23', 'img-user-1693752248186-bandera_Chile.JPG', '12345678', 'Comprador', '$2a$10$mWx0RTuADuLekNAp4angseJYx3LVYp4po7wcoBYYumn0Kb4vWIoLO', '2023-09-03 10:35:18', '2023-09-03 10:35:18', NULL),
('9aa55d11-1c5f-4785-8c21-b8195610867f', 'Julian', 'Vendedor', 'JulianVendedor', 'Julian@colombia.com', '1980-06-23', 'img-user-1693754220003-bandera_Colombia.JPG', '1234567', 'Vendedor', '$2a$10$xsxrcO/rVfh6ctrQ.qxxE.gfAmK00Q/U06he5r/jC7nepGXTXp8jG', '2023-08-29 14:35:18', '2023-08-29 14:35:18', NULL),
('c2e21c9c-bbd9-403a-83c3-2a1e3e29f042', 'Julian', 'Comprador', 'juliancomprador', 'julian@comprador.com', '1980-06-23', 'img-user-1693752685101-a_c.png', '1234567', 'Comprador', '$2a$10$5m4.loaJt062HE6oTMlUU.DBg.i//djtj71KWTdarw.l1Wh8HwVPy', '2023-07-18 14:35:18', '2023-07-18 14:35:18', NULL),
('eebe1508-6e25-4639-ab38-01a1c3088e6b', 'Carrito', 'Test', 'carritotest2', 'carrito2@test.com', '1995-04-16', 'img-user-1692194668891-linkedinperfil2.png', '351152341032', 'Vendedor', '$2a$10$Clg3fgEUDabAVLV3OG0X8e4VxYl3RvKdD.FgkLqo5.fbihyRdbtNK', '2023-07-18 14:35:18', '2023-07-18 14:35:18', NULL),
('ef608cde-a0b1-4943-a6fa-5217fbfc8b70', 'João', 'Miranda', 'JoãoComprador', 'JoãoComprador@brasil.com', '1980-06-23', 'bandera_brasil.JPG', '1234567', 'Comprador', '$2a$10$8YbefwMEMSg/DCW4T3QCJuAbIn6H5MCVqivKryAw0abu5kMRCTX8S', '2023-08-20 14:35:18', '2023-08-20 14:35:18', NULL),
('ff43d5c8-1d65-4436-b7f5-997da4fc9697', 'Marcos', 'Restrepo', 'MarcosComprador', 'Marcos@peru.com', '1990-05-06', 'img-user-1693751130456-bandera_perÃº.JPG', '1234567', 'Comprador', '$2a$10$sXGx8cMj98zv.pDplJII6edK3dkUhOjTCkTIiYD8D6axZEj8LNhui', '2023-09-02 14:35:18', '2023-09-02 14:35:18', NULL);

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
(1, '1', '82634 Katie Circle', '950', 'Huntsville', 'Alabama', 'United States'),
(2, '2', '9 Basil Street', '5', 'Montgomery', 'Alabama', 'United States'),
(3, '3', '4 Porter Plaza', '8', 'Mobile', 'Alabama', 'United States'),
(4, '4', '37 Clemons Alley', '4528', 'Birmingham', 'Alabama', 'United States'),
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_payments`
--

CREATE TABLE `user_payments` (
  `id` int(11) NOT NULL,
  `payment_type` varchar(45) NOT NULL,
  `payment_vendor` varchar(45) NOT NULL,
  `account_number` varchar(45) NOT NULL,
  `card_number` varchar(45) NOT NULL,
  `card_exp` varchar(45) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user_payments`
--

INSERT INTO `user_payments` (`id`, `payment_type`, `payment_vendor`, `account_number`, `card_number`, `card_exp`, `user_id`) VALUES
(1, 'Tarjeta de crédito', 'AMEX', '3065526354', '666852120', '20270101', 'ef608cde-a0b1-4943-a6fa-5217fbfc8b70'),
(2, 'Tarjeta de crédito', 'AMEX', '3065526354', '666332120', '20260101', 'c2e21c9c-bbd9-403a-83c3-2a1e3e29f042'),
(3, 'Tarjeta de crédito', 'MC', '3065526354', '666856540', '20270201', '21d6ee06-3653-46a7-aaa2-5e7988b8a3d3'),
(4, 'Tarjeta de crédito ', 'VISA', '8065526123', '0234201452666688', '0525', 'eebe1508-6e25-4639-ab38-01a1c3088e6b');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shopping_session_id` (`shopping_session_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `liked_products`
--
ALTER TABLE `liked_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_details_user_payment1_idx` (`user_payment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_cart_item1_idx` (`cart_item_id`),
  ADD KEY `order_detail_id` (`order_detail_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category1_idx` (`category_id`),
  ADD KEY `fk_products_subcategory1_idx` (`subcategory_id`),
  ADD KEY `fk_products_manufacturer1_idx` (`manufacturer_id`),
  ADD KEY `fk_products_type1_idx` (`type_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `shopping_session`
--
ALTER TABLE `shopping_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `liked_products`
--
ALTER TABLE `liked_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `shopping_session`
--
ALTER TABLE `shopping_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user_addresses`
--
ALTER TABLE `user_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `user_payments`
--
ALTER TABLE `user_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_item_shopping_session1` FOREIGN KEY (`shopping_session_id`) REFERENCES `shopping_session` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `liked_products`
--
ALTER TABLE `liked_products`
  ADD CONSTRAINT `fk_liked_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
