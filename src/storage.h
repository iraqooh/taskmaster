#ifndef STORAGE_H
#define STORAGE_H

#include "task.h"

void save_tasks_to_file(const char* filename, Task** tasks, int task_count);
int load_tasks_from_file(const char* filename, Task** tasks, int max_tasks);

#endif