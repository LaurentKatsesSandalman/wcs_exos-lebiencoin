INSERT INTO category (category_id,category_name) VALUES
(1,"IMMO"),
(2,"MEUBLES"),
(3,"SERVICES"),
(4,"LIVRES"),
(5,"VAISSELLE"),
(6,"BIBELOTS"),
(7,"COLLECTIONS"),
(8,"VETEMENTS");

INSERT INTO user (user_id,user_name,email,password,user_town,phone) VALUES
(1,"Laurent","example1@example.com","Azerty!123","Paris","676454612"),
(2,"Sandalman","example2@example.com","Azerty!123","Lille","676454613"),
(3,"Papi","example3@example.com","Azerty!123","Marseille","676454614"),
(4,"Mami","example4@example.com","Azerty!123","Angouleme","676454615"),
(5,"Mimo","example5@example.com","Azerty!123","Aix","676454616"),
(6,"Pipo","example6@example.com","Azerty!123","Avignon","676454617"),
(7,"Kikoolol","example7@example.com","Azerty!123","Perpignan","676454618");

INSERT INTO advert (advert_id,title,description,price,creation_date,last_date,user_id,category_id) VALUES
(1,"Vend appart","12m2 en plain paris avec espace spacieux",666666,"2025-01-01 00:00:01","2025-01-01 00:12:01",1,1),
(2,"Vend collection sandales","Plus de 6000 paires de taille 42",60000,"2025-02-01 00:00:01","2025-02-02 00:00:01",3,7);

INSERT INTO message (message_id,message_content,send_date,sender_id,recipient_id,advert_id) VALUES
(1,"C'est des sandales homme ou femme ?","2025-02-02 01:00:01",2,3,2),
(2,"Femme","2025-02-02 01:15:01",3,2,2),
(3,"Ah, tant pis","2025-02-03 12:15:01",2,3,2);

INSERT INTO image (image_id,image_url,advert_id) VALUES
(1,"https://www.actusmediasandco.com/wp-content/uploads/2014/02/chaussures_SJP_Le_Coveteur_O_Mag_SJP_Gayle-146.jpg",2);