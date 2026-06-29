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
        Schema::create('educational_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->enum('level', [
                'Elementary', 'High School', 'Senior High',
                'Vocational', 'College', 'Graduate', 'Post Graduate'
            ]);
            $table->string('school_name');
            $table->string('address')->nullable();
            $table->string('course_or_strand')->nullable();
            $table->string('degree')->nullable();
            $table->string('year_started')->nullable();
            $table->string('year_ended')->nullable();
            $table->string('honors_or_awards')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educational_backgrounds');
    }
};
