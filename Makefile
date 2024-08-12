CC = gcc
CFLAGS = -Wall -Werror

OBJ = obj/main.o obj/task.o obj/storage.o obj/menu.o obj/utils.o

taskmaster: $(OBJ)
	$(CC) $(CFLAGS) -o bin/taskmaster $(OBJ)

obj/main.o: src/main.c
	$(CC) $(CFLAGS) -c src/main.c -o obj/main.o

obj/task.o: src/task.c
	$(CC) $(CFLAGS) -c src/task.c -o obj/task.o

obj/storage.o: src/storage.c
	$(CC) $(CFLAGS) -c src/storage.c -o obj/storage.o

obj/menu.o: src/menu.c
	$(CC) $(CFLAGS) -c src/menu.c -o obj/menu.o

obj/utils.o: src/utils.c
	$(CC) $(CFLAGS) -c src/utils.c -o obj/utils.o

tests: test_task test_menu test_storage

test_task: obj/task.o tests/obj/test_task.o
	$(CC) $(CFLAGS) -mconsole -o tests/bin/test_task obj/task.o tests/obj/test_task.o

tests/obj/test_task.o: tests/test_task.c
	$(CC) $(CFLAGS) -Isrc -c tests/test_task.c -o tests/obj/test_task.o

test_menu: obj/task.o obj/menu.o obj/storage.o tests/obj/test_menu.o
	$(CC) $(CFLAGS) -mconsole -o tests/bin/test_menu obj/task.o obj/menu.o obj/storage.o tests/obj/test_menu.o

tests/obj/test_menu.o: tests/test_menu.c
	$(CC) $(CFLAGS) -Isrc -c tests/test_menu.c -o tests/obj/test_menu.o

test_storage: obj/task.o obj/menu.o obj/storage.o tests/obj/test_menu.o
	$(CC) $(CFLAGS) -mconsole -o tests/bin/test_storage obj/task.o obj/menu.o obj/storage.o tests/obj/test_menu.o

tests/obj/test_storage.o: tests/test_storage.c
	$(CC) $(CFLAGS) -Isrc -c tests/test_storage.c -o tests/obj/test_storage.o

clean:
	rm -f obj/*.o tests/obj/*.o bin/taskmaster tests/bin/test_task tests/bin/test_menu
