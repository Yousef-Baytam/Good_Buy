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

        return response()->json([
            "status" => "Success",
            "restos" => $users
        ], 200);
    }

    public function suspendUser($id)
    {
        $users = User::all();

        return response()->json([
            "status" => "Success",
            "restos" => $users
        ], 200);
    }

    public function activateUser($id)
    {
    }
}
