<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Icons extends Model
{
    protected $fillable = [
        'name',
        'extension',
    ];

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
