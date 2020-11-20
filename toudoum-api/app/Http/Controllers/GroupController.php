<?php

namespace App\Http\Controllers;

use App\Http\Requests\Group\StoreGroupRequest;
use App\Http\Requests\Group\UpdateGroupRequest;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = [];

        if ($request->has("id")) {
            $filters[] = ["id", "=", $request->get("id")];
        }

        if ($request->has("name")) {
            $filters[] = ["name", "like,", "%" . $request->get("name") . "%"];
        }

        if ($request->has("by_token")) {
            return Auth::user()->groups;
        }
        return Group::where($filters)->get();


        // TO KEEP FOR THE CREATION OF GROUPS
        
        // $groups = Auth::user()->groups;

        // // Id
        // $idFilter = false;
        // if ($request->has("id")) {
        //     $idFilter = true;
        // }

        // $groupToKeep = [];
        // if ($idFilter) {
        //     foreach ($groups as $group) {
        //         if ($group['id'] == $request->get("id")) {
        //             array_push($groupToKeep, $group);
        //         }
        //     }
        // } else {
        //     $groupToKeep = $groups;
        // }

        // return $groupToKeep;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGroupRequest $request)
    {
        $group = new Group();
        $group->name = $request->input("name");
        $group->save();

        $group->users()->attach($request->input("users"));


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Group::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGroupRequest $request, $id)
    {
        $group = Group::findOrFail($id);

        $group->name = $request->input('name');
        $group->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();
    }
}
