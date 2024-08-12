#include "storage.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "task.h"

void save_tasks_to_file(const char* filename, Task** tasks, int task_count) {
    FILE* file = fopen(filename, "w");
    if (file == NULL) {
        perror("Error opening file for writing");
        return;
    }

    for (int i = 0; i < task_count; i++) {
        fprintf(file, "%s,%s,%d,%s,%d\n", tasks[i]->name, tasks[i]->due_date, tasks[i]->priority, tasks[i]->category, tasks[i]->completed);
    }

    fclose(file);
}

int load_tasks_from_file(const char* filename, Task** tasks, int max_tasks) {
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening file for reading");
        return 0;
    }

    char buffer[256];
    int task_count = 0;
    while (fgets(buffer, sizeof(buffer), file) != NULL && task_count < max_tasks) {
        Task* task = (Task*)malloc(sizeof(Task));
        sscanf(buffer, "%[^,],%[^,],%d,%[^,],%d", task->name, task->due_date, (int*)&task->priority, task->category, &task->completed);
        tasks[task_count++] = task;
    }

    fclose(file);
    return task_count;
}
