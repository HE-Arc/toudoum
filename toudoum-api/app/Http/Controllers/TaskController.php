<?php

namespace App\Http\Controllers;

//Requests
use App\Http\Requests\Task\StoreTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Group;
use App\Models\Workbook;
use Illuminate\Support\Facades\DB;

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
        if ($request->has("id")) {
            $idFilter = true;
        }
        // Workbook
        $workbookidFilter = false;
        if ($request->has("workbook_id")) {
            $workbookidFilter = true;
        }

        // count tasks in workbook
        if ($request->has("count_workbook_id")) {

            $results =  Task::select('workbook_id', DB::raw('COUNT(id) as nbTasks'))->groupBy('workbook_id')->get();
            $goodTable = [];
            foreach( $results as $result){
                $goodTable[$result['workbook_id']] = $result['nbTasks'];
            }
            return $goodTable;
        }

        $tasks = Auth::user()->tasks;
        $taskToKeep = [];
        if ($workbookidFilter) {
            foreach ($tasks as $task) {
                if ($task->workbook_id == $request->get("workbook_id")) {
                    array_push($taskToKeep, $task);
                }
            }
        } else if ($idFilter) {
            foreach ($tasks as $task) {
                if ($task['id'] == $request->get("id")) {
                    array_push($taskToKeep, $task);
                }
            }
        } else {
            //TODO
            // {
            //     "today" : [tasks...]
            //     "Week"  : [tasks...]
            //     "Rest"  : [tasks...]
            // }

            foreach ($tasks as $task) {
                $diffDay = ((strtotime($task['end_date'])-strtotime(date("Y-m-d")))/ (60 * 60 * 24));
                if($task['end_date'] == date("Y-m-d")){
                    $taskToKeep['today'][] = $task;
                }else if( $diffDay <= 7 && $diffDay > 1 ){
                    $taskToKeep['week'][] = $task;
                }else{
                    $taskToKeep['rest'][] = $task;
                }
            }
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
        $shared = false;

        // Description
        if ($request->get("description")) {
            $task->description = $request->get("description");
        }

        // Priority
        if ($request->get("priority")) {
            $task->priority = $request->input("priority");
        }

        // Workbook ID
        if ($request->get("workbook_id")) {
            $task->workbook_id = $request->input("workbook_id");
            $shared = true;
        }

        // End_date
        if ($request->get("end_date")) {
            $task->end_date = $request->input("end_date");
        }

        $task->save();

        $group_id = Workbook::find($task->workbook_id)->group_id;
        if($group_id != null){
            $usersInGroup = Group::with("users")->find($group_id)->users;

            $userIDs = [];
            foreach ($usersInGroup as $user) {
                $userIDs[$user->id] = ['checked' => false];
            }
            $task->users()->attach($userIDs);
        }else{
            $task->users()->attach(Auth::user()->id,['checked' => false]);
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
        // $task = Task::findOrFail($id);
        $tasks = Auth::user()->tasks;
        $task = null;
        foreach ($tasks as $t) {
            if ($t->id == $id) {
                $task = $t;
            }
        }
        if ($task != null) {
            print($task);
            //name
            if ($request->get("name")) {
                $task->name = $request->input(("name"));
            }

            // Description
            if ($request->get("description")) {
                $task->description = $request->get("description");
            }

            // Priority
            if ($request->get("priority")) {
                $task->priority = $request->input("priority");
            }

            // End_date
            if ($request->get("end_date")) {
                $task->end_date = $request->input("end_date");
            }

            // Checked
            if ($request->get("checked")) {
                $task->pivot->checked = !$task->pivot->checked;
            }

            $task->save();
            $task->pivot->save();
        }
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
