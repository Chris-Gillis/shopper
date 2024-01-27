<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meals = Meal::whereUserId(Auth::id())->withCount('ingredients')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Meals', [
            'meals' => $meals,
            'new_route' => route('meals.store'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return Inertia::render('MealDetail', [
            'meal' => $meal,
            'new_link' => route('meals.store'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);

        Meal::create([
            'name' => $validated['name'],
            'user_id' => Auth::id(),
        ]);

        $meals = Meal::whereUserId(Auth::id())->withCount('ingredients')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Meals', [
            'meals' => $meals,
            'new_route' => route('meals.store'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        if ($meal->user_id !== Auth::id()) {
            abort(403);
        }

        $meal->delete();
    }
}
