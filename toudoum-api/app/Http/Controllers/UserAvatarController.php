<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserAvatarController extends Controller
{

    public function get(Request $request)
    {
        if($request->has("id")) {
            $user = User::find($request->get("id"));
        } else {
            $user = Auth::user();
        }

        if(file_exists("../storage/app/public/avatars/" . $user->avatar))
        {
            return $user->avatar;
        }
        return "";
    }

    /**
     * Update the avatar for the user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request)
    {
        $ext =  $request->file('avatar')->getClientOriginalExtension();
        $path = $request->file('avatar')->storeAs('public/avatars', Auth::user()->id . "." . $ext);
        $user = User::find(Auth::user()->id);
        $user->avatar = $user->id . "." . $ext;
        $user->save();

        return $path;
    }

}