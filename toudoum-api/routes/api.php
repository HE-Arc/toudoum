<?php

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

Route::middleware("auth:api")->get("/user", function (Request $request) {
    return $request->user();
});

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
 * User routes
 */
Route::apiResource('users', UserController::class);