<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;


class AuthController extends Controller
{

    public function signup(Request $request)
    {
        $attr = $this->validateSignup($request);
        
        $user = User::create([
            'name' => $attr['name'],
            'firstname' => $attr["firstname"],
            'email' => $attr['email'],
            'email_verified_at' => now(),
            'password' => Hash::make($attr['password']),
            'remember_token' => Str::random(10),
            ]);
            
        Auth::attempt(['email' => $attr['email'], 'password' => $attr['password']]);
        
        return $this->token($user->createToken("Personal Access Token"), 'User Created', 201);
    }

    public function login(Request $request)
    {
        $attr = $this->validateLogin($request);

        if (!Auth::attempt($attr)) 
        {
            return $this->error('Credentials mismatch', 401);
        }
        $user = Auth::user();

        return $this->token($user->createToken("Personal Access Token"));
    }

    public function user()
    {
        return $this->success(Auth::user(), "/user");
    }

    public function logout()
    {
        Auth::user()->token()->revoke();
        return $this->success('User Logged Out', 200);
    }

    public function validateSignup($request)
    {
        return $request->validate([
            'name' => 'required|string',
            'firstname' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    public function validateLogin($request)
    {
        return $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
    }
}
