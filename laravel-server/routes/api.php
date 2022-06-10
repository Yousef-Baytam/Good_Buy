<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\AdminProductsController;
use App\Http\Controllers\admin\AdminUsersController;
use App\Http\Controllers\admin\CategoriesController;
use App\Http\Controllers\user\UsersController;
use App\Http\Controllers\user\FavouritesController;
use App\Http\Controllers\products\ProductsController;
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
            Route::group(['middleware' => 'isAdmin'], function () {
                Route::group(['prefix' => 'products'], function () {
                    Route::get('/{id?}', [ProductsController::class, 'getProduct']);
                    Route::post('/add', [AdminProductsController::class, 'addProduct']);
                    Route::patch('/update/{id}', [AdminProductsController::class, 'updateProduct']);
                    Route::delete('/delete/{id}', [AdminProductsController::class, 'deleteProduct']);
                });
                Route::group(['prefix' => 'categories'], function () {
                    Route::get('/{id?}', [CategoriesController::class, 'getCategory']);
                    Route::post('/add', [CategoriesController::class, 'addCategory']);
                    Route::patch('/update/{id}', [CategoriesController::class, 'updateCategory']);
                    Route::delete('/delete/{id}', [CategoriesController::class, 'deleteCategory']);
                });
                Route::group(['prefix' => 'users'], function () {
                    Route::get('/', [AdminUsersController::class, 'getAllUsers']);
                    Route::post('/suspend/{id}', [AdminUsersController::class, 'suspendUser']);
                    Route::post('/activate/{id}', [AdminUsersController::class, 'activateUser']);
                });
            });
        });
    });
    Route::group(['prefix' => 'user'], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'products'], function () {
                Route::get('/{id?}', [ProductsController::class, 'getProduct']);
                Route::get('/favourite/all', [FavouritesController::class, 'getFavouriteProduct']);
                Route::post('/favourite/add/{id}', [FavouritesController::class, 'favouriteProduct']);
                Route::post('/favourite/remove/{id}', [FavouritesController::class, 'unfavouriteProduct']);
            });
            Route::group(['prefix' => 'users'], function () {
                Route::patch('/update', [UsersController::class, 'updateUser']);
            });
        });
    });
});
