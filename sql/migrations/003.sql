ALTER TABLE `message` DROP FOREIGN KEY `message_topic_FK`;
ALTER TABLE `message` DROP INDEX `message_topic_FK`;
alter table message drop column id_topic;

ALTER TABLE message
ADD date TIMESTAMP default CURRENT_TIMESTAMP,
ADD id_recipe Int NULL,
ADD id_user Int NULL;

ALTER TABLE message
ADD FOREIGN KEY (id_user) REFERENCES user(id),
ADD FOREIGN KEY (id_recipe) REFERENCES recipe(id);
