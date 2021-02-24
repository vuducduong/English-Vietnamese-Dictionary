<?php
/**
 * Created by PhpStorm.
 * User: thaotm
 * Date: 26/11/2020
 * Time: 00:11
 */
namespace App\Services\Impl;

use App\Repositories\VietnameseRepository;
use App\Services\VietnameseService;

class VietnameseServiceImpl implements VietnameseService
{
    protected $vietnameseRepository;


    public function __construct(VietnameseRepository $vietnameseRepository)
    {
        $this->vietnameseRepository = $vietnameseRepository;
    }

    public function getAll()
    {
        $vietnameses = $this->vietnameseRepository->getAll();

        return $vietnameses;
    }

    public function findById($id)
    {
        $vietnamese = $this->vietnameseRepository->findById($id);

        $statusCode = 200;
        if (!$vietnamese)
            $statusCode = 404;

        $data = [
            'statusCode' => $statusCode,
            'vietnameses' => $vietnamese
        ];

        return $data;
    }

    public function create($request)
    {
        $vietnamese = $this->vietnameseRepository->create($request);

        $statusCode = 201;
        if (!$vietnamese)
            $statusCode = 500;

        $data = [
            'statusCode' => $statusCode,
            'vietnameses' => $vietnamese
        ];

        return $data;
    }

    public function update($request, $id)
    {
        $oldvietnamese = $this->vietnameseRepository->findById($id);

        if (!$oldvietnamese) {
            $newvietnamese = null;
            $statusCode = 404;
        } else {
            $newvietnamese = $this->vietnameseRepository->update($request, $oldvietnamese);
            $statusCode = 200;
        }

        $data = [
            'statusCode' => $statusCode,
            'vietnameses' => $newvietnamese
        ];
        return $data;
    }

    public function destroy($id)
    {
        $vietnamese = $this->vietnameseRepository->findById($id);

        $statusCode = 404;
        $message = "Data not found";
        if ($vietnamese) {
            $this->vietnameseRepository->destroy($vietnamese);
            $vietnamese->englishs()->detach();

            $statusCode = 200;
            $message = "Delete success!";
        }

        $data = [
            'statusCode' => $statusCode,
            'message' => $message
        ];
        return $data;
    }
}
