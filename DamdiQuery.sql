/*
Use Master
GO
Drop Database Damdi_DB
GO
*/

CREATE DATABASE Damdi_DB  
ON (NAME = 'Damdi_DB', 
    FILENAME = 'D:\Damdi_DB_Data.MDF' , 
    SIZE = 10, 
    FILEGROWTH = 10%) 
LOG ON (NAME = 'Damdi_DB_Log', 
        FILENAME = 'D:\Damdi_DB_Log.LDF' ,
        SIZE = 5, 
        FILEGROWTH = 10%)
COLLATE Hebrew_CI_AS
GO

Use Damdi_DB 
GO

--Confiugreion Tables
CREATE TABLE Users
(
	personal_id nvarchar(10) NOT NULL,
	email nvarchar(50) NOT NULL,
	pass nvarchar(20) NOT NULL,
)
Go

CREATE TABLE DonorsInfo
(
	[personal_id] [nvarchar](10) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[phone] [nvarchar](10) NOT NULL,
	[gender] [nvarchar](1) NOT NULL,
	[birthdate] [date] NOT NULL,
	[prev_first_name] [nvarchar](50) NULL,
	[prev_last_name] [nvarchar](50) NULL,
	[city] [nvarchar](50) NOT NULL,
	[address] [nvarchar](150) NOT NULL,
	[postal_code] [nvarchar](7) NOT NULL,
	[mail_box] [nvarchar](10) NOT NULL,
	[telephone] [nvarchar](10) NULL,
	[work_telephone] [nvarchar](10) NULL,
	[blood_group_member] [bit] NOT NULL,
	[personal_insurance] [bit] NOT NULL,
	[confirm_examination] [bit] NOT NULL,
	[agree_future_don] [bit] NOT NULL,
	[birth_land] [nvarchar](50) NOT NULL,
	[aliya_year] [nvarchar](4) NULL,
	[father_birth_land] [nvarchar](50) NOT NULL,
	[mother_birth_land] [nvarchar](50) NOT NULL,
)
GO

CREATE TABLE Donators
(
	[auto_worker_id] [int] identity NOT NULL,
	[personal_id_worker] [nvarchar](9) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[password] [nvarchar](50) NOT NULL
)
GO

Create TABLE Stations
(
	[station_code] [int] NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[address] [nvarchar](70) NOT NULL,
	[start_time] [time](0) null,
	[end_time] [time](0) null
)
GO



CREATE TABLE Appointments
(
	[app_id] int identity NOT NULL,
	[station_code] [int] NOT NULL,
	[personal_id] [nvarchar](10) NOT NULL,
	[app_time] [datetime] NOT NULL
)	
GO

CREATE TABLE Donations
(
	number_blood_donation int identity NOT NULL,
	personal_id nvarchar(10) NOT NULL,
	station_code int not null,
	auto_worker_id int NOT NULL,
	donation_date datetime not null
)
GO


CREATE TABLE MedicalInfoDonation
(
	personal_id nvarchar(10) NOT NULL,
	client_qus_code int NOT NULL,
	client_ans_code int NOT NULL,
	answer_date date NOT NULL
)
GO


CREATE TABLE MedicalQuestions
(
	client_qus_code int NOT NULL,
	ques_desc nvarchar(500) not null
)
GO

CREATE TABLE MedicalAnswers
(
	client_ans_code int NOT NULL,
	ans_desc bit not null,
	note nvarchar(300) null
)
GO

CREATE TABLE MedicalInfoDonator
(
	autonumber_BD int NOT NULL,
	donator_qus_code int NOT NULL,
	donator_ans_code int NOT NULL
)
GO


CREATE TABLE MedicalQuestionsDonator
(
	donator_qus_code int NOT NULL,
	ques_desc nvarchar(500) not null
)
GO

CREATE TABLE MedicalAnswersDonator
(
	donator_ans_code int NOT NULL,
	ans_desc bit not null,
	note nvarchar(300) null
)
GO


--Configure PRIMARY KEYS
Alter TABLE Users
ADD
CONSTRAINT [PK_Users] PRIMARY KEY (personal_id)
GO

Alter TABLE DonorsInfo
ADD
CONSTRAINT [PK_DonorosInfo] PRIMARY KEY (personal_id)
GO

Alter TABLE Donators
ADD
CONSTRAINT [PK_Donators] PRIMARY KEY (auto_worker_id)
GO

Alter TABLE Stations
ADD
CONSTRAINT [PK_Stations] PRIMARY KEY (station_code)
GO

Alter TABLE Appointments
ADD
CONSTRAINT [PK_Appointments] PRIMARY KEY (app_id)
GO

Alter TABLE MedicalAnswers
ADD
Constraint PK_MedicalAnswers PRIMARY KEY (client_ans_code)
GO

Alter Table Donations
ADD
CONSTRAINT [PK_Donations] PRIMARY KEY (autonumber_BD)
GO

Alter TABLE MedicalQuestionsDonator
ADD
Constraint PK_MedicalQuestionsDonator Primary Key (donator_qus_code)
GO

Alter TABLE MedicalAnswersDonator
ADD
Constraint PK_MedicalAnswersDonator Primary Key (donator_ans_code)
GO


Alter TABLE MedicalQuestions
ADD
Constraint PK_MedicalQuestions PRIMARY KEY (client_qus_code)
GO

Alter TABLE MedicalInfoDonation
ADD
Constraint PK_MedicalInfoDonation PRIMARY KEY (personal_id,client_qus_code,client_ans_code)
GO

Alter TABLE MedicalInfoDonator
ADD
Constraint PK_MedicalInfoDonator Primary Key (autonumber_BD,donator_qus_code,donator_ans_code)
GO



--Configure FOREIGN KEYS

Alter Table Users
ADD
CONSTRAINT FK_Users FOREIGN KEY (personal_id) REFERENCES [DonorsInfo](personal_id)
GO

ALTER TABLE DonorsInfo
ADD CONSTRAINT FK_DonorosInfo FOREIGN KEY (personal_id) REFERENCES Users (personal_id)
GO

Alter TABLE Appointments
ADD
CONSTRAINT FK_StationCode FOREIGN KEY (station_code) REFERENCES [Stations](station_code),
CONSTRAINT FK_PersonalId FOREIGN KEY (personal_id) REFERENCES [DonorsInfo](personal_id)
GO

Alter TABLE Donations
ADD
CONSTRAINT FK_Personal_Id FOREIGN KEY (personal_id) REFERENCES [DonorsInfo](personal_id),
CONSTRAINT FK_Station_Code FOREIGN KEY (station_code) REFERENCES [Stations](station_code),
CONSTRAINT FK_Worker_Id FOREIGN KEY (auto_worker_id) REFERENCES [Donators](auto_worker_id)
GO

Alter Table MedicalInfoDonation
ADD
CONSTRAINT FK_Personal_Id_MI FOREIGN KEY (personal_id) REFERENCES [DonorsInfo](personal_id),
CONSTRAINT FK_C_Quetion_code FOREIGN KEY (client_qus_code) REFERENCES [MedicalQuestions](client_qus_code),
CONSTRAINT FK_C_Answer_code FOREIGN KEY (client_ans_code) REFERENCES [MedicalAnswers](client_ans_code)
GO

Alter Table MedicalInfoDonator
ADD
CONSTRAINT FK_D_Quetion_code FOREIGN KEY (donator_qus_code) REFERENCES [MedicalQuestionsDonator](donator_qus_code),
CONSTRAINT FK_D_Answer_code FOREIGN KEY (donator_ans_code) REFERENCES [MedicalAnswersDonator](donator_ans_code),
CONSTRAINT FK_autonumber_BD FOREIGN KEY (autonumber_BD) REFERENCES [Donations](autonumber_BD)
GO