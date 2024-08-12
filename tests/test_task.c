#include <stdio.h>
#include <assert.h>
#include <string.h>
#include "task.h"

void test_create_task() {
    Task* task = create_task("Test Task", "2024-08-12", HIGH, "Work");
    assert(task != NULL);
    assert(strcmp(task->name, "Test Task") == 0);
    assert(strcmp(task->due_date, "2024-08-12") == 0);
    assert(task->priority == HIGH);
    assert(strcmp(task->category, "Work") == 0);
    assert(task->completed == 0);
    delete_task(task);
}

void test_update_task() {
    Task* task = create_task("Test Task", "2024-08-12", HIGH, "Work");
    update_task(task, "Updated Task", "2024-08-13", MEDIUM, "Personal");
    assert(strcmp(task->name, "Updated Task") == 0);
    assert(strcmp(task->due_date, "2024-08-13") == 0);
    assert(task->priority == MEDIUM);
    assert(strcmp(task->category, "Personal") == 0);
    delete_task(task);
}

void test_display_task() {
    Task* task = create_task("Test Task", "2024-08-12", HIGH, "Work");
    display_task(task);
    delete_task(task);
}

int main() {
    test_create_task();
    test_update_task();
    test_display_task();
    printf("All task tests passed!\n");
    return 0;
}
