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
        Schema::create('employees', function (Blueprint $table) {
           $table->id();
            $table->string('employee_id')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->foreignId('job_title_id')->nullable()->constrained('job_titles')->nullOnDelete();
            $table->foreignId('employment_type_id')->nullable()->constrained('employment_types')->nullOnDelete();
            $table->foreignId('supervisor_id')->nullable()->constrained('employees')->nullOnDelete();

            // Personal Information
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('suffix')->nullable();
            $table->string('nickname')->nullable();
            $table->enum('gender', ['Male', 'Female'])->nullable();
            $table->enum('civil_status', ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'])->nullable();
            $table->string('religion')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('citizenship')->nullable();

            // Contact Information
            $table->string('email')->unique();
            $table->string('contact_number')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_number')->nullable();
            $table->string('emergency_contact_relation')->nullable();

            // Address
            $table->string('house_block')->nullable();
            $table->string('street')->nullable();
            $table->string('subdivision')->nullable();
            $table->string('barangay')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('zip_code')->nullable();

            // Hospital/Medical Specific
            $table->string('license_number')->nullable();
            $table->string('specialization')->nullable();
            $table->string('prc_id')->nullable();
            $table->date('license_expiry_date')->nullable();

            // Employment Details
            $table->date('date_hired')->nullable();
            $table->date('date_regularized')->nullable();
            $table->date('date_resigned')->nullable();
            $table->enum('employment_status', [
                'active', 'probationary', 'regular', 'contractual',
                'resigned', 'terminated', 'retired', 'on_leave',
                'suspended', 'deceased'
            ])->default('probationary');

            // Government IDs
            $table->string('sss_number')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('pagibig_number')->nullable();
            $table->string('philhealth_number')->nullable();

            // Salary (current)
            $table->decimal('basic_salary', 12, 2)->default(0);
            $table->decimal('allowance', 12, 2)->default(0);
            $table->decimal('deductions', 12, 2)->default(0);
            $table->decimal('net_pay', 12, 2)->default(0);

            // Profile
            $table->string('profile_picture')->nullable();
            $table->text('biography')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('employee_id');
            $table->index('employment_status');
            $table->index('date_hired');
            $table->index('department_id');
            $table->index('job_title_id');
            $table->index('supervisor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
