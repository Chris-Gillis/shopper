<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Models\User;
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
        $user = User::find(Auth::id());
        $meals = $user->meals()->withCount('ingredients')->get();
        
        return Inertia::render('Meals', [
            'meals' => $meals,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return Inertia::render('MealDetail', [
            'meal' => $meal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meal $meal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meal $meal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        //
    }
}
