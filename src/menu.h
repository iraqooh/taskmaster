#ifndef MENU_H
#define MENU_H

#include "task.h"

void display_menu();
void create_task_menu(Task** tasks, int* task_count);
void view_tasks_menu(Task** tasks, int task_count);
void update_task_menu(Task** tasks, int task_count);
void delete_task_menu(Task** tasks, int* task_count);

#endif