CREATE TABLE USER (
	UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,		
	Username VARCHAR(30),
	Password VARCHAR(8000),
	Salt VARCHAR(8000),
	FirstName VARCHAR(50),
	LastName VARCHAR(50),
	Email VARCHAR(50),
	Bio VARCHAR(1000),
	CONSTRAINT uniqueUsername UNIQUE (Username),
	CONSTRAINT uniqueEmail UNIQUE (Email)
);

CREATE TABLE USER_INSTRUMENTS (
	UserID INT,
	Instrument VARCHAR(200),
	CONSTRAINT FK_UserID FOREIGN KEY (UserID) REFERENCES USER(UserID),	
	CONSTRAINT uniqueUserInstrument UNIQUE (UserID, Instrument)
);

CREATE TABLE BAND (
	BandID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,	
	BandName VARCHAR(100),
	OwnerID INT,
	Description VARCHAR(1000),
	Genre VARCHAR(20),
	CONSTRAINT FK_BandOwnerID FOREIGN KEY (OwnerID) REFERENCES USER(UserID),
	CONSTRAINT uniqueBandPerOwner UNIQUE (BandID, OwnerID)
);

CREATE TABLE BANDMEMBER (
	BandID INT,
	UserID INT,
	Role INT,
	CONSTRAINT uniqueMember UNIQUE (BandID, UserID),
	CONSTRAINT FK_MemberID FOREIGN KEY (UserID) REFERENCES USER(UserID),
	CONSTRAINT FK_BandMemberID FOREIGN KEY (BandID) REFERENCES BAND(BandID)
);

CREATE TABLE SONG (
	SongID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT,
	Name VARCHAR(100),
	Duration VARCHAR(8),
	Lyrics MEDIUMTEXT,
	Composer VARCHAR(100),
	Path VARCHAR(1000),
	Link VARCHAR(500),
	CONSTRAINT FK_SongBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)
);

CREATE TABLE SETLIST (
	SetListID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT,
	Name VARCHAR(100),
	Description VARCHAR(1000),
	CONSTRAINT FK_SetListBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)	
);

CREATE TABLE SONG_SETLIST (
	SongID INT,
	SetListID INT,
	CONSTRAINT FK_SongID FOREIGN KEY (SongID) REFERENCES SONG(SongID),
	CONSTRAINT FK_SongSetListID FOREIGN KEY (SetListID) REFERENCES SETLIST(SetListID)
);

CREATE TABLE FRIEND (
	FromUserID INT,
	ToUserID INT,
	Status INT,
	CONSTRAINT FK_FromUserID FOREIGN KEY (FromUserID) REFERENCES USER(UserID),
	CONSTRAINT FK_ToUserID FOREIGN KEY (ToUserID) REFERENCES USER(UserID),	
	CONSTRAINT uniqueConnection UNIQUE (FromUserID, ToUserID)
	-- Need to determine how to handle ID1, ID2 and ID2, ID1
);

CREATE TABLE EVENT (
	EventID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT,
	EventDate DATE,
	EventTime TIMESTAMP,
	LoadInTime TIMESTAMP,
	Location VARCHAR(200),
	Venue VARCHAR(200),
	Description VARCHAR(1000),
	IsShow INT,
	CONSTRAINT FK_EventBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)	
);

CREATE TABLE ITEM (
	ItemID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,	
	BandID INT, 
	ItemName VARCHAR(50),
	Description VARCHAR(500),
	Type VARCHAR(200),
	Color VARCHAR(20),
	ImageFilePath VARCHAR(200),
	Price DECIMAL (10,2),
	CONSTRAINT FK_ItemBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)		
);

CREATE TABLE INVENTORY (
	InventoryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ItemID INT,
	Quantity INT,
	Size VARCHAR(10),
	CONSTRAINT FK_InventoryItemID FOREIGN KEY (ItemID) REFERENCES ITEM(ItemID)		
);

CREATE TABLE ORDER_MASTER (
	OrderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT,
	OrderDate DATETIME,
	Total DECIMAL,
	CONSTRAINT FK_OrderMasterBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)		
);

CREATE TABLE ORDER_DETAIL (
	OrderID INT,
	ItemID INT,
	Quantity INT,
	Price DECIMAL (10,2),
	Total DECIMAL (10,2),
	CONSTRAINT FK_OrderID FOREIGN KEY (OrderID) REFERENCES ORDER_MASTER(OrderID),		
	CONSTRAINT FK_OrderDetailItemID FOREIGN KEY (ItemID) REFERENCES ITEM(ItemID)		
);

CREATE TABLE NOTIFICATION (
	NotificationID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	UserId INT,
	Type INT,
	Message VARCHAR(500),
	Link VARCHAR(500),
	Unread TINYINT(1),
	CONSTRAINT FK_NotificationUserID FOREIGN KEY (UserID) REFERENCES USER(UserID)
);

CREATE TABLE INCOME (
	IncomeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT, 
	Description VARCHAR(1000),
	IncomeDate DATETIME,
	Type INT, -- Needed??
	CONSTRAINT FK_IncomeBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID)		
);

CREATE TABLE APPLICATION (
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	BandID INT,
	UserID INT,
	Status INT,
	Instrument VARCHAR(20),
	Message VARCHAR(2000),
	CONSTRAINT FK_ApplicationBandID FOREIGN KEY (BandID) REFERENCES BAND(BandID),
	CONSTRAINT FK_ApplicationUserID FOREIGN KEY (UserID) REFERENCES USER(UserID),	
	CONSTRAINT uniqueApplication UNIQUE (BandID, UserID)
);

delimiter $$
CREATE TRIGGER INSERT_OWNER AFTER INSERT ON BAND
FOR EACH ROW
	BEGIN
		INSERT INTO BANDMEMBER (USERID, BANDID, ROLE) VALUES (NEW.OWNERID, NEW.BANDID, 0);
	END$$
delimiter ;
delimiter $$
CREATE TRIGGER DELETE_INVENTORY AFTER DELETE ON ITEM
FOR EACH ROW
	BEGIN
		DELETE FROM INVENTORY WHERE INVENTORY.ITEMID = OLD.ITEMID;
	END$$
delimiter ;