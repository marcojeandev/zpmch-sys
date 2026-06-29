<?php

namespace App\Http\Requests\SuperAdmin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isSuperAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employeeId = $this->route('employee') ? $this->route('employee')->id : null;
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');

        return [
            // Personal Information
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'suffix' => ['nullable', 'string', 'max:10'],

            // Contact
            'email' => [
                $isUpdate ? 'sometimes' : 'required',
                'string',
                'email',
                'max:255',
                Rule::unique('employees', 'email')->ignore($employeeId)
            ],
            'contact_number' => ['nullable', 'string', 'max:20'],

            // Employment
            'department_id' => ['nullable', 'exists:departments,id'],
            'job_title_id' => ['nullable', 'exists:job_titles,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'supervisor_id' => ['nullable', 'exists:employees,id'],
            'date_hired' => ['nullable', 'date', 'before_or_equal:today'],
            'employment_status' => ['required', 'in:active,probationary,regular,contractual,resigned,terminated,retired,on_leave,suspended,deceased'],

            // Password (for new users)
            'password' => [
                $isUpdate ? 'nullable' : 'required',
                'string',
                'min:8',
                'confirmed'
            ],
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered.',
            'employment_status.required' => 'Employment status is required.',
            'employment_status.in' => 'Invalid employment status selected.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
            'department_id.exists' => 'Selected department does not exist.',
            'job_title_id.exists' => 'Selected job title does not exist.',
            'employment_type_id.exists' => 'Selected employment type does not exist.',
            'supervisor_id.exists' => 'Selected supervisor does not exist.',
            'date_hired.before_or_equal' => 'Date hired cannot be in the future.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Auto-generate employee_id
        if (empty($this->employee_id)) {
            $lastEmployee = \App\Models\Employee::orderBy('id', 'desc')->first();
            $nextId = $lastEmployee ? intval(substr($lastEmployee->employee_id, 4)) + 1 : 1;
            $this->merge([
                'employee_id' => 'EMP-' . str_pad($nextId, 3, '0', STR_PAD_LEFT)
            ]);
        }
    }
}