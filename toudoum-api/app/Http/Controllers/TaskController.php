<?php

namespace App\Http\Controllers;

//Requests
use App\Http\Requests\Task\StoreTaskRequest;
use Illuminate\Http\Request;

// Model
use App\Models\Task;

class TaskController extends Controller
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

        // Description
        if($request->has("description")) {
            $filters[] = ["description", "like", "%" . $request->get("description") . "%"];
        }

        // Priority
        if($request->has("priority")) {
            $filters[] = ["priority", "=", $request->get("priority")];
        }

        // End date
        if($request->has("end_date")) {
            $filters[] = ["end_date", "=", $request->get("end_date")];
        }

        return Task::where($filters)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {

        $task = new Task();
        $task->name = $request->input(("name"));

        // Description
        if($request->get("description")) {
            $task->description = $request->get("description");
        } else {
            
        }

        // Priority
        if($request->get("description")) {
            $task->priority = $request->input("description");
        } else {
            $task->priority = 1;
        }

        // Priority
        if($request->get("end_date")) {
            $task->end_date = $request->input("end_date");
        } else {
            $task->end_date = 1;
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
