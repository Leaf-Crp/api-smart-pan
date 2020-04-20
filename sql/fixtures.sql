INSERT INTO `user` (`id`, `email`, `password`, `firstname`, `lastname`, `is_connected_pan`, `alarm_ended_recipe`, `alarm_ended_step`) VALUES ('1', 'vincenzo.nibali@astana.it', 'nibali', 'Vincenzo', 'Nibali', '1', '', '');
INSERT INTO `ingredient` (`id`, `label`, `image`) VALUES ('1', 'carotte', '');

INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('1', 'Température minimale à atteindre', 'min_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('2', 'Température maximale à ne pas dépasser', 'max_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('3', 'Temps d''attente minimum entre deux étapes', 'waiting_time_before_step');


INSERT INTO smart_pan.ingredient (id, image, label) VALUES (1, 'tomato', 'Tomate');
INSERT INTO smart_pan.ingredient (id, image, label) VALUES (2, 'onion', 'Oignon');
INSERT INTO smart_pan.ingredient (id, image, label) VALUES (3, 'lettuce', 'Salade');
INSERT INTO smart_pan.ingredient (id, image, label) VALUES (4, 'meat', 'Boeuf');
INSERT INTO smart_pan.ingredient (id, image, label) VALUES (5, 'chicken', 'Poulet');
INSERT INTO smart_pan.ingredient (id, image, label) VALUES (6, 'spices', 'Epices');
INSERT INTO smart_pan.prerequisite_type (id, label, code) VALUES (1, 'Température minimale à atteindre', 'min_temperature');
INSERT INTO smart_pan.prerequisite_type (id, label, code) VALUES (2, 'Température maximale à ne pas dépasser', 'max_temperature');
INSERT INTO smart_pan.prerequisite_type (id, label, code) VALUES (3, 'Temps d''attente minimum entre deux étapes', 'waiting_time_before_step');
INSERT INTO smart_pan.recipe (id, label, image, is_private, id_recipe_type, id_user) VALUES (1, 'Kebab', 'kebab', 1, 1, 1);
INSERT INTO smart_pan.recipe (id, label, image, is_private, id_recipe_type, id_user) VALUES (2, 'Fried Chiken', 'food2', 1, 1, 1);
INSERT INTO smart_pan.recipe (id, label, image, is_private, id_recipe_type, id_user) VALUES (3, 'Salad', 'food3', 1, 1, 1);
INSERT INTO smart_pan.recipe_type (id, label) VALUES (1, 'Fast Food');
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (1, 'Couper les legumes', 1, 1);
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (2, 'Couper le poulet', 1, 2);
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (3, 'Assaisonner la viande', 1, 1);
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (5, 'chauffer poele ', 5, 2);
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (7, 'Couper la viande', 1, 1);
INSERT INTO smart_pan.step (id, label, duration, id_recipe) VALUES (8, 'test', 1, 3);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (1, 1, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (1, 2, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (1, 3, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (3, 4, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (3, 5, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (3, 6, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (7, 4, 1);
INSERT INTO smart_pan.step_ingredient (id_step, id_ingredient, quantity) VALUES (7, 5, 1);
INSERT INTO smart_pan.user (id, email, password, firstname, lastname, is_connected_pan, alarm_ended_recipe, alarm_ended_step) VALUES (1, 'vincenzo.nibali@astana.it', 'nibali', 'Vincenzo', 'Nibali', 1, '', '');
INSERT INTO smart_pan.user (id, email, password, firstname, lastname, is_connected_pan, alarm_ended_recipe, alarm_ended_step) VALUES (2, 'sdfsfdfs', '$2b$10$6kWUiZlSScibGbHtj34IVuxxOVQsKJOGNb1h5eIfDetbtCknCyseO', 'sdfsfdfs', 'sdfsfdfs', 1, 'sdfsfdfs', 'sdfsfdfs');
