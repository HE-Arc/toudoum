<?php

namespace App\Http\Controllers;

//Requests
use App\Http\Requests\Task\StoreTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
        // Id
        $idFilter = false;
        if($request->has("id")) {
            $idFilter = true;
        }
        // Workbook
        $workbookidFilter = false;
        if($request->has("workbook_id")) {
            $workbookidFilter = true;
        }

        $tasks = Auth::user()->tasks;
        $taskToKeep = [];
        if($workbookidFilter){
            foreach ($tasks as $task) {
                if($task['workbook_id'] == $request->get("workbook_id")){
                    array_push($taskToKeep,$task);
                }
            }
        }elseif($idFilter){
            foreach ($tasks as $task) {
                if($task['id'] == $request->get("id")){
                    array_push($taskToKeep,$task);
                }
            }
        }
        else{
            $taskToKeep = $tasks;
        }
        
        return $taskToKeep;
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
