<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\City;

class UsersController extends Controller
{
    public function updateUser(Request $request)
    {
        User::find(Auth::user()->id)
            ->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'city_id' => City::where('city_name', $request->city)->get()[0]->id
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function updateImage(Request $request)
    {
        User::find(Auth::user()->id)
            ->update([
                'profile_pic' => $request->profile_pic,
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
