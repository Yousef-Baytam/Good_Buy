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

        return response()->json([
            "status" => "Success",
            "res" => $products
        ], 200);
    }
}
