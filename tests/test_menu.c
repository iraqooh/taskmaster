#include "menu.h"
#include "task.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 100

void test_create_task_menu() {
    Task* tasks[MAX_TASKS];
    int task_count = 0;

    // simulating user input for creating a task
    freopen("test_input.txt", "w", stdout);
    printf("Test Task\n");
    printf("2024-08-12\n");
    printf("2\n");
    printf("Work\n");
    freopen("/dev/tty", "w", stdout);

    freopen("test_input.txt", "r", stdin);
    create_task_menu(tasks, &task_count);
    freopen("/dev/tty", "r", stdin);

    assert(task_count == 1);
    assert(strcmp(tasks[0]->name, "Test Task") == 0);
    assert(strcmp(tasks[0]->due_date, "2024-08-12") == 0);
    assert(tasks[0]->priority == HIGH);
    assert(strcmp(tasks[0]->category, "Work") == 0);

    delete_task(tasks[0]);
    remove("test_input.txt");
}

void test_view_tasks_menu() {
    Task* tasks[MAX_TASKS];
    int task_count = 0;

    tasks[task_count++] = create_task("Task 1", "2024-08-12", HIGH, "Work");

    // simulating view tasks output
    freopen("test_output.txt", "w", stdout);
    view_tasks_menu(tasks, task_count);
    freopen("/dev/tty", "w", stdout);

    FILE* file = fopen("test_output.txt", "r");
    assert(file != NULL);

    char buffer[256];
    fgets(buffer, sizeof(buffer), file);
    assert(strstr(buffer, "Task 1") != NULL);

    fclose(file);
    delete_task(tasks[0]);
    remove("test_output.txt");
}

int main() {
    test_create_task_menu();
    test_view_tasks_menu();
    printf("All menu tests passed!\n");
    return 0;
}
