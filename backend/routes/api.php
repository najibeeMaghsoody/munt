<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IconsController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Authenticatie routes
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/dashboard', [UserController::class, 'userDashboard']);
Route::post('/logout', [UserController::class, 'logout']);

// Categorie routes
Route::middleware('auth:api')->group(function () {
    //Budgets Api
    Route::get('/budgets', [BudgetController::class, 'index']);
    Route::post('/budgets', [BudgetController::class, 'store']);
    Route::put('/budgets/{budget}', [BudgetController::class, 'update']);
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy']);
    //Icons Api
   
    Route::get('/icons', [IconsController::class, 'index']);
    Route::post('/icons', [IconsController::class, 'store']);
    Route::put('/icons/{icon}', [IconsController::class, 'update']);
    Route::delete('/icons/{icon}', [IconsController::class, 'destroy']);
    //Categories Api
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    //Transactions Api
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy']);

});

