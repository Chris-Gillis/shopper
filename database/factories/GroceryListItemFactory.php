<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroceryListItem>
 */
class GroceryListItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $coin = rand(0, 1);
        $food = $coin ? $this->faker->meatName() : $this->faker->vegetableName();
        return [
            'name' => $food,
            'amount' => strval($this->faker->randomFloat(2, 0, 100)),
            'is_checked' => false,
            'grocery_list_id' => 1,
            'created_at' => $this->faker->dateTimeInInterval('-6 months', '+0 months'),
            'updated_at' => $this->faker->dateTimeInInterval('+0 months', '+6 months'),
        ];
    }
}
