<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminProductsController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FavouritesController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Auth;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('me', 'me');
    Route::post('refresh', 'refresh');
});

Route::group(['prefix' => 'v1'], function () {

    Route::group(['prefix' => 'admin'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'products'], function () {
                Route::get('/{id?}', [ProductsController::class, 'getProduct']);
                Route::post('/add', [AdminProductsController::class, 'addProduct']);
                Route::patch('/update', [AdminUsersController::class, 'updateProduct']);
                Route::delete('/delete', [AdminUsersController::class, 'deleteProduct']);
            });
            Route::group(['prefix' => 'users'], function () {
                Route::get('/', [AdminProductsController::class, 'getAllUsers']);
                Route::post('/suspend/{id}', [AdminProductsController::class, 'suspendUser']);
                Route::post('/activate/{id}', [AdminProductsController::class, 'activateUser']);
            });
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'products'], function () {
                Route::get('/{id?}', [ProductsController::class, 'getProduct']);
                Route::get('/favourite', [FavouritesController::class, 'favouriteProduct']);
            });
            Route::group(['prefix' => 'users'], function () {
                Route::patch('/update', [UsersController::class, 'updateUser']);
            });
        });
    });
});
