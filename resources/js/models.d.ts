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
        created_at: string | null;
        updated_at: string | null;
        meals: Array<Models.Meal>;
        meals_count: number;
    }

    export interface Meal {
        id: number;
        user_id: number;
        created_at: string | null;
        updated_at: string | null;
        name: string;
        route: string;
        ingredients: Array<Models.Ingredient>;
        ingredients_count: number | null;
    }

    export interface Ingredient {
        id: number;
        meal_id: number;
        created_at: string | null;
        updated_at: string | null;
        name: string;
        amount: string;
        meal?: Models.Meal | null;
    }
}
