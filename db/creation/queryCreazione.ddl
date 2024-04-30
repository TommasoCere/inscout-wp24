-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Tue Apr 30 15:10:53 2024 
-- * LUN file: C:\Users\buda2\OneDrive - Alma Mater Studiorum Università di Bologna\ANNO 3\TECNOLOGIE WEB\PROGETTO\InscoutDatabase.lun 
-- * Schema: inscoutLOG2/2 
-- ********************************************* 


-- Database Section
-- ________________ 

create database inscout;
use inscout;


-- Tables Section
-- _____________ 

create table BADGE (
     titolo varchar(50) not null,
     constraint IDBADGE primary key (titolo));

create table COMMENTI (
     usernameAutore varchar(50) not null,
     idPost int not null,
     id int not null,
     testo varchar(500) not null,
     constraint IDCOMMENTO primary key (usernameAutore, idPost, id));

create table CONQUISTE (
     username varchar(50) not null,
     titolo varchar(50) not null,
     constraint IDCONQUISTE primary key (username, titolo));

create table FOLLOW (
     usernameSeguito varchar(50) not null,
     usernameSeguace varchar(50) not null,
     constraint IDFOLLOW primary key (usernameSeguito, usernameSeguace));

create table GRUPPI (
     citta varchar(50) not null,
     numero int not null,
     regione varchar(50) not null,
     constraint IDGRUPPO primary key (citta, numero));

create table LIKES (
     username varchar(50) not null,
     idPost int not null,
     constraint IDLIKES primary key (idPost, username));

create table POST (
     id int not null,
     immagine varchar(500) not null,
     dataPubblicazione char(200) not null,
     testo varchar(500) not null,
     nLikes int not null,
     usernameAutore varchar(50) not null,
     constraint IDPOST primary key (id));

create table UTENTI (
     username varchar(50) not null,
     fotoProfilo varchar(500) not null,
     nome varchar(255) not null,
     cognome varchar(100) not null,
     email varchar(319) not null,
     password varchar(63) not null,
     branca varchar(50) not null,
     cittaGruppo varchar(50) not null,
     numeroGruppo int not null,
     constraint IDUTENTE primary key (username),
     constraint IDUTENTE_1 unique (email));


-- Constraints Section
-- ___________________ 

alter table COMMENTI add constraint FKRELAZIONE
     foreign key (idPost)
     references POST (id);

alter table COMMENTI add constraint FKAUTORE
     foreign key (usernameAutore)
     references UTENTI (username);

alter table CONQUISTE add constraint FKCON_BAD
     foreign key (titolo)
     references BADGE (titolo);

alter table CONQUISTE add constraint FKCON_UTE
     foreign key (username)
     references UTENTI (username);

alter table FOLLOW add constraint FKseguace
     foreign key (usernameSeguace)
     references UTENTI (username);

alter table FOLLOW add constraint FKseguito
     foreign key (usernameSeguito)
     references UTENTI (username);

alter table LIKES add constraint FKLIK_POS
     foreign key (idPost)
     references POST (id);

alter table LIKES add constraint FKLIK_UTE
     foreign key (username)
     references UTENTI (username);

alter table POST add constraint FKPUBBLICAZIONE
     foreign key (usernameAutore)
     references UTENTI (username);

alter table UTENTI add constraint FKAPPARTENENZA
     foreign key (cittaGruppo, numeroGruppo)
     references GRUPPI (citta, numero);


-- Index Section
-- _____________ 