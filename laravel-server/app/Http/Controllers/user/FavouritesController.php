<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favourite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FavouritesController extends Controller
{
    public function getFavouriteProduct()
    {
        $user_id = Auth::user()->id;
        $products = User::find($user_id)->products;

        return response()->json([
            "status" => "Success",
            "res" => $products
        ], 200);
    }

    public function favouriteProduct($id)
    {
        Favourite::create([
            'users_id' => Auth::user()->id,
            'products_id' => $id
        ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function unfavouriteProduct($id)
    {
        Favourite::where([
            [
                'users_id', Auth::user()->id
            ],
            [
                'products_id', $id
            ]
        ])->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
