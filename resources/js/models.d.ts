/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace Models {
    export interface User {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string;
        updated_at: string;
    }

    export interface Meal {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        route: string;
        ingredients: Models.Ingredient[];
    }

    export interface Ingredient {
        id: number;
        meal_id: number;
        created_at: string;
        updated_at: string;
        name: string;
        amount: string;
    }

    export interface GroceryList {
        id: number;
        name: string;
        user_id: number;
        created_at: string;
        updated_at: string;
        route: string;
        items: Models.GroceryListItem[];
    }

    export interface GroceryListItem {
        id: number;
        grocery_list_id: number;
        created_at: string;
        updated_at: string;
        name: string;
        amount: string;
        is_checked: boolean;
    }
}
