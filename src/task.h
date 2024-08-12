#ifndef TASK_H
#define TASK_H

#define MAX_NAME_LEN 100
#define MAX_DATE_LEN 20
#define MAX_CATEGORY_LEN 50

typedef enum {
    LOW,
    MEDIUM,
    HIGH
} Priority;

typedef struct {
    char name[MAX_NAME_LEN];
    char due_date[MAX_DATE_LEN];
    Priority priority;
    char category[MAX_CATEGORY_LEN];
    int completed;
} Task;

Task* create_task(const char* name, const char* due_date, Priority priority, const char* category);
void update_task(Task* task, const char* name, const char* due_date, Priority priority, const char* category);
void display_task(const Task* task);
void delete_task(Task* task);

#endif