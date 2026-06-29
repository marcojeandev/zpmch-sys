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
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->date('date');
            $table->time('time_in')->nullable();
            $table->time('time_out')->nullable();
            $table->time('time_in_late')->nullable();
            $table->time('time_out_early')->nullable();
            $table->decimal('total_hours', 6, 2)->default(0);
            $table->decimal('overtime_hours', 6, 2)->default(0);
            $table->enum('status', [
                'present', 'late', 'absent', 'on_leave',
                'half_day', 'under_time', 'overtime',
                'holiday', 'weekend'
            ])->default('present');
            $table->text('remarks')->nullable();
            $table->boolean('is_holiday')->default(false);
            $table->boolean('is_weekend')->default(false);
            $table->boolean('is_on_call')->default(false);
            $table->boolean('is_doctor_duty')->default(false);
            $table->timestamps();

            $table->index('date');
            $table->index('status');
            $table->index(['employee_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
