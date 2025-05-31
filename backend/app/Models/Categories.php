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
    public function file() {
        return $this->belongsTo(File::class);
    }
    public function getFileNameAttribute()
    {
        return $this->file ? $this->file->name : null;
    }
    public function getFileExtensionAttribute()
    {
        return $this->file ? $this->file->extension : null;
    }
    public function getFileSizeAttribute()
    {
        return $this->file ? $this->file->size : null;
    }
}
