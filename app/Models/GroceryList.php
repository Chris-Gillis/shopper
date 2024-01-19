<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\GroceryList
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GroceryListItem> $items
 * @property-read int|null $items_count
 * @method static \Database\Factories\GroceryListFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList query()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryList whereUserId($value)
 * @mixin \Eloquent
 */
class GroceryList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'items',
        'name',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(GroceryListItem::class);
    }

    protected function route(): Attribute
    {
        return new Attribute(
            get: fn () => route('lists.show', $this)
        );
    }
}
