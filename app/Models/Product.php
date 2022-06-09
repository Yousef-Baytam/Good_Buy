<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    public function inventory()
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'id');
    }

    public function categories()
    {
        return $this->belongsTo(Category::class, 'categories_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
