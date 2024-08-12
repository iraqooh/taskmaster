#include "menu.h"
#include "task.h"
#include "storage.h"
#include "utils.h"
#include <stdio.h>
#include <stdlib.h>

#define MAX_TASKS 100
#define FILENAME "data/tasks.csv"

void display_menu() {
    Task* tasks[MAX_TASKS];
    int task_count = load_tasks_from_file(FILENAME, tasks, MAX_TASKS);

    while (1) {
        printf("\nTaskmaster Menu\n");
        printf("1. Create Task\n");
        printf("2. View Tasks\n");
        printf("3. Update Task\n");
        printf("4. Delete Task\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");

        int choice;
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                create_task_menu(tasks, &task_count);
                break;
            case 2:
                view_tasks_menu(tasks, task_count);
                break;
            case 3:
                update_task_menu(tasks, task_count);
                break;
            case 4:
                delete_task_menu(tasks, &task_count);
                break;
            case 5:
                save_tasks_to_file(FILENAME, tasks, task_count);
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }
}

void create_task_menu(Task** tasks, int* task_count) {
    if (*task_count >= MAX_TASKS) {
        printf("Task limit reached. Cannot create more tasks.\n");
        return;
    }

    char name[MAX_NAME_LEN], due_date[MAX_DATE_LEN], category[MAX_CATEGORY_LEN];
    int priority;

    printf("Enter task name: ");
    scanf(" %[^\n]s", name);
    printf("Enter due date (YYYY-MM-DD): ");
    scanf(" %[^\n]s", due_date);
    printf("Enter priority (0: Low, 1: Medium, 2: High): ");
    scanf("%d", &priority);
    printf("Enter category: ");
    scanf(" %[^\n]s", category);

    tasks[*task_count] = create_task(name, due_date, (Priority)priority, category);
    (*task_count)++;
}

void view_tasks_menu(Task** tasks, int task_count) {
    for (int i = 0; i < task_count; i++) {
        printf("\nTask %d:\n", i + 1);
        display_task(tasks[i]);
    }
}

void update_task_menu(Task** tasks, int task_count) {
    int index;
    printf("Enter task number to update: ");
    scanf("%d", &index);
    index--;

    if (index < 0 || index >= task_count) {
        printf("Invalid task number.\n");
        return;
    }

    char name[MAX_NAME_LEN], due_date[MAX_DATE_LEN], category[MAX_CATEGORY_LEN];
    int priority;

    printf("Enter new task name: ");
    scanf(" %[^\n]s", name);
    printf("Enter new due date (YYYY-MM-DD): ");
    scanf(" %[^\n]s", due_date);
    printf("Enter new priority (0: Low, 1: Medium, 2: High): ");
    scanf("%d", &priority);
    printf("Enter new category: ");
    scanf(" %[^\n]s", category);

    update_task(tasks[index], name, due_date, (Priority)priority, category);
}

void delete_task_menu(Task** tasks, int* task_count) {
    int index;
    printf("Enter task number to delete: ");
    scanf("%d", &index);
    index--;

    if (index < 0 || index >= *task_count) {
        printf("Invalid task number.\n");
        return;
    }

    delete_task(tasks[index]);
    for (int i = index; i < *task_count - 1; i++) {
        tasks[i] = tasks[i + 1];
    }

    (*task_count)--;
}
