package com.barpil.tasktableapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TaskTableAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskTableAppApplication.class, args);

    }

}
