<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grocery_list_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('grocery_list_id');
            $table->string('name');
            $table->string('amount');
            $table->boolean('is_checked')->default(false);
            $table->timestamps();

            $table->foreign('grocery_list_id')
                ->references('id')
                ->on('grocery_lists')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grocery_list_items');
    }
};
