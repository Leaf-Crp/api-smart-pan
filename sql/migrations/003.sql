ALTER TABLE topic
ADD id_recipe Int NULL;

ALTER TABLE topic
ADD FOREIGN KEY (id_recipe) REFERENCES recipe(id);