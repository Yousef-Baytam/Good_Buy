<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    public function getCategory($id = null)
    {
        if ($id) {
            $cat = Category::find($id);
        } else {
            $cat = Category::all();
        }

        return response()->json([
            "status" => "Success",
            "res" => $cat
        ], 200);
    }

    public function addCategory(Request $request)
    {
        $cat = new Category;
        $cat->category = $request->category;
        $cat->save();

        return response()->json([
            "status" => "Success",
            "res" => $cat
        ], 200);
    }

    public function updateCategory(Request $request, $id = null)
    {
        Category::find($id)
            ->update([
                'category' => $request->category
            ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function deleteCategory($id = null)
    {
        Category::find($id)->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
