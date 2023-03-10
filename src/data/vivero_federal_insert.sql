
-- Colores, categorías y tamaños

INSERT INTO colors(id, name) values (1, 'Naranja'), (2, 'Marrón'), (3, 'Rosa'), (4, 'Blanco'), (5, 'Rojo'), (6, 'Azul'), (7, 'Verde');
INSERT INTO categories(id, name) values (1, 'De interior'), (2, 'De exterior'), (3, 'Suculentas y cactus'), (4, 'Macetas'), (5, 'Accesorios');
INSERT INTO sizes(id, name) values (1, 'XS'), (2, 'S'), (3, 'M'), (4, 'L'), (5, 'XL'), (6, 'XXL');


-- Productos

-- De interior

INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (1,'Begonia',800,15,'1','El género Begonia comprende alrededor de 1500 especies, de las que alrededor de 150, además de casi 10 000 variedades e híbridos, se comercializan para su uso en jardinería. Son oriundas de las regiones tropicales y subtropicales de América, África y Asia. El único otro miembro de la familia Begoniaceae es Hillebrandia, un género con una sola especie en las islas Hawái, y el género Symbegonia que recientemente se incluyó en Begonia.','begonia.jpg');
INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (2,'Hipocirta',900,10,'1','Las plantas conocidas como hipocirta son estupendas para tener en el interior de la vivienda o en un jardín cálido. Sus flores son muy llamativas, pese a su reducido tamaño, por lo que si necesitas darle algo de color a la estancia, sin duda con ellas tendrás el problema resuelto.','hipocirta.jpg');
INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (3,'Cortadum',1000,15,'1','El Cordatum es una planta trepadora de interior. Sus hojas son color verde oscuro en forma de corazón (de ahí su nombre “Cordatum”, en latín: Corazón”. Es muy buscada para decorar interiores, se destaca para su uso en estanterías.','img-cortadum-1675259023844.jpg');


-- De exterior

INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (4,'Jazmín del Paraguay',1100,20,'2','El jazmín del Paraguay (Brunfelsia Pauciflora), jazmín paraguayo o azuzena de paraguay; es una especie de arbusto perteneciente de la familia Solanaceae, del género Brunfelsia. Esta planta crece en distintos lugares del continente americano, principalmente en América del sur. Tiene la singularidad de una vez finalizado su proceso de florecimiento, cambiar de tonalidades las flores, estas pasan de colores violetas oscuros en degrade hasta verse en tonalidades blancas.','jazmin-del-paraguay.jpg');
INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (5,'Farolito Japonés',1200,5,'2','El farolito japonés o abutilón es un gran grupo de plantas cuyo nombre común remite a la forma de sus flores. Vamos a ver cómo cuidar esta planta.','farolito-japones.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,description,image) VALUES (6,'Rosal',1200,12,'2','3','Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.','img-rosal-1675279397752.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,description,image) VALUES (7,'Rosal',1200,12,'2','4','Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.','img-rosal-1675279397752.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,description,image) VALUES (8,'Rosal',1200,12,'2','5','Los rosales son una especie de arbusto espinoso de la familia de las rosáceas. Hay alrededor de cien especies de rosales silvestres.','img-rosal-1675279397752.jpg');


-- Suculentas y cactus

INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (9,'Suculenta',550,5,'3','Las plantas suculentas (del latín succulentus, que significa jugoso o sustancioso) o crasas son aquellas en las que algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación. Estos órganos de reserva tienen una alta proporción de tejido parenquimático. El almacenamiento de agua en los órganos de algunas suculentas es de 90-95 %. Su adaptación les permite mantener reservas de agua durante períodos prolongados, y sobreviven a los largos períodos de sequía en climas áridos. Uno de los ejemplos más conocidos de suculencia es el de los tallos de los cactus del Nuevo Mundo, similar al de varias euforbiáceas y apocináceas africanas. Ejemplos de hojas suculentas se encuentran en Aloe, Agave, y en las crasuláceas.s Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o price.','suculenta.jpg');
INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (10,'Cactus',500,0,'3','Cactaceae, las cactáceas, conocidas como cactus o cactos, es una familia de plantas originarias de América. Sin embargo, hay una excepción, Rhipsalis baccifera, que está extendida en África tropical, Madagascar y Ceilán. Se cree que la colonización de Europa por esta especie es relativamente reciente (unos cuantos cientos de años), probablemente transportada en el aparato digestivo de pájaros migratorios en forma de semillas, bien directamente desde América o a partir de poblaciones surgidas en África como consecuencia del transporte de esclavos. Muchas plantas suculentas, tanto en Europa como en América, tienen una notable semejanza con los cactus y, a menudo, son así llamadas en lenguaje corriente. Sin embargo, esto se debe a la evolución paralela o convergente (similares presiones selectivas resultan en morfologías parecidas), ya que ninguna de ellas está estrechamente emparentada con las cactáceas. La característica identificativa más clara de la familia de los cactus es la areola, una estructura especializada de donde surgen las espinas, los vástagos nuevos y, en muchas ocasiones, las flores.','cactus.jpg');


-- Macetas

INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (11,'Blum Agustiniana',1500,5,'4','1','2','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-agustiniana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (12,'Blum Agustiniana',1500,5,'4','1','3','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-agustiniana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (13,'Blum Agustiniana',1500,5,'4','1','4','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-agustiniana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (14,'Blum Americana',1500,0,'4','1','2','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-americana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (15,'Blum Americana',1500,0,'4','1','3','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-americana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (16,'Blum Americana',1500,0,'4','1','4','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-americana.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (17,'Blum Cilindro',1500,0,'4','2','3','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-cilindro.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (18,'Blum Cilindro',1500,0,'4','2','4','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-cilindro.jpg');
INSERT INTO products(id,name,price,discount,category_id,color_id,size_id,description,image) VALUES (19,'Blum Cilindro',1500,0,'4','2','5','Las Macetas de Terracota de Blum, se caracterizan por su calidad y diseño, lo que la convierten en líder y referente del mercado nacional de macetas de barro y en la opción ideal, tanto para el jardín como para el interior del hogar.','blum-cilindro.jpg');


-- Accesorios

INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (20,'Palita',1500,0,'5','Palita para jardín.','palita.jpg');
INSERT INTO products(id,name,price,discount,category_id,description,image) VALUES (21,'Guantes',2200,10,'5','Guantes de jardín verdes.','guantes.jpg');


-- Usuarios

INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (1,'Sebastián','Braga','sebabraga01@gmail.com','$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq','1',NULL);
INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (2,'Camila Luz','Quispe','quispeluzcami@gmail.com','$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq','2',NULL);
INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (3,'Gustavo','Buscalia','buscaliag@gmail.com','$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq','2',NULL);
INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (4,'Valentino','Becerine','valentinobecerine@gmail.com','$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq','2',NULL);
INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (5,'Admin','del Sitio','admin@gmail.com','$2a$10$n2DQbKf0uIvB/RYH6.WY/.o6e3scnGHxGRqFS21DjitRr58AChWYq','1','img-admin-1676500048292.jpg');
INSERT INTO users(id,first_name,last_name,email,password,category,image) VALUES (6,'Andrés','Iniesta','ainiesta@gmail.com','$2a$10$LDUj6c7jfP5UulL7fZMkxedsEHSXz5AEc0MOp8TEZk5kYcuRlp54K','2','img-iniesta-1676042688859.jpg');


