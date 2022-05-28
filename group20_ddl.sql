/* ****************************************************************************
    CS340 2021 Spring
    Group20: Mingming Su & Ruosha Pang
***************************************************************************** */

-- set 0 to disable the check foreign key
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `Students`;
DROP TABLE IF EXISTS `Departments`;
DROP TABLE IF EXISTS `Instructors`;
DROP TABLE IF EXISTS `Courses`;
DROP TABLE IF EXISTS `Courses2Students`;

-- set 1 to enable the check foreign key
SET FOREIGN_KEY_CHECKS=1;

-- Students table: CREAT & INSERT

CREATE TABLE `Students` (
	`student_id` 	    int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`student_name`      varchar(255) NOT NULL,
	`student_degree`    varchar(255) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `Students` VALUES
	(1, 'Ray. L','BS'),
	(2, 'David. M', 'BS'),
	(3, 'Harry Potter', 'BS'),
	(4, 'Ave Capton', 'BS'),
    (5, 'Olivis', 'BS'),
    (6, 'Emma', 'BS'),
    (7, 'Liam', 'BS'),
    (8, 'Oliver','MS'),
    (9, 'Walliam', 'MS'),
    (10, 'James', 'Phd')
;

-- Departments table: CREATE & INSERT

CREATE TABLE `Departments`(
    `department_id`     int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `department_name`   varchar(255) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `Departments` VALUES
    (1, 'BUSINESS'),
    (2, 'EDUCATION'),
    (3, 'ENGINEERING'),
    (4, 'LIBERAL ART'),
    (5, 'PHARMACY'),
    (6, 'Public Health'),
    (7, 'Social Science')
;

-- Instructors table: CREATE & INSERT
-- Change the comma symbol after the "department_id"
CREATE TABLE `Instructors`(
	`instructor_id`		int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`instructor_name` 	varchar(255) NOT NULL,
	`department_id`	 	int(32) NOT NULL,
    FOREIGN KEY (`department_id`)
        REFERENCES `Departments`(`department_id`)
        ON DELETE CASCADE
            ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO `Instructors` VALUES
	(1, 'Dennis Adams','1'),
	(2, 'Michelle Barnard','1'),
    (3, 'Mary Agujera', '2'),
    (4, 'Julie Brandis', '3'),
    (5, 'Nick Brown', '3'),
    (6, 'Lauren Julie', '3'),
    (7, 'Paul Thompson', '4'),
    (8, 'Michael Trevathan', '4')
;

-- Courses table: CREATE & INSERT

CREATE TABLE `Courses` (
	`course_id`	 	char(11) NOT NULL PRIMARY KEY,
	`course_name`	varchar(255) NOT NULL,
	`department_id`	int(11) NOT NULL,
	`instructor_id`	int(11),
	FOREIGN KEY (`department_id`)
		REFERENCES `Departments`(`department_id`)
		ON DELETE CASCADE
    	    ON UPDATE CASCADE,
    FOREIGN KEY (`instructor_id`)
        REFERENCES `Instructors`(`instructor_id`)
        ON DELETE SET NULL
            ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO `Courses` VALUES
	('CS340', 'Database', 1, 2),
	('BA240', 'Intro Finance', 2, 4),
    ('CS325', 'Algorithm', 1, 3),
    ('ART101', 'Art History I', 4, 7),
    ('ART102', 'Art History II', 4, 8)
;

-- Courses2Students table: CREATE & INSERT

CREATE TABLE `Courses2Students` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`course_id`     char(255),
	`student_id`	int NOT NULL,
	FOREIGN KEY (`course_id`)
        REFERENCES `Courses`(`course_id`)
        ON DELETE SET NULL
            ON UPDATE CASCADE,
    FOREIGN KEY (`student_id`)
        REFERENCES `Students`(`student_id`)
        ON DELETE CASCADE
            ON UPDATE CASCADE
) ENGINE=InnoDB;

INSERT INTO `Courses2Students` VALUES
	(1,'CS340', 3),
	(2,'CS325', 1),
	(3,'BA240', 2),
    (4, 'ART101', 4),
    (5, 'ART102', 7),
    (6, 'CS340', 1)
;