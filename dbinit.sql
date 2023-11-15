USE `olympics`;

CREATE TABLE Team
(
    TeamName VARCHAR(100) PRIMARY KEY,
    Num_of_athletes INT NOT NULL
);

CREATE TABLE Federation
(
  FederationName VARCHAR(100) PRIMARY KEY,
  HeadquarterCity VARCHAR(100),
Address VARCHAR(100),
 UNIQUE (HeadquarterCity, Address)
);

CREATE TABLE Venue
(
  VenueName VARCHAR(100) NOT NULL,
  City VARCHAR(100) NOT NULL,
  ConstructedDate DATE,
  PRIMARY KEY (VenueName, City)
);


CREATE TABLE Country
(
  CountryName VARCHAR(100) PRIMARY KEY,
  Continent VARCHAR(100) NOT NULL
);

CREATE TABLE Coach
(
 CoachID INT PRIMARY KEY,
  FirstName CHAR(80) NOT NULL,
 LastName CHAR(80)  NOT NULL,
   Gender CHAR(10)  NOT NULL,
   Age INT NOT NULL,
  CountryName VARCHAR(100) NOT NULL,
  FOREIGN KEY (CountryName) REFERENCES Country(CountryName)
);


CREATE TABLE Sport_Season
(
  SportName VARCHAR(100) PRIMARY KEY,
  Season CHAR(10) NOT NULL
);

CREATE TABLE Sport_Location
(
  SportName VARCHAR(100) PRIMARY KEY,
  indoorOutdoor  CHAR(10) NOT NULL
);

CREATE TABLE Sport_Fed
(
  SportName VARCHAR(100) PRIMARY KEY,
  FederationName VARCHAR(100) NOT NULL,
  FOREIGN KEY (FederationName) REFERENCES Federation(FederationName)
);

CREATE TABLE Event
(
  EventName  VARCHAR(100)  NOT NULL,
  Gender CHAR(10) NOT NULL,
  TeamOrIndividual CHAR(10) NOT NULL,
  SportName  VARCHAR(100) NOT NULL,
  VenueName  VARCHAR(100) NOT NULL,
  VenueCity  VARCHAR(100) NOT NULL,
  StartTime TIMESTAMP NOT NULL,
  PRIMARY KEY (EventName, SportName),
  UNIQUE (VenueName, VenueCity, StartTime),
  FOREIGN KEY (SportName) REFERENCES Sport_Season(SportName) ON DELETE CASCADE , 
  FOREIGN KEY (VenueName) REFERENCES Venue(VenueName)
);

CREATE TABLE Athlete
(
 PlayerID INT PRIMARY KEY,
  FirstName CHAR(80) NOT NULL,
 LastName CHAR(80) NOT NULL,
  Age INT NOT NULL,
  Gender CHAR(10) NOT NULL,
    CountryName VARCHAR(100)  NOT NULL,
 CoachID INT NOT NULL,
  FOREIGN KEY (CoachID) REFERENCES Coach(CoachID),
  FOREIGN KEY (CountryName) REFERENCES Country(CountryName)
);

CREATE TABLE Medalist
(
  PlayerID INT NOT NULL,
 MedalType CHAR(20) NOT NULL,
  PRIMARY KEY (PlayerID),
  FOREIGN KEY (PlayerID) REFERENCES Athlete(PlayerID)
);

CREATE TABLE ReturningAthlete
(
  PlayerID INT NOT NULL,
 LastYearCompeted INT NOT NULL,
  PRIMARY KEY (PlayerID),
  FOREIGN KEY (PlayerID) REFERENCES Athlete(PlayerID)
);

CREATE TABLE Part_of
(
  PlayerID INT NOT NULL,
  TeamName VARCHAR(100) NOT NULL,
  PRIMARY KEY (PlayerID, TeamName),
  FOREIGN KEY (PlayerID) REFERENCES Athlete(PlayerID),
  FOREIGN KEY (TeamName) REFERENCES Team(TeamName)
);

CREATE TABLE Competes_in
(
  Ranking INT NOT NULL,
  PlayerID INT NOT NULL,
  EventName VARCHAR(100) NOT NULL,
  SportName VARCHAR(100) NOT NULL,
  PRIMARY KEY (PlayerID, EventName, SportName),
  FOREIGN KEY (PlayerID) REFERENCES Athlete(PlayerID),
  FOREIGN KEY (EventName, SportName) REFERENCES Event(EventName, SportName)
);

INSERT 
INTO	Team ( Num_of_athletes, TeamName) 
VALUES (23, "Canadian Men’s Ice Hockey Team"); 

INSERT 
INTO	Team ( Num_of_athletes, TeamName) 
VALUES (5, "Canadian Women’s Curling Team"); 

INSERT 
INTO	Team ( Num_of_athletes, TeamName) 
VALUES (5, "Chinese Women’s Curling Team"); 

INSERT 
INTO	Team ( Num_of_athletes, TeamName) 
VALUES (4, "Canada Bobsleigh Four-Man-Men Team"); 

INSERT 
INTO	Team ( Num_of_athletes, TeamName) 
VALUES (2, "Canadian Bobsleigh Two-Man-Men Team");



INSERT 
INTO	Venue (VenueName, City, ConstructedDate) 
VALUES ('Rogers Arena', 'Vancouver', '1995-09-21'); 

INSERT 
INTO	Venue (VenueName, City, ConstructedDate) 
VALUES ('Whistler Olympic Park', 'Whistler', '2008-01-21'); 

INSERT 
INTO	Venue (VenueName, City, ConstructedDate) 
VALUES ('Whistler Sliding Centre', 'Whistler', '2008-02-21'); 

INSERT 
INTO	Venue (VenueName, City, ConstructedDate) 
VALUES ('Hillcrest Centre', 'Vancouver', '2007-09-01'); 

INSERT 
INTO	Venue (VenueName, City, ConstructedDate) 
VALUES ('Pacific Coliseum', 'Vancouver', '1968-08-02') ;

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('China', 'Asia');

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('Canada', 'North America'); 

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('Germany', 'Europe'); 

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('South Korea', 'Asia'); 

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('Brazil', 'South America');

INSERT 
INTO	Country (CountryName, Continent) 
VALUES ('United Kingdom', 'Europe');


INSERT 
INTO	Sport_Season(SportName, Season) 
VALUES ('Hockey', 'Winter'); 

INSERT 
INTO	Sport_Season(SportName, Season) 
VALUES ('Curling', 'Winter'); 

INSERT 
INTO	Sport_Season(SportName, Season) 
VALUES ('Skeleton', 'Winter'); 

INSERT 
INTO	Sport_Season(SportName, Season) 
VALUES ('Skiing', 'Winter'); 

INSERT 
INTO	Sport_Season(SportName, Season) 
VALUES ('Bobsleigh', 'Winter'); 


INSERT 
INTO	Sport_Location (SportName, indoorOutdoor) 
VALUES ('Hockey', 'TRUE') ;

INSERT 
INTO	Sport_Location (SportName, indoorOutdoor) 
VALUES ('Curling', 'TRUE'); 

INSERT 
INTO	Sport_Location (SportName, indoorOutdoor) 
VALUES ('Skeleton', 'TRUE') ;

INSERT 
INTO	Sport_Location (SportName, indoorOutdoor)
VALUES ('Skiing', 'FALSE'); 

INSERT 
INTO	Sport_Location (SportName, indoorOutdoor)
VALUES ('Bobsleigh', 'TRUE'); 

INSERT 
INTO	Federation (FederationName, HeadquarterCity, Address) 
VALUES ('International Hockey Federation', 'Lausanne', 'Rue du Valentin 61 1004 Lausanne, Switzerland'); 

INSERT 
INTO	Federation (FederationName, HeadquarterCity, Address) 
VALUES ('International Bobsleigh and Skeleton Federation', 'Germany', 'Nonntal 10 83471 Berchtesgaden, Germany'); 

INSERT 
INTO	Federation (FederationName, HeadquarterCity, Address) 
VALUES ('International Ski and Snowboard Federation', 'Switzerland', 'Blochstrasse 2 3653 Oberhofen, Switzerland'); 

INSERT 
INTO	Federation (FederationName, HeadquarterCity, Address) 
VALUES ('International Skating Union', 'Lausanne', 'Avenue Juste-Olivier 17 1006 Lausanne, Switzerland');

INSERT 
INTO	Federation (FederationName, HeadquarterCity, Address) 
VALUES ('World Curling Federation', 'Perth', '3 Atholl Crescent, Perth Great Britain');

INSERT 
INTO	Sport_Fed(SportName, FederationName)
VALUES ('Hockey', 'International Hockey Federation'); 

INSERT 
INTO	Sport_Fed(SportName, FederationName) 
VALUES ('Curling', 'World Curling Federation');

INSERT 
INTO	Sport_Fed(SportName, FederationName) 
VALUES ('Skeleton', 'International Bobsleigh and Skeleton Federation');

INSERT 
INTO	Sport_Fed(SportName, FederationName)
VALUES ('Skiing', 'International Ski and Snowboard Federation'); 

INSERT 
INTO Sport_Fed(SportName, FederationName)
VALUES ('Bobsleigh', 'International Bobsleigh and Skeleton Federation');


INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (1, 'Juliet', 'Missy', 34, 'Female', 'Germany'); 

INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (2, 'Mike', 'Babcock', 60, 'Male', 'Canada') ;

INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (3, 'Nick', 'Omar', 43, 'Male', 'United Kingdom');


INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (4, 'Chris', 'Silverado', 53, 'Male', 'Brazil') ;

INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (5, 'Mei', 'Zhang', 43, 'Female', 'China');  

INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (6, 'Anya', 'Peterson', 32, 'Female', 'Germany');  

INSERT 
INTO	Coach (CoachID, FirstName, LastName, Age, Gender, CountryName) 
VALUES (7, 'Jill', 'Smith', 32, 'Female', 'Canada');  

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (1, 'Maria', 'Riesch', 38, 'Female', 'Germany', 1); 

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (2, 'Viktoria', 'Rebensburg', 34, 'Female', 'Germany', 1); 

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (3, 'Sidney', 'Crosby', 36, 'Male', 'Canada', 2); 

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (4, 'Corey', 'Perry', 38, 'Male', 'Canada', 2);

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (5, 'Amy', 'Williams', 41, 'Female', 'United Kingdom', 3); 

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (6, 'Anja', 'Huber', 40, 'Female', 'Germany', 6); 

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (7, 'Kristie', 'Moore', 44, 'Female', 'Canada', 7);

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (8, 'Susan', 'Oconnor', 43, 'Female', 'Canada', 7);  

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (9, 'Yan', 'Zhou', 32, 'Female', 'China', 5);  

INSERT 
INTO	Athlete (PlayerID, FirstName, LastName, Age, Gender, CountryName, CoachID) 
VALUES (10, 'David', 'Bisset', 20, 'Male', 'Canada', 7); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Ice Hockey Men', 'Men', 'Team', 'Hockey', 'Rogers Arena', 'Vancouver', '2010-02-20 12:00:00'); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Curling Women', 'Women', 'Team', 'Curling', 'Hillcrest Centre', 'Vancouver', '2010-02-15 13:30:00'); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Alpine Combined Women', 'Women', 'Individual', 'Skiing', 'Whistler Olympic Park', 'Whistler', '2010-02-16 15:00:00'); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Giant Slalom', 'Women', 'Individual', 'Skiing', 'Whistler Olympic Park', 'Whistler', '2010-02-18 15:00:00'); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Individual Skeleton', 'Women', 'Individual', 'Skeleton', 'Whistler Sliding Centre', 'Whistler', '2010-02-27 15:00:00') ;

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Four-Man-Men', 'Men', 'Team', 'Bobsleigh', 'Whistler Sliding Centre', 'Whistler', '2010-02-27 11:00:00'); 

INSERT 
INTO	Event (EventName, Gender, TeamOrIndividual, SportName, VenueName, VenueCity, StartTime) 
VALUES ('Two-Man-Men', 'Men', 'Team', 'Bobsleigh', 'Whistler Sliding Centre', 'Whistler', '2010-02-26 10:00:00'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (1, 'Gold'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (3, 'Gold'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (4, 'Gold'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (5, 'Gold'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (6, 'Bronze'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (7, 'Silver'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (8, 'Silver'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (9, 'Bronze'); 

INSERT 
INTO	Medalist (PlayerID, MedalType) 
VALUES (10, 'Bronze'); 


INSERT 
INTO	ReturningAthlete (PlayerID, LastYearCompeted) 
VALUES (10, 2006); 

INSERT 
INTO	ReturningAthlete (PlayerID, LastYearCompeted) 
VALUES (6, 2006); 

INSERT 
INTO	ReturningAthlete (PlayerID, LastYearCompeted) 
VALUES (5, 2002); 

INSERT 
INTO	ReturningAthlete (PlayerID, LastYearCompeted) 
VALUES (2, 2002); 

INSERT 
INTO	ReturningAthlete (PlayerID, LastYearCompeted) 
VALUES (8, 1998);

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (1, 1, 'Alpine Combined Women', 'Skiing');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (8, 2, 'Curling Women', 'Curling');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (1, 3, 'Ice Hockey Men', 'Hockey');


INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (1, 4, 'Four-Man-Men', 'Bobsleigh');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (1, 5, 'Giant Slalom', 'Skiing');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (3, 6, 'Individual Skeleton', 'Skeleton');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (2, 7, 'Curling Women', 'Curling');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (2, 8, 'Individual Skeleton', 'Skeleton');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (3, 9, 'Curling Women', 'Curling');

INSERT 
INTO	Competes_in (Ranking, PlayerID, EventName, SportName) 
VALUES (3, 10, 'Two-Man-Men', 'Bobsleigh');

INSERT 
INTO	Part_of (PlayerId, TeamName) 
VALUES (3, "Canadian Men’s Ice Hockey Team");


INSERT 
INTO	Part_of (PlayerId, TeamName) 
VALUES (7, "Canadian Women’s Curling Team");

INSERT 
INTO	Part_of (PlayerId, TeamName) 
VALUES (4, "Canada Bobsleigh Four-Man-Men Team");

INSERT 
INTO	Part_of (PlayerId, TeamName) 
VALUES (9, "Chinese Women’s Curling Team");

INSERT 
INTO	Part_of (PlayerId, TeamName) 
VALUES (10, "Canadian Bobsleigh Two-Man-Men Team");



