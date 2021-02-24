<?php
/**
 * Created by PhpStorm.
 * User: thaotm
 * Date: 26/11/2020
 * Time: 00:01
 */
namespace App\Repositories;

interface Repository
{
    public function getAll();
    public function findById($id);
    public function create($data);
    public function update($data, $object);
    public function destroy($object);
}
