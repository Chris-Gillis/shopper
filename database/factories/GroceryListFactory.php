<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroceryList>
 */
class GroceryListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'created_at' => $this->faker->dateTimeInInterval('-6 months', '+0 months'),
            'updated_at' => $this->faker->dateTimeInInterval('+0 months', '+6 months'),
        ];
    }
}
