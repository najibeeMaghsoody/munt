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
        Schema::table('budgets', function (Blueprint $table) {
            $table->string('name')->nullable(); // Voeg kolom toe
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       
    Schema::table('budgets', function (Blueprint $table) {
        $table->dropColumn('name');
    });
    }
};
