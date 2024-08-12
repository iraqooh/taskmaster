#include "task.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

Task* create_task(const char* name, const char* due_date, Priority priority, const char* category) {
    Task* new_task = (Task*)malloc(sizeof(Task));
    if (new_task == NULL) {
        return NULL;
    }
    strcpy(new_task->name, name);
    strcpy(new_task->due_date, due_date);
    new_task->priority = priority;
    strcpy(new_task->category, category);
    new_task->completed = 0;
    return new_task;
}

void update_task(Task* task, const char* name, const char* due_date, Priority priority, const char* category) {
    if (task != NULL) {
        strcpy(task->name, name);
        strcpy(task->due_date, due_date);
        task->priority = priority;
        strcpy(task->category, category);
    }
}

void display_task(const Task* task) {
    if (task != NULL) {
        printf("Task: %s\n", task->name);
        printf("Due Date: %s\n", task->due_date);
        printf("Priority: %s\n", task->priority == HIGH ? "High" : (task->priority == MEDIUM ? "Medium" : "Low"));
        printf("Category: %s\n", task->category);
        printf("Status: %s\n", task->completed ? "Completed" : "Pending");
    }
}

void delete_task(Task* task) {
    if (task != NULL) {
        free(task);
    }
}
