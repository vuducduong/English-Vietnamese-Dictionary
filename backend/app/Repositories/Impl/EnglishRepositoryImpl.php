<?php
/**
 * Created by PhpStorm.
 * User: thaotm
 * Date: 26/11/2020
 * Time: 00:07
 */
namespace App\Repositories\Impl;

use App\Models\English;
use App\Repositories\EnglishRepository;
use App\Repositories\Eloquent\EloquentRepository;

class EnglishRepositoryImpl extends EloquentRepository implements EnglishRepository
{
    /**
     * get Model
     * @return string
     */
    public function getModel()
    {
        $model = English::class;
        return $model;
    }
}
