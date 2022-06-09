<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
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

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function updateProduct($id = null, Request $request)
    {
        Product::find($id)
            ->update([
                'product_name' => $request->product_name,
                'price' => $request->price,
                'phone' => $request->phone,
                'inventory_id' => Inventory::where('inventory_status', $request->inventory)->id,
                'categories_id' => Category::where('category', $request->category)->id
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function deleteProduct($id = null)
    {
        if (Product::find($id)->delete())
            return response()->json([
                "status" => "Success",
            ], 200);

        return response()->json([
            "status" => "Product not found",
        ], 404);
    }
}
