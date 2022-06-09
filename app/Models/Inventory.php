<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';

    public function Product()
    {
        return $this->hasMany(Product::class, 'inventory_id', 'id');
    }
}
