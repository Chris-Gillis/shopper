<?php

namespace Database\Seeders;

use App\Models\GroceryList;
use App\Models\GroceryListItem;
use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class GroceryListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groceryLists = GroceryList::factory()
            ->count(20)
            ->create();

        $groceryLists->each(function (GroceryList $list): void {
            GroceryListItem::factory()
                ->count(rand(2, 7))
                ->create([
                    'grocery_list_id' => $list->id,
                ]);
        });
    }
}
