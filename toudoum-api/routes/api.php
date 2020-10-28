<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkbookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * State routes
 */
Route::get("state", function () {
    return [
        "state" => "Server is running ! Toudoum is awesome !",
        "date" => now()
    ];
});

/**
 * Authentification routes
 */
Route::group(['prefix' => 'auth'], function(){
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['middleware' => 'auth:api'], function () {
    /**
     * Authentification routes
     */
    Route::get('user', [AuthController::class, 'user']);
    Route::get('logout', [AuthController::class, 'logout']);
    /**
     * User routes
     */
    Route::apiResource('users', UserController::class);
    /**
     * Task routes
     */
    Route::apiResource("tasks", TaskController::class);
    /**
     * Workbook routes
     */
    Route::apiResource('workbooks', WorkbookController::class);
    /**
     * Group routes
     */
    Route::apiResource('groups', GroupController::class);
    
});


