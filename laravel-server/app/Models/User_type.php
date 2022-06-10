<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_type extends Model
{
    use HasFactory;

    protected $table = 'users_type';

    public function users()
    {
        return $this->hasMany(User::class, 'users_type_id', 'id');
    }
}
