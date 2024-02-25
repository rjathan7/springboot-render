package _om6.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import _om6.demo.models.Student;
import _om6.demo.models.StudentRepository;

import jakarta.servlet.http.HttpServletResponse;

@Controller
public class StudentsController {

    @Autowired
    private StudentRepository studentRepo;
    @GetMapping("/students/view")
    public String getAllStudents(Model model) {
        System.out.println("Getting all users");
        // get all users from database
        List<Student> students = studentRepo.findAll();
        // end of database call
        model.addAttribute("stu", students);
        return "students/showAll";
    }

    @PostMapping("/students/add")
    public String addStudent(@RequestParam Map<String, String> newstudent, HttpServletResponse response) {
        System.out.println("ADD student");
        String newName = newstudent.get("name");
        int newWeight = Integer.parseInt(newstudent.get("weight"));
        int newHeight = Integer.parseInt(newstudent.get("height"));
        String newHairColor = newstudent.get("hair-color");
        double newGpa = Double.parseDouble(newstudent.get("gpa"));
        studentRepo.save(new Student(newName, newWeight, newHeight, newHairColor, newGpa));
        response.setStatus(201);
        return "redirect:/students/view";
    }

    @GetMapping("/students/edit/{id}")
    public String editStudent(@PathVariable int id, Model model) {
        List<Student> students = studentRepo.findBySid(id);
        
        if (!students.isEmpty()) {
            Student student = students.get(0);
            model.addAttribute("student", student);
            return "students/editStudent";
        } else {
            // Handle not found case
            return "redirect:/students/view";
        }
    }
    
    @PostMapping("/students/update")
    public String updateStudent(@RequestParam Map<String, String> updatedStudent, HttpServletResponse response) {
        int sameSid = Integer.parseInt(updatedStudent.get("sid"));
        String newName = updatedStudent.get("name");
        int newWeight = Integer.parseInt(updatedStudent.get("weight"));
        int newHeight = Integer.parseInt(updatedStudent.get("height"));
        String newHairColor = updatedStudent.get("hair-color");
        double newGpa = Double.parseDouble(updatedStudent.get("gpa"));

        List<Student> students = studentRepo.findBySid(sameSid);

        if (!students.isEmpty()) {
            Student student = students.get(0);
            student.setName(newName);
            student.setWeight(newWeight);
            student.setHeight(newHeight);
            student.setHairColor(newHairColor);
            student.setGpa(newGpa);
            studentRepo.save(student);

            response.setStatus(200);
            return "redirect:/students/view";
        } 
        else {
            // Handle not found case
            response.setStatus(404);
            return "redirect:/students/view";  
        }
    }

    @SuppressWarnings("null")
    @GetMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable int id, HttpServletResponse response) {
        List<Student> students = studentRepo.findBySid(id);

        if (!students.isEmpty()) {
            Student student = students.get(0);
            studentRepo.delete(student);

            response.setStatus(200);
            return "redirect:/students/view";
        } else {
            // Handle not found case
            response.setStatus(404);
            return "redirect:/students/view";
        }
    }

}
