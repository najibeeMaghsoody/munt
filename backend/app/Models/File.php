<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'extension',
        'size',
   
    ];
    public $timestamps = false;

    public function categories()
    {
        return $this->hasMany(Categories::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transactions::class);
    }
    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }
}
