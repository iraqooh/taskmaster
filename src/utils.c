#include "utils.h"
#include <stdio.h>
#include <string.h>

int is_valid_date(const char* date) {
    // validation for YYYY-MM-DD format
    if (strlen(date) != 10) return 0;
    if (date[4] != '-' || date[7] != '-') return 0;
    return 1;
}