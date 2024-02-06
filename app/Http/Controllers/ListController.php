<?php

namespace App\Http\Controllers;

use App\Models\GroceryList;
use App\Models\Ingredient;
use App\Models\Meal;
use Illuminate\Http\Request;
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

    public function show(GroceryList $list)
    {
        return Inertia::render('ListDetail', [
            'list' => $list,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'meal_ids' => 'required|array',
        ]);

        $list = GroceryList::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
        ]);

        $ingredients = Ingredient::whereIn('meal_id', $request->meal_ids)->get();
        foreach ($ingredients as $ingredient) {
            $list->items()->create([
                'name' => $ingredient->name,
                'amount' => $ingredient->amount,
            ]);
        }

        return redirect()->route('lists.show', $list);
    }
}
