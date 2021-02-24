<?php
/**
 * Created by PhpStorm.
 * User: thaotm
 * Date: 26/11/2020
 * Time: 00:07
 */
namespace App\Repositories\Impl;

use App\Models\Vietnamese;
use App\Repositories\VietnameseRepository;
use App\Repositories\Eloquent\EloquentRepository;

class VietnameseRepositoryImpl extends EloquentRepository implements VietnameseRepository
{
    /**
     * get Model
     * @return string
     */
    public function getModel()
    {
        $model = Vietnamese::class;
        return $model;
    }
}
