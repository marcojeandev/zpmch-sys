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
        Schema::create('job_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');

            // Old Details
            $table->foreignId('old_job_title_id')->nullable()->constrained('job_titles')->nullOnDelete();
            $table->foreignId('old_department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->decimal('old_salary', 12, 2)->nullable();

            // New Details
            $table->foreignId('new_job_title_id')->nullable()->constrained('job_titles')->nullOnDelete();
            $table->foreignId('new_department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->decimal('new_salary', 12, 2)->nullable();

            // Change Details
            $table->enum('change_type', ['Promotion', 'Demotion', 'Transfer', 'Salary Adjustment', 'Rehire']);
            $table->date('effective_date');
            $table->text('reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_history');
    }
};
