<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'description',
        'type',
        'date',
        'budget_id',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
    public function budget()
{
    return $this->belongsTo(Budget::class);
}
}
