<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $user_data=[
            [
                'fname' => "Jhon Carlo",
                'mname' => "Sabuero",
                'lname' => "Canulo",
                'gender' => "male",
                'role' => "admin",
                'status' => 'accepted',
                'email' => "canulodev21@gmail.com",
                'password' => Hash::make('canulo2121'),
            ],
            [
                'fname' => "Cressa",
                'mname' => "Capayas",
                'lname' => "Pasanting",
                'gender' => "female",
                'role' => "user",
                'status' => 'pending',
                'email' => "cressa@gmail.com",
                'password' => Hash::make('cressa22'),
            ],
        ];
        User::insert($user_data);
    }
}
