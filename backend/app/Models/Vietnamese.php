<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vietnamese extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'spelling',
        'description',
    ];

    public function englishs()
    {
        return $this->belongsToMany(English::class, 'english_vietnamese', 'vietnamese_id', 'english_id');
    }
}
