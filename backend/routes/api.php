<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IconsController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Authenticatie routes
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']); Route::post('/upload/image', [UploadController::class, 'uploadImage']);


// Categorie routes
Route::middleware('auth:api')->group(function () {
    // user routes
    Route::post('/update-profile-photo', [SettingController::class, 'updateProfilePhoto']);
    Route::post('/change-email', [SettingController::class, 'changeEmail']);
    Route::post('/change-password', [SettingController::class, 'changePassword']);
    //dashboard route
    Route::get('/dashboard', [UserController::class, 'userDashboard']);
    //charts route
    Route::get('/charts', [BudgetController::class, 'chart']);


    //Budgets Api
    Route::get('/budgets', [BudgetController::class, 'index']);
    Route::post('/budgets', [BudgetController::class, 'store']);
    Route::put('/budgets/{budget}', [BudgetController::class, 'update']);
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy']);
    //Image Api
   
    Route::post('/upload/image', [UploadController::class, 'uploadImage']);
    Route::get('/image', [UploadController::class, 'index']);
   
    
    //Categories Api
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    //Transactions Api
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy']);


});

