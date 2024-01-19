<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GroceryListItem
 *
 * @property int $id
 * @property int $grocery_list_id
 * @property string $name
 * @property string $amount
 * @property int $is_checked
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\GroceryListItemFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereGroceryListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereIsChecked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GroceryListItem whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GroceryListItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'is_checked',
        'grocery_list_id',
    ];

    public function list(): BelongsTo
    {
        return $this->belongsTo(GroceryList::class);
    }
}
