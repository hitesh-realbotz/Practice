INSERT INTO students (first_name, last_name, dob, address, gender, phone_number, email)
VALUES
    ('John', 'Doe', '2000-05-15', '123 Main St, City', 'M', '1234567890', 'john@example.com'),
    ('Alice', 'Smith', '2001-08-20', '456 Elm St, Town', 'F', '9876543210', 'alice@example.com'),
    ('Emma', 'Johnson', '1999-12-10', '789 Oak St, Village', 'F', '5554443333', 'emma@example.com'),
    ('Michael', 'Brown', '2002-02-28', '321 Pine St, Suburb', 'M', '1112223333', 'michael@example.com'),
    ('Sophia', 'Wilson', '1998-07-05', '876 Maple St, Town', 'F', '9998887777', 'sophia@example.com'),
    ('David', 'Martinez', '2000-09-18', '654 Cedar St, City', 'M', '4445556666', 'david@example.com'),
    ('Olivia', 'Taylor', '2003-04-30', '210 Birch St, Suburb', 'F', '7776665555', 'olivia@example.com'),
    ('James', 'Garcia', '1997-11-25', '753 Elm St, Village', 'M', '3332221111', 'james@example.com'),
    ('Ava', 'Lopez', '2001-01-12', '456 Oak St, Town', 'F', '2223334444', 'ava@example.com'),
    ('Ethan', 'Hernandez', '1999-06-08', '987 Pine St, City', 'M', '6667778888', 'ethan@example.com'),
    ('Mia', 'Adams', '2002-10-05', '234 Maple St, Village', 'F', '8889990000', 'mia@example.com'),
    ('Noah', 'Thomas', '1998-03-20', '555 Cedar St, Suburb', 'M', '1234567890', 'noah@example.com'),
    ('Isabella', 'Rodriguez', '2000-07-14', '777 Elm St, Town', 'F', '4445556666', 'isabella@example.com'),
    ('William', 'Gonzalez', '2003-12-01', '321 Oak St, Village', 'M', '9998887777', 'william@example.com'),
    ('Charlotte', 'Miller', '1997-09-22', '456 Maple St, City', 'F', '7776665555', 'charlotte@example.com'),
    ('Liam', 'Perez', '2001-05-17', '789 Pine St, Suburb', 'M', '3332221111', 'liam@example.com'),
    ('Amelia', 'Lee', '1999-02-28', '210 Birch St, Town', 'F', '2223334444', 'amelia@example.com'),
    ('Benjamin', 'Sanchez', '2003-08-09', '753 Elm St, City', 'M', '6667778888', 'benjamin@example.com'),
    ('Harper', 'Nguyen', '1998-11-14', '456 Oak St, Village', 'F', '8889990000', 'harper@example.com'),
    ('Logan', 'Wright', '2000-06-25', '987 Pine St, Town', 'M', '1234567890', 'logan@example.com');
    
    
INSERT INTO courses (course_name, duration_years, intake_capacity)
VALUES
    ('Computer Engg.', 3, 100),
    ('Electrical Engg.', 3, 80),
    ('Electronics Engg.', 3, 90),
    ('Mechanical Engg.', 3, 75),
    ('Civil Engg.', 3, 85);
    
INSERT INTO study_years (nth_year) VALUES
    (1), (2), (3), (4), (5), (6);


INSERT INTO subjects (sub_name, marks)
VALUES
    ('Computer Architecture', 100),
    ('Operating Systems', 100),
    ('Data Structures and Algorithms', 100),
    ('Database Management Systems', 100),
    ('Computer Networks', 100),
    ('Software Engineering', 100),
    ('Digital Logic Design', 100),
    ('Assembly Language Programming', 100),
    ('Object-Oriented Programming', 100),
    ('Computer Graphics', 100),
    ('Machine Learning', 100),
    ('Cybersecurity', 100);

INSERT INTO subjects (sub_name, marks)
VALUES
    ('Electromagnetic Field', 100),
    ('Power System Analysis', 100),
    ('Control Systems1', 100),
    ('Digital Signal Processing', 100),
    ('Microprocessors', 100),
    ('Electrical Machine Design', 100),
    ('Power Electronics1', 100),
    ('High Voltage Engineering', 100),
    ('Renewable Energy Sources', 100),
    ('Electric Drives and Traction', 100),
    ('Electric Circuit Theory', 100),
    ('Measurements and Instrumentation', 100);

INSERT INTO subjects (sub_name, marks)
VALUES
    ('Electrical Circuits', 100),
    ('Electromagnetic Theory', 100),
    ('Digital Electronics', 100),
    ('Analog Electronics', 100),
    ('Signals and Systems', 100),
    ('Control Systems2', 100),
    ('Microprocessors and Microcontrollers', 100),
    ('Communication Systems', 100),
    ('Power Electronics2', 100),
    ('VLSI Design', 100),
    ('Embedded Systems', 100),
    ('Electronic Measurements and Instrumentation', 100);

INSERT INTO subjects (sub_name, marks)
VALUES
    ('Mechanics', 100),
    ('Thermodynamics', 100),
    ('Fluid Mechanics1', 100),
    ('Strength of Materials', 100),
    ('Machine Design', 100),
    ('Heat Transfer', 100),
    ('Manufacturing Processes', 100),
    ('Control Engineering', 100),
    ('Engineering Mathematics1', 100),
    ('Engineering Drawing1', 100),
    ('Materials Science', 100),
    ('Industrial Engineering', 100);

INSERT INTO subjects (sub_name, marks)
VALUES
    ('Structural Analysis', 100),
    ('Geotechnical Engineering', 100),
    ('Fluid Mechanics2', 100),
    ('Transportation Engineering', 100),
    ('Construction Materials', 100),
    ('Environmental Engineering', 100),
    ('Surveying', 100),
    ('Concrete Technology', 100),
    ('Hydraulics', 100),
    ('Engineering Mechanics', 100),
    ('Engineering Mathematics2', 100),
    ('Engineering Drawing2', 100);


INSERT INTO subjects (sub_name, marks)
VALUES
   ('Control Systems', 100),
   ('Power Electronics', 100),
    ('Fluid Mechanics', 100),
    ('Engineering Mathematics', 100),
    ('Engineering Drawing', 100)
   ;
   
INSERT INTO course_years (course_id, year_id)
VALUES
    (1, 1), -- Course 1 with Year 1
    (1, 2), -- Course 1 with Year 2
    (1, 3), -- Course 1 with Year 3
    (2, 1), -- Course 2 with Year 1
    (2, 2), -- Course 2 with Year 2
    (2, 3), -- Course 2 with Year 3
    (3, 1), -- Course 1 with Year 1
    (3, 2), -- Course 1 with Year 2
    (3, 3), -- Course 1 with Year 3
    (4, 1), -- Course 2 with Year 1
    (4, 2), -- Course 2 with Year 2
    (4, 3), -- Course 2 with Year 3
    (5, 1), -- Course 1 with Year 1
    (5, 2), -- Course 1 with Year 2
    (5, 3) -- Course 1 with Year 3
    -- Add more mappings here...
    -- Repeat this sequence for each course and year combination
    ;


INSERT INTO selected_courses (student_id, course_year_id)
VALUES
    -- Course 1 with students 1 to 4
    (1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (3, 3), (4, 1), (4, 2), (4, 3), 
    -- Course 2 with students 5 to 8
    (5, 4), (5, 5), (5, 6), (6, 4), (6, 5), (6, 6), (7, 4), (7, 5), (7, 6), (8, 4), (8, 5), (8, 6), 
    -- Course 3 with students 9 to 12
    (9, 7), (9, 8), (9, 9), (10, 7), (10, 8), (10, 9), (11, 7), (11, 8), (11, 9), (12, 7), (12, 8), (12, 9), 
    -- Course 4 with students 13 to 16
    (13, 10), (13, 11), (13, 12), (14, 10), (14, 11), (14, 12), (15, 10), (15, 11), (15, 12), (16, 10), (16, 11), (16, 12), 
    -- Course 5 with students 17 to 20
    (17, 13), (17, 14), (17, 15), (18, 13), (18, 14), (18, 15), (19, 13), (19, 14), (19, 15), (20, 13), (20, 14), (20, 15);

INSERT INTO year_subjects (course_year_id, sub_id)
VALUES
    -- Course Year 1 with subjects 1, 2, 64, 65
    (1, 1), (1, 2), (1, 64), (1, 65),
    -- Course Year 2 with subjects 3 to 7
    (2, 3), (2, 4), (2, 5), (2, 6), (2, 7),
    -- Course Year 3 with subjects 8 to 12
    (3, 8), (3, 9), (3, 10), (3, 11), (3, 12),
    -- Mapping for course_year_id 4 to subjects 13, 14, 64, 65
    (4, 13), (4, 14), (4, 64), (4, 65),
    -- Mapping for course_year_id 5 to subjects 15 to 19
    (5, 15), (5, 16), (5, 17), (5, 18), (5, 19),
    -- Mapping for course_year_id 6 to subjects 20 to 24
    (6, 20), (6, 21), (6, 22), (6, 23), (6, 24),
     -- Course Year 7 with subjects 25, 26, 64, 65
    (7, 25), (7, 26), (7, 64), (7, 65),
    -- Course Year 8 with subjects 27 to 31
    (8, 27), (8, 28), (8, 29), (8, 30), (8, 31),
    -- Course Year 9 with subjects 32 to 36
    (9, 32), (9, 33), (9, 34), (9, 35), (9, 36),
    -- Course Year 10 with subjects 37, 38, 64, 65
    (10, 37), (10, 38), (10, 64), (10, 65),
    -- Course Year 11 with subjects 39 to 43
    (11, 39), (11, 40), (11, 41), (11, 42), (11, 43),
    -- Course Year 12 with subjects 44 to 48
    (12, 44), (12, 45), (12, 46), (12, 47), (12, 48),
    -- Course Year 13 with subjects 49, 50, 64, 65
    (13, 49), (13, 50), (13, 64), (13, 65),
    -- Course Year 14 with subjects 51 to 55
    (14, 51), (14, 52), (14, 53), (14, 54), (14, 55),
    -- Course Year 15 with subjects 56 to 60
    (15, 56), (15, 57), (15, 58), (15, 59), (15, 60);
    

INSERT INTO obtained_marks (marks, student_id, year_subject_id)
VALUES
    -- student_id 1 to 4 with year_subject_id from 1 to 14 for each student_id
    (90, 1, 1), (85, 1, 2), (95, 1, 3), (80, 1, 4), (85, 1, 5), (90, 1, 6), (75, 1, 7), (80, 1, 8), (85, 1, 9), (90, 1, 10), (95, 1, 11), (85, 1, 12), (90, 1, 13), (75, 1, 14),
    (85, 2, 1), (90, 2, 2), (80, 2, 3), (75, 2, 4), (85, 2, 5), (90, 2, 6), (95, 2, 7), (80, 2, 8), (85, 2, 9), (90, 2, 10), (75, 2, 11), (80, 2, 12), (85, 2, 13), (90, 2, 14),
    (80, 3, 1), (85, 3, 2), (90, 3, 3), (95, 3, 4), (85, 3, 5), (90, 3, 6), (75, 3, 7), (80, 3, 8), (85, 3, 9), (90, 3, 10), (95, 3, 11), (85, 3, 12), (90, 3, 13), (75, 3, 14),
    (85, 4, 1), (90, 4, 2), (75, 4, 3), (80, 4, 4), (85, 4, 5), (90, 4, 6), (95, 4, 7), (80, 4, 8), (85, 4, 9), (90, 4, 10), (75, 4, 11), (80, 4, 12), (85, 4, 13), (90, 4, 14),
    
    -- student_id 5 to 8 with year_subject_id from 15 to 28 for each student_id
    (80, 5, 15), (85, 5, 16), (90, 5, 17), (95, 5, 18), (85, 5, 19), (90, 5, 20), (75, 5, 21), (80, 5, 22), (85, 5, 23), (90, 5, 24), (95, 5, 25), (85, 5, 26), (90, 5, 27), (75, 5, 28),
    (85, 6, 15), (90, 6, 16), (80, 6, 17), (75, 6, 18), (85, 6, 19), (90, 6, 20), (95, 6, 21), (80, 6, 22), (85, 6, 23), (90, 6, 24), (75, 6, 25), (80, 6, 26), (85, 6, 27), (90, 6, 28),
    (80, 7, 15), (85, 7, 16), (90, 7, 17), (95, 7, 18), (85, 7, 19), (90, 7, 20), (75, 7, 21), (80, 7, 22), (85, 7, 23), (90, 7, 24), (95, 7, 25), (85, 7, 26), (90, 7, 27), (75, 7, 28),
    (85, 8, 15), (90, 8, 16), (75, 8, 17), (80, 8, 18), (85, 8, 19), (90, 8, 20), (95, 8, 21), (80, 8, 22), (85, 8, 23), (90, 8, 24), (75, 8, 25), (80, 8, 26), (85, 8, 27), (90, 8, 28),
    
    -- student_id 9 to 12 with year_subject_id from 29 to 42 for each student_id
    (95, 9, 29), (85, 9, 30), (90, 9, 31), (80, 9, 32), (85, 9, 33), (90, 9, 34), (75, 9, 35), (80, 9, 36), (85, 9, 37), (90, 9, 38), (95, 9, 39), (85, 9, 40), (90, 9, 41), (75, 9, 42),
    (85, 10, 29), (90, 10, 30), (80, 10, 31), (75, 10, 32), (85, 10, 33), (90, 10, 34), (95, 10, 35), (80, 10, 36), (85, 10, 37), (90, 10, 38), (75, 10, 39), (80, 10, 40), (85, 10, 41), (90, 10, 42),
    (80, 11, 29), (85, 11, 30), (90, 11, 31), (95, 11, 32), (85, 11, 33), (90, 11, 34), (75, 11, 35), (80, 11, 36), (85, 11, 37), (90, 11, 38), (95, 11, 39), (85, 11, 40), (90, 11, 41), (75, 11, 42),
    (85, 12, 29), (90, 12, 30), (75, 12, 31), (80, 12, 32), (85, 12, 33), (90, 12, 34), (95, 12, 35), (80, 12, 36), (85, 12, 37), (90, 12, 38), (75, 12, 39), (80, 12, 40), (85, 12, 41), (90, 12, 42),
    
    -- student_id 13 to 16 with year_subject_id from 43 to 56 for each student_id
    (85, 13, 43), (90, 13, 44), (75, 13, 45), (80, 13, 46), (85, 13, 47), (90, 13, 48), (95, 13, 49), (80, 13, 50), (85, 13, 51), (90, 13, 52), (75, 13, 53), (80, 13, 54), (85, 13, 55), (90, 13, 56),
    (80, 14, 43), (85, 14, 44), (90, 14, 45), (95, 14, 46), (85, 14, 47), (90, 14, 48), (75, 14, 49), (80, 14, 50), (85, 14, 51), (90, 14, 52), (75, 14, 53), (80, 14, 54), (85, 14, 55), (90, 14, 56),
    (80, 15, 43), (85, 15, 44), (90, 15, 45), (95, 15, 46), (85, 15, 47), (90, 15, 48), (75, 15, 49), (80, 15, 50), (85, 15, 51), (90, 15, 52), (75, 15, 53), (80, 15, 54), (85, 15, 55), (90, 15, 56),
    (85, 16, 43), (90, 16, 44), (75, 16, 45), (80, 16, 46), (85, 16, 47), (90, 16, 48), (95, 16, 49), (80, 16, 50), (85, 16, 51), (90, 16, 52), (75, 16, 53), (80, 16, 54), (85, 16, 55), (90, 16, 56),
    
    -- Student 17 with year_subject_id from 57 to 70
    (85, 17, 57), (90, 17, 58), (75, 17, 59), (80, 17, 60), (85, 17, 61), (90, 17, 62), (95, 17, 63), (80, 17, 64), (85, 17, 65), (90, 17, 66), (75, 17, 67), (80, 17, 68), (85, 17, 69), (90, 17, 70),
    -- Student 18 with year_subject_id from 57 to 70
    (85, 18, 57), (90, 18, 58), (75, 18, 59), (80, 18, 60), (85, 18, 61), (90, 18, 62), (95, 18, 63), (80, 18, 64), (85, 18, 65), (90, 18, 66), (75, 18, 67), (80, 18, 68), (85, 18, 69), (90, 18, 70),
    -- Student 19 with year_subject_id from 57 to 70
    (85, 19, 57), (90, 19, 58), (75, 19, 59), (80, 19, 60), (85, 19, 61), (90, 19, 62), (95, 19, 63), (80, 19, 64), (85, 19, 65), (90, 19, 66), (75, 19, 67), (80, 19, 68), (85, 19, 69), (90, 19, 70),
    -- Student 20 with year_subject_id from 57 to 70
    (85, 20, 57), (90, 20, 58), (75, 20, 59), (80, 20, 60), (85, 20, 61), (90, 20, 62), (95, 20, 63), (80, 20, 64), (85, 20, 65), (90, 20, 66), (75, 20, 67), (80, 20, 68), (85, 20, 69), (90, 20, 70);





    select * from students;
    select * from courses;
	select * from selected_courses;
    select * from study_years;
    select * from subjects;
    select * from course_years;
    select * from year_subjects;
    select * from obtained_marks;
    desc course_years;
   
    select * from year_subjects;
    select  sub_name, count(*) as count from subjects group by sub_name having count = 1;
    
    
    
