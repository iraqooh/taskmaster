#include <stdio.h>
#include "storage.h"
#include "task.h"
#include <assert.h>
#include <string.h>

void test_save_and_load_tasks() {
    Task* tasks[2];
    tasks[0] = create_task("Task 1", "2024-08-12", HIGH, "Work");
    tasks[1] = create_task("Task 2", "2024-08-13", LOW, "Personal");

    save_tasks_to_file("tests/test_tasks.csv", tasks, 2);

    Task* loaded_tasks[2];
    int task_count = load_tasks_from_file("test_tasks.csv", loaded_tasks, 2);

    assert(task_count == 2);
    assert(strcmp(loaded_tasks[0]->name, "Task 1") == 0);
    assert(strcmp(loaded_tasks[1]->name, "Task 2") == 0);

    delete_task(loaded_tasks[0]);
    delete_task(loaded_tasks[1]);
    delete_task(tasks[0]);
    delete_task(tasks[1]);

    // Clean up test file
    remove("test_tasks.csv");
}

int main() {
    test_save_and_load_tasks();
    printf("All storage tests passed!\n");
    return 0;
}
