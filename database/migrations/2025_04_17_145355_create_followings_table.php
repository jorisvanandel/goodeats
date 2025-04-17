<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('followings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follower_id')
                ->constrained('users');
            $table->foreignId('following_id')
                ->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('followings');
    }
};
