<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'budget',
        'start_date',
        'end_date',
        'recurrence',
        'name',
    ];                                                       

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function transactions() {
    return $this->hasMany(Transactions::class);
}
    public function category() {
        return $this->belongsTo(Categories::class);
    }
 
}
