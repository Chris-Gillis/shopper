<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use App\Models\Meal;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $meals = Meal::factory()
            ->count(20)
            ->create();

        $meals->each(function (Meal $meal): void {
            Ingredient::factory()
                ->count(rand(2, 7))
                ->create([
                    'meal_id' => $meal->id,
                ]);
        });
    }
}
