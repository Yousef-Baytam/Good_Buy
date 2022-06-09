<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\Category;

class AdminProductsController extends Controller
{
    public function addProduct(Request $request)
    {
        Product::create([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'inventory_id' => Inventory::where('inventory_status', $request->inventory)->id,
            'categories_id' => Category::where('category', $request->category)->id
        ]);
    }

    public function updateProduct($id = null)
    {
    }

    public function deleteProduct($id = null)
    {
    }
}
