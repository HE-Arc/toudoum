<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Requests\Auth\SignUpRequest;
use App\Http\Requests\Auth\LoginRequest;


class AuthController extends Controller
{

    public function signup(SignUpRequest $request)
    {
        $user = User::create([
            'name' => $request['name'],
            'firstname' => $request["firstname"],
            'email' => $request['email'],
            'email_verified_at' => now(),
            'password' => Hash::make($request['password']),
            'remember_token' => Str::random(10),
        ]);

        Auth::attempt(['email' => $request['email'], 'password' => $request['password']]);

        return $this->token($user->createToken("Personal Access Token"), 'User Created', 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where([
            ["email", "=", $request["email"]]
        ])->get();

        if (!Auth::attempt(['email' => $request['email'], 'password' => $request['password']])) {
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
        $user = Auth::user();
        Auth::user()->token()->revoke();
        Auth::logout();
        return $this->success('User Logged Out', 200);
    }
}
