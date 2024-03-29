<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ModulesController;
use App\Http\Controllers\UniformController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoginStudentController;
use App\Http\Controllers\AddEventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/student', StudentController::class);

Route::apiResource('/admin', AdminController::class);
Route::apiResource('/post', PostController::class);

// student registration and login route
Route::post('/student-registration', [AuthController::class, 'studentRegistration']);
Route::post('/student-login', [AuthController::class, 'studentLogin']);
Route::get('/student-registration/{student_id}', [AuthController::class, 'studentCheckId']);
Route::get('/student-registration/{email_ad}', [AuthController::class, 'studentEmailCheck']);

// admin registration and login route
Route::post('/admin-registration', [AuthController::class, 'adminRegistration']);
Route::post('/admin-login', [AuthController::class, 'adminLogin']);
Route::get('/admin-registration/{username}', [AuthController::class, 'adminUsernameCheck']);
Route::get('/admin-registration/{email_ad}', [AuthController::class, 'adminEmailCheck']);

// logout student or admin
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']); 
Route::post('/reset-password', [AuthController::class, 'resetPassword']); 

// Route::apiResource('/modules', ModulesController::class);
// Route::apiResource('/uniforms', UniformController::class);
// Route::apiResource('/books', BookController::class);

// Route::middleware('auth:sanctum')->get('/books/{yearLevel}/{course}', [BookController::class, 'getBooksForYearLevelAndCourse']);

// modules
Route::get('modules', [ModulesController::class, 'index']); 
Route::get('module/{id}', [ModulesController::class, 'show']); 
Route::post('addnew-modules', [ModulesController::class, 'store']); 
Route::put('modules-update/{id}', [ModulesController::class, 'update']); 
Route::delete('modules-delete/{id}', [ModulesController::class, 'destroy']); 
Route::get('/modules/{course}', [ModulesController::class, 'getModulessForCourse']);
Route::get('/modules/{course}/{year_level}', [ModulesController::class, 'getModulesForYearLevelAndCourse']);

// uniforms
Route::get('uniforms', [UniformController::class, 'index']); 
Route::get('uniform/{id}', [UniformController::class, 'show']); 
Route::post('addnew-uniforms', [UniformController::class, 'store']); 
Route::put('uniform-update/{id}', [UniformController::class, 'update']); 
Route::delete('uniform-delete/{id}', [UniformController::class, 'destroy']); 
Route::get('/uniforms/{course}', [UniformController::class, 'getUniformsForCourse']);
Route::get('/uniforms/{course}/{year_level}', [UniformController::class, 'getUniformsForYearLevelAndCourse']);

// books
Route::get('books', [BookController::class, 'index']); 
Route::get('book/{id}', [BookController::class, 'show']); 
Route::post('addnew-books', [BookController::class, 'store']); 
Route::put('books-update/{id}', [BookController::class, 'update']); 
Route::delete('booksdelete/{id}', [BookController::class, 'destroy']); 
Route::get('/books/{course}', [BookController::class, 'getBooksForCourse']);
Route::get('/books/{course}/{year_level}', [BookController::class, 'getBooksForYearLevelAndCourse']);

// dashboard
Route::get('/dashboard/registered-students-count', [DashboardController::class, 'registeredStudentsCount']);
Route::get('/dashboard/registered-students-per-department-count', [DashboardController::class, 'registeredStudentsPerDepartment']);
Route::get('/dashboard/registered-students-per-program-count', [DashboardController::class, 'registeredStudentsPerProgram']);
Route::get('/dashboard/gender-students-count', [DashboardController::class, 'gender']);
Route::get('/dashboard/age-students-count', [DashboardController::class, 'age']);
Route::get('/dashboard/login-data', [LoginStudentController::class, 'getLoginData']);
Route::post('/dashboard/insert-login-data', [LoginStudentController::class, 'insertLoginData']);

// test mail
Route::get('/test-email', function () {
    \Illuminate\Support\Facades\Mail::raw('Test email content', function ($message) {
        $message->to('vllnv.monica@gmail.com')->subject('Test email');
    });
    return 'Test email sent';
});

// profile
Route::get('/students/{id}', [StudentController::class, 'fetchStudentDetails']); 
Route::get('/admins/{id}', [AdminController::class, 'fetchAdminDetails']); 

//add event
Route::get('/events', [AddEventController::class, 'index']);
Route::post('/events', [AddEventController::class, 'store']);
Route::get('/events/{event}', [AddEventController::class, 'show']);
Route::put('/events/{event}', [AddEventController::class, 'update']);
Route::delete('/events/{event}', [AddEventController::class, 'destroy']);
//create post
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
Route::put('/posts/{id}', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);
Route::post('/posts/{id}/like', [PostController::class, 'like']);
