<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\Category;

class AdminProductsController extends Controller
{
    public function addProduct(Request $request) //form data??
    {
        Product::create([
            'product_name' => $request->product_name,
            'price' => $request->price,
            'inventory_id' => Inventory::where('inventory_status', $request->inventory)->get()[0]->id,
            'categories_id' => Category::where('category', $request->category)->get()[0]->id
        ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function updateProduct(Request $request, $id = null) //url encoded?
    {
        Product::find($id)
            ->update([
                'product_name' => $request->product_name,
                'price' => $request->price,
                'inventory_id' => Inventory::where('inventory_status', $request->inventory)->get()[0]->id,
                'categories_id' => Category::where('category', $request->category)->get()[0]->id
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function deleteProduct($id = null)
    {
        Product::find($id)->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
