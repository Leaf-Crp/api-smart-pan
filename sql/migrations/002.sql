ALTER TABLE user_cooked_recipe
ADD date DATE null;

INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('1', 'Température minimale à atteindre', 'min_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('2', 'Température maximale à ne pas dépasser', 'max_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('3', 'Temps d''attente minimum entre deux étapes', 'waiting_time_before_step');
