/*
Use Master
GO
Use site15
GO
*/

--Confiugreion Tables
CREATE TABLE Users
(
	personal_id nvarchar(10) NOT NULL,
	email nvarchar(50) NOT NULL,
	salted_hash nvarchar(MAX) not null,
	profile_img nvarchar(MAX) null,
	[first_name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NULL,
	[phone] [nvarchar](10) NULL,
	[gender] [nvarchar](1) NULL,
	[birthdate] [date]  NULL,
	[prev_first_name] [nvarchar](50) NULL,
	[prev_last_name] [nvarchar](50) NULL,
	[city] [nvarchar](50)  NULL,
	[address] [nvarchar](150) NULL,
	[postal_code] [nvarchar](7) NULL,
	[mail_box] [nvarchar](10) NULL,
	[telephone] [nvarchar](10) NULL,
	[work_telephone] [nvarchar](10) NULL,
	[blood_group_member] [bit] NULL,
	[personal_insurance] [bit] NULL,
	[confirm_examination] [bit] NULL,
	[agree_future_don] [bit] NULL,
	[birth_land] [nvarchar](50) NULL,
	[aliya_year] [nvarchar](4) NULL,
	[father_birth_land] [nvarchar](50) NULL,
	[mother_birth_land] [nvarchar](50) NULL
)
GO

CREATE TABLE Donators
(
	[auto_worker_id] [int] identity NOT NULL,
	[personal_id_worker] [nvarchar](9) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	salted_hash nvarchar(MAX) not null
)
GO

CREATE TABLE Manager
(
	[auto_worker_id] [int] identity NOT NULL,
	[personal_id] [nvarchar](9) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	salted_hash nvarchar(MAX) not null,
	access_level int not null
)
GO

Create TABLE Stations
(
	[station_code] [int] NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[f_address] [nvarchar](70) NOT NULL,
	[start_time] [time](0) null,
	[end_time] [time](0) null,
	lat decimal null,
	lng decimal null
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
	blood_donation_id int NOT NULL,
	personal_id nvarchar(10) NOT NULL,
	station_code int not null,
	site_name nvarchar(100) null,
	donation_type nvarchar(50) null,
	duration nvarchar(50) null,
	age_approve bit null,
	auto_worker_id int NOT NULL,
	donation_date datetime not null,
	mi_donation_from int not null,
	mi_donator_from int NOT NULL
)
GO


CREATE TABLE MedicalInfoDonation
(
	mi_donation_from int identity not null,
	personal_id nvarchar(10) NOT NULL,
	answer_date date NOT NULL,
	Q3_1 bit null,
	Q3_2 bit null,
	Q3_3 bit null,
	Q3_4 bit null,
	Q3_5 bit null,
	Q3_6 bit null,
	Q3_7 bit null,
	Q3_8 bit null,
	Q3_9 bit null,
	Q3_10 bit null,
	Q3_11 bit null,
	Q3_12 bit null,
	Q3_13 bit null,
	Q3_14 bit null,
	Q3_15 bit null,
	Q3_16 bit null,
	Q3_17 bit null,
	Q3_18 bit null,
	Q3_19 bit null,
	Q3_20 bit null,
	Q3_21 bit null,
	notes nvarchar(MAX) null
)
GO


CREATE TABLE MedicalInfoDonator
(
	mi_donator_from int identity not null,
	blood_donation_id int NOT NULL,
	site_code int null,
	blood_pressure int null,
	pulse int null,
	noraml_pulse bit null,
	bp_checker nvarchar(50) null,
	checker_name nvarchar(50) null,
	hemoglobin bit null,
	approver nvarchar(50) null,
	abnormal_response bit null,
	which_response nvarchar(50) null,
	went_to_hospital bit null,
	by_mada bit null,
	refused_evacuate bit null,
	donator_notes bit null,
	no_for_platelets bit null,
	blood_for_freeze bit null,
	empty_bag bit null,
	no_sterile_dose bit null,
	epmty_tubes bit null,
	empty_nat_tube bit null,
	tube_for_count bit null,
	rich_in_antibodies bit null,
	type_antibody nvarchar(50) null,
	less_iga bit null,
	reported_part_b bit null,
	reported_part_c bit null,
	section_part_c nvarchar(200) null,
	sort bit null,
	detail nvarchar(MAX) null, 
	type_bag nvarchar(50) null,
	dose_weight decimal null,
	checker_hemog nvarchar(50) null,
	code_hemog int null,
	qualificat_name nvarchar(50) null,
	code_qualificat int null,
	questioner_name nvarchar(50),
	code_questioner int null,
	notes nvarchar(MAX) null,
)
GO

--Configure PRIMARY KEYS
Alter TABLE Users
ADD
CONSTRAINT [PK_Users] PRIMARY KEY ([personal_id])
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

Alter Table Donations
ADD
CONSTRAINT [PK_Donations] PRIMARY KEY (blood_donation_id)
GO

Alter TABLE MedicalInfoDonation
ADD
Constraint PK_MedicalInfoDonation PRIMARY KEY (personal_id,mid_from)
GO

Alter TABLE MedicalInfoDonator
ADD
Constraint PK_MedicalInfoDonator Primary Key (blood_donation_id)
GO


--Configure FOREIGN KEYS

Alter TABLE Appointments
ADD
CONSTRAINT FK_StationCode FOREIGN KEY (station_code) REFERENCES [Stations](station_code),
CONSTRAINT FK_PersonalId FOREIGN KEY (personal_id) REFERENCES [Users]([personal_id])
GO

Alter TABLE Donations
ADD
CONSTRAINT FK_Personal_Id FOREIGN KEY (personal_id) REFERENCES [Users](personal_id),
CONSTRAINT FK_Station_Code FOREIGN KEY (station_code) REFERENCES [Stations](station_code),
CONSTRAINT FK_Worker_Id FOREIGN KEY (auto_worker_id) REFERENCES [Donators](auto_worker_id),
CONSTRAINT FK_MIDonation FOREIGN KEY (mi_donation_from) REFERENCES [MedicalInfoDonation](mi_donation_from),
CONSTRAINT FK_MIDonator FOREIGN KEY (mi_donator_from) REFERENCES [MedicalInfoDonator](mi_donator_from)
GO

Alter Table MedicalInfoDonation
ADD
CONSTRAINT FK_Personal_Id_MI FOREIGN KEY (personal_id) REFERENCES [Users](personal_id)
GO

Alter Table MedicalInfoDonator
ADD
CONSTRAINT FK_autonumber_BD FOREIGN KEY (blood_donation_id) REFERENCES [Donations](blood_donation_id)
GO


Create procedure GetUser(
@id nvarchar(9),
@salted_hash nvarchar(max))
AS
SELECT * FROM Users
where personal_id=@id and salted_hash=@salted_hash

Create procedure GetUserInfo(@personal_id nvarchar(10))
as
SELECT * FROM Users where personal_id=@personal_id

Create procedure InsertNewUser(
@personal_id nvarchar(9),
@email nvarchar(50),
@salted_hash nvarchar(max))
as 
INSERT INTO Users (personal_id,email,salted_hash) VALUES (@personal_id,@email,@salted_hash)

Create procedure InsertNewAppointment(@station_code int , @personal_id nvarchar(10) , @app_time datetime)
as 
INSERT INTO Appointments(station_code,personal_id,app_time) VALUES (@station_code,@personal_id,@app_time)

Create procedure UpdateProfileImage(
@user_img nvarchar(max),
@id int)
as
Update Users Set profile_img=@user_img where personal_id=@id




Create procedure InsertNewDonator(
@personal_id_worker nvarchar (10),
@first_name nvarchar(50),
@last_name nvarchar(50),
@salted_hash nvarchar(max))
as 
INSERT INTO Donators(personal_id_worker,first_name,last_name,salted_hash) VALUES (@personal_id_worker,@first_name,@last_name,@salted_hash)


Create procedure InsertNewStation(
@station_code int,
@city nvarchar(50),
@f_address nvarchar(70),
@start_time time(0),
@end_time time(0),
@lat decimal,
@lng decimal)
as
insert into Stations (station_code,city,f_address,start_time,end_time,lat,lng) VALUES (@station_code,@city,@f_address,@start_time,@end_time,@lat,@lng)


Create procedure MedicalInfoUser(@personal_id nvarchar(10))
as
SELECT * FROM MedicalInfoDonation where personal_id=@personal_id
