<?php

namespace App\Http\Controllers;

use App\Models\English;
use App\Models\Vietnamese;
use App\Services\VietnameseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VietnameseController extends Controller
{
    protected $vietnameseService;

    public function __construct(VietnameseService $vietnameseService)
    {
        $this->vietnameseService = $vietnameseService;
    }

    public function search(Request $request)
    {
        $vietnameses = Vietnamese::where('first_name', 'like', '%' . $request->first_name . '%')->get();
        return response()->json($vietnameses, 200);
    }

    public function index()
    {
        //return csrf_token();
        // KFRLlnMMCdyv08LxeM9w01pvBvKcMZDPjS2doOQ5

        $vietnameses = $this->vietnameseService->getAll();
        return response()->json($vietnameses, 200);
    }

    public function show($id)
    {
        $dataVietnamese = $this->vietnameseService->findById($id);

        return response()->json($dataVietnamese['vietnameses'], $dataVietnamese['statusCode']);
    }

    public function store(Request $request)
    {
        $dataVietnamese = $this->vietnameseService->create($request->all());

        // foreach (json_decode($request->english, true) as $vn) {
        //     English::find($vn)->vietnameses()->attach($dataVietnamese['vietnameses']->id);
        // }
        return response()->json($dataVietnamese['vietnameses'], $dataVietnamese['statusCode']);

    }

    public function update(Request $request, $id)
    {
        $dataVietnamese = $this->vietnameseService->update($request->all(), $id);

        return response()->json($dataVietnamese['vietnameses'], $dataVietnamese['statusCode']);
    }

    public function destroy($id)
    {
        $dataVietnamese = $this->vietnameseService->destroy($id);

        return response()->json($dataVietnamese['message'], $dataVietnamese['statusCode']);
    }
    public function foundWord(Request $request)
    {
        $word = $request->search;
        $data = English::whereHas('vietnameses', function ($q) use ($word) {
            $q->where("vietnameses.name", '=', $word);
        })->get();
        return response()->json($data,200);
    }
}

