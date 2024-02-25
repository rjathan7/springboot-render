# Student Management Application
![image](https://github.com/rjathan7/springboot-render/assets/126628724/a006d021-4df4-4c80-b1c8-ff5133ff2623)
## Overview
This Spring Boot application manages information about students, allowing users to add, update, delete, and view student details.

## Features

### 1. Add New Students
Endpoint: `/students/add`

This feature allows users to add new students to the database. Users can input student attributes such as name, weight, height, hair color, and GPA.

### 2. Update Student Attributes
Endpoint: `/students/edit/{id}`

Users can modify the attributes of any existing student by navigating to the edit page. The form on this page will be pre-filled with the existing attributes, and users can update them as needed.

### 3. Delete Students
Endpoint: `/students/delete/{id}`

This feature enables users to delete any student from the database. Upon confirmation, the specified student will be removed from the records.

### 4. View All Students
Endpoint: `/students/view`

Displays all students currently in the database. Students are represented as rectangles, with their attributes drawn in the form of a `<div>` or `<span>` tag.

## Technologies Used
- Spring Boot
- Thymeleaf (for HTML templates)
- Bootstrap (for styling)

## Contributors
- [Your Name]

## License
This project is licensed under the [MIT License](LICENSE).

