<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Ingredient
 *
 * @property int $id
 * @property int $meal_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereMealId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereUpdatedAt($value)
 * @property string $amount
 * @property-read \App\Models\Meal $meal
 * @method static \Illuminate\Database\Eloquent\Builder|Ingredient whereAmount($value)
 * @mixin \Eloquent
 */
class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function meal(): BelongsTo
    {
        return $this->belongsTo(Meal::class);
    }
}
