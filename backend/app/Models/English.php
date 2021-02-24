<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class English extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'spelling',
        'description',
    ];

    public function vietnameses()
    {
        return $this->belongsToMany(Vietnamese::class, 'english_vietnamese', 'english_id', 'vietnamese_id');
    }
}
