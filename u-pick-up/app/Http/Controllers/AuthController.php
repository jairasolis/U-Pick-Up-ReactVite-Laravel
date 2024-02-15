<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\PasswordReset;

class AuthController extends Controller
{
    // student registration and login
    public function studentRegistration(Request $request){
        $validator = Validator::make($request->all(),[
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'student_id' => 'required|unique:students',
            'program' => 'required',
            'department' => 'required',
            'age' => 'required',
            'gender' => 'required',
            'email_ad' => 'required|email|unique:students',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|same:password'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $student = DB::transaction(function () use ($request) {
            return Student::create([
                'first_name'=> $request->first_name,
                'middle_name'=> $request->middle_name,
                'last_name'=> $request->last_name,
                'student_id'=> $request->student_id,
                'program'=> $request->program,
                'department'=> $request->department,
                'age'=> $request->age,
                'gender'=> $request->gender,
                'email_ad'=> $request->email_ad,
                'password'=> Hash::make($request->password),
            ]);
        });

        return response()->json([
            'message' => 'Registration successful',
            'data' => $student
        ], 200);

    }

    public function studentCheckId($student_id){
        $studentIdExists = Student::where('student_id', $student_id)->exists();
        if ($studentIdExists) {
            return response()->json([
                'message' => 'Student ID not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Student ID available'
            ], 200);
        }
    }
    public function studentEmailCheck($email_ad){
        $emailExists = Student::where('email_ad', $email_ad)->exists();
        if ($email_ad) {
            return response()->json([
                'message' => 'Email not available'
            ], 409);
        } else {
            return response()->json([
                'message' => 'Email available'
            ], 200);
        }
    }
    


    public function studentLogin(Request $request){
        $validator = Validator::make($request->all(),[
            'student_id' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Login failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $student = Student::where('student_id', $request->student_id)->first();

        if($student){
            if(Hash::check($request->password, $student->password)){
                $token = $student->createToken("student-auth-token")->plainTextToken;
                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                    'data' => $student
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }
        }else{
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    // admin registration and login
    public function adminRegistration(Request $request){
        $validator = Validator::make($request->all(),[
            'email_ad' => 'required|email|unique:admin',
            'username' => 'required|unique:admin',
            'department' => 'required',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|same:password'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Registration failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $admin = DB::transaction(function () use ($request) {
            return Admin::create([
                'email_ad'=> $request->email_ad,
                'username'=> $request->username,
                'department'=> $request->department,
                'password'=> Hash::make($request->password),
            ]);
        });

        return response()->json([
            'message' => 'Registration successful',
            'data' => $admin
        ], 200);

    }

    public function adminLogin(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Login failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('username', $request->username)->first();

        if($admin && Hash::check($request->password, $admin->password)){
            $token = $admin->createToken("admin-auth-token")->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'data' => $admin
            ], 200);
        }else{
            return response()->json([
                'message' => 'Invalid credentials'
            ], 400);
        }
    }

    //logout user
    public function logout(Request $request){
        if($request->user()->currentAccessToken()->delete()){
            return response()->json([
                'message' => 'Logout successful',
            ], 200);
        }else{
            return response()->json([
                'message' => 'Unauthorized logout attempt'
            ], 401);
        }
    }


}
