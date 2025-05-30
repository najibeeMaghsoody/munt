<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categories extends Model
{
  
    use HasFactory;

    protected $fillable = [ 'name' ,'user_id', 'file_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transactions::class);
    }

    public function budgets() {
        return $this->hasMany(Budget::class);
    }
}
