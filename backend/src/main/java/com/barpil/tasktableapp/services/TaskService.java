package com.barpil.tasktableapp.services;

import com.barpil.tasktableapp.repositories.ProjectsRepository;
import com.barpil.tasktableapp.repositories.TaskAssignationsRepository;
import com.barpil.tasktableapp.repositories.TasksRepository;
import com.barpil.tasktableapp.repositories.UserRepository;
import com.barpil.tasktableapp.repositories.entities.Projects;
import com.barpil.tasktableapp.repositories.entities.TaskAssignations;
import com.barpil.tasktableapp.repositories.entities.Tasks;
import com.barpil.tasktableapp.repositories.entities.Users;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TasksRepository tasksRepository;
    private final ProjectsRepository projectsRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TasksRepository tasksRepository, TaskAssignationsRepository taskAssignationsRepository, ProjectsRepository projectsRepository, UserRepository userRepository) {
        this.tasksRepository = tasksRepository;
        this.projectsRepository = projectsRepository;
        this.userRepository = userRepository;
    }

    public List<Tasks> getTasksForProject(Long projectId){
        Projects project = projectsRepository.findById(projectId).orElseThrow(() -> new RuntimeException("PODANY PROJEKT NIE ISTNIEJE"));
        return tasksRepository.getTasksInProject(projectId);
    }

    public void createTask(Long projectToAddId, String taskName, String description){
        Projects project = projectsRepository.findById(projectToAddId).orElseThrow(() -> new RuntimeException("PODANY PROJEKT NIE ISTNIEJE"));
        Tasks task = Tasks.createTask(project, taskName, description);
        tasksRepository.save(task);
    }

    public void updateTask(Long taskId, String taskName, String description){
        Tasks task = tasksRepository.findById(taskId).orElseThrow(() -> new RuntimeException("PODANY TASK NIE ISTNIEJE"));
        task.setName(taskName);
        task.setDescription(description);
        tasksRepository.save(task);
    }

    public void removeTask(Long taskId){
        Tasks taskToRemove = tasksRepository.findById(taskId).orElseThrow(() -> new RuntimeException("PODANY TASK NIE ISTNIEJE"));
        tasksRepository.delete(taskToRemove);
    }

    public void updateUsersAssignToTask(Long taskId, List<String> userEmailList){
        if(userEmailList.isEmpty()) throw new RuntimeException("CANNOT ADD EMPTY LIST OF USERS TO TASK");
        Tasks task = tasksRepository.findById(taskId).orElseThrow(() -> new RuntimeException("TASK WITH taskId DOES NOT EXIST"));
        List<Users> usersToAdd = userRepository.getUsersByEmail(userEmailList);
        if(userEmailList.size()!=usersToAdd.size()) throw new RuntimeException("AT LEAST ONE OF SPECIFIED USERS DOES NOT EXIST");
        task.assignUsers(usersToAdd);
        tasksRepository.save(task);
    }


    public void changeTaskState(Long taskId, Tasks.TaskState state){
        Tasks task = tasksRepository.findById(taskId).orElseThrow(() -> new RuntimeException("TASK WITH taskId DOES NOT EXIST"));
        task.changeState(state);
        tasksRepository.save(task);
    }
}
