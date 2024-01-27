<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IngredientController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Meal $meal)
    {
        $validated = $request->validate([
            'name' => 'required',
            'amount' => 'required',
        ]);

        Ingredient::create([
            'name' => $validated['name'],
            'amount' => $validated['amount'],
            'meal_id' => $meal->id,
        ]);
    }   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal, Ingredient $ingredient)
    {
        if ($meal->user_id !== Auth::id()) {
            abort(403);
        }

        $ingredient->delete();
    }
}
