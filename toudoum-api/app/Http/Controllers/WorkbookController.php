<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workbook\StoreWorkbookRequest;
use App\Http\Requests\Workbook\UpdateWorkbookRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Workbook;
use App\Models\Task;

class WorkbookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = [];

        if ($request->has("name")) {
            $filters[] = ["name", "like,", "%" . $request->get("name") . "%"];
        }

        if ($request->has("id")) {
            $filters[] = ["id", "=", $request->get("id")];
        }

        if ($request->has("group_id")) {
            $filters[] = ["group_id", "=", $request->get("group_id")];
        }

        if ($request->has("user_id")) {
            $filters[] = ["user_id", "=", $request->get("user_id")];
        }
        if ($request->has("by_token")) {
            return DB::select('select * from workbooks where user_id = ? union select * from workbooks where group_id in (select group_id from user_group where user_id = ?)', [Auth::user()->id, Auth::user()->id]);
        }
        
        return Workbook::where($filters)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWorkbookRequest $request)
    {
        $workbook = new Workbook();
        $workbook->name = $request->input("name");
        $workbook->group_id = $request->input("group_id");
        $workbook->user_id = Auth::user()->id;
        $workbook->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Workbook::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWorkbookRequest $request, $id)
    {
        $workbook = Workbook::findOrFail($id);

        $workbook->name = $request->input('name');
        $workbook->group_id = $request->input('group_id');
        $workbook->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workbook = Workbook::findOrFail($id);
        $tasks = Task::where('workbook_id', $id);
        foreach($tasks->get() as $task)
        {
            $task->users()->detach();
            $task->delete();
        }

        $workbook->delete();
    }
}
