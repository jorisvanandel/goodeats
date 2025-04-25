<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('engagements', function (Blueprint $table) {
            $table->foreignId('restaurant_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('type');

            $table->unique(['restaurant_id', 'user_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('engagements');
    }
};
