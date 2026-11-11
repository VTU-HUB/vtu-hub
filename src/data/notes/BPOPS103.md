---
code: BPOPS103
title: Principles of Programming Using C
updated: 2026-11-12
textbook: "Reema Thareja, Computer Fundamentals and Programming in C (2nd Ed.)"
---

## Module 1 — Introduction to computers and C

> **In short:** a computer takes **input**, **processes** it and gives **output**. A C program is text that a **compiler** translates into machine code the computer can run. Every C program has a `main()` function, uses **variables** to store values, and talks to the user with `printf` and `scanf`.

```flow
Write source code (prog.c) -> Preprocessor -> Compiler -> Object file (prog.o) -> Linker (+ libraries) -> Executable -> Run
```

### Introduction to computers

A **computer** is an electronic device that accepts data, processes it according to instructions (a **program**), stores it and produces results.

Characteristics: **speed**, **accuracy**, **automation**, **diligence** (no tiredness), **versatility**, **memory**, but **no IQ** (it does only what it is told).

**Block diagram of a computer:**

```flow
Input unit -> Central processing unit (control unit + ALU + registers) -> Output unit
Central processing unit -> Memory unit (primary and secondary)
```

- **CPU:** the **control unit** directs operations; the **arithmetic logic unit (ALU)** does calculations and comparisons; **registers** are tiny, very fast storage inside the CPU.
- **Primary memory:** **RAM** (volatile, holds running programs and data) and **ROM** (non-volatile, holds start-up instructions).
- **Secondary memory:** hard disk, SSD, pen drive: large and permanent, but slower.

### Input and output devices

- **Input devices:** keyboard, mouse, scanner, microphone, webcam, touch screen, barcode reader, joystick.
- **Output devices:** monitor, printer (inkjet, laser, dot-matrix), speakers, projector, plotter.

### Designing efficient programs

Before coding, plan the solution:

- **Algorithm:** a finite, ordered list of clear steps that solves a problem. A good algorithm has **input**, **output**, **definiteness** (each step clear), **finiteness** (it ends) and **effectiveness** (each step is doable).
- **Flowchart:** a diagram of an algorithm. Standard symbols: oval (start/stop), parallelogram (input/output), rectangle (process), diamond (decision), arrows (flow).
- **Pseudocode:** an algorithm written in structured English, close to code but without syntax rules.

**Example algorithm: largest of two numbers**

1. Start.
2. Read a and b.
3. If a > b, print a; otherwise print b.
4. Stop.

**Program design approaches:** **top-down** (break the problem into smaller parts) and **bottom-up** (build small parts first and combine them).

**Types of errors:** **syntax errors** (break the language rules; found by the compiler), **logical errors** (the program runs but gives wrong results), **run-time errors** (such as division by zero) and **linker errors** (a function is missing).

### Introduction to C

C was developed by **Dennis Ritchie** at **Bell Labs** in **1972**, mainly to write the UNIX operating system.

Why C is popular:

- It is a **middle-level** language: high-level features plus low-level access to memory.
- **Portable**, **fast** and **efficient**.
- **Structured**: programs are built from functions.
- A small set of keywords (32 in C89) and a rich library.

### Structure of a C program

```c
/* Documentation section: what this program does */
#include <stdio.h>      /* preprocessor directive: header file */
#define PI 3.14159      /* symbolic constant */

int count = 0;          /* global declaration */

int main(void)          /* every program starts at main() */
{
    float r = 2.0f;     /* local declaration */
    printf("Area = %f\n", PI * r * r);
    return 0;           /* 0 tells the OS the program succeeded */
}
```

Sections: **documentation**, **preprocessor directives**, **global declarations**, the **main() function** (declarations and statements), and **user-defined functions**.

### Files used in a C program

| File | Extension | Contents |
|---|---|---|
| Source file | `.c` | The C code you write |
| Header file | `.h` | Declarations of library functions and macros (`stdio.h`, `math.h`) |
| Object file | `.o` or `.obj` | Machine code produced by the compiler, not yet linked |
| Executable file | `.exe` or no extension | The final runnable program |

### Compilers, compiling and executing C programs

- The **preprocessor** handles lines starting with `#`: it includes header files and replaces macros.
- The **compiler** checks syntax and translates C into object code.
- The **linker** joins the object code with library code (such as the code for `printf`) to make the executable.
- The **loader** puts the executable into memory to run it.

With GCC: `gcc prog.c -o prog` then `./prog`.

### Variables and constants

A **variable** is a named memory location whose value can change.

- **Naming rules:** letters, digits and underscore only; must not start with a digit; no spaces; not a keyword; case-sensitive (`sum` and `Sum` differ).
- **Declaration:** `int age;` **Initialisation:** `int age = 18;`

**Basic data types:**

| Type | Typical size | Example | Format specifier |
|---|---|---|---|
| `char` | 1 byte | `'A'` | `%c` |
| `int` | 4 bytes (at least 2) | `25` | `%d` |
| `float` | 4 bytes | `3.14f` | `%f` |
| `double` | 8 bytes | `3.14159` | `%lf` (scanf), `%f` (printf) |

Sizes depend on the compiler and machine; check with `sizeof`. **Qualifiers:** `short`, `long`, `signed`, `unsigned`.

A **constant** cannot change: integer (`10`), floating (`2.5`), character (`'a'`), string (`"hello"`). Declare with `const int MAX = 100;` or `#define MAX 100`.

### Input/output statements in C

- **printf** (formatted output): `printf("Sum = %d\n", sum);`
- **scanf** (formatted input): `scanf("%d", &n);` The `&` gives the variable's **address**, so scanf can store the value there.
- Escape sequences: `\n` newline, `\t` tab, `\\` backslash, `\"` double quote.
- Single-character I/O: `getchar()`, `putchar()`. String output: `puts()`.

```c
#include <stdio.h>
int main(void) {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("Sum = %d\n", a + b);
    return 0;
}
```

## Module 2 — Operators, decisions and loops

> **In short:** **operators** do arithmetic, compare values and combine conditions. **Decision statements** (`if`, `if-else`, `switch`) choose which code runs. **Loops** (`while`, `do-while`, `for`) repeat code. `break` leaves a loop early and `continue` skips to the next iteration.

```flow
for loop: Initialise -> Test condition -> True? Run body -> Update -> Test condition again
for loop: Test condition -> False? Exit loop
```

### Operators in C

| Category | Operators | Example |
|---|---|---|
| Arithmetic | `+ - * / %` | `7 / 2` is 3 (integer division); `7 % 2` is 1 |
| Relational | `< <= > >= == !=` | `a == b` gives 1 (true) or 0 (false) |
| Logical | `&&` (AND), `\|\|` (OR), `!` (NOT) | `a > 0 && b > 0` |
| Assignment | `= += -= *= /= %=` | `x += 5` means `x = x + 5` |
| Increment / decrement | `++ --` | `i++` (use, then add), `++i` (add, then use) |
| Conditional (ternary) | `?:` | `max = (a > b) ? a : b;` |
| Bitwise | `& \| ^ ~ << >>` | `5 & 3` is 1; `1 << 3` is 8 |
| Comma | `,` | `a = 1, b = 2;` |
| sizeof | `sizeof` | `sizeof(int)` |

**Pre- versus post-increment:** with `x = 5`, `y = x++` gives y = 5, x = 6; `y = ++x` gives y = 6, x = 6.

**Short-circuit evaluation:** in `a && b`, b is not evaluated if a is false; in `a || b`, b is not evaluated if a is true.

**Precedence (high to low, simplified):** `() [] -> .` → unary `! ~ ++ -- - (type) sizeof` → `* / %` → `+ -` → `<< >>` → `< <= > >=` → `== !=` → `&` → `^` → `|` → `&&` → `||` → `?:` → assignment → comma. Most binary operators are evaluated left to right; unary, conditional and assignment operators right to left.

### Type conversion and typecasting

- **Implicit conversion (type promotion):** in mixed expressions, the smaller type is converted to the larger: `int + float` becomes `float`. Assigning a float to an int **truncates** the fraction.
- **Explicit conversion (typecasting):** `(type) expression`.

```c
int a = 7, b = 2;
float r1 = a / b;          /* 3.0: integer division happens first */
float r2 = (float) a / b;  /* 3.5: a is converted before dividing */
```

### Decision control: conditional branching

- **if:** run a block only if the condition is true.
- **if-else:** choose one of two blocks.
- **else-if ladder:** test several conditions in order.
- **nested if:** an if inside another.
- **switch:** choose among many cases by an integer or character value.

```c
/* Grade from marks with an else-if ladder */
if (marks >= 90)      grade = 'O';
else if (marks >= 80) grade = 'A';
else if (marks >= 70) grade = 'B';
else                  grade = 'F';
```

```c
switch (op) {
    case '+': r = a + b; break;
    case '-': r = a - b; break;
    case '*': r = a * b; break;
    case '/': if (b != 0) r = a / b; else printf("Divide by zero\n"); break;
    default:  printf("Invalid operator\n");
}
```

Without `break`, execution **falls through** into the next case.

### Iterative statements (loops)

| Loop | Tests the condition | Runs at least once? | Best for |
|---|---|---|---|
| `while` | Before each iteration (entry-controlled) | No | Unknown number of repetitions |
| `do-while` | After each iteration (exit-controlled) | **Yes** | Menus, input validation |
| `for` | Before each iteration | No | A known number of repetitions |

```c
/* Sum of digits with while */
int n = 1234, sum = 0;
while (n > 0) {
    sum += n % 10;   /* last digit */
    n /= 10;         /* remove the last digit */
}
/* sum is 10 */
```

```c
/* Factorial with for */
long fact = 1;
for (int i = 1; i <= 5; i++)
    fact *= i;       /* 120 */
```

### Nested loops

A loop inside another loop. The inner loop runs completely for each iteration of the outer loop.

```c
/* Right-angled triangle of stars */
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++)
        printf("* ");
    printf("\n");
}
```

### break, continue and goto

- **break:** leaves the nearest loop (or switch) immediately.
- **continue:** skips the rest of the current iteration and goes to the next one.
- **goto label;** jumps to a labelled statement. It makes programs hard to follow, so avoid it.

```c
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  /* skip even numbers */
    if (i > 7) break;          /* stop after 7 */
    printf("%d ", i);          /* prints 1 3 5 7 */
}
```

## Module 3 — Functions and arrays

> **In short:** a **function** is a named block of code that does one job and can be called many times. Values are passed in as **parameters** and a result comes back with `return`. An **array** stores many values of the same type under one name, accessed by an **index** starting at 0.

```flow
main() calls function -> Arguments copied into parameters -> Function body runs -> return value -> Back in main() at the next statement
```

### Introduction to functions

Why use functions: **divide** a big problem into smaller parts, **reuse** code, make programs **easier to read, test and debug**.

- **Library functions:** come with C (`printf`, `sqrt`, `strlen`).
- **User-defined functions:** written by the programmer.

### Function declaration, definition and call

```c
#include <stdio.h>

int add(int a, int b);           /* declaration (prototype) */

int main(void) {
    int s = add(3, 4);           /* call: 3 and 4 are arguments */
    printf("%d\n", s);           /* 7 */
    return 0;
}

int add(int a, int b) {          /* definition: a and b are parameters */
    return a + b;                /* return statement */
}
```

- The **prototype** tells the compiler the return type and parameter types before the call.
- **Actual arguments** are the values in the call; **formal parameters** are the names in the definition.
- A function that returns nothing has return type `void`.

### Passing parameters to functions

- **Call by value:** a **copy** of the argument is passed. Changes inside the function do not affect the caller's variable. This is C's default.
- **Call by reference (using pointers):** the **address** is passed, so the function can change the caller's variable (see Module 4).

```c
void swap_wrong(int a, int b) { int t = a; a = b; b = t; }      /* no effect on caller */
void swap(int *a, int *b)     { int t = *a; *a = *b; *b = t; }  /* works */
/* call: swap(&x, &y); */
```

### Scope of variables

- **Block scope (local):** declared inside a block or function; visible only there.
- **File scope (global):** declared outside all functions; visible from the declaration to the end of the file.
- **Function prototype scope:** parameter names in a prototype.
- A local variable **hides** a global variable with the same name.

### Storage classes

| Storage class | Where stored | Default value | Scope | Lifetime |
|---|---|---|---|---|
| `auto` | Memory (stack) | Garbage | Local to block | Until the block ends |
| `register` | CPU register (if available) | Garbage | Local to block | Until the block ends |
| `static` | Memory | 0 | Local (or file, if global) | Whole program run |
| `extern` | Memory | 0 | Global (across files) | Whole program run |

A `static` local variable **keeps its value** between calls:

```c
void counter(void) {
    static int c = 0;   /* initialised once */
    c++;
    printf("%d ", c);   /* prints 1, then 2, then 3 on successive calls */
}
```

### Recursive functions

A **recursive** function calls itself. It needs a **base case** that stops the recursion, and each call must move toward the base case.

```c
long fact(int n) {
    if (n <= 1) return 1;        /* base case */
    return n * fact(n - 1);      /* recursive case */
}
```

```flow
fact(3) -> 3 * fact(2) -> 2 * fact(1) -> base case returns 1 -> 2 * 1 = 2 -> 3 * 2 = 6
```

Other classic examples: Fibonacci, GCD (Euclid: gcd(a, b) = gcd(b, a % b), gcd(a, 0) = a), Tower of Hanoi, power. Recursion uses the **stack** for every call; very deep recursion can overflow it.

### Arrays: declaration, access and storing values

An **array** is a fixed-size collection of elements of the **same type** in **consecutive memory**.

```c
int marks[5];                      /* declaration: 5 ints, index 0 to 4 */
int a[5] = {10, 20, 30, 40, 50};   /* initialisation */
int b[] = {1, 2, 3};               /* size 3 worked out by the compiler */
marks[0] = 90;                     /* store */
printf("%d", a[2]);                /* access: prints 30 */
```

- **Index starts at 0**; the last index is size − 1.
- C does **not check bounds**: `a[5]` here is outside the array and causes undefined behaviour.
- Address of element i = base address + i × sizeof(element).

**Reading and printing an array:**

```c
for (int i = 0; i < n; i++) scanf("%d", &a[i]);
for (int i = 0; i < n; i++) printf("%d ", a[i]);
```

### Operations on arrays

- **Traversal:** visit each element (sum, average, largest).
- **Insertion** at a position: shift elements right, then place the new value.
- **Deletion** at a position: shift elements left.
- **Searching:** **linear search** (check each element, O(n)) or **binary search** (on a **sorted** array: compare with the middle and discard half each time, O(log n)).
- **Sorting:** bubble sort, selection sort.
- **Merging** two arrays.

```c
/* Binary search on a sorted array */
int low = 0, high = n - 1, pos = -1;
while (low <= high) {
    int mid = (low + high) / 2;
    if (a[mid] == key)     { pos = mid; break; }
    else if (a[mid] < key) low = mid + 1;
    else                   high = mid - 1;
}
```

```c
/* Bubble sort (ascending) */
for (int i = 0; i < n - 1; i++)
    for (int j = 0; j < n - 1 - i; j++)
        if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }
```

### Passing arrays to functions

An array is passed by giving its name, which is the **address of its first element**. The function can therefore change the original array. Pass the size separately.

```c
int sum(int arr[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}
/* call: total = sum(a, 5); */
```

### Two-dimensional arrays

A **2-D array** is a table of rows and columns: `int m[3][4];` has 3 rows and 4 columns. It is stored **row by row** (row-major order).

```c
int m[2][3] = { {1, 2, 3}, {4, 5, 6} };
printf("%d", m[1][2]);   /* row 1, column 2: prints 6 */
```

**Operations:** reading and printing, sum of elements, **transpose**, **addition** (element by element, same size), **matrix multiplication**.

```c
/* Matrix multiplication: c (m x q) = a (m x n) * b (n x q) */
for (int i = 0; i < m; i++)
    for (int j = 0; j < q; j++) {
        c[i][j] = 0;
        for (int k = 0; k < n; k++)
            c[i][j] += a[i][k] * b[k][j];
    }
```

Multiplication is possible only when the number of columns of a equals the number of rows of b.

**Passing a 2-D array to a function:** the column size must be given: `void show(int m[][4], int rows);`

### Multidimensional arrays and applications

- **Multidimensional arrays:** more than two dimensions, such as `int x[2][3][4];` (2 tables of 3 rows and 4 columns).
- **Applications of arrays:** storing lists and tables, matrices, implementing other data structures (stacks, queues), lookup tables, sorting and searching, and strings (arrays of characters).

## Module 4 — Strings and pointers

> **In short:** a **string** in C is an array of characters ending with the **null character** `'\0'`. The `<string.h>` library gives functions to find the length, copy, join and compare strings. A **pointer** is a variable that holds a **memory address**; with pointers a function can change the caller's variables and work with arrays efficiently.

```flow
int x = 10 -> x stored at an address, say 1000 -> int *p = &x (p holds 1000) -> *p reads or writes x through its address
```

### Introduction to strings

```c
char name[10] = "VTU";     /* stored as 'V' 'T' 'U' '\0' */
char s[] = {'H', 'i', '\0'};
```

- The array must have room for the **`'\0'`** terminator, so a string of n characters needs n + 1 bytes.
- **Reading:** `scanf("%s", name);` stops at the first space. To read a whole line use `fgets(name, sizeof name, stdin);` (`gets` is unsafe and was removed from C).
- **Writing:** `printf("%s", name);` or `puts(name);`

### String taxonomy

Strings can be stored as:

- **fixed-length** strings, padded to a set size, or
- **variable-length** strings, either **length-controlled** (store the length) or **delimited** (end with a marker, which is how C uses `'\0'`).

### Operations on strings

| Function (`<string.h>`) | What it does |
|---|---|
| `strlen(s)` | Number of characters before `'\0'` |
| `strcpy(d, s)` | Copies s into d |
| `strncpy(d, s, n)` | Copies at most n characters |
| `strcat(d, s)` | Appends s to the end of d |
| `strcmp(a, b)` | 0 if equal; negative if a < b; positive if a > b (dictionary order) |
| `strrev(s)` | Reverses s (non-standard; not in every compiler) |
| `strupr(s)`, `strlwr(s)` | Upper / lower case (non-standard) |
| `strchr(s, c)`, `strstr(s, t)` | Find a character / substring |

Writing them yourself is a common exam question:

```c
int my_strlen(const char s[]) {
    int i = 0;
    while (s[i] != '\0') i++;
    return i;
}

void my_strcpy(char d[], const char s[]) {
    int i = 0;
    while ((d[i] = s[i]) != '\0') i++;
}
```

**Palindrome check:** compare characters from both ends moving inwards; if all match, it is a palindrome.

### Miscellaneous string and character functions

From `<ctype.h>`: `isalpha`, `isdigit`, `isalnum`, `isspace`, `isupper`, `islower`, `toupper`, `tolower`.

Conversion functions from `<stdlib.h>`: `atoi("123")` gives 123; `atof` gives a double.

### Arrays of strings

A 2-D character array stores several strings, one per row:

```c
char names[3][20] = {"Asha", "Ravi", "Meena"};
for (int i = 0; i < 3; i++) printf("%s\n", names[i]);
```

### Introduction to pointers

- Every variable has an **address** in memory. The **address-of operator `&`** gives it.
- A **pointer** variable stores an address. The **dereference (indirection) operator `*`** gives the value at that address.

```c
int x = 10;
int *p = &x;        /* p points to x */
printf("%d", *p);   /* 10 */
*p = 20;            /* changes x to 20 */
```

### Declaring pointer variables

`data_type *name;` The type tells what kind of value the pointer points to: `int *ip; char *cp; float *fp;`

- `printf("%p", (void *) p);` prints an address.
- Initialise pointers before use; an uninitialised pointer points to an unknown place.

### Types of pointers

- **Null pointer:** points to nothing: `int *p = NULL;` Always check before dereferencing.
- **Generic (void) pointer:** `void *vp;` can hold the address of any type, but must be cast before dereferencing.
- **Dangling pointer:** points to memory that has been freed or to a local variable that no longer exists.
- **Wild pointer:** an uninitialised pointer.
- **Pointer to pointer:** `int **pp = &p;` then `**pp` is x.

**Pointer arithmetic:** `p + 1` moves to the **next element**, that is, it adds sizeof(type) bytes. For an array, `a[i]` is the same as `*(a + i)`.

```c
int a[3] = {5, 6, 7};
int *p = a;            /* same as &a[0] */
printf("%d", *(p + 2)); /* 7 */
```

### Passing arguments to functions using pointers

Passing addresses lets a function **change the caller's variables** and **return more than one value**.

```c
void minmax(int a[], int n, int *min, int *max) {
    *min = *max = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < *min) *min = a[i];
        if (a[i] > *max) *max = a[i];
    }
}
/* call: minmax(arr, n, &lo, &hi); */
```

## Module 5 — Structures, unions, enumerations and files

> **In short:** a **structure** groups values of **different types** under one name (a student's name, USN and marks). A **union** is like a structure but all members **share the same memory**, so only one holds a value at a time. An **enum** gives names to integer constants. **Files** store data permanently: open with `fopen`, read or write, then `fclose`.

```flow
fopen("data.txt", mode) -> Check the pointer is not NULL -> Read or write (fscanf/fprintf, fgets/fputs, fgetc/fputc) -> Until EOF -> fclose(fp)
```

### Introduction to structures

```c
struct student {
    char usn[11];
    char name[30];
    float marks;
};                            /* note the semicolon */

struct student s1 = {"1AB23CS001", "Asha", 87.5f};
printf("%s %.1f", s1.name, s1.marks);   /* the dot operator accesses members */
```

- **typedef** gives a shorter name: `typedef struct student Student;` then `Student s2;`
- **Array of structures:** `struct student cls[60];` stores a whole class.
- **Nested structures:** a structure inside another, such as a `date` inside a `student`.
- **Pointer to a structure:** use the **arrow operator**: `struct student *p = &s1; p->marks = 90;` (same as `(*p).marks`).

### Structures and functions

A structure can be passed to a function:

- **by value** (the whole structure is copied; changes do not affect the caller), or
- **by reference** (pass a pointer; the function can change it and no large copy is made).

```c
void show(struct student s)       { printf("%s\n", s.name); }
void bonus(struct student *s)     { s->marks += 5; }
```

A function can also **return** a structure.

### Unions

```c
union value {
    int   i;
    float f;
    char  c;
};
```

- All members **share one memory location**, so the size of a union is the size of its **largest member** (plus any padding).
- Writing one member overwrites the others; use only the member that was last written.
- **Use:** saving memory when only one of several types is needed at a time.

| | Structure | Union |
|---|---|---|
| Memory | Each member has its own space | All members share one space |
| Size | Sum of members (plus padding) | Size of the largest member |
| Values held | All members at once | One member at a time |
| Keyword | `struct` | `union` |

### Unions inside structures

A common pattern: a structure holds a **tag** saying which union member is valid.

```c
struct item {
    int type;             /* 0 = int, 1 = float */
    union { int i; float f; } val;
};
```

### Enumerated data type

`enum` creates named integer constants, making code easier to read.

```c
enum day { MON, TUE, WED, THU, FRI, SAT, SUN };   /* MON = 0, TUE = 1, … */
enum level { LOW = 1, MEDIUM = 5, HIGH = 10 };
enum day today = WED;    /* today has value 2 */
```

### Introduction to files

Variables disappear when a program ends. **Files** store data **permanently** on disk.

- **Text files:** human-readable characters (lines end with newline).
- **Binary files:** raw bytes, exactly as in memory; smaller and faster, but not readable as text.

### Using files in C

```c
FILE *fp = fopen("marks.txt", "w");
if (fp == NULL) { printf("Cannot open file\n"); return 1; }
fprintf(fp, "%s %d\n", "Asha", 87);
fclose(fp);
```

**File modes:**

| Mode | Meaning | If the file does not exist |
|---|---|---|
| `"r"` | Read | Error (returns NULL) |
| `"w"` | Write (erases existing contents) | Creates it |
| `"a"` | Append to the end | Creates it |
| `"r+"` | Read and write | Error |
| `"w+"` | Read and write (erases) | Creates it |
| `"a+"` | Read and append | Creates it |

Add `b` for binary files: `"rb"`, `"wb"`.

### Reading and writing data files

| Purpose | Read | Write |
|---|---|---|
| One character | `fgetc(fp)` | `fputc(c, fp)` |
| One line (string) | `fgets(buf, n, fp)` | `fputs(s, fp)` |
| Formatted data | `fscanf(fp, …)` | `fprintf(fp, …)` |
| Blocks (binary) | `fread(ptr, size, count, fp)` | `fwrite(ptr, size, count, fp)` |

**Copy one file to another:**

```c
FILE *in = fopen("a.txt", "r"), *out = fopen("b.txt", "w");
if (in == NULL || out == NULL) return 1;
int ch;
while ((ch = fgetc(in)) != EOF)   /* ch is int, so EOF (-1) can be detected */
    fputc(ch, out);
fclose(in);
fclose(out);
```

### Detecting end of file

- Reading functions return a special value at the end: `fgetc` returns **EOF**, `fgets` returns **NULL**, `fscanf` returns **EOF** (or fewer items than requested).
- `feof(fp)` returns non-zero **after** a read has already tried to go past the end. So test the read's return value in the loop condition, as above, rather than writing `while (!feof(fp))`, which processes the last item twice.

## Exam tips

- **Programs carry most marks.** Practise writing, with comments: largest of three numbers, quadratic roots, simple calculator with switch, sum of digits, palindrome number, prime check, Fibonacci, factorial (loop and recursion), linear and binary search, bubble sort, matrix multiplication, string functions without the library, swap using pointers, structure of students with the topper's details, and a file copy.
- Always include `#include <stdio.h>`, `int main(void)` and `return 0;`, declare variables before use, and **check scanf's `&`**.
- Draw the **block diagram of a computer**, the **compilation steps** and a **flowchart** neatly; they are frequent short questions.
- **Compare** pairs: while vs do-while, break vs continue, call by value vs call by reference, structure vs union, text vs binary files, local vs global variables.
- For tracing questions, track each variable's value line by line, especially with `i++` vs `++i` and integer division.
