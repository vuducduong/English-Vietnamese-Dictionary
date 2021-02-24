<?php

namespace App\Providers;

use App\Repositories\Impl\VietnameseRepositoryImpl;
use App\Repositories\VietnameseRepository;
use App\Services\Impl\VietnameseServiceImpl;
use App\Services\VietnameseService;
use App\Repositories\EnglishRepository;
use App\Repositories\Impl\EnglishRepositoryImpl;
use App\Services\EnglishService;
use App\Services\Impl\EnglishServiceImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Repositories
        $this->app->singleton(
            VietnameseRepository::class,
            VietnameseRepositoryImpl::class
        );
        // Repositories
        $this->app->singleton(
            EnglishRepository::class,
            EnglishRepositoryImpl::class
        );
        // Services
        $this->app->singleton(
            VietnameseService::class,
            VietnameseServiceImpl::class
        );
        $this->app->singleton(
            EnglishService::class,
            EnglishServiceImpl::class
        );
    }


    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
