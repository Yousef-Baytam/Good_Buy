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

    public function updateProduct($id = null, Request $request)
    {
        $product = Product::find($id);
        Product::find($id)
            ->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'city_id' => $city_id,
                'dob' => $request->dob
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function deleteProduct($id = null)
    {
    }
}
