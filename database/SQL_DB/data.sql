insert into users (id, first_name, last_name, birth_date, username, email, user_image, user_type, phone, password) values (1, 'Bent', 'Dudmesh', '03/08/1946', 'bdudmesh0', 'bdudmesh0@stumbleupon.com', 'http://dummyimage.com/225x100.png/cc0000/ffffff', 'vendedor', '844-514-3911', 'f9fcccc8fcf590e9a36f3454b961489af83d5393');
insert into users (id, first_name, last_name, birth_date, username, email, user_image, user_type, phone, password) values (2, 'Arliene', 'McIlwreath', '09/01/1964', 'amcilwreath1', 'amcilwreath1@linkedin.com', 'http://dummyimage.com/111x100.png/ff4444/ffffff', 'vendedor', '402-340-2539', 'd57bbda6d76c149486375daea53555d73aaf8594');
insert into users (id, first_name, last_name, birth_date, username, email, user_image, user_type, phone, password) values (3, 'Vitia', 'Hubbocks', '11/26/1919', 'vhubbocks2', 'vhubbocks2@1und1.de', 'http://dummyimage.com/120x100.png/cc0000/ffffff', 'admin', '203-901-5733', '2e3df8ae68de58e135b88c0391e174c2e8c0c100');
insert into users (id, first_name, last_name, birth_date, username, email, user_image, user_type, phone, password) values (4, 'Elia', 'Skryne', '03/07/1902', 'eskryne3', 'eskryne3@arstechnica.com', 'http://dummyimage.com/206x100.png/ff4444/ffffff', 'vendedor', '794-784-1234', '44875ae6028fc196c90678af443c9168d7765371');
insert into users (id, first_name, last_name, birth_date, username, email, user_image, user_type, phone, password) values (5, 'Guilbert', 'Sugg', '06/08/1990', 'gsugg4', 'gsugg4@cloudflare.com', 'http://dummyimage.com/159x100.png/5fa2dd/ffffff', 'admin', '693-271-1996', '6376701a5eca130b7fbe12e7806f644fa2516aa8');


insert into user_address (street, number, city, province, country, users_id) values ('82634 Katie Circle', '950', 'Huntsville', 'Alabama', 'United States', 1);
insert into user_address (street, number, city, province, country, users_id) values ('9 Basil Street', '5', 'Montgomery', 'Alabama', 'United States', 2);
insert into user_address (street, number, city, province, country, users_id) values ('4 Porter Plaza', '8', 'Mobile', 'Alabama', 'United States', 3);
insert into user_address (street, number, city, province, country, users_id) values ('37 Clemons Alley', '4528', 'Birmingham', 'Alabama', 'United States', 4);
insert into user_address (street, number, city, province, country, users_id) values ('07235 Claremont Point', '08', 'Birmingham', 'Alabama', 'United States', 5);


insert into shopping_session (id, total, users_id) values (1, 3170.74, 1);
insert into shopping_session (id, total, users_id) values (2, 7890.68, 2);
insert into shopping_session (id, total, users_id) values (3, 1257.57, 3);
insert into shopping_session (id, total, users_id) values (4, 8618.65, 4);
insert into shopping_session (id, total, users_id) values (5, 2078.62, 5);


