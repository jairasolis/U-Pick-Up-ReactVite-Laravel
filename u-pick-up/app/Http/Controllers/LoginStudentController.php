<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginStudent;
use Illuminate\Support\Facades\Auth;

class LoginStudentController extends Controller
{
    public function getLoginData()
    {
        try {
            // Fetch login data for the past 7 days
            $loginData = LoginStudent::selectRaw('DATE(login_date) as date, COUNT(*) as count')
                ->where('login_date', '>=', now()->subDays(7)->toDateString())
                ->groupBy('date')
                ->get();

            return response()->json($loginData);
        } catch (\Exception $e) {
            // Handle any errors gracefully
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function insertLoginData(Request $request)
    {
        try {
            $Id = $request->input('id');

            // Insert login data into the login_students table
            LoginStudent::create([
                'student_id' => $Id,
                'login_date' => now()
            ]);

            return response()->json(['message' => 'Login data inserted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors gracefully
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
