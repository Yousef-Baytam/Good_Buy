<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminUsersController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();

        foreach ($users as $i) {
            $i->city = User::find($i->id)->cities;
        }
        return response()->json([
            "status" => "Success",
            "res" => $users
        ], 200);
    }

    public function suspendUser($id)
    {
        $users = User::find($id)->update(['status' => 'suspended']);

        return response()->json([
            "status" => "Success",
            "res" => $users
        ], 200);
    }

    public function activateUser($id)
    {
        $users = User::find($id)->update(['status' => 'active']);

        return response()->json([
            "status" => "Success",
            "res" => $users
        ], 200);
    }
}
