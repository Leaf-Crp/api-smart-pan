#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id                 Int  Auto_increment  NOT NULL ,
        email              Varchar (255) NOT NULL ,
        password           Varchar (255) NOT NULL ,
        firstname          Varchar (255) NOT NULL ,
        lastname           Varchar (255) NOT NULL ,
        is_connected_pan   Bool NOT NULL ,
        alarm_ended_recipe Varchar (255) NOT NULL ,
        alarm_ended_step   Varchar (255) NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: recipe_type
#------------------------------------------------------------

CREATE TABLE recipe_type(
        id    Int  Auto_increment  NOT NULL ,
        label Varchar (255) NOT NULL
	,CONSTRAINT recipe_type_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: recipe
#------------------------------------------------------------

CREATE TABLE recipe(
        id             Int  Auto_increment  NOT NULL ,
        label          Varchar (255) NOT NULL ,
        image          Varchar (255) NOT NULL ,
        is_private     Bool NOT NULL ,
        id_recipe_type Int NOT NULL ,
        id_user        Int NULL
	,CONSTRAINT recipe_PK PRIMARY KEY (id)

	,CONSTRAINT recipe_recipe_type_FK FOREIGN KEY (id_recipe_type) REFERENCES recipe_type(id)
	,CONSTRAINT recipe_user0_FK FOREIGN KEY (id_user) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: step
#------------------------------------------------------------

CREATE TABLE step(
        id        Int  Auto_increment  NOT NULL ,
        label     Varchar (255) NOT NULL ,
        duration  Float NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT step_PK PRIMARY KEY (id)

	,CONSTRAINT step_recipe_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: topic
#------------------------------------------------------------

CREATE TABLE topic(
        id      Int  Auto_increment  NOT NULL ,
        title   Varchar (255) NOT NULL ,
        content Text NOT NULL ,
        id_user Int NOT NULL,
        id_recipe Int NOT NULL
	,CONSTRAINT topic_PK PRIMARY KEY (id)
	,CONSTRAINT topic_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
	,CONSTRAINT topic_recipe_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: message
#------------------------------------------------------------

CREATE TABLE message(
        id       Int  Auto_increment  NOT NULL ,
        content  Text NOT NULL ,
        id_topic Int NOT NULL
	,CONSTRAINT message_PK PRIMARY KEY (id)
	,CONSTRAINT message_topic_FK FOREIGN KEY (id_topic) REFERENCES topic(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ingredient
#------------------------------------------------------------

CREATE TABLE ingredient(
        id    Int  Auto_increment  NOT NULL ,
        label Varchar (255) NOT NULL ,
        image Varchar (255) NOT NULL
	,CONSTRAINT ingredient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: prerequisite_type
#------------------------------------------------------------

CREATE TABLE prerequisite_type(
        id    Int  Auto_increment  NOT NULL ,
        label Varchar (255) NOT NULL,
        code Varchar (255) NOT NULL
    ,CONSTRAINT prerequisite_type_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: step_ingredient
#------------------------------------------------------------

CREATE TABLE step_ingredient(
        id_step            Int NOT NULL ,
        id_ingredient Int NOT NULL ,
        quantity      Varchar (255) NOT NULL
	,CONSTRAINT step_ingredient_PK PRIMARY KEY (id_step,id_ingredient)

	,CONSTRAINT step_ingredient_step_FK FOREIGN KEY (id_step) REFERENCES step(id)
	,CONSTRAINT step_ingredient_ingredient0_FK FOREIGN KEY (id_ingredient) REFERENCES ingredient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: prerequisite_type_step
#------------------------------------------------------------

CREATE TABLE prerequisite_type_step(
        id_prerequisite_type Int NOT NULL ,
        id_step Int NOT NULL ,
        detail  Varchar (255) NOT NULL
	,CONSTRAINT prerequisite_type_step_PK PRIMARY KEY (id_prerequisite_type,id_step)

	,CONSTRAINT prerequisite_type_step_prerequisite_type_FK FOREIGN KEY (id_prerequisite_type) REFERENCES prerequisite_type(id)
	,CONSTRAINT prerequisite_type_step_step0_FK FOREIGN KEY (id_step) REFERENCES step(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user_cooked_recipe
#------------------------------------------------------------

CREATE TABLE user_cooked_recipe(
        id_user        Int NOT NULL ,
        id_recipe Int NOT NULL ,
        id_step   Int NOT NULL
	,CONSTRAINT user_cooked_recipe_PK PRIMARY KEY (id_user,id_recipe,id_step)

	,CONSTRAINT user_cooked_recipe_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
	,CONSTRAINT user_cooked_recipe_recipe0_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
	,CONSTRAINT user_cooked_recipe_step1_FK FOREIGN KEY (id_step) REFERENCES step(id)
)ENGINE=InnoDB;

