INSERT INTO `user` (`id`, `email`, `password`, `firstname`, `lastname`, `is_connected_pan`, `alarm_ended_recipe`, `alarm_ended_step`) VALUES ('1', 'vincenzo.nibali@astana.it', 'nibali', 'Vincenzo', 'Nibali', '1', '', '');
INSERT INTO `ingredient` (`id`, `label`, `image`) VALUES ('1', 'carotte', '');

INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('1', 'Température minimale à atteindre', 'min_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('2', 'Température maximale à ne pas dépasser', 'max_temperature');
INSERT INTO `prerequisite_type` (`id`, `label`, `code`) VALUES ('3', 'Temps d''attente minimum entre deux étapes', 'waiting_time_before_step');
