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
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');

        $table->unsignedBigInteger('file_id')->nullable();
        $table->unsignedBigInteger('user_id')->nullable();

        $table->foreign('file_id')->references('id')->on('files')->onDelete('cascade');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        $table->unique(['user_id', 'name']); 

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
  public function down(): void
{
    Schema::dropIfExists('categories');
}
};
