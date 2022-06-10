<?php

namespace App\Http\Controllers\products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductsController extends Controller
{
    public function getProduct($id = null)
    {
        if ($id) {
            $products = Product::find($id);
        } else {
            $products = Product::all();
        }
        if ($products)
            foreach ($products as $product)
                $product->category = Product::find($product->id)->categories;

        return response()->json([
            "status" => "Success",
            "res" => $products
        ], 200);
    }
}
