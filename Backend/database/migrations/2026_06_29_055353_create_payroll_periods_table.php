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
        Schema::create('payroll_periods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['monthly', 'semi_monthly', 'weekly', 'daily'])->default('monthly');
            $table->date('period_start');
            $table->date('period_end');
            $table->date('pay_date');
            $table->date('cutoff_date')->nullable();
            $table->enum('status', [
                'draft', 'pending', 'processing',
                'approved', 'paid', 'cancelled'
            ])->default('draft');
            $table->boolean('is_closed')->default(false);
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_periods');
    }
};
