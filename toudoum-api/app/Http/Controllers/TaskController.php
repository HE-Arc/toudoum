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

         // Workbook
         if($request->has("workbook_id")) {
            $filters[] = ["workbook_id", "=", $request->get("workbook_id")];
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
        }

        // Priority
        if($request->get("priority")) {
            $task->priority = $request->input("priority");
        }

        // Priority
        if($request->get("end_date")) {
            $task->end_date = $request->input("end_date");
        }
        $task->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Task::findOrFail($id);
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
        $task = Task::findOrFail($id);

        $task->name = $request->input(("name"));

        // Description
        if($request->get("description")) {
            $task->description = $request->get("description");
        }

        // Priority
        if($request->get("priority")) {
            $task->priority = $request->input("priority");
        }

        // Priority
        if($request->get("end_date")) {
            $task->end_date = $request->input("end_date");
        }
        $task->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
    }
}
