<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Super Admin account
        User::create([
            'first_name' => 'System',
            'middle_name' => null,
            'last_name' => 'Admin',
            'suffix' => null,
            'email' => 'superadmin@hospital.com',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'account_status' => 'active',
        ]);
    }
}