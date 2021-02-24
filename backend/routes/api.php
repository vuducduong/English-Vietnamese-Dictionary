<?php

use App\Http\Controllers\VietnameseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/vietnamese', 'VietnameseController@index')->name('vietnamese.all');
Route::get('/vietnamese/{id}', 'VietnameseController@show')->name('vietnamese.show');
Route::get('/english', 'EnglishController@index')->name('english.all');
Route::get('/english/{id}', 'EnglishController@show')->name('english.show');


Route::post('/translates',[VietnameseController::class,'foundWord']);
Route::post('/translate', 'EnglishController@findWord');

// jwt-open api
// Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');

// jwt-authenticate api
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');

    Route::post('/vietnamese', 'VietnameseController@store')->name('vietnamese.store');
    Route::put('/vietnamese/{id}', 'VietnameseController@update')->name('vietnamese.update');
    Route::delete('/vietnamese/{id}', 'VietnameseController@destroy')->name('vietnamese.destroy');
    Route::post('/vietnamese/search/{first_name}', 'VietnameseController@search')->name('vietnamese.search');
    // vietnames
    // english
    Route::post('/english', 'EnglishController@store')->name('english.store');
    Route::put('/english/{id}', 'EnglishController@update')->name('english.update');
    Route::delete('/english/{id}', 'EnglishController@destroy')->name('english.destroy');
    Route::post('/english/search/{first_name}', 'EnglishController@search')->name('english.search');
    //Route::get('closed', 'DataController@closed');
});
