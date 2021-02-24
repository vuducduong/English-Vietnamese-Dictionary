<?php

namespace App\Http\Controllers;

use App\Models\English;
use App\Models\Vietnamese;
use App\Services\EnglishService;
use Illuminate\Http\Request;

class EnglishController extends Controller
{
    protected $englishService;

    public function __construct(EnglishService $englishService)
    {
        $this->englishService = $englishService;
    }

    public function findWord(Request $request)
    {
        $word = $request->word;
        $data = Vietnamese::whereHas("englishs", function (\Illuminate\Database\Eloquent\Builder $builder) use ($word) {
            $builder->where('englishes.name', '=', $word);
        })->get();
        return response()->json($data, 200);
    }

    public function search(Request $request)
    {
        $englishs = English::where('first_name', 'like', '%' . $request->first_name . '%')->get();
        return response()->json($englishs, 200);
    }

    public function index()
    {
        //return csrf_token();
        // KFRLlnMMCdyv08LxeM9w01pvBvKcMZDPjS2doOQ5

        $englishs = $this->englishService->getAll();
        return response()->json($englishs, 200);
    }

    public function show($id)
    {
        $dataEnglish = $this->englishService->findById($id);

        return response()->json($dataEnglish['englishs'], $dataEnglish['statusCode']);
    }

    public function store(Request $request)
    {
        $dataEnglish = $this->englishService->create($request->all());
        foreach (json_decode($request->vietnamese, true) as $vn) {
            Vietnamese::find($vn)->englishs()->attach($dataEnglish['englishs']->id);
        }
        return response()->json($dataEnglish['englishs'], $dataEnglish['statusCode']);
    }

    public function update(Request $request, $id)
    {
        $dataEnglish = $this->englishService->update($request->all(), $id);
        foreach (json_decode($request->vietnamese, true) as $vn) {
            Vietnamese::find($vn)->englishs()->attach($id);
        }
        return response()->json($dataEnglish['englishs'], $dataEnglish['statusCode']);
    }

    public function destroy($id)
    {
        $dataEnglish = $this->englishService->destroy($id);

        return response()->json($dataEnglish['message'], $dataEnglish['statusCode']);
    }
}
