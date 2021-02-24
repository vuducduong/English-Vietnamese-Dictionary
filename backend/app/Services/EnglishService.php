<?php
/**
 * Created by PhpStorm.
 * User: thaotm
 * Date: 26/11/2020
 * Time: 00:10
 */
namespace App\Services;

interface EnglishService
{
    public function getAll();
    public function findById($id);
    public function create($request);
    public function update($request, $id);
    public function destroy($id);
}
