ALTER TABLE user
MODIFY alarm_ended_recipe varchar(255) null,
MODIFY alarm_ended_step varchar(255) null,
MODIFY is_connected_pan boolean DEFAULT false;