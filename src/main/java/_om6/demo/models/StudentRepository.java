package _om6.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    List<Student> findByName(String name);
    List<Student> findByGpa(float gpa);
    List<Student> findByHeight(int height);
    List<Student> findByWeight(int weight);
    List<Student> findBySid(int sid);
}
