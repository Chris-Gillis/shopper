<?php

namespace App\Http\Controllers;

use App\Models\GroceryList;
use App\Models\Meal;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ListController extends Controller
{
    public function index()
    {
        $lists = GroceryList::whereUserId(Auth::id())->withCount('items')->get();
        
        return Inertia::render('Lists', [
            'lists' => $lists,
            'new_route' => route('lists.create'),
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateList', [
            'meals' => Meal::whereUserId(Auth::id())->with('ingredients')->get(),
        ]);
    }
}
