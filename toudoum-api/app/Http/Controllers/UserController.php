<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = [];

        // Name
        if($request->has("name")) {
            $filters[] = ["name", "like", "%" . $request->get("name") . "%"];
        }

        // Firstname
        if($request->has("firstname")) {
            $filters[] = ["firstname", "like", "%" . $request->get("firstname") . "%"];
        }

        // Email
        if($request->has("email")) {
            $filters[] = ["email", "like", "%" . $request->get("email") . "%"];
        }

        return User::where($filters)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create([
            'name' => $request['name'],
            'firstname' => $request["firstname"],
            'email' => $request['email'],
            'email_verified_at' => now(),
            'password' => Hash::make($request['password']),
            'remember_token' => Str::random(10),
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if($request->get("name")) {
            $user->name = $request->get("name");
        }
        if($request->get("firstname")) {
            $user->firstname = $request->get("firstname");
        }
        if($request->get("email")) {
            $user->email = $request->get("email");
            $user->email_verified_at = now();
        }
        if($request->get("password") && $request["password_confirmation"]) {
            $user->password = $request->get("password");
        }
        $user->save();
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
    }
}
