USE employee_db;

INSERT INTO department (name) 
    VALUES 
        ("HR"), 
        ("BILLING"),
        ("ENGINEERING");

INSERT INTO role (title,salary,department_id) 
    VALUES 
        ("Recuiter", 50000, 1), 
        ("Talent Aquistion Specialist", 60000, 1), 
        ("HR Manager", 90000, 1), 
        ("Billing Specialist I", 40000, 2), 
        ("Billing Specialist II", 60000, 2), 
        ("Sr. Billing Specialist", 80000, 2), 
        ("Billing Specialist Manager", 100000, 2), 
        ("Software Engineer", 150000, 3),
        ("Software Engineering Manager", 200000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES 
        ("James", "O'Brian", 3, NULL), 
        ("John", "Doe", 1, 1), 
        ("Mary", "Jane", 2, 1), 
        ("Jennifer", "Smith", 7, NULL), 
        ("Susan", "Jones", 4, 4), 
        ("Rachel", "Wilson", 5, 4), 
        ("Michael", "Owen", 6, 4), 
        ("Sarah", "Kim", 9, NULL), 
        ("Wes", "Anderson", 9, 8);